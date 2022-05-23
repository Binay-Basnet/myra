import React from 'react';
import { RegisterOptions } from 'react-hook-form';
import { InputProps, SelectProps } from '@chakra-ui/react';

import { Input } from './components';

interface IInputJson extends InputProps {
  type: 'input';
}

interface ISelectJson extends SelectProps {
  type: 'select';
}

interface ICommonJsonProps {
  label: React.ReactNode;
  name: string;
  validations?: RegisterOptions;
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
          const { name, validations, label, onChange, ...otherProps } = data;

          return (
            <Input
              name={name}
              onChange={onChange ?? onEachFieldChange}
              validations={validations}
              label={label}
              {...otherProps}
            />
          );
        }
        return null;
      })}
    </>
  );
}
