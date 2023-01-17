import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, Box, SettingsFooter, Text, toast } from '@myra-ui';

import {
  ShareChargeType,
  ShareIssueChargesInput,
  useGetSettingsShareIssueChargesDataQuery,
  useSetSettingsShareIssueChargesMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { COASelectModal } from '@coop/shared/components';
import { FormEditableTable } from '@coop/shared/form';
import { featureCode, useTranslation } from '@coop/shared/utils';

import ShareSettingsHeader from '../components/ShareSettingsHeader/ShareSettingsHeader';

type ShareChargeTable = {
  type: string;
  ledgerMapping: string;
  minShare: string;
  maxShare: string;
  charge: string;
};

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

export const ShareSettingsFeeAndCharges = () => {
  const { t } = useTranslation();
  const methods = useForm<ShareIssueChargesInput>({});

  const { reset, getValues } = methods;
  const router = useRouter();
  const { mutateAsync } = useSetSettingsShareIssueChargesMutation();
  const { data, refetch } = useGetSettingsShareIssueChargesDataQuery();
  const settingsFeesAndChargesData = data?.settings?.general?.share?.shareIssueCharges;

  useEffect(() => {
    if (settingsFeesAndChargesData) {
      reset(settingsFeesAndChargesData);
    }
  }, [settingsFeesAndChargesData]);
  const handleSubmit = () => {
    const values = getValues();
    const shareCertificate = values?.shareCertificate?.map((s) => ({
      ...s,
      charge: String(s?.charge),
    }));
    const other = values?.other?.map((s) => ({ ...s, charge: String(s?.charge) }));

    asyncToast({
      id: 'share-settings-fees-id',
      msgs: {
        success: 'Saved',
        loading: 'Saving Changes ',
      },
      onSuccess: () => router.push(ROUTES.SETTINGS_GENERAL_SHARE_ISSUES),
      promise: mutateAsync(
        {
          data: {
            other,
            shareCertificate,
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
            <ShareSettingsHeader
              title={`${t['settingsShareFeeAndCharges']} -  ${featureCode.shareIssueSetting}`}
            />
            <Box display="flex" flexDirection="column" gap="s48">
              <Box display="flex" flexDirection="column" gap="s10">
                <Box display="flex" flexDirection="column" gap="s4">
                  <Text fontSize="r1" fontWeight="SemiBold" color="neutralColorLight.Gray-80">
                    {t['shareCertificateCharge']}
                  </Text>
                  {/* <Text fontSize="s3" fontWeight="Medium" color="neutralColorLight.Gray-60">
                    {t['shareCertificateChargeSubtitle']}
                  </Text> */}
                </Box>
                <FormEditableTable<ShareChargeTable>
                  name="shareCertificate"
                  columns={[
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
                      isNumeric: true,
                      header: t['shareSettingsFeesCharge'],
                    },
                  ]}
                />
              </Box>

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
                      isNumeric: true,
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
