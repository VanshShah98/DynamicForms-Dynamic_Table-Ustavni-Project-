// DynamicTable.tsx
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  Select,
  MenuItem,
  TableSortLabel,
  InputLabel,
} from '@material-ui/core';
import Pagination from '../../table-pagination/Pagination';
import { catchError } from 'rxjs/operators';
import { AjaxResponse, ajax } from 'rxjs/ajax';
import { EMPTY } from 'rxjs';
import useStyles from './DynamicTableStyles';
import { API_URL, DEFAULT_PAGE_SIZE, ROWS_PER_PAGE_OPTIONS,PAGINATION_SIZE } from '../../../constants';

interface Column {
  id: string;
  label: string;
  sortable?: boolean;
}

interface Row {
  [key: string]: string | number | boolean | null;
}

interface SortState {
  [key: string]: { key: string; direction: 'asc' | 'desc' };
}

interface ApiDataResponse {
  items: Row[];
  count: number;
}

const fetchTableData = (
  page: number,
  pageSize: number,
  sort: SortState,
  setData: React.Dispatch<React.SetStateAction<Row[]>>,
  setTotalCount: React.Dispatch<React.SetStateAction<number>>
) => {
  ajax({
    url: API_URL,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: { page, pageSize, sort },
  })
  .pipe(
    catchError((error) => {
      console.error('Error:', error);
      return EMPTY;
    })
  )
  .subscribe(
    (ajaxResponse: AjaxResponse<unknown>) => {
      const data: ApiDataResponse = ajaxResponse.response as ApiDataResponse;
      setData(data?.items || []);
      setTotalCount(data?.count || 0);
    
  });
    
};


{/*AJAX output
[  
  {  
    "login":"mojombo",
    "id":1,
    "node_id":"MDQ6VXNlcjE=",
    "avatar_url":"https://avatars0.githubusercontent.com/u/1?v=4",
    "gravatar_id":"",
    "...
  },
  {  
    "login":"defunkt",
    "id":2,
    "node_id":"MDQ6VXNlcjI=",
    "avatar_url":"https://avatars0.githubusercontent.com/u/2?v=4",
    "gravatar_id":"",
    ...
  }
]
*/ }

interface DynamicTableProps {
  columns: Column[];
}

const DynamicTable: React.FC<DynamicTableProps> = ({ columns }) => {
  const classes = useStyles();
  const [data, setData] = useState<Row[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sort, setSort] = useState<SortState>({});
  const [totalCount, setTotalCount] = useState(1);
  
  const fetchData = () => {
    fetchTableData(page, pageSize, sort, setData, setTotalCount);
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize, sort]);

  const handleSort = (key: string) => {
    setSort((prevSort) => {
      const newSort: SortState = { ...prevSort };

      if (newSort[key]) {
        newSort[key] = {
          key,
          direction: newSort[key].direction === 'asc' ? 'desc' : 'asc',
        };
      } else {
        newSort[key] = { key, direction: 'asc' };
      }

      setPage(1);

      return newSort;
    });
  };

  const filteredColumns = data.length > 0 ? columns.filter((column) => Object.keys(data[0]).includes(column.id)) : [];

  return (
    <div className={classes.container}>
      <Table>
        <TableHead>
          <TableRow>
            {filteredColumns.map((column) => (
              <TableCell key={column.id}>
                {column.sortable !== false ? (
                  <TableSortLabel
                    active={!!sort[column.id]}
                    direction={sort[column.id]?.direction || 'asc'}
                    onClick={() => column.sortable !== false && handleSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                ) : (
                  <>{column.label}</>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => (
            <TableRow key={index}>
              {filteredColumns.map((column) => (
                <TableCell key={column.id}>{row[column.id]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.paginationContainer}>
        <span className={classes.totalItems}>{`Total items: ${totalCount}`}</span>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="per-page">per page:</InputLabel>
          <Select
            className={classes.selector}
            variant="filled"
            value={pageSize}
            onChange={(e) => {
              setPageSize(parseInt(e.target.value as string, 10));
            }}
            inputProps={{
              name: 'rows-per-page',
              id: 'rows-per-page',
            }}
          >
            {ROWS_PER_PAGE_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Pagination
          totalCount={totalCount}
          pageSize={pageSize}
          page={page}
          setPage={(newPage: number): void => {
            setPage(newPage);
          }}
          maxVisiblePages={PAGINATION_SIZE}
        />
      </div>
    </div>
  );
};

export default DynamicTable;
