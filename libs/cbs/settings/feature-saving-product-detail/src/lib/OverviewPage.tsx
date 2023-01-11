import { useRouter } from 'next/router';

import { Box, DetailsCard } from '@myra-ui';

import { NatureOfDepositProduct, ObjState } from '@coop/cbs/data-access';

import {
  AccountCloseCharge,
  AlertEnable,
  Overview,
  ProductCriteria,
  ProductDescription,
  ProductDocuments,
  ProductDormantSetup,
  ProductFeatures,
  ProductGeneralInformation,
  ProductLadderRate,
  ProductLimits,
  ProductPenalty,
  ProductPrematurePenalty,
  ProductRebate,
  ProductServiceCharge,
  ProductServiceTable,
  ProductWithdrawPenalty,
  SideBar,
} from '../components';
import { ProductInterestRate } from '../components/ProductInterestRate';
import { ProductTenure } from '../components/ProductTenure';
import { useSavingDepositHook } from '../hooks/useSavingDepositHook';

export const OverviewPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    detailData,
    criteriaData,
    currentTermSavingFeatureTable,
    savingRecurringFeatureTable,
    productLimits,
  } = useSavingDepositHook();

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
          <Overview noOfAccounts={detailData?.noOfAccounts} noOfMembers={detailData?.noOfMembers} />
          <ProductDescription description={detailData?.description} />
          <ProductGeneralInformation
            generalInformation={{
              productCode: detailData?.productCode,
              depositFrequency: detailData?.depositFrequency,
              productName: detailData?.productName,
              accountType: detailData?.accountType,
              nature: detailData?.nature,
            }}
          />
          <ProductCriteria criteria={criteriaData} memberType={detailData?.typeOfMember} />
          {detailData?.individualDocuments ||
            (detailData?.institutionDocuments && (
              <ProductDocuments
                individualDocuments={detailData?.individualDocuments}
                institutionDocuments={detailData?.institutionDocuments}
              />
            ))}

          <ProductServiceCharge serviceCharge={detailData?.serviceCharge} />
          <AccountCloseCharge accountCloseCharge={detailData?.accountCloseCharge} />
          <ProductLimits limits={productLimits} />

          {detailData?.nature !== NatureOfDepositProduct.Current && (
            <ProductInterestRate interestRate={detailData?.interest} />
          )}

          {(detailData?.nature === NatureOfDepositProduct.RecurringSaving ||
            detailData?.nature === NatureOfDepositProduct.Current) && (
            <>
              <ProductPenalty penaltyData={detailData?.penaltyData} />
              <ProductRebate rebateData={detailData?.rebateData} />
            </>
          )}

          {(detailData?.nature === NatureOfDepositProduct.RecurringSaving ||
            detailData?.nature === NatureOfDepositProduct.TermSavingOrFd) && (
            <ProductTenure
              tenureUnit={detailData?.tenureUnit}
              maxTenure={detailData?.maxTenureUnitNumber}
              minTenure={detailData?.minTenureUnitNumber}
            />
          )}

          {(detailData?.nature === NatureOfDepositProduct.Current ||
            detailData?.nature === NatureOfDepositProduct.Saving) && (
            <ProductDormantSetup dormantSetup={detailData?.dormantSetup} />
          )}

          {(detailData?.nature === NatureOfDepositProduct.RecurringSaving ||
            detailData?.nature === NatureOfDepositProduct.TermSavingOrFd) && (
            <>
              <ProductPrematurePenalty penaltyData={detailData?.prematurePenalty} />
              <ProductWithdrawPenalty penaltyData={detailData?.withdrawPenalty} />
            </>
          )}

          {(detailData?.nature === NatureOfDepositProduct.RecurringSaving ||
            detailData?.nature === NatureOfDepositProduct.Saving) && (
            <ProductLadderRate ladderRate={detailData?.ladderRateData} />
          )}

          {(detailData?.nature === NatureOfDepositProduct.Current ||
            detailData?.nature === NatureOfDepositProduct.TermSavingOrFd) && (
            <DetailsCard title="Features " hasTable>
              <ProductFeatures features={currentTermSavingFeatureTable} />
            </DetailsCard>
          )}

          {(detailData?.nature === NatureOfDepositProduct.RecurringSaving ||
            detailData?.nature === NatureOfDepositProduct.Saving) && (
            <DetailsCard title="Features " hasTable>
              <ProductFeatures features={savingRecurringFeatureTable} />
            </DetailsCard>
          )}

          {(detailData?.nature === NatureOfDepositProduct.Current ||
            detailData?.nature === NatureOfDepositProduct.Saving) && (
            <DetailsCard title="Others Details" hasTable>
              <ProductServiceTable serviceList={detailData?.savingCharges ?? []} />
            </DetailsCard>
          )}
          {/* <TextAreaInput name="note" label="note" /> */}
        </Box>
      </Box>
    </>
  );
};
