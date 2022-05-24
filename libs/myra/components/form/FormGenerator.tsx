import React from 'react';
import { RegisterOptions } from 'react-hook-form';
import { InputProps, SelectProps } from '@chakra-ui/react';

import { Input, Select } from './components';

interface IInputJson extends InputProps {
  type: 'input';
}

interface ISelectJson extends SelectProps {
  type: 'select';
}

interface ICommonJsonProps {
  label: React.ReactNode;
  placeholder: string;
  name: string;
  validations?: RegisterOptions;
  options?: { label: string; value: string }[];
}

export type DataSchema = (IInputJson | ISelectJson) & ICommonJsonProps;

export interface IFormGeneratorProps {
  dataSchema: DataSchema[];

  // WARNING!! THIS IS EXPERIMENTAL PROPS. DO NOT USE IT RIGHT NOW
  // !!EXPERIMENTAL!!
  onEachFieldChange?: () => void; // TODO! check its viability
}
export function FormGenerator(props: IFormGeneratorProps) {
  const { dataSchema, onEachFieldChange } = props;
  return (
    <>
      {dataSchema.map((data) => {
        if (data.type === 'input') {
          const {
            name,
            validations,
            label,
            placeholder,
            onChange,
            ...otherProps
          } = data;

          return (
            <Input
              name={name}
              placeholder={placeholder}
              onChange={onChange ?? onEachFieldChange}
              validations={validations}
              label={label}
              {...otherProps}
            />
          );
        }
        if (data.type === 'select') {
          const {
            name,
            validations,
            label,
            placeholder,
            onChange,
            options,
            ...otherProps
          } = data;

          return (
            <Select
              name={name}
              onChange={onChange ?? onEachFieldChange}
              validations={validations}
              label={label}
              placeholder={placeholder}
              options={options}
              {...otherProps}
            ></Select>
          );
        }
        return null;
      })}
    </>
  );
}
