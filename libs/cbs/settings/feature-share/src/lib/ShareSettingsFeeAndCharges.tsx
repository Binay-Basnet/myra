import { FormEditableTable } from '@coop/shared/form';
import { Box, Grid, GridItem, Input } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import ShareSettingsCard from '../components/ShareSettingsCard/ShareSettingsCard';
import ShareSettingsHeader from '../components/ShareSettingsHeader/ShareSettingsHeader';

type ShareChargeTable = {
  type: string;
  minShareQuantity: string;
  maxShareQuantity: string;
  charge: number;
};

const type = [
  {
    label: 'Fixed Amount',
    value: 'fixedAmount',
  },
  {
    label: 'Share Amount',
    value: 'shareAmount',
  },
];

export const ShareSettingsFeeAndCharges = () => {
  const { t } = useTranslation();
  return (
    <>
      <ShareSettingsHeader title={t['settingsShareFeeAndCharges']} />
      <ShareSettingsCard
        title={t['shareCertificateCharge']}
        subtitle={t['shareCertificateChargeSubtitle']}
      >
        <Box>
          {/* <FormEditableTable<ShareChargeTable>
            name="data"
            columns={[
              {
                accessor: 'type',
                header: 'Type',
                fieldType: 'select',
                selectOptions: type,
              },
              {
                accessor: 'minShareQuantity',
                header: 'Minimum Share Quantity',
              },
              {
                accessor: 'maxShareQuantity',
                header: 'Maximum Share Quantity',
              },
              {
                accessor: 'charge',
                header: 'Charge',
                isNumeric: true,
              },
            ]}
          /> */}
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
