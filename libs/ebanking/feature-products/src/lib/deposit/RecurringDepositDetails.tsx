import { useRouter } from 'next/router';

import {
  DepositProductCriteria,
  DepositProductFormStateData,
  ServiceTypeFormState,
} from '@coop/ebanking/data-access';
import { Box, DetailsCard, PathBar } from '@myra-ui';

import {
  AccountCloseCharge,
  ProductCharges,
  ProductCriteria,
  ProductDescription,
  ProductDocuments,
  ProductFeatures,
  ProductGeneralInformation,
  ProductLimits,
  ProductPenalty,
  ProductPrematurePenalty,
  ProductRebate,
  ProductServiceCharge,
} from '../../components/deposit';
import { ProductInterestRate } from '../../components/deposit/ProductInterestRate';
import { ProductTenure } from '../../components/deposit/ProductTenure';
import { ProductPenaltyWithdrawSetup } from '../../components/deposit/ProductWithdrawPenalty';

interface IRecurringDepositDetailsProps {
  product: DepositProductFormStateData;
  criteria: DepositProductCriteria;
}

export const RecurringDepositDetails = ({ product, criteria }: IRecurringDepositDetailsProps) => {
  const router = useRouter();
  const limits = [
    {
      name: 'Balance',
      minAmount: product?.balanceLimit?.minAmount,
      maxAmount: product?.balanceLimit?.maxAmount,
    },
    {
      name: 'Deposit',
      minAmount: product?.depositAmount?.minAmount,
      maxAmount: product?.depositAmount?.maxAmount,
    },
    {
      name: 'Withdraw',
      minAmount: product?.withdrawAmountLimit?.minAmount,
      maxAmount: product?.withdrawAmountLimit?.maxAmount,
    },
  ];

  const otherFeatures: { feature: string; status: 'yes' | 'no' }[] = [
    {
      feature: 'Auto Open when member joins',
      status: product?.autoOpen ? 'yes' : 'no',
    },
    {
      feature: 'Is this staff product',
      status: product?.staffProduct ? 'yes' : 'no',
    },
    {
      feature: 'Is this product for minors',
      status: product?.isForMinors ? 'yes' : 'no',
    },
    {
      feature: 'Allow Cheque Issue',
      status: product?.chequeIssue ? 'yes' : 'no',
    },
    {
      feature: 'Does this product provide ATM facility',
      status: product?.atmFacility ? 'yes' : 'no',
    },
    {
      feature: 'Does this product allow Alternative Channel',
      status: product?.alternativeChannels ? 'yes' : 'no',
    },
  ];

  const charges = [
    ...(product?.chequeCharge ?? []),
    ...(product?.atmCharge ?? []),
    ...(product.alternativeChannelCharge ?? []),
  ] as ServiceTypeFormState[];

  return (
    <Box display="flex" flexDirection="column" gap="s16">
      <PathBar
        paths={[
          { label: 'Home', link: '/home' },
          {
            label: 'Products',
            link: '/coop/products/deposit',
          },
          {
            label: product?.productName ?? '',
            link: router.asPath,
          },
        ]}
      />

      <ProductDescription description={product?.description} />
      <ProductGeneralInformation
        generalInformation={{
          productCode: product?.productCode,
          depositFrequency: product?.depositFrequency,
          productName: product?.productName,
          accountType: product?.accountType,
          nature: product?.nature,
        }}
      />
      <ProductCriteria criteria={criteria} />
      <ProductDocuments
        individualDocuments={product?.individualDocuments}
        institutionDocuments={product?.institutionDocuments}
      />
      <ProductServiceCharge serviceCharge={product?.serviceCharge} />
      <AccountCloseCharge accountCloseCharge={product?.accountCloseCharge} />
      <ProductLimits limits={limits} />
      <ProductInterestRate interestRate={product?.interest} />
      <ProductPenalty penaltyData={product?.penaltyData} />
      <ProductRebate rebateData={product?.rebateData} />
      <ProductTenure
        tenureUnit={product?.tenureUnit}
        maxTenure={product?.maxTenureUnitNumber}
        minTenure={product?.minTenureUnitNumber}
      />

      <ProductPrematurePenalty prematurePenalty={product?.prematurePenalty} />
      <ProductPenaltyWithdrawSetup withDrawData={product?.withdrawPenalty} />

      <DetailsCard title="Others " hasTable>
        <Box display="flex" flexDir="column" gap="s32">
          <ProductFeatures features={otherFeatures} />
          <ProductCharges charges={charges} />
        </Box>
      </DetailsCard>
    </Box>
  );
};
