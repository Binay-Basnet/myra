import { GroupContainer, InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormBranchSelect } from '@coop/shared/form';
import { Box } from '@myra-ui';

export const Agent = () => (
  <GroupContainer scrollMarginTop="200px" display="flex" flexDirection="column" gap="s16">
    <Box bg="neutralColorLight.Gray-0">
      <Box
        display="flex"
        flexDirection="column"
        border="1px solid"
        borderColor="border.layout"
        p="s16"
        borderRadius="br2"
        background="neutralColorLight.Gray-0"
      >
        <InputGroupContainer>
          <FormBranchSelect name="agentId" label="Market Representative" />
        </InputGroupContainer>
      </Box>
    </Box>
  </GroupContainer>
);
