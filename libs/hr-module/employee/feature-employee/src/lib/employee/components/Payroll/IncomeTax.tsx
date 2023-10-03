import { Box, Divider, Text } from '@myra-ui';

import CumulativeAndMonthToMonthDeduction from './income-tax-components/CumulativeAndMonthToMonthDeduction';
import GrossEarnings from './income-tax-components/GrossEarnings';
import PostTaxDeductions from './income-tax-components/PostTaxDeduction';
import PreTaxDeductions from './income-tax-components/PreTaxDeduction';
import TaxSlab from './income-tax-components/TaxSlab';

export const IncomeTax = () => (
  <Box p="s16">
    <Box p="s16" bg="Background" borderRadius={5}>
      {' '}
      <Text fontSize="r3" fontWeight="medium" color="gray.600" mb="s28">
        Income Tax Calculation
      </Text>
      <GrossEarnings />
      <Divider my="s16" />
      <PreTaxDeductions />
      <Divider my="s16" />
      <TaxSlab />
      <Divider my="s16" />
      <PostTaxDeductions />
      <Divider my="s16" />
      <CumulativeAndMonthToMonthDeduction />
    </Box>
  </Box>
);

export default IncomeTax;
