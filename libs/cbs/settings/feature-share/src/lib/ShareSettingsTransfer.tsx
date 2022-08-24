import React from 'react';

import { Box, Checkbox, Select, SettingsFooter } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import ShareSettingsCard from '../components/ShareSettingsCard/ShareSettingsCard';
import ShareSettingsHeader from '../components/ShareSettingsHeader/ShareSettingsHeader';

export const ShareSettingsTransfer = () => {
  const { t } = useTranslation();

  return (
    <>
      <Box p="s16" pb="80px" display="flex" flexDir="column" gap="s16">
        <ShareSettingsHeader title={t['settingsShareTransfer']} />
        <ShareSettingsCard
          title={t['settingsShareTransfer']}
          subtitle={t['shareTransferSubtitle']}
        >
          <Box display="flex" flexDir="column" gap="s16">
            <Checkbox label={t['shareTransferMemberToMember']} />
            <Checkbox label={t['shareTransferShareRefund']} />
          </Box>
        </ShareSettingsCard>

        <ShareSettingsCard
          title={t['shareFund']}
          subtitle={t['shareToAccountSubtitle']}
        >
          <Box width="33%">
            <Select options={[]} placeholder={t['shareFundAccountName']} />
          </Box>
        </ShareSettingsCard>

        <ShareSettingsCard
          title={t['shareToFundLedgerMapping']}
          subtitle={t['shareToFundLedgerMappingSubtitle']}
        >
          <Box width="33%">
            <Select options={[]} placeholder={t['shareTransferLedgerName']} />
          </Box>
        </ShareSettingsCard>
      </Box>
      <SettingsFooter />
    </>
  );
};
