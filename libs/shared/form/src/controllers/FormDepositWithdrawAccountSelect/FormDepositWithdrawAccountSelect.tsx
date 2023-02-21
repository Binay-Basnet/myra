import { Controller } from 'react-hook-form';

import { AccountSelect, AccountSelectProps } from '@myra-ui/forms';

import {
  NatureOfDepositProduct,
  ObjState,
  useGetMemberLinkedAccountsQuery,
} from '@coop/cbs/data-access';
import { useTranslation } from '@coop/shared/utils';

interface Option {
  label?: string;
  value: string;
  accountInfo?: {
    accountName?: string;
    accountId?: string;
    accountType?: string;
    balance?: string;
    availableBalance?: string;
    fine?: string;
    productName: string;
  };
}

interface IAccountSelectProps extends AccountSelectProps {
  name: string;
  label?: string;
  memberId: string;
  placeholder?: string;
  isLinkedAccounts?: boolean;
  filterBy?: ObjState;
  excludeIds?: string[];
  isRequired?: boolean;
}

export const FormDepositWithdrawAccountSelect = ({
  name,
  label,
  memberId,
  isLinkedAccounts,
  placeholder,
  excludeIds,
  isRequired,
  ...rest
}: IAccountSelectProps) => {
  const { t } = useTranslation();

  const accountTypes = {
    [NatureOfDepositProduct.Saving]: t['addDepositSaving'],
    [NatureOfDepositProduct.RecurringSaving]: t['addDepositRecurringSavingAccount'],
    [NatureOfDepositProduct.TermSavingOrFd]: t['addDepositTermSavingAccount'],
    [NatureOfDepositProduct.Current]: t['addDepositCurrent'],
  };

  const { data: linkedAccountData, isFetching } = useGetMemberLinkedAccountsQuery(
    {
      memberId,
      objState: 'ACTIVE',
      filter: [
        NatureOfDepositProduct?.Current,
        NatureOfDepositProduct?.Saving,
        NatureOfDepositProduct?.RecurringSaving,
        NatureOfDepositProduct?.TermSavingOrFd,
      ],
    },
    {
      enabled: !!isLinkedAccounts,
    }
  );

  const linkedAccounts = linkedAccountData?.members?.getAllAccounts?.data?.depositAccount;

  const linkedAccountsOptions: Option[] =
    linkedAccounts?.reduce((prevVal, curVal) => {
      if (excludeIds?.includes(curVal?.id as string) || !curVal) {
        return prevVal;
      }

      return [
        ...prevVal,
        {
          label: `${curVal?.product?.productName} (ID:${curVal?.id})`,
          value: curVal?.id as string,
          accountInfo: {
            accountName: curVal?.accountName,
            accountId: curVal?.product?.nature,
            accountType: curVal?.product?.nature ? accountTypes[curVal?.product?.nature] : '',
            balance: curVal?.availableBalance as string,
            fine: '0',
            productName: curVal?.product?.productName,
          },
        } as Option,
      ];
    }, [] as Option[]) ?? [];

  return (
    <Controller
      render={({ field: { value, onChange } }) => (
        <AccountSelect
          label={label}
          isRequired={isRequired}
          value={linkedAccountsOptions?.find((option) => option.value === value)}
          isLoading={isFetching}
          placeholder={placeholder}
          onChange={(newValue: Option | Option[]) => {
            if (Array.isArray(newValue)) {
              onChange(newValue);
            } else {
              // const { value: newVal } = newValue as Option;

              const newVal = (newValue as Option)?.value;

              onChange(newVal);
            }
          }}
          options={linkedAccountsOptions}
          {...rest}
        />
      )}
      name={name}
    />
  );
};
