import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, Box, Container, FormFooter, FormHeader, GridItem, Text } from '@myra-ui';

import { useSetPurchaseEntryMutation } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FieldCardComponents } from '@coop/shared/components';
import { FormNumberInput, FormTextArea } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { PurchaseDetails, PurchaseTable } from '../components';

/* eslint-disable-next-line */
export interface AccountingFeaturePurchaseAddProps {}

export const AccountingFeaturePurchaseAdd = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { mutateAsync: AddItems } = useSetPurchaseEntryMutation();
  const handleSave = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'account-open-add-minor',
      promise: AddItems({
        data: {
          ...values,
        },
      }),
      msgs: {
        loading: 'Adding New Purchase',
        success: 'New Purchase Added',
      },
      onSuccess: () => {
        router.push(ROUTES.INVENTORY_ITEMS);
        // router.push('/accounting/investment/investment-transaction/list');
      },
    });
  };

  const methods = useForm();

  return (
    <>
      {' '}
      <Container minW="container.lg" height="fit-content" bg="gray.0">
        <Box margin="0px auto" width="100%" zIndex="10">
          <Box position="sticky" top="0" bg="gray.100" width="100%" zIndex="10">
            <FormHeader title="New Purchase Entry" />
          </Box>
          <Box minH="calc(100vh - 230px)">
            <FormProvider {...methods}>
              <form>
                <PurchaseDetails />
                {/* <AddToInventory /> */}

                <PurchaseTable />
                <Box pt="s16" px="s16">
                  <Box display="grid" gap="s32" gridTemplateColumns="repeat(2,1fr)">
                    <FormTextArea
                      name="notes"
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
                            name="discount"
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
                </Box>
                {/* <TDS /> */}
              </form>
            </FormProvider>
          </Box>
        </Box>

        <Box position="sticky" bottom={0}>
          <Box>
            {' '}
            <FormFooter mainButtonLabel={t['submit']} mainButtonHandler={handleSave} />{' '}
          </Box>
        </Box>
      </Container>
    </>
  );
};
