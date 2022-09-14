import { FormSwitchTab } from '@coop/shared/form';
import { Box, FormSection, GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, SubHeadingText } from '../formui';

export const PartialPayment = () => {
  const { t } = useTranslation();

  const YesNoOptions = [
    { label: t['yes'], value: true },
    { label: t['no'], value: false },
  ];

  return (
    <FormSection>
      <GridItem colSpan={3}>
        <BoxContainer>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            pt="s16"
          >
            <SubHeadingText>{t['loanProductAllowPartialInstallment']}</SubHeadingText>
            <FormSwitchTab name="allowPartialInstallment" options={YesNoOptions} />
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            pt="s16"
          >
            <SubHeadingText>{t['loanProductIsMonthlyInterestCompulsory']}</SubHeadingText>
            <FormSwitchTab name="isMonthlyInstallmentCompulsory" options={YesNoOptions} />
          </Box>
        </BoxContainer>
      </GridItem>
    </FormSection>
  );
};
