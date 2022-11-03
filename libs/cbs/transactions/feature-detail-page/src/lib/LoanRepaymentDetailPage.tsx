import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { LoanRepaymentDetails } from '../component';

export const LoanRepaymentDetailPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Box
        bg="gray.0"
        w="320px"
        position="fixed"
        h="calc(100vh - 110px)"
        borderRight="1px"
        borderRightColor="border.layout"
      >
        {/* <SideBar /> */}
      </Box>

      <Box ml="320px" p="s16" display="flex" flexDir="column" gap="s16">
        <Text color="gray.800" fontWeight="SemiBold" fontSize="r3">
          {t['transDetailOverview']}
        </Text>
        <LoanRepaymentDetails />
        {/* <OtherDetails />
        <GlTransaction /> */}
      </Box>
    </>
  );
};
