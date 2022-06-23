import React from 'react';

import { Box, Checkbox, Input } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import ShareSettingsCard from '../components/ShareSettingsCard/ShareSettingsCard';
import ShareSettingsHeader from '../components/ShareSettingsHeader/ShareSettingsHeader';

export const ShareSettingsBonusPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <ShareSettingsHeader title={t['settingsShareBonus']} />

      <ShareSettingsCard
        title={t['shareBonusWhoPaysTheTax']}
        subtitle={t['shareBonusChooseWhoPaysTheTax']}
      >
        <Box display="flex" flexDir="column" gap="s16">
          <Checkbox label={t['shareBonusCooperative']} isChecked />
          <Checkbox label={t['shareBonusMember']} />
        </Box>
      </ShareSettingsCard>

      <ShareSettingsCard
        title={t['shareBonusTaxRate']}
        subtitle={t['shareBonusAddRateOfTax']}
      >
        <Box w="33%">
          <Input
            size="sm"
            placeholder={t['shareBonusRateTaxRatePlaceholder']}
          />
        </Box>
      </ShareSettingsCard>

      <ShareSettingsCard
        title={t['shareAccountMapping']}
        subtitle={t['shareAccountBonusShareDebited']}
      >
        <Box w="33%">
          <Input size="sm" placeholder={t['shareAccountName']} />
        </Box>
      </ShareSettingsCard>
    </>
  );
};
