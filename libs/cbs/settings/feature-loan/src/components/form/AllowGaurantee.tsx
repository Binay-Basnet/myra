import { useFormContext } from 'react-hook-form';

import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, FormSection, GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { SubHeadingText } from '../formui';

export const AllowGaurantee = () => {
  const { watch } = useFormContext();
  const { t } = useTranslation();

  const allowGuarantee = watch('allowGuarantee');

  const yesNo = [
    { label: t['yes'], value: true },
    { label: t['no'], value: false },
  ];

  return (
    <FormSection>
      <GridItem mt="s16" colSpan={3}>
        <Box
          display="flex"
          flexDirection={'row'}
          justifyContent="space-between"
        >
          <SubHeadingText>{t['loanProductAllowGuarantee']}</SubHeadingText>
          <FormSwitchTab name="allowGuarantee" options={yesNo} />
        </Box>
        {allowGuarantee && (
          <Box w="35%">
            <FormInput
              name="max"
              type="text"
              label={t['loanProductMaxPercent']}
            />
          </Box>
        )}
      </GridItem>
    </FormSection>
  );
};
