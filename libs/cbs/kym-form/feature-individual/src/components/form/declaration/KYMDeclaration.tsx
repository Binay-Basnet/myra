import React, { useState } from 'react';
import { Control } from 'react-hook-form';

import {
  ContainerWithDivider,
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect, FormTextArea } from '@coop/shared/form';
import {
  Box,
  Checkbox,
  Grid,
  GridItem,
  RadioGroup,
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
    key: 'yes',
    value: 'Yes',
    label: 'Yes',
  },
  {
    key: 'no',
    value: 'No',
    label: 'No',
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
        <TextFields variant="bodyRegular" fontWeight={600}>
          Nominee
        </TextFields>
        <ContainerWithDivider>
          <Box
            id="Beneficial Owner"
            scrollMarginTop={'200px'}
            display="flex"
            flexDirection="column"
            gap="s32"
          >
            <SwitchTabs
              label="Do you have a beneficial owner?"
              list={booleanList}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              id="beneficialOwner"
            />
            <Grid
              gap={2}
              templateColumns="repeat(3,1fr)"
              alignItems="last baseline"
            >
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
          </Box>

          <Box
            id="Family members in politics"
            scrollMarginTop={'200px'}
            display="flex"
            flexDirection="column"
            gap="s32"
          >
            <SwitchTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              label="Are you or any of your family politically exposed person?"
              list={booleanList}
              id="politicallyExposedPerson"
            />

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
            id="Convicted/Non-convicted Status"
            scrollMarginTop={'200px'}
            display="flex"
            flexDirection="column"
            gap="s32"
          >
            <SwitchTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              label="Declaration of convicted/Non-convicted for any crimes in Past"
              list={booleanList}
              id="declarationOfConvicted"
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
            display="flex"
            flexDirection="column"
            gap="s32"
          >
            <SwitchTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              label="Do you hold residential permit of foreign country?"
              list={booleanList}
              id="residentForeign"
            />

            <Box display="flex" flexDirection="column">
              <Text fontSize="s3" mb="s16">
                Specify following details
              </Text>
              <RadioGroup radioList={details} labelFontSize="s3" />
            </Box>
          </Box>
        </ContainerWithDivider>
      </Box>

      {/* <FormRadioGroup
        control={control}
        name={'hasBeneficialOwner'}
        radioList={['Yes', 'No']}
        label="Do you have a beneficial owner?"
      /> */}
    </GroupContainer>
  );
};
