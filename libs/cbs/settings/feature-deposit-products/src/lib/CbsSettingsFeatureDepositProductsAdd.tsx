import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';
import { useRouter } from 'next/router';

// import debounce from 'lodash/debounce';
import {
  ContainerWithDivider,
  InputGroupContainer,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  FormCheckboxGroup,
  FormInput,
  FormSelect,
  FormSwitch,
  FormSwitchTab,
} from '@coop/shared/form';
import {
  Box,
  Container,
  Grid,
  GridItem,
  IconButton,
  Text,
} from '@coop/shared/ui';

import { Critera, GridItems, TypesOfMember } from '../components/form';

/* eslint-disable-next-line */
export interface SettingsDepositProductsAddProps {}

const options = [
  { label: 'fixed', value: 'fixed' },
  { label: 'current', value: 'current' },
];
const checkboxlist = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'Female' },
  { label: 'Other', value: 'other' },
];

const DepositFrequencyOptions = [
  {
    label: 'Daily',
    value: 'Daily',
  },
  {
    label: 'Weekly',
    value: 'Weekly',
  },
  {
    label: 'Monthly',
    value: 'Monthly',
  },
  {
    label: 'Yearly',
    value: 'Yearly',
  },
];
const Days = [
  {
    label: 'Sunday',
    value: 'Sunday',
  },
  {
    label: 'Monday',
    value: 'Monday',
  },
  {
    label: 'Tuesday',
    value: 'Tuesday',
  },
  {
    label: 'Wednesday',
    value: 'Wednesday',
  },
  {
    label: 'Thrusday',
    value: 'Thrusday',
  },
  {
    label: 'Friday',
    value: 'Friday',
  },
];
const anyDay = [{ label: 'Any Day', value: 'anyDay' }];
const daysforMonth = [
  { label: 'Day', value: 'day' },
  { label: 'Day of the Week', value: 'dayOfWeek' },
];

export function SettingsDepositProductsAdd(
  props: SettingsDepositProductsAddProps
) {
  const router = useRouter();
  const methods = useForm({});

  const { control, handleSubmit, getValues, watch, setError } = methods;

  return (
    <Container height="fit-content" minW="container.xl">
      <Box position="relative" margin="0px auto">
        <Box
          position="fixed"
          margin="0px auto"
          bg="gray.100"
          minW="container.xl"
          zIndex="10"
        >
          <Box
            height="50px"
            display="flex"
            justifyContent="space-between"
            alignItems={'center'}
            px="5"
            background="white"
            borderBottom="1px solid #E6E6E6"
          >
            <Text fontSize="r2" fontWeight="SemiBold">
              Add Deposit Products
            </Text>
            <IconButton
              variant={'ghost'}
              aria-label="close"
              icon={<GrClose />}
              onClick={() => router.back()}
            />
          </Box>
        </Box>
      </Box>
      <Container minW="container.xl" height="fit-content" bg="white">
        <FormProvider {...methods}>
          <form>
            {/* main */}
            <Box px="s20" py="s24">
              <ContainerWithDivider>
                <Box background="white" mt="50px">
                  <InputGroupContainer>
                    <GridItem colSpan={2}>
                      <FormInput
                        name="productName"
                        label="Product Name"
                        placeholder="Enter Product Name"
                      />
                    </GridItem>
                    <FormSelect
                      name={'nameOfDepositProduct'}
                      options={options}
                      label="Nature of Deposit Product"
                    />
                  </InputGroupContainer>
                </Box>
                <Box>
                  <Text fontWeight="500" fontSize={'r1'} color="gray.700">
                    Product Code
                  </Text>
                  <InputGroupContainer mt="s16">
                    <FormInput
                      label="Prefix"
                      placeholder="Enter Prefix"
                      name="prefix"
                    />
                    <FormInput
                      label="Intitial Number"
                      placeholder="Intitial Number"
                      name="initialNumber"
                    />
                    <Box></Box>
                    <FormSwitch
                      name="resetSwitch"
                      label="Reset every fiscal year"
                    />
                  </InputGroupContainer>
                </Box>
                <TypesOfMember watch={watch} />
                <Box display="flex" flexDirection={'column'} gap="s16">
                  <Critera watch={watch} />
                  <GridItems watch={watch} />
                </Box>
              </ContainerWithDivider>
            </Box>
          </form>
        </FormProvider>
      </Container>
    </Container>
  );
}

export default SettingsDepositProductsAdd;
