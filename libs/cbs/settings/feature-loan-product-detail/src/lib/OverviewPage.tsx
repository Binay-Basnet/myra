import { useRouter } from 'next/router';

import { Box, DetailsCard } from '@myra-ui';

import { ObjState } from '@coop/cbs/data-access';

import {
  AlertEnable,
  Overview,
  ProductCriteria,
  ProductDescription,
  ProductDocuments,
  ProductFeatures,
  ProductGeneralInformation,
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
import { useLoanProductDepositHook } from '../hooks/useLoanProductDepositHook';

export const OverviewPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { detailData, criteriaData, featureTable, productLimits } = useLoanProductDepositHook();

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
        <SideBar />
      </Box>

      <Box bg="background.500" ml="320px" p="s16" display="flex" flexDir="column" gap="s16">
        <Box display="flex" flexDirection="column" gap="s16">
          {detailData?.objState === ObjState.Inactive && <AlertEnable id={id as string} />}
          <Overview noOfAccounts={detailData?.noOfaccount} noOfMembers={detailData?.noOfMember} />
          <ProductDescription description={detailData?.description} />
          <ProductGeneralInformation
            generalInformation={{
              productName: detailData?.productName,
              productCode: detailData?.productCode,
              productType: detailData?.productType,
              nature: detailData?.productNature,
              productSubType: detailData?.productSubType,
              interestMethod: detailData?.interestMethod,
              loanRepaymentScheme: detailData?.repaymentScheme,
              installmentFrequency: detailData?.installmentFrequency,
            }}
          />
          <ProductCriteria criteria={criteriaData} memberType={detailData?.typeOfMember} />
          <ProductDocuments requiredDocuments={detailData?.requiredDocuments} />

          <ProductLimits limits={productLimits} />

          <ProductRebate rebateData={detailData?.rebate} />
          <ProductInterestRate interestRate={detailData?.interest} />
          <ProductPenalty penaltyData={detailData?.penalty} />

          <ProductPrematurePenalty penaltyData={detailData?.prematurePenaltySetup} />
          <ProductTenure
            tenureUnit={detailData?.tenureUnit}
            maxTenure={detailData?.maxTenureUnitNumber}
            minTenure={detailData?.minTenureUnitNumber}
          />

          <ProductLoanProcessingCharge loanProcessingCharge={detailData?.loanProcessingCharge} />
          <ProductLoanRepayment
            principal={detailData?.principalMaxGraceNumber}
            interest={detailData?.interestMaxGraceNumber}
          />

          <DetailsCard title="Features" hasTable>
            <ProductFeatures features={featureTable} />
          </DetailsCard>

          {/* <DetailsCard title="Insurance Details" hasTable>
            <ProductInsurance insurance={detailData?.insuranceType as Insurance} />
          </DetailsCard> */}
        </Box>
      </Box>
    </>
  );
};
