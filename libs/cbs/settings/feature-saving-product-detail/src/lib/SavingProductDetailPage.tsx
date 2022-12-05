import { Box, DetailsCard, TextAreaInput } from '@myra-ui';

import {
  AccountCloseCharge,
  AlertEnable,
  Overview,
  ProductDescription,
  ProductDocuments,
  ProductDormantSetup,
  ProductFeatures,
  ProductGeneralInformation,
  ProductPenalty,
  ProductRebate,
  ProductServiceCharge,
  SideBar,
} from '../components';

export const SavingProductDetailPage = () => (
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
        <ProductServiceCharge serviceCharge={null} />
        <AccountCloseCharge accountCloseCharge={null} />
        <ProductRebate rebateData={null} />
        <ProductPenalty penaltyData={null} />
        <ProductDormantSetup dormantSetup={null} />
        <DetailsCard title="Others " hasTable>
          <Box display="flex" flexDir="column" gap="s32">
            <ProductFeatures features={[]} />
          </Box>
        </DetailsCard>
        <TextAreaInput name="note" label="note" />
      </Box>
    </Box>
  </>
);
