// DynamicTableStyles.ts
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paginationContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '16px',
    gap: '30px',
  },
  // tableContainer: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   maxHeight: '800px', // Set the desired height
  //   overflow: 'auto',
  //   width:'full',
  // },
  totalItems: {
    marginRight: '8px',
    fontWeight: 'bold',
  },
  formControl: {
    marginRight: '16px',
  },
  goToPageInput: {
    marginRight: '8px',
    minWidth: '15px',
    fontSize: '12px',
  },
  selector :{
    minWidth: '150px'
  },
}));

export default useStyles;
