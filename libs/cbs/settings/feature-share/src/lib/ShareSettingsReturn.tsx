import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, Box, SettingsFooter, Text, toast } from '@myra-ui';

import {
  ShareChargeType,
  useGetSettingsShareReturnChargesDataQuery,
  useSetSettingsShareReturnChargesMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { COASelectModal } from '@coop/shared/components';
import { FormEditableTable } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import ShareSettingsHeader from '../components/ShareSettingsHeader/ShareSettingsHeader';

type OtherChargeTable = {
  name: string;
  type: string;
  ledgerMapping: string;
  minShare: string;
  maxShare: string;
  charge: string;
};

const type = [
  {
    label: 'Fixed Amount',
    value: ShareChargeType?.FixedAmount,
  },
  {
    label: 'Percentage',
    value: ShareChargeType?.Percentage,
  },
];

export const ShareSettingsReturn = () => {
  const { t } = useTranslation();
  const methods = useForm({});

  const { reset, getValues } = methods;
  const router = useRouter();
  const { mutateAsync } = useSetSettingsShareReturnChargesMutation();
  const { data, refetch } = useGetSettingsShareReturnChargesDataQuery();
  const settingsFeesAndChargesData = data?.settings?.general?.share?.shareReturnCharges;

  useEffect(() => {
    if (settingsFeesAndChargesData) {
      reset(settingsFeesAndChargesData);
    }
  }, [settingsFeesAndChargesData]);
  const handleSubmit = () => {
    const values = getValues();

    asyncToast({
      id: 'share-settings-share-return',
      msgs: {
        success: 'Saved',
        loading: 'Saving Changes ',
      },
      onSuccess: () => router.push(ROUTES.SETTINGS_GENERAL_SHARE_RETURNS),
      promise: mutateAsync(
        {
          data: {
            ...values,
          },
        },
        { onSuccess: () => refetch() }
      ),
    });
  };
  const handleDiscard = () => {
    router.reload();
    toast({
      message: 'Changes have been discarded',
      id: 'Discard-settings-shareFees',
      type: 'info',
    });
  };

  return (
    <FormProvider {...methods}>
      <form>
        <Box p="s16" pb="80px" display="flex" flexDir="column" gap="s16">
          <Box display="flex" flexDirection="column" gap="s32">
            <ShareSettingsHeader title={t['settingsShareFeeAndCharges']} />
            <Box display="flex" flexDirection="column" gap="s48">
              <Box display="flex" flexDirection="column" gap="s10">
                <Box display="flex" flexDirection="column" gap="s4">
                  <Text fontSize="r1" fontWeight="SemiBold" color="neutralColorLight.Gray-80">
                    {t['shareOtherCharge']}
                  </Text>
                  {/* <Text fontSize="s3" fontWeight="Medium" color="neutralColorLight.Gray-60">
                    {t['shareOtherBasicCharge']}
                  </Text> */}
                </Box>
                <FormEditableTable<OtherChargeTable>
                  name="other"
                  columns={[
                    {
                      accessor: 'name',
                      header: t['shareSettingsFeesName'],
                    },
                    {
                      accessor: 'type',
                      header: t['shareSettingsFeesType'],
                      fieldType: 'select',
                      selectOptions: type,
                    },
                    {
                      accessor: 'ledgerMapping',
                      header: t['shareSettingsFeesLedgerMapping'],
                      fieldType: 'modal',
                      modal: COASelectModal,
                    },
                    {
                      accessor: 'minShare',
                      header: t['shareSettingsFeesMinQuantity'],
                      isNumeric: true,
                      fieldType: 'number',
                    },
                    {
                      accessor: 'maxShare',
                      header: t['shareSettingsFeesMaxQuantity'],
                      isNumeric: true,
                      fieldType: 'number',
                    },
                    {
                      accessor: 'charge',
                      header: t['shareSettingsFeesCharge'],
                    },
                  ]}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <SettingsFooter handleSave={handleSubmit} handleDiscard={handleDiscard} />
      </form>
    </FormProvider>
  );
};
