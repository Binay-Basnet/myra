import { Box, DetailsCard } from '@myra-ui';

import {
  AlertEnable,
  Overview,
  ProductDescription,
  ProductDocuments,
  ProductFeatures,
  ProductGeneralInformation,
  ProductInsurance,
  ProductLimits,
  ProductLoanProcessingCharge,
  ProductLoanRepayment,
  ProductPenalty,
  ProductPrematurePenalty,
  ProductRebate,
  SideBar,
} from '../components';
import { ProductInterestRate } from '../components/ProductInterestRate';
import { ProductTenure } from '../components/ProductTenure';

/* eslint-disable-next-line */
export interface LoanProductDetailProps {}

export const LoanProductDetail = () => (
  <>
    <Box
      bg="gray.0"
      w="320px"
      position="fixed"
      h="calc(100vh - 110px)"
      borderRight="1px"
      borderRightColor="border.layout"
    >
      <SideBar />
    </Box>

    <Box ml="320px" p="s16" display="flex" flexDir="column" gap="s16">
      <Box display="flex" flexDirection="column" gap="s16">
        <AlertEnable />
        <Overview />
        <ProductDescription description="“Gold Saving Account” is a specific premium product targeted for individual and institutional customers with attractive interest rates along with “quarterly/monthly” or “on Maturity” interest payment. This product offers exclusive benefits which will not only help you realize your financial goals." />
        <ProductGeneralInformation
          generalInformation={{
            productCode: null,
            depositFrequency: null,
            productName: 'test',
            accountType: null,
            nature: null,
          }}
        />
        {/* <ProductCriteria criteria={null} /> */}
        <ProductDocuments individualDocuments={null} institutionDocuments={null} />
        <ProductLimits limits={[]} />
        <ProductRebate rebateData={undefined} />
        <ProductInterestRate interestRate={null} />
        <ProductPenalty penaltyData={null} />
        <ProductPrematurePenalty penaltyData={undefined} />
        <ProductTenure maxTenure={null} minTenure={null} tenureUnit={null} />
        <ProductLoanProcessingCharge loanProcessingCharge={[]} />
        <ProductLoanRepayment principal={23} interest={5} />
        <DetailsCard title="Others " hasTable>
          <Box display="flex" flexDir="column" gap="s32">
            <ProductFeatures features={[]} />
          </Box>
        </DetailsCard>
        <ProductInsurance insurance={[]} />
      </Box>
    </Box>
  </>
);
