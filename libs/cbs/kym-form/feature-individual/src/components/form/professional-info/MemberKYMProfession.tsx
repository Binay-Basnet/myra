import React from 'react';
import { Control } from 'react-hook-form';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormCheckboxGroup } from '@coop/myra/components';
import { Text } from '@coop/shared/ui';

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
    <GroupContainer id="Profession" scrollMarginTop={'200px'}>
      <Text fontSize="r1" fontWeight="SemiBold">
        PROFESSION
      </Text>

      <FormCheckboxGroup
        control={control}
        name={'profession'}
        showOther
        list={occupationDetails}
      />

      {/* <Box display="flex" flexWrap="wrap" columnGap="s48" rowGap="s16">
        {occupationDetails.map((item, index) => (
          <Checkbox key={index}>
            <Text fontSize="s3">{item}</Text>
          </Checkbox>
        ))}
        <Checkbox>
          <Input type="text" placeholder="other" />
        </Checkbox>
      </Box>*/}
    </GroupContainer>
  );
};
