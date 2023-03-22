import { Box, Scrollable } from '@myra-ui';

import {
  LoanAdditional,
  LoanCollateralDetails,
  LoanCriteria,
  LoanDetails,
  LoanDetailsSidebar,
  LoanGeneralInformation,
  LoanPaymentSchedule,
  LoanStatistics,
} from '../components';

interface CBSLoanDetailsProps {
  showStats?: boolean;
}

export const CBSLoanDetails = ({ showStats = true }: CBSLoanDetailsProps) => (
  <Box display="flex">
    <Box
      w="320px"
      position="fixed"
      h="calc(100vh - 110px)"
      borderRight="1px"
      borderRightColor="border.layout"
    >
      <LoanDetailsSidebar />
    </Box>
    <Scrollable detailPage>
      {' '}
      <Box ml="320px" bg="background.500" p="s16" display="flex" flexDir="column" gap="s16">
        <LoanGeneralInformation />
        <LoanDetails />
        {showStats && <LoanStatistics />}
        <LoanCollateralDetails />
        <LoanPaymentSchedule />
        <LoanCriteria />
        <LoanAdditional />
      </Box>
    </Scrollable>
  </Box>
);

export default CBSLoanDetails;
