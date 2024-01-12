// DynamicForm.tsx
import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { Checkbox, Container, FormControlLabel, Grid, MenuItem, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { from, of } from 'rxjs';
import { switchMap } from 'rxjs';
import {  FieldType, Field ,getDropdownOptions } from '../api/formconfig.service';

interface DynamicFormProps {
  formConfig: Field[];
  onSubmit: (formData: { [key: string]: string | boolean | number | Date }) => void;
}

const DynamicForm = forwardRef(({ formConfig, onSubmit }: DynamicFormProps, ref) => {
  const { register, handleSubmit } = useForm();
  const [dropdownOptions, setDropdownOptions] = useState<{ [key: string]: { key: number; value: string }[] }>({});

  useEffect(() => {
    formConfig.forEach((field) => {
      if (field.type === FieldType.DROPDOWN) {
        from(getDropdownOptions(field.name))
          .pipe(
            switchMap((options) => {
              if (options) {
                setDropdownOptions((prevOptions) => ({ ...prevOptions, [field.name]: options }));
              }
              return of(options);
            })
          )
          .subscribe((result: any) => {
            // Handle the result if needed
          });
      }
    });
  }, [formConfig]);


  const buildFormElements = () => {
    const elements: React.JSX.Element[] = [];

    formConfig.forEach((fieldConfig) => {
      const { name, class: fieldClass, type, label } = fieldConfig;
      const dropdownOptionsElements: React.ReactNode[] = [];

      switch (type) {
        case FieldType.DROPDOWN:
          dropdownOptions[name]?.forEach((option) => {
            dropdownOptionsElements.push(
              <MenuItem key={option.key} value={option.value}>
                {option.value}
              </MenuItem>
            );
          });

          elements.push(
            <Grid key={name} item xs={12} sm={fieldClass} lg={fieldClass} xl={fieldClass}>
              <TextField select fullWidth label={label || name} {...register(name)}>
                {dropdownOptionsElements}
              </TextField>
            </Grid>
          );
          break;

        case FieldType.BOOLEAN:
          elements.push(
            <Grid key={name} item xs={12} sm={fieldClass} lg={fieldClass} xl={fieldClass}>
              <FormControlLabel control={<Checkbox color="primary" {...register(name)} />} label={label || name} />
            </Grid>
          );
          break;

        case FieldType.DATETIME:
          elements.push(
            <Grid key={name} item xs={12} sm={fieldClass} lg={fieldClass} xl={fieldClass}>
              <TextField
                fullWidth
                label={label || name}
                type="date"
                InputLabelProps={{ shrink: true }}
                {...register(name)}
              />
            </Grid>
          );
          break;

        default:
          elements.push(
            <Grid key={name} item xs={12} sm={fieldClass} lg={fieldClass} xl={fieldClass}>
              <TextField
                fullWidth
                label={label || name}
                type={type === FieldType.INT ? 'number' : 'text'}
                {...register(name)}
              />
            </Grid>
          );
      }
    });

    return elements;
  };

  useImperativeHandle(ref, () => ({
    submit: () => handleSubmit((data) => onSubmit(data))(),
  }));

  return (
    <Container>
      <form>
        <Grid container spacing={2}>
          {buildFormElements()}
        </Grid>
      </form>
    </Container>
  );
});

export default DynamicForm;
