import { useGetLoanProductsListQuery } from '@coop/cbs/data-access';

interface IUseLoanProductErrors {
  memberId: string;
  loanType?: string;
  loanSubType?: string;
  productId?: string;
}

type OptionType = { label: string; value: string };

export const useLoanProductErrors = ({
  memberId,
  loanSubType,
  loanType,
  productId,
}: IUseLoanProductErrors) => {
  const { data: loanProductData, isFetching } = useGetLoanProductsListQuery(
    {
      memberId,
      productTypeId: loanType as string,
      productSubTypeId: loanSubType as string,
    },
    { enabled: !!loanSubType }
  );

  const loanProductOptions = [
    ...(loanProductData?.loanAccount?.getProductList?.allowed?.reduce(
      (previousValue, currentValue) => [
        ...previousValue,
        {
          label: currentValue?.productName as string,
          value: currentValue?.id as string,
        },
      ],
      [] as OptionType[]
    ) ?? []),
    ...(loanProductData?.loanAccount?.getProductList?.notAllowed?.reduce(
      (previousValue, currentValue) => [
        ...previousValue,
        {
          label: currentValue?.data?.productName as string,
          value: currentValue?.data?.id as string,
        },
      ],
      [] as OptionType[]
    ) ?? []),
  ];
  const arrayForErrors = loanProductData?.loanAccount?.getProductList?.notAllowed;
  const errors = arrayForErrors?.find((d) => d?.data?.id === productId);

  return {
    loanProductOptions,
    errors,
    isFetching,
  };
};
