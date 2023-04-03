import { FormProvider, useForm } from 'react-hook-form';

import { Box, Container, FormFooter, FormHeader, GridItem, Text } from '@myra-ui';

import { DividerContainer } from '@coop/accounting/ui-components';
import { FieldCardComponents } from '@coop/shared/components';
import { FormNumberInput, FormTextArea } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { PurchaseDetails, PurchaseTable, TDS } from '../components';

/* eslint-disable-next-line */
export interface AccountingFeaturePurchaseAddProps {}

export const AccountingFeaturePurchaseAdd = () => {
  const { t } = useTranslation();

  const methods = useForm({
    defaultValues: {
      data: [
        {
          product_id: 'm003',
          quantity: 45,
          rate: 45,
          tax: 45,
          amount: 23,
        },
        {
          product_id: 'm004',
          quantity: 2,
          rate: 4,
          tax: 4,
          amount: 34212,
        },
      ],
      addToInventory: '',
    },
  });

  return (
    <>
      {' '}
      <Container minW="container.lg" height="fit-content" bg="gray.0">
        <Box margin="0px auto" width="100%" zIndex="10">
          <Box position="sticky" top="0" bg="gray.100" width="100%" zIndex="10">
            <FormHeader title="New Purchase Entry" />
          </Box>
          <Box minH="calc(100vh - 230px)" bg="white" p="s20">
            <FormProvider {...methods}>
              <form>
                <DividerContainer>
                  <PurchaseDetails />
                  {/* <AddToInventory /> */}

                  <PurchaseTable />

                  <Box display="grid" gap="s32" gridTemplateColumns="repeat(2,1fr)">
                    <FormTextArea
                      name="note"
                      label={t['accountingPurchaseAddNotes']}
                      __placeholder={t['accountingPurchaseAddNote']}
                      rows={5}
                    />
                    <FieldCardComponents rows="repeat(5,1fr)">
                      <GridItem display="flex" justifyContent="space-between">
                        <Text color="neutralColorLight.Gray-60" fontWeight="Medium" fontSize="s3">
                          {t['accountingPurchaseAddSubTotal']}
                        </Text>

                        <Text color="neutralColorLight.Gray-50" fontWeight="Medium" fontSize="r1">
                          2,000.00
                        </Text>
                      </GridItem>

                      <GridItem display="flex" justifyContent="space-between">
                        <Text color="neutralColorLight.Gray-60" fontWeight="Medium" fontSize="s3">
                          {t['accountingPurchaseAddDiscount']}
                        </Text>

                        <Box width="200px">
                          <FormNumberInput
                            width="100%"
                            name="adminFee"
                            label=""
                            textAlign="right"
                            bg="gray.0"
                          />
                        </Box>
                      </GridItem>

                      <GridItem display="flex" justifyContent="space-between">
                        <Text color="neutralColorLight.Gray-60" fontWeight="Medium" fontSize="s3">
                          {t['accountingPurchaseAddTaxableTotal']}
                        </Text>
                        <Text color="neutralColorLight.Gray-50" fontWeight="Medium" fontSize="r1">
                          5,000.00
                        </Text>
                      </GridItem>

                      <GridItem display="flex" justifyContent="space-between">
                        <Text color="neutralColorLight.Gray-60" fontWeight="Medium" fontSize="s3">
                          {t['accountingPurchaseAddVAT']}
                        </Text>

                        <Text color="neutralColorLight.Gray-50" fontWeight="Medium" fontSize="r1">
                          2000
                        </Text>
                      </GridItem>

                      <GridItem display="flex" justifyContent="space-between">
                        <Text color="neutralColorLight.Gray-80" fontWeight="500" fontSize="s3">
                          {t['accountingPurchaseAddGrandTotal']}
                        </Text>

                        <Text color="neutralColorLight.Gray-70" fontWeight="Medium" fontSize="r1">
                          12,000
                        </Text>
                      </GridItem>
                    </FieldCardComponents>
                  </Box>
                  <TDS />
                </DividerContainer>
              </form>
            </FormProvider>
          </Box>
        </Box>

        <Box position="sticky" bottom={0}>
          <Box>
            {' '}
            <FormFooter mainButtonLabel={t['submit']} />{' '}
          </Box>
        </Box>
      </Container>
    </>
  );
};
