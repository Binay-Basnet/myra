import {
  NatureOfDepositProduct,
  ObjState,
  useGetAccountTableListQuery,
  useGetMemberLinkedAccountsQuery,
} from '@coop/cbs/data-access';
import { useTranslation } from '@coop/shared/utils';

import { Option } from './CustomSelect';
import FormCustomSelect from './FormCustomSelect';

interface IAccountSelectProps {
  name: string;
  label?: string;
  memberId: string;
  placeholder?: string;
  loanLinkedAccounts?: boolean;
  filterBy?: ObjState;
  excludeIds?: string[];
}

export const FormAccountSelect = ({
  name,
  label,
  memberId,
  loanLinkedAccounts,
  placeholder,
  filterBy,
  excludeIds,
}: IAccountSelectProps) => {
  const { t } = useTranslation();
  const { data: accountListData, isFetching } = useGetAccountTableListQuery(
    {
      paginate: {
        first: -1,
        after: '',
      },
      filter: { memberId, objState: filterBy ?? null },
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

  const { data: linkedAccountData } = useGetMemberLinkedAccountsQuery(
    {
      memberId,
      includeActiveAccountsOnly: true,
      filter: [NatureOfDepositProduct?.Current, NatureOfDepositProduct?.Saving],
    },
    {
      enabled: !!loanLinkedAccounts,
    }
  );

  const loanLinkedData = linkedAccountData?.members?.getAllAccounts?.data?.depositAccount;

  const loanLinkedOptions: Option[] =
    loanLinkedData?.reduce(
      (prevVal, curVal) => [
        ...prevVal,
        {
          label: `${curVal?.product?.productName} (ID:${curVal?.id})`,
          value: curVal?.id as string,
          accountInfo: {
            accountName: curVal?.accountName,
            accountId: curVal?.product?.nature,
            accountType: curVal?.product?.nature ? accountTypes[curVal?.product?.nature] : '',
            balance: curVal?.balance as string,
            fine: '0',
            productName: curVal?.product?.productName,
          },
        } as Option,
      ],
      [] as Option[]
    ) ?? [];

  const accountOptions: Option[] =
    accountsList?.reduce((prevVal, curVal) => {
      if (excludeIds?.includes(curVal?.node?.id as string) || !curVal) {
        return prevVal;
      }

      return [
        ...prevVal,
        {
          label: `${curVal?.node?.product?.productName} (ID:${curVal?.node?.id})`,
          value: curVal?.node?.id as string,
          accountInfo: {
            accountName: curVal?.node?.accountName,
            accountId: curVal?.node?.id,
            accountType: curVal?.node?.product?.nature
              ? accountTypes[curVal?.node?.product?.nature]
              : '',
            balance: curVal?.node?.balance as string,
            fine: curVal?.node?.dues?.fine as string,
            productName: curVal?.node?.product?.productName,
          },
        } as Option,
      ];
    }, [] as Option[]) ?? [];

  return (
    <FormCustomSelect
      name={name}
      label={label}
      isLoading={isFetching}
      placeholder={placeholder}
      options={loanLinkedAccounts ? loanLinkedOptions : accountOptions}
    />
  );
};
