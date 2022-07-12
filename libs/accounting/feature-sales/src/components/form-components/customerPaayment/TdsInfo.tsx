import { useFormContext } from 'react-hook-form';

import {
  BoxContainer,
  InputGroupContainer,
} from '@coop/accounting/ui-components';
import { FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import { Box, GridItem, Text } from '@coop/shared/ui';

const booleanList = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];

export const TDS = () => {
  const { watch } = useFormContext();

  const tds = watch('tds');
  return (
    <BoxContainer>
      <Box display="flex" justifyContent="space-between">
        <Text fontSize="s3" fontWeight="500" color="gray.700">
          TDS
        </Text>

        <FormSwitchTab options={booleanList} name="tds" />
      </Box>

      {tds === 'Yes' && (
        <InputGroupContainer>
          <FormSelect
            name="tdsAccount"
            label={'TDS Account'}
            placeholder={'Select TDS Account'}
            options={[]}
          />

          <FormSelect
            name="tdsType"
            label={'TDS Type'}
            placeholder={'TDS Type'}
            options={[]}
          />

          <FormInput
            name="tdsAmount"
            type="number"
            label="TDS Amount"
            textAlign={'right'}
            placeholder="0.00"
          />
        </InputGroupContainer>
      )}
    </BoxContainer>
  );
};
