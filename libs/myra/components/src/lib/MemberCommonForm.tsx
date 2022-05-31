import React from 'react';

import { FormInput, FormSelect } from './newFormComponents';

export const MemberCommonForm = ({ fields, control }: any) => {
  return fields.map((field) => {
    const { label, type, name, options, placeholder, variant } = field;

    if (variant === 'input') {
      return (
        <FormInput
          type={type}
          control={control}
          placeholder={placeholder}
          name={name}
          label={label}
        />
      );
    } else if (variant === 'select') {
      return (
        <FormSelect
          control={control}
          placeholder={placeholder}
          name={name}
          label={label}
          options={options}
        />
      );
    }
  });
};
