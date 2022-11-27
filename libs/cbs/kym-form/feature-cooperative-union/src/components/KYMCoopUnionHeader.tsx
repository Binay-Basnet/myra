import { Box, Container, FormHeader } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

export const KYMCoopUnionHeader = () => {
  const { t } = useTranslation();

  return (
    <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
      <Container minW="container.xl" height="fit-content">
        <FormHeader title={t['membersFormAddNewMembers']} closeLink="/members/list" />
      </Container>
    </Box>
  );
};
