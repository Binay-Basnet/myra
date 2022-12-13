import { useRouter } from 'next/router';

import {
  useGetSavingsProductCriteriaQuery,
  useGetSavingsProductDetailQuery,
} from '@coop/cbs/data-access';

export const useSavingDepositHook = () => {
  const router = useRouter();

  const { id } = router.query;
  const { data } = useGetSavingsProductDetailQuery({ id: id as string });
  const { data: criteriaList } = useGetSavingsProductCriteriaQuery({
    productId: id as string,
  });

  const detailData = data?.settings?.general?.depositProduct?.depositProductDetail?.data;
  const criteriaData = criteriaList?.settings?.general?.depositProduct?.getProductCriteria?.data;

  const sidebarData = {
    productName: detailData?.productName,
    productCode: detailData?.productCode,
    productType: detailData?.accountType,
  };

  const featureTable = [
    { feature: 'Auto Open when member joins', status: detailData?.autoOpen ? 'Yes' : 'No' },
    { feature: 'Is this staff product', status: detailData?.staffProduct ? 'Yes' : 'No' },
    { feature: 'Is this product for minors', status: detailData?.isForMinors ? 'Yes' : 'No' },
    { feature: 'Allow Cheque Issue', status: detailData?.chequeIssue ? 'Yes' : 'No' },
    {
      feature: 'Does this product provide ATM facility ',
      status: detailData?.atmFacility ? 'Yes' : 'No',
    },
    { feature: 'Withdraw Restricted', status: detailData?.withdrawRestricted ? 'Yes' : 'No' },
  ];

  const productLimits = [
    {
      name: 'Balance',
      minAmount: detailData?.balanceLimit?.minAmount,
      maxAmount: detailData?.balanceLimit?.maxAmount,
    },
    {
      name: 'Deposit',
      minAmount: detailData?.fixedDepositAmountLimit?.minAmount,
      maxAmount: detailData?.fixedDepositAmountLimit?.maxAmount,
    },
    {
      name: 'Withdraw ',
      minAmount: detailData?.withdrawAmountLimit?.minAmount,
      maxAmount: detailData?.balanceLimit?.maxAmount,
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
