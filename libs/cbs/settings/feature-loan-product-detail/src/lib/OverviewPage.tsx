import { useRouter } from 'next/router';

import { Box, DetailsCard, Scrollable } from '@myra-ui';

import { ObjState, TypeOfLoan } from '@coop/cbs/data-access';

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
  const { detailData, criteriaData, featureTable, productLimits, currentOrgRate } =
    useLoanProductDepositHook();

  return (
    <Box display="flex">
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

      <Scrollable detailPage>
        <Box bg="background.500" ml="320px" p="s16" display="flex" flexDir="column" gap="s16">
          <Box display="flex" flexDirection="column" gap="s16">
            {detailData?.objState === ObjState.Inactive && <AlertEnable id={id as string} />}
            <Overview
              noOfAccounts={detailData?.noOfaccount}
              noOfInactiveMembers={detailData?.noOfInactiveAccounts}
            />
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
                loanType: detailData?.loanType,
              }}
            />
            <ProductCriteria criteria={criteriaData} memberType={detailData?.typeOfMember} />
            <ProductDocuments requiredDocuments={detailData?.requiredDocuments} />

            <ProductLimits limits={productLimits} />

            <ProductRebate rebateData={detailData?.rebate} />
            <ProductInterestRate
              interestRate={detailData?.interest}
              productPremium={detailData?.productPremiumInterest}
              currentOrgRate={currentOrgRate}
            />
            {detailData?.loanType === TypeOfLoan?.Normal && (
              <>
                <ProductPenalty penaltyData={detailData?.penalty} />

                <ProductPrematurePenalty penaltyData={detailData?.prematurePenaltySetup} />
              </>
            )}
            <ProductTenure
              tenureUnit={detailData?.tenureUnit}
              maxTenure={detailData?.maxTenureUnitNumber}
              minTenure={detailData?.minTenureUnitNumber}
            />

            <ProductLoanProcessingCharge loanProcessingCharge={detailData?.loanProcessingCharge} />
            {detailData?.loanType === TypeOfLoan?.Normal && (
              <ProductLoanRepayment
                principal={detailData?.principalMaxGraceNumber}
                interest={detailData?.interestMaxGraceNumber}
              />
            )}

            <DetailsCard title="Features" hasTable>
              <ProductFeatures features={featureTable} />
            </DetailsCard>

            {/* <DetailsCard title="Insurance Details" hasTable>
            <ProductInsurance insurance={detailData?.insuranceType as Insurance} />
          </DetailsCard> */}
          </Box>
        </Box>
      </Scrollable>
    </Box>
  );
};
