import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
  ShareTransferType,
  useGetSettingsShareTransferDataQuery,
  useSetSettingsShareTransferMutation,
} from '@coop/cbs/data-access';
import { FormCheckbox, FormSelect } from '@coop/shared/form';
import { asyncToast, Box, SettingsFooter, toast } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import ShareSettingsCard from '../components/ShareSettingsCard/ShareSettingsCard';
import ShareSettingsHeader from '../components/ShareSettingsHeader/ShareSettingsHeader';

export const ShareSettingsTransfer = () => {
  const { t } = useTranslation();
  const methods = useForm({});

  const { reset, getValues, watch } = methods;
  const router = useRouter();
  const { mutateAsync } = useSetSettingsShareTransferMutation();
  const { data, refetch } = useGetSettingsShareTransferDataQuery();
  const settingsFeesAndChargesData = data?.settings?.general?.share?.transfer;
  const typeWatch = watch('type');

  useEffect(() => {
    if (settingsFeesAndChargesData) {
      reset(settingsFeesAndChargesData);
    }
  }, [settingsFeesAndChargesData]);
  const handleSubmit = () => {
    const values = getValues();
    const typeValue = typeWatch ? ShareTransferType?.ShareRefund : null;
    asyncToast({
      id: 'share-settings-transfer-id',
      msgs: {
        success: 'Saved',
        loading: 'Saving Changes ',
      },
      onSuccess: () => router.push('/settings/general/share/transfer'),
      promise: mutateAsync(
        {
          data: {
            ...values,
            type: typeValue,
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
      id: 'Discard-settings-transfer',
      type: 'info',
    });
  };

  return (
    <FormProvider {...methods}>
      <form>
        <Box p="s16" pb="80px" display="flex" flexDir="column" gap="s16">
          <ShareSettingsHeader title={t['settingsShareTransfer']} />
          <ShareSettingsCard
            title={t['settingsShareTransfer']}
            subtitle={t['shareTransferSubtitle']}
          >
            <Box display="flex" flexDir="column" gap="s16">
              <FormCheckbox
                name="type"
                label={t['shareTransferMemberToMember']}
              />
            </Box>
          </ShareSettingsCard>

          <ShareSettingsCard
            title={t['shareFund']}
            subtitle={t['shareToAccountSubtitle']}
          >
            <Box width="33%">
              <FormSelect
                name="accountForShareFund"
                __placeholder={t['shareFundAccountName']}
              />
            </Box>
          </ShareSettingsCard>

          <ShareSettingsCard
            title={t['shareToFundLedgerMapping']}
            subtitle={t['shareToFundLedgerMappingSubtitle']}
          >
            <Box width="33%">
              <FormSelect
                name="mappedShareLedger"
                __placeholder={t['shareTransferLedgerName']}
              />
            </Box>
          </ShareSettingsCard>
        </Box>
        <SettingsFooter
          handleSave={handleSubmit}
          handleDiscard={handleDiscard}
        />
      </form>
    </FormProvider>
  );
};
