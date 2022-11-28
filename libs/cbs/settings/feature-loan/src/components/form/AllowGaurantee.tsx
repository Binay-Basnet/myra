import { useFormContext } from 'react-hook-form';

import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, FormSection, GridItem } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

import { SubHeadingText } from '../formui';

export const AllowGaurantee = () => {
  const { watch } = useFormContext();
  const { t } = useTranslation();

  const allowGurantee = watch('allowGurantee');

  const yesNo = [
    { label: t['yes'], value: true },
    { label: t['no'], value: false },
  ];

  return (
    <FormSection>
      <GridItem mt="s16" colSpan={3}>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <SubHeadingText>{t['loanProductAllowGuarantee']}</SubHeadingText>
          <FormSwitchTab name="allowGurantee" options={yesNo} />
        </Box>
        {allowGurantee && (
          <Box w="35%">
            <FormInput name="maxPercentOfGurantee" type="text" label={t['loanProductMaxPercent']} />
          </Box>
        )}
      </GridItem>
    </FormSection>
  );
};
