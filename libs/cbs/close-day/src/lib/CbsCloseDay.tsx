import { Box, Container, FormFooter, FormHeader } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { DayClose } from '../component/DayClose';

/* eslint-disable-next-line */
export interface CbsCloseDayProps {}

export const CbsCloseDay = () => {
  const { t } = useTranslation();

  return (
    <>
      <Box color="red" mt="110px" bg="gray.100" width="100%" zIndex="1000">
        <Container minW="container.lg" height="fit-content" paddingInline="0">
          <FormHeader title={t['dayClose']} />
        </Container>
      </Box>
      <Container bg="white" height="fit-content" pb="90px" minW="container.lg">
        <DayClose />
      </Container>
      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.lg" height="fit-content" p="0">
            <FormFooter mainButtonLabel={t['dayCloseCloseDay']} />
          </Container>
        </Box>
      </Box>
    </>
  );
};
export default CbsCloseDay;
