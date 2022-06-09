import React from 'react';
import { Control } from 'react-hook-form';
import {
  Box,
  Checkbox,
  Grid,
  Text,
  TextFields,
  SwitchTabs,
  GridItem,
} from '@coop/myra/ui';

import { GroupContainer, InputGroupContainer } from '../containers';
import {
  FormInput,
  // FormRadioGroup,
  FormSelect,
  FormTextArea,
} from '../../newFormComponents';

interface IKYMDeclaration {
  control: Control<any>;
}

const details = ['Citizen', 'Permanent Resident', 'Resident'];
const booleanList = [
  {
    key: 'yes',
    value: 'Yes',
  },
  {
    key: 'no',
    value: 'No',
  },
];

export const KYMDeclaration = ({ control }: IKYMDeclaration) => {
  return (
    <GroupContainer>
      <Box display="flex" flexDirection="column" gap="s16">
        <TextFields variant="formLabel">Next To Kin / Local Contact</TextFields>
        <Grid templateColumns="repeat(3, 1fr)" gap="s16">
          <FormInput
            control={control}
            type="text"
            name="localKinRelationshipId"
            placeholder="Relationship"
          />
          <FormInput
            control={control}
            type="text"
            name="localKinName"
            placeholder="Name"
          />
          <div />
          <FormInput
            control={control}
            type="text"
            name="localKinContact"
            placeholder="Contact No"
          />
          <FormInput
            control={control}
            type="text"
            name="localKinAddress"
            placeholder="Address"
          />
        </Grid>
      </Box>
      <SwitchTabs
        label="Are you or any of your family politically exposed person?"
        list={booleanList}
      />
      {/* <FormRadioGroup
        control={control}
        name={'isPoliticallyExposed'}
        radioList={['Yes', 'No']}
        label=" Are you or any of your family politically exposed person?"
      /> */}

      <SwitchTabs label="Do you have a beneficial owner?" list={booleanList} />

      {/* <FormRadioGroup
        control={control}
        name={'hasBeneficialOwner'}
        radioList={['Yes', 'No']}
        label="Do you have a beneficial owner?"
      /> */}

      {/* <InputGroupContainer> */}
      <Grid gap={2} templateColumns="repeat(3,1fr)">
        <GridItem colSpan={1}>
          <FormSelect
            control={control}
            name={'beneficialRelationShipId'}
            options={[{ label: 'Father', value: 'father' }]}
            placeholder="Relationship"
            label="If yes, please write name and relationship "
          />
        </GridItem>

        <GridItem mt="20px" colSpan={2}>
          <FormInput
            control={control}
            type="text"
            name="fullName"
            placeholder="Full Name"
          />
        </GridItem>
      </Grid>
      {/* </InputGroupContainer> */}

      <SwitchTabs
        label="Declaration of convicted/Non-convicted for any crimes in Past"
        list={booleanList}
      />

      {/* <FormRadioGroup
        control={control}
        name={'isConvicted'}
        radioList={['Yes', 'No']}
        label="Declaration of convicted/Non-convicted for any crimes in Past"
      /> */}

      <InputGroupContainer>
        <Box display="flex" flexDirection="column">
          <FormTextArea
            name="convictionDetails"
            control={control}
            label="Please specify"
            placeholder="Enter Details"
          />
        </Box>
      </InputGroupContainer>

      <SwitchTabs
        label="Do you hold residential permit of foreign country?"
        list={booleanList}
      />

      {/* <FormRadioGroup
        control={control}
        name={'hasForeignResidentialPermit'}
        radioList={['Yes', 'No']}
        label="Do you hold residential permit of foreign country?"
      /> */}

      <Box display="flex" flexDirection="column">
        <Text fontSize="s3" mb="s16">
          Specify following details
        </Text>
        <Box display="flex" flexDirection="column" gap="s8">
          {details.map((item, index) => (
            <Checkbox key={index}>
              <Text fontSize="s3">{item}</Text>
            </Checkbox>
          ))}
        </Box>
      </Box>
    </GroupContainer>
  );
};
