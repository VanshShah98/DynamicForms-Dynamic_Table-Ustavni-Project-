// enums.ts
import { Observable, of } from 'rxjs';
export enum FieldType {
  String = 'String',
  BOOLEAN = 'BOOLEAN',
  INT = 'INT',
  DATETIME = 'DATETIME',
  DROPDOWN = 'DROPDOWN',
}

// class-size.ts
export type ClassSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;


export interface Field {
  label?: string;
  name: string;
  type: FieldType
  class?: ClassSize;
}

interface DropdownOption {
  key: number;
  value: string;
}

let dynamicFormConfig: Field[] = [];

export const getFormConfig = (callback: (formData: Field[]) => void) => {
  callback(dynamicFormConfig);
};


export const setFormConfig = (userDefinedFields: Field[]) => {
  dynamicFormConfig = userDefinedFields;
};



export const getDropdownOptions = (fieldName: string): Observable<DropdownOption[]> => {
  try {
    const dropdownOptionsData = require('../../../../../../public/dropdown.json');
    const matchingOptions = dropdownOptionsData.find((options: any) => options.name === fieldName);
    return of(matchingOptions ? matchingOptions.data : []);
  } catch (error) {
    console.error('Error fetching dropdown options data:', error);
    return of([]);
  }
};

