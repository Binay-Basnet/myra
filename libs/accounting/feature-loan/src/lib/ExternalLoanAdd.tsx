import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiSave } from 'react-icons/bi';

import { useGetNewIdMutation } from '@coop/cbs/data-access';
import { SubHeadingText } from '@coop/shared/components';
import { FormFileInput, FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import {
  Box,
  Button,
  Container,
  FormFooter,
  FormHeader,
  FormSection,
  GridItem,
  Icon,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { AddCollateral, LoanProcessTable } from '../component';

/* eslint-disable-next-line */
export interface ExternalLoanAddProps {}

export const ExternalLoanAdd = () => {
  const { t } = useTranslation();
  const [collateralId, setCollateralId] = useState<string[]>([]);

  const yesNo = [
    { label: t['yes'], value: true },
    { label: t['no'], value: false },
  ];

  const { mutate: newIdMutate } = useGetNewIdMutation({
    onSuccess: (res) => {
      setCollateralId([...collateralId, res.newId]);
    },
  });

  const addCollateral = () => {
    newIdMutate({});
  };

  const methods = useForm();

  return (
    <>
      <Container minW="container.lg" height="fit-content" pb="60px">
        <FormHeader title="New External Loan" />

        <FormProvider {...methods}>
          <form>
            <Box bg="white" minH="calc(100vh - 220px)">
              <FormSection divider={false}>
                <GridItem colSpan={2}>
                  <FormSelect name="dueDate" label="Name of Organization" options={[]} />
                </GridItem>
                <GridItem colSpan={1}>
                  <FormSelect name="dueDate" label="Type of Loan" options={[]} />
                </GridItem>

                <FormInput name="dueDate" type="date" label="Loan Applied Date" />
                <FormInput name="dueDate" type="date" label="Loan Approved Date" />
              </FormSection>

              <FormSection divider={false}>
                <FormInput name="reference" type="text" label="Applied Amount" />
                <FormInput name="reference" type="text" label="Approved Amount" />
                <FormInput name="reference" type="text" label="Loan Number" />
              </FormSection>

              <FormSection>
                <FormInput name="reference" type="text" label="Tenure" />
                <FormInput name="reference" type="date" label="Effective Start Date" />
                <FormInput name="reference" type="date" label="Maturity Date" />
                <FormInput
                  name="reference"
                  type="number"
                  textAlign="right"
                  rightElement={
                    <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                      %
                    </Text>
                  }
                  label="Interest Rate"
                />
              </FormSection>

              <FormSection>
                <GridItem colSpan={2}>
                  <FormSwitchTab
                    name="paymentMode"
                    label="Installment Type"
                    defaultValue="cash"
                    options={[
                      { label: 'EMI', value: 'EMI' },
                      { label: 'EPI', value: 'EPI' },
                      { label: 'Flat', value: 'Flat' },
                    ]}
                  />
                </GridItem>

                <GridItem>
                  <FormSwitchTab
                    name="paymentMode"
                    label="Installment Frequency"
                    defaultValue="cash"
                    options={[
                      { label: 'Daily', value: 'Daily' },
                      { label: 'Weekly', value: 'Weekly' },
                      { label: 'Monthly', value: 'Monthly' },
                      { label: 'Yearly', value: 'Yearly' },
                    ]}
                  />
                </GridItem>
              </FormSection>

              <FormSection header="Collaterals" divider={false}>
                <GridItem
                  p="s10"
                  border="1px solid"
                  borderColor="border.layout"
                  display="flex"
                  flexDirection="column"
                  gap="s16"
                  colSpan={3}
                  borderRadius="br2"
                >
                  {collateralId.map(() => (
                    <AddCollateral />
                  ))}
                  <Button
                    alignSelf="start"
                    leftIcon={<Icon size="md" as={AiOutlinePlus} />}
                    variant="outline"
                    onClick={addCollateral}
                  >
                    Add New
                  </Button>
                </GridItem>
                <GridItem colSpan={3}>
                  <FormSelect name="dueDate" label="Fix Deposit" options={[]} />
                </GridItem>
                <GridItem colSpan={2}>
                  <FormSelect name="dueDate" label="Name of Representative" options={[]} />
                </GridItem>
                <GridItem colSpan={1}>
                  <FormInput name="reference" type="date" label="Position" />
                </GridItem>
              </FormSection>

              <FormSection>
                <GridItem colSpan={3}>
                  <LoanProcessTable />
                </GridItem>
              </FormSection>

              <FormSection>
                <GridItem colSpan={3}>
                  <Box display="flex" flexDirection="row" justifyContent="space-between">
                    <SubHeadingText>Insurance</SubHeadingText>
                    <FormSwitchTab name="wealthBuildingProduct" options={yesNo} />
                  </Box>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormInput name="reference" type="text" label="Insurance Company" />
                </GridItem>
                <GridItem colSpan={1}>
                  <FormInput
                    name="reference"
                    type="number"
                    textAlign="right"
                    label="Insurance Premium Amount"
                  />
                </GridItem>
                <GridItem colSpan={1}>
                  <FormInput name="reference" type="date" label="Start Date" />
                </GridItem>
                <GridItem colSpan={1}>
                  <FormInput name="reference" type="date" label="Valid Upto" />
                </GridItem>
              </FormSection>

              <FormSection>
                <FormSwitchTab
                  name="paymentMode"
                  label="Payment Method"
                  defaultValue="cash"
                  options={[
                    { label: 'Cash', value: 'Cash' },
                    { label: 'Bank', value: 'Bank' },
                  ]}
                />
              </FormSection>

              <FormSection header="File Uploads" templateColumns={4}>
                <GridItem colSpan={2}>
                  <FormFileInput size="lg" label="Application" name="Application" />
                </GridItem>

                <GridItem colSpan={2}>
                  <FormFileInput
                    size="lg"
                    label="Collateral Documents"
                    name="CollateralDocuments"
                  />
                </GridItem>

                <GridItem colSpan={2}>
                  <FormFileInput size="lg" label="Guarantor Documents" name="GuarantorDocuments" />
                </GridItem>

                <GridItem colSpan={2}>
                  <FormFileInput size="lg" label="BOD Details" name="BODDetails" />
                </GridItem>

                <GridItem colSpan={4}>
                  <FormFileInput size="lg" label="Guarantor Documents" name="GuarantorDocuments" />
                </GridItem>
              </FormSection>
            </Box>
          </form>
        </FormProvider>
      </Container>
      <Box bottom="0" position="fixed" width="100%" bg="gray.100">
        <Container minW="container.lg" height="fit-content">
          <FormFooter
            status={
              <Box display="flex" gap="s8">
                <Text as="i" fontSize="r1">
                  {t['formDetails']}
                </Text>
              </Box>
            }
            draftButton={
              <Button type="submit" variant="ghost" shade="neutral">
                <Icon as={BiSave} />
                <Text alignSelf="center" fontWeight="Medium" fontSize="s2" ml="5px">
                  {t['saveDraft']}
                </Text>
              </Button>
            }
            mainButtonLabel={t['save']}
          />
        </Container>
      </Box>
    </>
  );
};

export default ExternalLoanAdd;
