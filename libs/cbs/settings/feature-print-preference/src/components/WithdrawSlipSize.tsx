import { useFormContext } from 'react-hook-form';

import { Box, Grid } from '@myra-ui';

import { PrintPreferenceInput, SlipSizeStandard } from '@coop/cbs/data-access';
import { SettingsCard } from '@coop/cbs/settings/ui-components';
import { FormNumberInput, FormRadioGroup } from '@coop/shared/form';

const slipSizeOptions = [
  {
    label: 'Width: 7.5 Inch  Height: 3.5 Inch',
    value: SlipSizeStandard.Width_7Point5Height_3Point5,
  },
  {
    label: 'Width: 7 Inch  Height: 3.5 Inch',
    value: SlipSizeStandard.Width_7Height_3Point5,
  },
  {
    label: 'Width: 9 Inch  Height: 3 Inch',
    value: SlipSizeStandard.Width_9Height_3,
  },
  {
    label: 'Custom',
    value: SlipSizeStandard.Custom,
  },
];

export const WithdrawSlipSize = () => {
  const { watch } = useFormContext<PrintPreferenceInput>();

  const slipSizeStandard = watch('slipSizeStandard');

  return (
    <SettingsCard
      title="Withdraw Slip"
      subtitle="Choose any pre-defined sizes or set up a custom dimension. Sizes are given in Inch (in)."
    >
      <Box display="flex" flexDirection="column" gap="s16">
        <FormRadioGroup name="slipSizeStandard" options={slipSizeOptions} />

        {slipSizeStandard === 'CUSTOM' && (
          <Grid templateColumns="repeat(4, 1fr)" gap="s16">
            <FormNumberInput name="slipSizeCustom.height" label="Height (Inch)" />
            <FormNumberInput name="slipSizeCustom.width" label="Width (Inch)" />
          </Grid>
        )}
      </Box>
    </SettingsCard>
  );
};
