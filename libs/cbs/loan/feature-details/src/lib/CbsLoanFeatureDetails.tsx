import { Box } from '@coop/shared/ui';

import {
  LoanAdditional,
  LoanCollateralDetails,
  LoanCriteria,
  LoanDetails,
  LoanDetailsSidebar,
  LoanGeneralInformation,
  LoanPaymentSchedule,
} from '../components';

export const CBSLoanDetails = () => (
  <>
    <Box
      w="320px"
      position="fixed"
      h="calc(100vh - 110px)"
      borderRight="1px"
      borderRightColor="border.layout"
    >
      <LoanDetailsSidebar />
    </Box>

    <Box ml="320px" bg="white" p="s16" display="flex" flexDir="column" gap="s16">
      <LoanGeneralInformation />
      <LoanDetails />
      <LoanCollateralDetails />
      <LoanPaymentSchedule />
      <LoanCriteria />
      <LoanAdditional />
    </Box>
  </>
);

export default CBSLoanDetails;
