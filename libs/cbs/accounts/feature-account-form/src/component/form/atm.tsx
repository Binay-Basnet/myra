import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { SubHeadingText } from '@coop/shared/components';
import { FormSwitchTab } from '@coop/shared/form';
import { Box } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

const YesNoOptions = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
];

export const Atm = () => {
  const { t } = useTranslation();

  return (
    <GroupContainer
      scrollMarginTop={'200px'}
      display="flex"
      flexDirection={'column'}
      gap="s16"
    >
      <Box p="s16" bg="neutralColorLight.Gray-0">
        <Box
          display={'flex'}
          flexDirection="row"
          justifyContent={'space-between'}
          alignItems="center"
          pt="s16"
        >
          <SubHeadingText>{t['accountOpenATMFacility']}</SubHeadingText>
          <FormSwitchTab name="atmFacility" options={YesNoOptions} />
        </Box>

        <Box
          display={'flex'}
          flexDirection="row"
          justifyContent={'space-between'}
          alignItems="center"
          pt="s16"
        >
          <SubHeadingText>{t['accountOpenChequeIssue']}</SubHeadingText>
          <FormSwitchTab name="atmFacility" options={YesNoOptions} />
        </Box>
      </Box>
    </GroupContainer>
  );
};
