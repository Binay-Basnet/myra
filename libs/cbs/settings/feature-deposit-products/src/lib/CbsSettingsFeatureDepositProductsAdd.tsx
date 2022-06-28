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

import {
  AccountServicesCharge,
  BalanceLimit,
  Critera,
  DefaultAccountName,
  DepositFrequency,
  GridItems,
  Interest,
  MaximumTenure,
  MinimunTenure,
  PrematuredPenalty,
  Questions,
  RequiredDocumentSetup,
  TypesOfMember,
} from '../components/form';

/* eslint-disable-next-line */
export interface SettingsDepositProductsAddProps {}

const optionsSaving = [
  { label: 'Recurring Saving', value: 'recurringSaving' },
  { label: 'Mandatory', value: 'mandatory' },
  { label: 'Voluntary/Optional', value: 'voluntary' },
  { label: 'Term Saving', value: 'termSaving' },
];

export function SettingsDepositProductsAdd(
  props: SettingsDepositProductsAddProps
) {
  const router = useRouter();
  const methods = useForm({});

  const { control, handleSubmit, getValues, watch, setError } = methods;
  const depositNature = watch('nameOfDepositProduct');

  return (
    <Container height="fit-content" minW="container.lg">
      <Box position="relative" margin="0px auto">
        <Box
          position="fixed"
          margin="0px auto"
          bg="gray.100"
          minW="container.lg"
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
      <Container minW="container.lg" height="fit-content" bg="white">
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
                      {/* <FormSelect name={'duhjisdfsd'} /> */}
                    </GridItem>
                    <FormSelect
                      name={'nameOfDepositProduct'}
                      options={optionsSaving}
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
                {depositNature !== 'mandatory' && (
                  <Box display="flex" flexDirection={'column'} gap="s16">
                    <Critera watch={watch} />
                    <GridItems watch={watch} />
                  </Box>
                )}
                {depositNature !== 'voluntary' && (
                  <DepositFrequency watch={watch} />
                )}
                {depositNature !== 'voluntary' && (
                  <MinimunTenure watch={watch} />
                )}
                {depositNature !== 'voluntary' && (
                  <MaximumTenure watch={watch} />
                )}
                <BalanceLimit />
                <Interest />
                <AccountServicesCharge />
                {(depositNature === 'recurringSaving' ||
                  depositNature === 'termSaving') && <DefaultAccountName />}
                <Questions watch={watch} />
                <RequiredDocumentSetup />
                {depositNature === 'termSaving' && <PrematuredPenalty />}
              </ContainerWithDivider>
            </Box>
          </form>
        </FormProvider>
      </Container>
    </Container>
  );
}

export default SettingsDepositProductsAdd;
