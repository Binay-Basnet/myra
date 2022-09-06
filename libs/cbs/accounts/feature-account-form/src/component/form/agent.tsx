import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { Box } from '@coop/shared/ui';

import { AgentSelect } from './AgentSelect';

export const Agent = () => {
  return (
    <GroupContainer
      scrollMarginTop={'200px'}
      display="flex"
      flexDirection={'column'}
      gap="s16"
    >
      <Box bg="neutralColorLight.Gray-0">
        <Box
          display={'flex'}
          flexDirection="column"
          border="1px solid"
          borderColor={'border.layout'}
          p="s16"
          borderRadius="br2"
          background="neutralColorLight.Gray-0"
        >
          <InputGroupContainer>
            <AgentSelect name="agentId" label="Agent" />
          </InputGroupContainer>
        </Box>
      </Box>
    </GroupContainer>
  );
};
