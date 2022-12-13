import { useRouter } from 'next/router';

import {
  useGetLoanProductCriteriaQuery,
  useGetLoanProductDetailQuery,
} from '@coop/cbs/data-access';

export const useLoanProductDepositHook = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetLoanProductDetailQuery({ id: id as string });
  const { data: criteriaList } = useGetLoanProductCriteriaQuery({
    productId: id as string,
  });

  const detailData = data?.settings?.general?.loanProducts?.getProductDetail?.data;
  const criteriaData = criteriaList?.settings?.general?.loanProducts?.getProductCriteria?.data;

  const sidebarData = {
    productName: detailData?.productName,
    productCode: detailData?.productCode,
    productType: detailData?.productType,
  };

  const featureTable = [
    {
      feature: 'Partial Payment on Principal Amount',
      status: detailData?.allowPartialInstallment ? 'Yes' : 'No',
    },
    {
      feature: 'Monthly Interest Compulsory',
      status: detailData?.isMonthlyInstallmentCompulsory ? 'Yes' : 'No',
    },
    { feature: 'Staff Product', status: detailData?.isStaffProduct ? 'Yes' : 'No' },
    {
      feature: 'Support Multiple Account',
      status: detailData?.supportMultipleAccounts ? 'Yes' : 'No',
    },
    {
      feature: 'Loan Schedule Change/Override',
      status: detailData?.loanScheduleChangeOverride ? 'Yes' : 'No',
    },
    { feature: 'Update Interest', status: detailData?.updateInterest ? 'Yes' : 'No' },
    { feature: 'Waive Interest', status: detailData?.waiveInterest ? 'Yes' : 'No' },
    {
      feature: 'Is Insurance Applicable',
      status: detailData?.isInsuranceApplicable ? 'Yes' : 'No',
    },
    { feature: 'Allow Gurantee', status: detailData?.allowGurantee ? 'Yes' : 'No' },
  ];

  const productLimits = [
    {
      name: 'Loan Amount',
      minAmount: detailData?.minimumLoanAmount,
      maxAmount: detailData?.maxLoanAmount,
    },
  ];

  return {
    detailData,
    criteriaData,
    sidebarData,
    featureTable,
    productLimits,
  };
};
