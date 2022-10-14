import { NatureOfDepositProduct, useGetAccountTableListQuery } from '@coop/cbs/data-access';
import { useTranslation } from '@coop/shared/utils';

import { Option } from './CustomSelect';
import FormCustomSelect from './FormCustomSelect';

interface IAccountSelectProps {
  name: string;
  label?: string;
  memberId: string;
  placeholder?: string;
}

export const FormAccountSelect = ({ name, label, memberId, placeholder }: IAccountSelectProps) => {
  const { t } = useTranslation();
  const { data: accountListData, isFetching } = useGetAccountTableListQuery(
    {
      paginate: {
        first: -1,
        after: '',
      },
      filter: { memberId },
    },
    {
      staleTime: 0,
      enabled: !!memberId,
    }
  );

  const accountTypes = {
    [NatureOfDepositProduct.Saving]: t['addDepositSaving'],
    [NatureOfDepositProduct.RecurringSaving]: t['addDepositRecurringSavingAccount'],
    [NatureOfDepositProduct.TermSavingOrFd]: t['addDepositTermSavingAccount'],
    [NatureOfDepositProduct.Current]: t['addDepositCurrent'],
  };

  const accountsList = accountListData?.account?.list?.edges;

  const accountOptions: Option[] =
    accountsList?.reduce(
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
            fine: curVal?.node?.dues?.fine as string,
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
