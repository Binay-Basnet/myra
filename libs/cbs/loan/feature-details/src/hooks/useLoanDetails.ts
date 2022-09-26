import { useRouter } from 'next/router';

import {
  useGetLoanApplicationDetailsQuery,
  useGetLoanProductDetailsDataQuery,
  useGetMemberDetailsQuery,
  useGetProductCriteriaQuery,
} from '@coop/cbs/data-access';

export const useLoanDetails = () => {
  const router = useRouter();

  const { id } = router.query;

  // Loan Account Details
  const { data: loanData } = useGetLoanApplicationDetailsQuery(
    { id: id as string },
    { staleTime: 0, enabled: !!id }
  );
  const loan = loanData?.loanAccount.formState?.data;

  // Member Details
  const { data: memberData } = useGetMemberDetailsQuery(
    {
      id: loan?.memberId as string,
    },
    { staleTime: 0, enabled: !!loan?.memberId }
  );
  const member = memberData?.members.details.data;

  // Loan Product Details
  const { data: loanProductData } = useGetLoanProductDetailsDataQuery(
    { id: loan?.productId as string },
    { staleTime: 0, enabled: !!loan?.memberId }
  );
  const loanProduct = loanProductData?.settings.general?.loanProducts?.formState?.data;

  // Loan Product Criteria
  const { data: criteriaData } = useGetProductCriteriaQuery(
    { productId: loanProduct?.id as string },
    {
      staleTime: 0,
      enabled: !!loanProduct?.id,
    }
  );
  const loanProductCriteria = criteriaData?.loanAccount?.getProductCriteria?.data;

  return {
    loan,
    member,
    loanProduct,
    loanProductCriteria,
  };
};
