import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { SubHeadingText } from '@coop/shared/components';
import { FormSelect } from '@coop/shared/form';
import { Box } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

const agentList = [
  { label: 'Agent', value: 'agent' },
  { label: 'Agent2', value: 'agent2' },
];

export const Agent = () => {
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
          flexDirection="column"
          border="1px solid"
          borderColor={'border.layout'}
          p="s16"
          borderRadius="br2"
          background="neutralColorLight.Gray-0"
        >
          <SubHeadingText>Agent</SubHeadingText>
          <Box w="300px">
            <FormSelect
              name="agent"
              placeholder={t['accountOpenSelectAgent']}
              options={agentList}
            />
          </Box>
        </Box>
      </Box>
    </GroupContainer>
  );
};
