import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import { AllowChequeIssue } from 'libs/cbs/settings/feature-deposit-products/src/components/form';

import {
  asyncToast,
  Box,
  Button,
  DetailsCard,
  FormSection,
  GridItem,
  Scrollable,
  Text,
} from '@myra-ui';

import {
  useEditChequeSettingsMutation,
  useGetDepositProductSettingsEditDataQuery,
} from '@coop/cbs/data-access';
import { FormSwitchTab } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { SideBar } from '../components';

export const ChequeSettingsUpdatePage = () => {
  const { t } = useTranslation();

  const router = useRouter();
  const { id } = router.query;

  const queryClient = useQueryClient();

  const yesNo = [
    { label: t['yes'], value: true },
    { label: t['no'], value: false },
  ];

  const methods = useForm();

  const { watch, reset, getValues } = methods;

  const chequeIssue = watch('chequeIssue');

  const { data: editValues } = useGetDepositProductSettingsEditDataQuery(
    {
      id: id as string,
    },
    {
      staleTime: 0,
    }
  );

  useEffect(() => {
    if (editValues) {
      const editValueData = editValues?.settings?.general?.depositProduct?.formState?.data;

      if (editValueData) {
        reset({
          chequeIssue: editValueData?.chequeIssue,
          chequeCharge: editValueData?.chequeCharge,
        });
      }
    }
  }, [editValues, id]);

  const { mutateAsync } = useEditChequeSettingsMutation();

  const handleEdit = () => {
    const values = getValues();

    const chequeChargeList = chequeIssue
      ? values['chequeCharge']?.map(
          (data: { serviceName: string; ledgerName: string; amount: number }) => ({
            serviceName: data?.serviceName,
            ledgerName: data?.ledgerName,
            amount: data?.amount.toString(),
          })
        )
      : null;

    asyncToast({
      id: 'edit-deposit-product-cheque-settings',
      msgs: {
        loading: 'Updating cheque settings',
        success: 'Cheque settings updated',
      },
      promise: mutateAsync({
        productId: id as string,
        isChequeIssueAllowed: values['chequeIssue'],
        chequeCharge: chequeChargeList,
      }),
      onSuccess: () => queryClient.invalidateQueries(['getDepositProductSettingsEditData']),
    });
  };

  return (
    <Box display="flex">
      <Box
        bg="gray.0"
        w="320px"
        position="fixed"
        h="calc(100vh - 110px)"
        borderRight="1px"
        borderRightColor="border.layout"
      >
        <SideBar />
      </Box>
      <Scrollable detailPage>
        <Box bg="background.500" ml="320px" p="s16" display="flex" flexDir="column" gap="s16">
          <Box display="flex" justifyContent="space-between" w="100%">
            <Text fontWeight="SemiBold" fontSize="r3" color="gray.800" lineHeight="150%">
              Update Cheque Settings
            </Text>
          </Box>
        </Box>
        <Box bg="background.500" ml="320px" p="s16" minH="100vh">
          <DetailsCard hasTable>
            <FormProvider {...methods}>
              <Box display="flex" flexDirection="column" gap="s16">
                <FormSection divider={false}>
                  <GridItem colSpan={3}>
                    <Box display="flex" flexDirection="row" justifyContent="space-between">
                      <Text fontSize="s3" fontWeight="500" color="gray.700">
                        {t['depositProductChequeIssue']}
                      </Text>
                      <FormSwitchTab name="chequeIssue" options={yesNo} />
                    </Box>

                    {chequeIssue && <AllowChequeIssue />}
                  </GridItem>
                </FormSection>

                <Box display="flex" justifyContent="flex-end" width="100%" px="s16">
                  <Button onClick={handleEdit}>Save Changes</Button>
                </Box>
              </Box>
            </FormProvider>
          </DetailsCard>
        </Box>
      </Scrollable>
    </Box>
  );
};
