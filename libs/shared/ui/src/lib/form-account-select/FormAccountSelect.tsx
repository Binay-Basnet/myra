import { NatureOfDepositProduct, useGetAccountTableListQuery } from '@coop/cbs/data-access';
import { getRouterQuery } from '@coop/shared/utils';

import { Option } from './CustomSelect';
import FormCustomSelect from './FormCustomSelect';

interface IAccountSelectProps {
  name: string;
  label?: string;
  memberId: string;
  placeholder?: string;
}

const accountTypes = {
  [NatureOfDepositProduct.Mandatory]: 'Mandatory Saving Account',
  [NatureOfDepositProduct.RecurringSaving]: 'Recurring Saving Account',
  [NatureOfDepositProduct.TermSavingOrFd]: 'Term Saving Account',
  [NatureOfDepositProduct.VoluntaryOrOptional]: 'Voluntary Saving Account',
};

export const FormAccountSelect = ({ name, label, memberId, placeholder }: IAccountSelectProps) => {
  const { data: accountListData, isFetching } = useGetAccountTableListQuery(
    {
      paginate: getRouterQuery({ type: ['PAGINATION'] }),
      filter: { memberId },
    },
    {
      staleTime: 0,
      enabled: !!memberId,
    }
  );

  const availableBalance = accountListData?.account?.list?.edges;

  const accountOptions: Option[] =
    availableBalance?.reduce(
      (prevVal, curVal) => [
        ...prevVal,
        {
          label: `${curVal?.node?.product?.productName} (ID:${curVal?.node?.id})`,
          value: curVal?.node?.id as string,
          accountInfo: {
            accountName: curVal?.node?.product?.productName,
            accountId: curVal?.node?.id,
            accountType: curVal?.node?.product?.nature
              ? accountTypes[curVal?.node?.product?.nature]
              : '',
            balance: curVal?.node?.balance as string,
            fine: curVal?.node?.fine as string,
          },
        },
      ],
      [] as Option[]
    ) ?? [];

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
