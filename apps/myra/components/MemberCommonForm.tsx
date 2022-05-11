import React from 'react';
import { Box } from '@saccos/myra/ui';
import { Input, Select } from '@chakra-ui/react';

const MemberCommonForm = ({ fields, register, error }) => {
  return fields.map((field) => {
    const { title, type, id, name, options, validationProps } = field;

    if (type === 'text' || type === 'number' || type === 'date') {
      console.log('hello123', error[name]?.message);
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
          <Select
            // placeholder={placeholder}
            borderRadius="2px"
            borderColor="#CBD0D6"
          >
            {options?.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </Select>
        </Box>
      );
    }
  });
};

export default MemberCommonForm;
