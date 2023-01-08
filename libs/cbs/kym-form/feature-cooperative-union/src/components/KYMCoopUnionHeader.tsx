import { Box, Container, FormHeader } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';
import { useTranslation } from '@coop/shared/utils';

export const KYMCoopUnionHeader = () => {
  const { t } = useTranslation();

  return (
    <Box position="sticky" top="0" bg="gray.100" width="100%" zIndex="10">
      <Container minW="container.xl" height="fit-content">
        <FormHeader title={t['membersFormAddNewMembers']} closeLink={ROUTES.CBS_MEMBER_LIST} />
      </Container>
    </Box>
  );
};
