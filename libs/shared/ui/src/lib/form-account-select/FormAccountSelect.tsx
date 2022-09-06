import { useGetAccountTableListQuery } from '@coop/cbs/data-access';
import { getRouterQuery } from '@coop/shared/utils';

import { Option } from './CustomSelect';
import FormCustomSelect from './FormCustomSelect';

interface IAccountSelectProps {
  name: string;
  label?: string;
  memberId: string;
  __placeholder?: string;
  placeholder?: string;
}

export const FormAccountSelect = ({
  name,
  label,
  memberId,
  placeholder,
}: IAccountSelectProps) => {
  const { data: accountListData, isFetching } = useGetAccountTableListQuery(
    {
      paginate: getRouterQuery({ type: ['PAGINATION'] }),
      filter: { memberId },
    },
    {
      staleTime: 0,
    }
  );

  const availableBalance = accountListData?.account?.list?.edges;

  const accountOptions: Option[] =
    availableBalance?.reduce((prevVal, curVal) => {
      return [
        ...prevVal,
        {
          label: `${curVal?.node?.product?.productName} (ID:${curVal?.node?.id})`,
          value: curVal?.node?.id as string,
          accountInfo: {
            accountName: curVal?.node?.product?.productName,
            accountId: curVal?.node?.id,
            accountType: curVal?.node?.product?.nature,
            balance: curVal?.node?.balance as string,
            fine: curVal?.node?.fine as string,
          },
        },
      ];
    }, [] as Option[]) ?? [];

  return (
    <FormCustomSelect
      name={name}
      label={label}
      isLoading={isFetching}
      placeholder={placeholder}
      options={accountOptions}
    />
  );
};
