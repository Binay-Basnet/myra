import React from 'react';
import { Control } from 'react-hook-form';
import { Box, Checkbox, Input, Text } from '@saccos/myra/ui';

import { GroupContainer } from '../containers';

interface IMemberKYMProfession {
  control: Control<any>;
}

const occupationDetails = [
  'Agriculture',
  'Retired-Govt, Private',
  'Student',
  'Housewife',
  'Salary',
  'Business',
  'Foreign Employment',
];

export const MemberKYMProfession = ({ control }: IMemberKYMProfession) => {
  return (
    <GroupContainer>
      <Text fontSize="r1" fontWeight="SemiBold">
        PROFESSION
      </Text>
      <Box display="flex" flexWrap="wrap" columnGap="s48" rowGap="s16">
        {occupationDetails.map((item, index) => (
          <Checkbox key={index}>
            <Text fontSize="s3">{item}</Text>
          </Checkbox>
        ))}
        <Checkbox>
          <Input type="text" placeholder="other" />
        </Checkbox>
      </Box>
    </GroupContainer>
  );
};
