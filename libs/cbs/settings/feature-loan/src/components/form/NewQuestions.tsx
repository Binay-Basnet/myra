import { FormSwitchTab } from '@coop/shared/form';
import { Box, FormSection, GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { SubHeadingText } from '../formui';

export const NewQuestions = () => {
  const { t } = useTranslation();

  const yesNo = [
    { label: t['yes'], value: true },
    { label: t['no'], value: false },
  ];

  return (
    <>
      <FormSection>
        <GridItem colSpan={3}>
          <Box
            display="flex"
            flexDirection={'row'}
            justifyContent="space-between"
          >
            <SubHeadingText>{t['loanProductStaffProduct']} </SubHeadingText>
            <FormSwitchTab name="isStaffProduct" options={yesNo} />
          </Box>
        </GridItem>
      </FormSection>

      <FormSection>
        <GridItem mt="s16" colSpan={3}>
          <Box
            display="flex"
            flexDirection={'row'}
            justifyContent="space-between"
          >
            <SubHeadingText>
              {t['loanProductSupportMultipleAccount']}
            </SubHeadingText>
            <FormSwitchTab name="supportMultipleAccounts" options={yesNo} />
          </Box>
        </GridItem>
      </FormSection>

      <FormSection>
        <GridItem mt="s16" colSpan={3}>
          <Box display={'flex'} flexDirection="column" gap="s16">
            <Box
              display="flex"
              flexDirection={'row'}
              justifyContent="space-between"
            >
              <SubHeadingText>
                {t['loanProductLoanScheduleChangeOverride']}
              </SubHeadingText>
              <FormSwitchTab
                name="loanScheduleChangeOverride"
                options={yesNo}
              />
            </Box>
          </Box>
        </GridItem>
      </FormSection>
    </>
  );
};
