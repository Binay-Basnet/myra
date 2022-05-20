import React from 'react';
import { Input, Select, Box } from '@saccos/myra/ui';

export const MemberCommonForm = ({ fields, register, error }) => {
  return fields.map((field) => {
    const { title, type, id, name, options, validationProps } = field;

    if (type === 'text' || type === 'number' || type === 'date') {
      const errorMessage = error[name]?.message;
      return (
        <Box display="flex" flexDirection="column">
          {title}
          <Input
            borderRadius="2px"
            borderColor="#CBD0D6"
            placeholder={title}
            id={id}
            type={type || 'text'}
            {...register(name)}
          />
          <p>{errorMessage && errorMessage}</p>
        </Box>
      );
    } else if (type === 'select') {
      return (
        <Box display="flex" flexDirection="column">
          {title}
          <Select borderRadius="2px" borderColor="#CBD0D6">
            {options?.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </Select>
        </Box>
      );
    }
  });
};
