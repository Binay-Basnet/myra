import React from 'react';

import { Box, Grid, GridItem, Input } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import ShareSettingsCard from '../components/ShareSettingsCard/ShareSettingsCard';
import ShareSettingsHeader from '../components/ShareSettingsHeader/ShareSettingsHeader';

export const ShareSettingsFeeAndCharges = () => {
  const { t } = useTranslation();
  return (
    <>
      <ShareSettingsHeader title={t['settingsShareFeeAndCharges']} />
      <ShareSettingsCard
        title={t['shareCertificateCharge']}
        subtitle={t['shareCertificateChargeSubtitle']}
      >
        <Box display="flex" flexDir="column" gap="s16">
          <Grid gap="s16" templateColumns="repeat(3, 1fr)">
            <GridItem>
              <Input placeholder="1000" label={t['shareMinShareQuantity']} />
            </GridItem>
            <GridItem>
              <Input placeholder="1000" label={t['shareMaxShareQuantity']} />
            </GridItem>
            <GridItem>
              <Input placeholder="1000" label={t['shareType']} />
            </GridItem>
            <GridItem>
              <Input placeholder="1000" label={t['shareCharge']} />
            </GridItem>
          </Grid>

          <Grid gap="s16" templateColumns="repeat(3, 1fr)">
            <GridItem>
              <Input placeholder="1000" label={t['shareMinShareQuantity']} />
            </GridItem>
            <GridItem>
              <Input placeholder="1000" label={t['shareMaxShareQuantity']} />
            </GridItem>
            <GridItem>
              <Input placeholder="1000" label={t['shareType']} />
            </GridItem>
            <GridItem>
              <Input placeholder="1000" label={t['shareCharge']} />
            </GridItem>
          </Grid>

          <Grid gap="s16" templateColumns="repeat(3, 1fr)">
            <GridItem>
              <Input placeholder="1000" label={t['shareMinShareQuantity']} />
            </GridItem>
            <GridItem>
              <Input placeholder="1000" label={t['shareMaxShareQuantity']} />
            </GridItem>
            <GridItem>
              <Input placeholder="1000" label={t['shareType']} />
            </GridItem>
            <GridItem>
              <Input placeholder="1000" label={t['shareCharge']} />
            </GridItem>
          </Grid>
        </Box>
      </ShareSettingsCard>
      <ShareSettingsCard
        title={t['shareCertificateCharge']}
        subtitle={t['shareCertificateChargeSubtitle']}
      >
        <Box display="flex" flexDir="column" gap="s16">
          <Grid gap="s16" templateColumns="repeat(3, 1fr)">
            <GridItem>
              <Input placeholder="1000" label={t['shareMinShareQuantity']} />
            </GridItem>
            <GridItem>
              <Input placeholder="1000" label={t['shareMaxShareQuantity']} />
            </GridItem>
            <GridItem>
              <Input placeholder="1000" label={t['shareType']} />
            </GridItem>
            <GridItem>
              <Input placeholder="1000" label={t['shareCharge']} />
            </GridItem>
          </Grid>

          <Grid gap="s16" templateColumns="repeat(3, 1fr)">
            <GridItem>
              <Input placeholder="1000" label={t['shareMinShareQuantity']} />
            </GridItem>
            <GridItem>
              <Input placeholder="1000" label={t['shareMaxShareQuantity']} />
            </GridItem>
            <GridItem>
              <Input placeholder="1000" label={t['shareType']} />
            </GridItem>
            <GridItem>
              <Input placeholder="1000" label={t['shareCharge']} />
            </GridItem>
          </Grid>

          <Grid gap="s16" templateColumns="repeat(3, 1fr)">
            <GridItem>
              <Input placeholder="1000" label={t['shareMinShareQuantity']} />
            </GridItem>
            <GridItem>
              <Input placeholder="1000" label={t['shareMaxShareQuantity']} />
            </GridItem>
            <GridItem>
              <Input placeholder="1000" label={t['shareType']} />
            </GridItem>
            <GridItem>
              <Input placeholder="1000" label={t['shareCharge']} />
            </GridItem>
          </Grid>
        </Box>
      </ShareSettingsCard>
    </>
  );
};
