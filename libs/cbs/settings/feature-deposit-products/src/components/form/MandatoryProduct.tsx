import { useRouter } from 'next/router';

import { Box, FormSection, GridItem } from '@myra-ui';

import { FormSwitchTab } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { SubHeadingText } from '../formui';

export const MandatoryProduct = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const yesNo = [
    { label: t['yes'], value: true, isDisabled: router?.asPath?.includes('/edit') },
    { label: t['no'], value: false, isDisabled: router?.asPath?.includes('/edit') },
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
