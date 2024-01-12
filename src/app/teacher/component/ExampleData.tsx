// ExamplePage.tsx
"use client"
import React from 'react';
import DynamicTable from '../../shared/components/dynamic-table/components/DynamicTable';
const columns = [
  { id: 'prezimeIIme', label: 'Name', sortable: true },
  { id: 'id', label: 'ID', sortable: true },
  { id: 'Number', label: 'Num', sortable: true },
  {id: 'Vansh',label:'a',sortable:false},


];

const ExamplePage: React.FC = () => {  

  return (
    <div>
      <DynamicTable columns={columns} />
    </div>
  );
};

export default ExamplePage;
