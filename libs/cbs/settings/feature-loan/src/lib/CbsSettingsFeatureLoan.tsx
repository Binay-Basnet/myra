import { FormProvider, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { IoCloseOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

// import debounce from 'lodash/debounce';
import {
  ContainerWithDivider,
  InputGroupContainer,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  FormInput,
  FormSelect,
  FormSwitch,
  FormSwitchTab,
} from '@coop/shared/form';
import {
  Box,
  Button,
  Container,
  FormFooter,
  GridItem,
  Icon,
  IconButton,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import {
  AccountServicesCharge,
  AmountLimit,
  Critera,
  DefaultAccountName,
  DepositFrequency,
  GridItems,
  Interest,
  LoanLimit,
  LoanRepayment,
  LoanRepaymentScheme,
  MaximumTenure,
  MinimunTenure,
  PrematuredPenalty,
  Questions,
  RequiredDocumentSetup,
  TypesOfMember,
} from '../components/form';

/* eslint-disable-next-line */
export interface loanProductsAdd {}

const optionsSaving = [
  { label: 'Recurring Saving', value: 'recurringSaving' },
  { label: 'Mandatory', value: 'mandatory' },
  { label: 'Voluntary/Optional', value: 'voluntary' },
  { label: 'Term Saving', value: 'termSaving' },
];

export function SettingsLoanForm(props: loanProductsAdd) {
  const router = useRouter();
  const { t } = useTranslation();
  const methods = useForm({
    defaultValues: {
      nameOfDepositProduct: 'recurringSaving',
      minimunTenureNumber: 0,
      maximumTenureNumber: 0,
    },
  });

  const { control, handleSubmit, getValues, watch, setError } = methods;
  const depositNature = watch('nameOfDepositProduct');

  return (
    <>
      <Container p="0" height="fit-content" minW="container.lg">
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
                Add Loan Products
              </Text>
              <IconButton
                variant={'ghost'}
                aria-label="close"
                icon={<Icon as={IoCloseOutline} size="md" />}
                onClick={() => router.back()}
              />
            </Box>
          </Box>
        </Box>
      </Container>
      <Container minW="container.lg" height="fit-content" bg="gray.0" pb="55px">
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
                    {/* <FormSelect name={'duhjisdfsd'} /> */}

                    <FormSelect
                      name={'nameOfDepositProductType'}
                      options={optionsSaving}
                      label="Product Type"
                      placeholder="Select Product Type"
                    />
                    <GridItem colSpan={2}>
                      <FormSelect
                        name={'nameOfDepositProductSubtype'}
                        options={optionsSaving}
                        label="Product Subtype"
                        placeholder="Select Product Type"
                      />
                    </GridItem>

                    <FormSelect
                      name={'nameOfDepositProduct'}
                      options={optionsSaving}
                      label="Nature of Loan Product"
                    />
                  </InputGroupContainer>
                </Box>
                <Box>
                  <Text fontWeight="500" fontSize={'r1'} color="gray.700">
                    Product Code
                  </Text>
                  <Text
                    mt="s4"
                    fontWeight="400"
                    fontSize={'s2'}
                    color="gray.700"
                  >
                    Add prefix & intial number. Eg. ASM506
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

                {/* {depositNature !== 'voluntary' && (
                  <DepositFrequency watch={watch} />
                )} */}
                <MinimunTenure />
                <MaximumTenure />
                <AmountLimit />
                <LoanRepaymentScheme />
                <LoanRepayment />
                <Interest />
                <AccountServicesCharge />
                <LoanLimit />
                {/* {(depositNature === 'recurringSaving' ||
                  depositNature === 'termSaving') && <DefaultAccountName />} */}
                <Questions watch={watch} />
                <RequiredDocumentSetup />
                {/* {depositNature !== 'termSaving' && <PrematuredPenalty />} */}
              </ContainerWithDivider>
            </Box>
          </form>
        </FormProvider>
      </Container>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.lg" height="fit-content" p="0">
            <FormFooter
              status={
                <Box display="flex" gap="s8">
                  <Text as="i" fontSize="r1">
                    {t['formDetails']}
                  </Text>
                  <Text as="i" fontSize="r1">
                    09:41 AM
                  </Text>
                </Box>
              }
              draftButton={
                <Button type="submit" variant="ghost">
                  <Icon as={BiSave} color="primary.500" />
                  <Text
                    alignSelf="center"
                    color="primary.500"
                    fontWeight="Medium"
                    fontSize="s2"
                    ml="5px"
                  >
                    {t['saveDraft']}
                  </Text>
                </Button>
              }
              mainButtonLabel={t['next']}
              mainButtonHandler={() => router.push(`/members/translation`)}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default SettingsLoanForm;
