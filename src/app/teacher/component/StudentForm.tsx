// StudentForm.jsx
"use client"

import React, { useState, useRef } from 'react';
import { Button } from '@material-ui/core';
import DynamicForm from '../../shared/components/dynamic-form/components/DynamicForm';
import { Field, FieldType } from '../../shared/components/dynamic-form/api/formconfig.service';

const StudentForm: React.FC = () => {
  const dynamicFormRef = useRef(null);
  const [submittedData, setSubmittedData] = useState<{ [key: string]: string | boolean | number | Date }>({});

  const studentFormConfig: Field[] = [
    { "name": "FirstName", "type":FieldType.String, "class": 12 },
    { "name": "LastName", "type": FieldType.String, "class": 6 },
    { "name": "Email", "type": FieldType.String, "class": 6 },
    { "name": "Address", "type": FieldType.String, "class": 12 },
    { "name": "PhnNO", "type": FieldType.INT, "class": 4 },
    { "name": "Age", "type": FieldType.INT, "class": 6 },
    { "name": "DOB", "type": FieldType.DATETIME, "class": 5 },
    { "name": "ApplicationJobStatus", "type": FieldType.DROPDOWN, "class": 5 },
    { "name": "DokumentPrimarniPosiljalacVrsta", "type": FieldType.DROPDOWN, "class": 5 },
  ];
//this handles the submission of the data.
  const handleFormSubmit = () => {
    dynamicFormRef.current.submit();
  };
//this handles the submitted data.
  const handleDynamicFormData = (formData: { [key: string]: string | boolean | number | Date }) => {
    setSubmittedData(formData);
    console.log('Form data submitted:', formData);
  };

  return (
    <div>
      <DynamicForm ref={dynamicFormRef} formConfig={studentFormConfig} onSubmit={handleDynamicFormData} />

      <Button
        variant="contained"
        color="primary"
        onClick={handleFormSubmit}
      >
        Submit and Display Data
      </Button>
    {/*For getting the data in JSON form*/}
      {Object.keys(submittedData).length > 0 && (
        <div>
          <h2>Submitted Data (JSON):</h2>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default StudentForm;
