import { FormSwitchTab } from '@coop/shared/form';
import { Box, FormSection, GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { SubHeadingText } from '../formui';

export const MandatoryProduct = () => {
  const { t } = useTranslation();

  const yesNo = [
    { label: t['yes'], value: true },
    { label: t['no'], value: false },
  ];

  return (
    <FormSection>
      <GridItem colSpan={3}>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <SubHeadingText>{t['depositProductMandatoryProduct']} </SubHeadingText>
          <FormSwitchTab name="isMandatorySaving" options={yesNo} />
        </Box>
      </GridItem>
    </FormSection>
  );
};
