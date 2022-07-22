import { FormProvider, useForm } from 'react-hook-form';

import { FormEditableTable } from '@coop/shared/form';
import { Box, Text, TextFields } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import ShareSettingsCard from '../components/ShareSettingsCard/ShareSettingsCard';
import ShareSettingsHeader from '../components/ShareSettingsHeader/ShareSettingsHeader';

type ShareChargeTable = {
  type: string;
  minShareQuantity: string;
  maxShareQuantity: string;
  charge: number;
};

type OtherChargeTable = {
  name: string;
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
  const methods = useForm({});
  return (
    <FormProvider {...methods}>
      <form>
        <Box display="flex" flexDirection="column" gap="s32">
          <ShareSettingsHeader title={t['settingsShareFeeAndCharges']} />
          <Box display="flex" flexDirection="column" gap="s48">
            <Box display="flex" flexDirection="column" gap="s10">
              <Box display="flex" flexDirection="column" gap="s4">
                <Text
                  fontSize="r1"
                  fontWeight="SemiBold"
                  color="neutralColorLight.Gray-80"
                >
                  {t['shareCertificateCharge']}
                </Text>
                <Text
                  fontSize="s3"
                  fontWeight="Medium"
                  color="neutralColorLight.Gray-60"
                >
                  {t['shareCertificateChargeSubtitle']}
                </Text>
              </Box>
              <FormEditableTable<ShareChargeTable>
                name="data"
                columns={[
                  {
                    accessor: 'type',
                    header: t['shareSettingsFeesType'],
                    fieldType: 'select',
                    selectOptions: type,
                  },
                  {
                    accessor: 'minShareQuantity',
                    header: t['shareSettingsFeesMinQuantity'],
                  },
                  {
                    accessor: 'maxShareQuantity',
                    header: t['shareSettingsFeesMaxQuantity'],
                  },
                  {
                    accessor: 'charge',
                    header: t['shareSettingsFeesCharge'],
                    isNumeric: true,
                  },
                ]}
              />
            </Box>

            <Box display="flex" flexDirection="column" gap="s10">
              <Box display="flex" flexDirection="column" gap="s4">
                <Text
                  fontSize="r1"
                  fontWeight="SemiBold"
                  color="neutralColorLight.Gray-80"
                >
                  {t['shareOtherCharge']}
                </Text>
                <Text
                  fontSize="s3"
                  fontWeight="Medium"
                  color="neutralColorLight.Gray-60"
                >
                  {t['shareOtherBasicCharge']}
                </Text>
              </Box>
              <FormEditableTable<OtherChargeTable>
                name="data"
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
                    accessor: 'minShareQuantity',
                    header: t['shareSettingsFeesMinQuantity'],
                  },
                  {
                    accessor: 'maxShareQuantity',
                    header: t['shareSettingsFeesMaxQuantity'],
                  },
                  {
                    accessor: 'charge',
                    header: t['shareSettingsFeesCharge'],
                    isNumeric: true,
                  },
                ]}
              />
            </Box>
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
};
