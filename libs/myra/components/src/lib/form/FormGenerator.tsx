import React from 'react';

import {Input} from './components';
import type {DataSchema, DefaultFieldTypes, Dependencies, IConditionalProps, IInputProps,} from './types';

export interface IFormGeneratorProps<TfieldTypes extends DefaultFieldTypes> {
  dataSchema: DataSchema<TfieldTypes>[];

  // WARNING! THIS IS EXPERIMENTAL PROPS. DO NOT USE IT RIGHT NOW
  dependencies?: Dependencies<TfieldTypes>; // TODO! check its viablity

  // WARNING!! THIS IS EXPERIMENTAL PROPS. DO NOT USE IT RIGHT NOW
  // !!EXPERIMENTAL!!
}

export function FormGenerator<TfieldTypes extends DefaultFieldTypes>(
  props: IFormGeneratorProps<TfieldTypes>
) {
  const {dataSchema, dependencies} = props;
  return (
    <>
      {dataSchema.map((data) => {
        if (data.variant === 'input') {
          const {name, validations, label, ...otherProps} = data;

          //! TODO This is bad typescript
          const dependency = dependencies?.[name] as IConditionalProps<IInputProps,
            TfieldTypes>;
          return (
            <Input<TfieldTypes>
              key={name}
              name={name}
              validations={validations}
              label={label}
              {...otherProps}
              dependency={dependency}
            />
          );
        }
        // if (data.variant === 'select') {
        //   const {
        //     name,
        //     validations,
        //     label,
        //     options,
        //     ...otherProps
        //   } = data;

        //   return (
        //     <Select
        //       name={name}
        //       validations={validations}
        //       label={label}
        //       options={options}
        //       {...otherProps}
        //     ></Select>
        //   );
        // }
        return null;
      })}
    </>
  );
}
