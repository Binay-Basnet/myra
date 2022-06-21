import React, { useState } from 'react';
import { Control } from 'react-hook-form';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  FormInput,
  FormSelect,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';
import {
  Box,
  Checkbox,
  Grid,
  GridItem,
  SwitchTabs,
  Text,
  TextFields,
} from '@coop/shared/ui';

interface IKYMDeclaration {
  control: Control<any>;
}

const details = ['Citizen', 'Permanent Resident', 'Resident'];
const booleanList = [
  {
    label: 'yes',
    value: 'Yes',
  },
  {
    label: 'no',
    value: 'No',
  },
];

export const KYMDeclaration = ({ control }: IKYMDeclaration) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <GroupContainer>
      <Box
        display="flex"
        flexDirection="column"
        gap="s16"
        id="Next to Kin"
        scrollMarginTop={'200px'}
      >
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
      <Box id="Family members in politics" scrollMarginTop={'200px'}>
        <FormSwitchTab
          label="Are you or any of your family politically exposed person?"
          options={booleanList}
          name="politicallyExposedPerson"
        />
      </Box>
      <Box id="Beneficial Owner" scrollMarginTop={'200px'}>
        <FormSwitchTab
          label="Do you have a beneficial owner?"
          options={booleanList}
          name="beneficialOwner"
        />
      </Box>

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
      <Box
        id="Convicted/Non-convicted Status"
        scrollMarginTop={'200px'}
        display="flex"
        flexDirection="column"
        gap="s32"
      >
        <FormSwitchTab
          label="Declaration of convicted/Non-convicted for any crimes in Past"
          options={booleanList}
          name="declarationOfConvicted"
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
              id="convictionDetails"
              label="Please specify"
              placeholder="Enter Details"
            />
          </Box>
        </InputGroupContainer>
      </Box>
      <Box
        id="Residential permit of foreign country?"
        scrollMarginTop={'200px'}
      >
        <SwitchTabs
          label="Do you hold residential permit of foreign country?"
          options={booleanList}
          name="residentForeign"
        />
      </Box>

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
