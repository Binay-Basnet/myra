import React from 'react';

import { Input } from './components';

import type {
  DataSchema,
  DefaultFieldTypes,
  Dependencies,
  IConditionalProps,
  IInputProps,
} from './types';

export interface IFormGeneratorProps<TfieldTypes extends DefaultFieldTypes> {
  dataSchema: DataSchema<TfieldTypes>[];

  // WARNING! THIS IS EXPERIMENTAL PROPS. DO NOT USE IT RIGHT NOW
  dependencies?: Dependencies<TfieldTypes>; // TODO! check its viablity

  // WARNING!! THIS IS EXPERIMENTAL PROPS. DO NOT USE IT RIGHT NOW
  // !!EXPERIMENTAL!!
  // This will be overridden if `onChange` prop is present in dataSchema.
  // This is prone to bugs and will be hard to debug
  onEachFieldChange?: () => void; // TODO! check its viability
}
export function FormGenerator<TfieldTypes extends DefaultFieldTypes>(
  props: IFormGeneratorProps<TfieldTypes>
) {
  const { dataSchema, dependencies, onEachFieldChange } = props;
  return (
    <>
      {dataSchema.map((data) => {
        if (data.variant === 'input') {
          const { name, validations, label, onChange, ...otherProps } = data;

          //! TODO This is bad typescript
          const dependency = dependencies?.[name] as IConditionalProps<
            IInputProps,
            TfieldTypes
          >;
          return (
            <Input<TfieldTypes>
              key={name}
              name={name}
              onChange={onChange ?? onEachFieldChange}
              validations={validations}
              label={label}
              {...otherProps}
              dependency={dependency}
            />
          );
        }
        return null;
      })}
    </>
  );
}
