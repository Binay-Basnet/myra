import React from 'react';
import { Text, Grid, Box, Checkbox, Input } from '../../../ui/src';

const occupationDetails = [
  'Agriculture',
  'Retired-Govt, Private',
  'Student',
  'Housewife',
  'Salary',
  'Business',
  'Foreign Employment',
];

export const MemberProfession = ({ control }) => {
  return (
    <>
      <Text fontSize="r1" fontWeight="SemiBold">
        PROFESSION
      </Text>
      <br />
      <Box display="flex" flexWrap="wrap" gap={8}>
        {occupationDetails.map((item, index) => (
          <Checkbox key={index}>
            <Text fontSize="s3">{item}</Text>
          </Checkbox>
        ))}
        <Checkbox>
          <Input type="text" placeholder="other" />
        </Checkbox>
      </Box>
    </>
  );
};
