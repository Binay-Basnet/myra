import React from 'react';
import { useRouter } from 'next/router';

import { Penalty } from '@coop/cbs/data-access';
import {
  useGetEbankingLoanProductCriteriaQuery,
  useGetEbankingLoanProductQuery,
  useGetEbankingLoanProductSubTypeQuery,
  useGetEbankingLoanProductTypeListQuery,
} from '@coop/ebanking/data-access';
import { Column, Table } from '@coop/shared/table';
import { Box, DetailCardContent, DetailsCard, PathBar, Text } from '@coop/shared/ui';
import { amountConverter } from '@coop/shared/utils';

import {
  ProductCriteria,
  ProductFeatures,
  ProductPrematurePenalty,
  ProductRebate,
} from '../../components/deposit';
import { ProductInterestRate } from '../../components/deposit/ProductInterestRate';
import { ProductTenure } from '../../components/deposit/ProductTenure';

export const LoanDetails = () => {
  const router = useRouter();
  const id = router.query['id'] as string;

  const { data } = useGetEbankingLoanProductQuery({ id });
  const { data: typeData } = useGetEbankingLoanProductTypeListQuery();
  const { data: subTypeData } = useGetEbankingLoanProductSubTypeQuery();
  const { data: criteriaData } = useGetEbankingLoanProductCriteriaQuery({ id });

  const product = data?.eBanking?.products?.getLoanProduct?.data;
  const criteria = criteriaData?.eBanking?.products?.getLoanProductCriteria?.data;

  const otherFeatures: { feature: string; status: 'yes' | 'no' }[] = [
    {
      feature: 'Partial Payment on Principal Amount',
      status: product?.allowPartialInstallment ? 'yes' : 'no',
    },
    {
      feature: 'Monthly Interest Compulsory',
      status: product?.isMonthlyInstallmentCompulsory ? 'yes' : 'no',
    },
    {
      feature: 'Staff Product',
      status: product?.isStaffProduct ? 'yes' : 'no',
    },
    {
      feature: 'Support Multiple Account',
      status: product?.supportMultipleAccounts ? 'yes' : 'no',
    },
    {
      feature: 'Loan Schedule Change/Override',
      status: product?.loanScheduleChangeOverride ? 'yes' : 'no',
    },
    {
      feature: 'Update Interest',
      status: product?.updateInterest ? 'yes' : 'no',
    },
    {
      feature: 'Waive Interest',
      status: product?.waiveInterest ? 'yes' : 'no',
    },
    {
      feature: 'Is Insurance Applicable',
      status: product?.isInsuranceApplicable ? 'yes' : 'no',
    },
    {
      feature: 'Allow Guarantee',
      status: product?.allowGurantee ? 'yes' : 'no',
    },
  ];

  return (
    <Box display="flex" flexDirection="column" gap="s16">
      <PathBar
        paths={[
          { label: 'Home', link: '/home' },
          {
            label: 'Products',
            link: '/coop/products/loan',
          },
          {
            label: product?.productName ?? '',
            link: router.asPath,
          },
        ]}
      />

      <DetailsCard hideBorder hasTable title="About">
        <Text fontSize="r1" color="gray.900">
          {product?.description}
        </Text>
      </DetailsCard>

      <DetailsCard hideBorder title="General Information">
        <DetailCardContent title="Product Name" subtitle={product?.productName} />

        <DetailCardContent
          title="Product Code"
          subtitle={`${product?.productCode?.prefix}-${product?.productCode?.initialNo}`}
        />

        <DetailCardContent
          title="Product Type"
          subtitle={
            typeData?.eBanking?.products?.loanProductTypes?.find(
              (p) => p?.id === product?.productType
            )?.productType
          }
        />
        <DetailCardContent
          title="Nature of Loan Product"
          subtitle={product?.productNature.toLowerCase()}
        />

        <DetailCardContent
          title="Product Subtype"
          subtitle={
            subTypeData?.eBanking?.products?.loanProductSubTypes?.find(
              (p) => p?.id === product?.productSubType
            )?.productSubType
          }
        />
        <DetailCardContent
          title="Interest Method"
          subtitle={product?.interestMethod?.toLowerCase()}
        />

        <DetailCardContent
          title="Loan Repayment Scheme"
          subtitle={product?.repaymentScheme?.join(', ')}
        />

        <DetailCardContent
          title="Installment Frequency"
          subtitle={product?.installmentFrequency?.toLowerCase()}
        />
      </DetailsCard>

      {criteria && <ProductCriteria criteria={criteria} />}

      {product?.requiredDocuments && product?.requiredDocuments.length !== 0 && (
        <DetailsCard title="Required Documents" hideBorder>
          <Box ml="s20" as="ul" fontSize="r1" textTransform="capitalize">
            {product?.requiredDocuments?.map((document) => (
              <li key={document}>{document?.toLowerCase().replace(/_/g, ' ')}</li>
            ))}
          </Box>
        </DetailsCard>
      )}

      {(product?.minimumLoanAmount || product?.maxLoanAmount) && (
        <DetailsCard title="Limits" hasTable>
          <Table
            data={[
              {
                limit: 'Loan Amount',
                minAmount: product?.minimumLoanAmount,
                maxAmount: product?.maxLoanAmount,
              },
            ]}
            columns={[
              { header: 'Limits', accessorKey: 'limit' },
              {
                header: 'Minimum Amount',
                accessorKey: 'minAmount',
                cell: (props: { getValue: () => unknown }) =>
                  amountConverter(props.getValue() as string),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Maximum Amount',
                accessorKey: 'maxAmount',
                cell: (props: { getValue: () => unknown }) =>
                  amountConverter(props.getValue() as string),
                meta: {
                  isNumeric: true,
                },
              },
            ]}
            isStatic
            size="report"
            variant="report"
          />
        </DetailsCard>
      )}

      <ProductRebate rebateData={product?.rebate} />
      <ProductInterestRate interestRate={product?.interest} />
      <ProductPenalty
        penaltyData={[
          {
            name: product?.penaltyType as string,
            penaltyAmount: product?.penaltyAmount,
            penaltyRate: product?.penaltyRate,
            dayAfterInstallmentDate: product?.penaltyDayAfterInstallmentDate,
          },
        ]}
      />
      <ProductPrematurePenalty prematurePenalty={product?.prematurePenaltySetup} />
      <ProductTenure
        tenureUnit={product?.tenureUnit}
        maxTenure={product?.maxTenureUnitNumber}
        minTenure={product?.minTenureUnitNumber}
      />

      <DetailsCard title="Loan Processing Charges" hideBorder hasTable>
        <Table
          data={product?.loanProcessingCharge ?? []}
          isStatic
          variant="report"
          size="report"
          columns={[
            {
              header: 'Service name',
              accessorKey: 'serviceName',
              meta: {
                width: '50%',
              },
            },
            {
              header: 'Amount',
              accessorKey: 'amount',
              meta: {
                width: '50%',
                isNumeric: true,
              },
              cell: (props: { getValue: () => unknown }) =>
                props.getValue() ? amountConverter(props.getValue() as string) : 'N/A',
            },
          ]}
        />
      </DetailsCard>

      <DetailsCard hideBorder title="Loan Repayment Start Grace Duration">
        <Box ml="s20" as="ul" fontSize="r1" textTransform="capitalize">
          <li>
            Grace period on Principal: <b>{product?.principalMaxGraceNumber ?? 0}</b>
          </li>
          <li>
            Grace period on Interest: <b>{product?.interestMaxGraceNumber ?? 0}</b>
          </li>
        </Box>
      </DetailsCard>
      <DetailsCard title="Others " hideBorder hasTable>
        <ProductFeatures features={otherFeatures} />
      </DetailsCard>
      {product?.insuranceType?.type && (
        <DetailsCard title="Insurance" hideBorder hasTable>
          <Table
            data={[
              {
                type: product?.insuranceType?.type,
                rate: product?.insuranceType?.rate,
                amount: product?.insuranceType?.amount,
              },
            ]}
            isStatic
            variant="report"
            size="report"
            columns={[
              {
                header: 'Insurance Type',
                accessorKey: 'type',
                meta: {
                  width: '33%',
                },
              },
              {
                header: 'Insurance Rate',
                accessorKey: 'rate',
                cell: (props: { getValue: () => unknown }) =>
                  props.getValue() ? `${props.getValue()}  %` : 'N/A',
                meta: {
                  isNumeric: true,
                  width: '33%',
                },
              },
              {
                header: 'Insurance Amount',
                accessorKey: 'amount',
                meta: {
                  width: '33%',
                  isNumeric: true,
                },
                cell: (props: { getValue: () => unknown }) =>
                  props.getValue() ? amountConverter(props.getValue() as string) : 'N/A',
              },
            ]}
          />
        </DetailsCard>
      )}
    </Box>
  );
};

interface IProductPenalty {
  penaltyData: (Penalty & { name: string })[];
}

export const ProductPenalty = ({ penaltyData }: IProductPenalty) => {
  const columns = React.useMemo<Column<typeof penaltyData[0]>[]>(
    () => [
      {
        header: 'Penalty On',
        accessorKey: 'name',
        meta: {
          width: '25%',
        },
      },
      {
        header: 'Day from End Date',
        accessorKey: 'dayAfterInstallmentDate',
        meta: {
          width: '25%',
        },
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
      },

      {
        header: 'Penalty',
        accessorKey: 'penaltyRate',
        cell: (props) => (props.getValue() ? `${props.getValue()}  %` : 'N/A'),
        meta: {
          isNumeric: true,
          width: '25%',
        },
      },
      {
        header: 'Penalty Amount',
        accessorKey: 'penaltyAmount',
        cell: (props) => (props.getValue() ? amountConverter(props.getValue() as string) : 'N/A'),
        meta: {
          isNumeric: true,
          width: '25%',
        },
      },
    ],
    []
  );

  return (
    <DetailsCard title="Penalty" hideBorder hasTable>
      <Table variant="report" size="report" isStatic data={penaltyData} columns={columns} />
    </DetailsCard>
  );
};
