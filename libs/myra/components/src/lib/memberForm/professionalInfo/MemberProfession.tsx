import React from 'react';
import { Box, Checkbox, Input, Text } from '@saccos/myra/ui';

const occupationDetails = [
  'Agriculture',
  'Retired-Govt, Private',
  'Student',
  'Housewife',
  'Salary',
  'Business',
  'Foreign Employment',
];

export const MemberProfession = ({ control }: any) => {
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
