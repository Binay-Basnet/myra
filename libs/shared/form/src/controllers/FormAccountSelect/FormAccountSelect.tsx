import { useMemo } from 'react';
import { Controller } from 'react-hook-form';

import { AccountSelect, AccountSelectProps } from '@myra-ui/forms';

import {
  AccountObjState,
  Condition,
  NatureOfDepositProduct,
  useGetAccountTableListQuery,
  useGetMemberLinkedAccountsQuery,
} from '@coop/cbs/data-access';
import { getPaginationQuery, useTranslation } from '@coop/shared/utils';

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
  filterBy?: AccountObjState;
  excludeIds?: string[];
  isRequired?: boolean;
  includeLoc?: boolean;
  natureOfDepositProduct?: NatureOfDepositProduct[];
  groupId?: string;
}

export const FormAccountSelect = ({
  name,
  label,
  memberId,
  isLinkedAccounts,
  placeholder,
  filterBy,
  excludeIds,
  isRequired,
  natureOfDepositProduct,
  includeLoc,
  groupId,
  ...rest
}: IAccountSelectProps) => {
  const { t } = useTranslation();
  const { data: accountListData, isFetching } = useGetMemberLinkedAccountsQuery(
    {
      memberId,
      groupID: groupId as string,
      objState: filterBy ?? null,
      includeLoc,
      filter: natureOfDepositProduct,
    },
    {
      staleTime: 0,
      enabled: !!memberId && memberId !== 'undefined' && !isLinkedAccounts,
    }
  );

  const accountTypes = {
    [NatureOfDepositProduct.Saving]: t['addDepositSaving'],
    [NatureOfDepositProduct.RecurringSaving]: t['addDepositRecurringSavingAccount'],
    [NatureOfDepositProduct.TermSavingOrFd]: t['addDepositTermSavingAccount'],
    [NatureOfDepositProduct.Current]: t['addDepositCurrent'],
  };

  const accountsList = accountListData?.members?.getAllAccounts?.data?.depositAccount;

  const { data: linkedAccountData } = useGetMemberLinkedAccountsQuery(
    {
      memberId,
      groupID: groupId as string,
      objState: 'ACTIVE',
      filter: [NatureOfDepositProduct?.Current, NatureOfDepositProduct?.Saving],
      includeLoc,
    },
    {
      enabled: !!memberId && !!isLinkedAccounts,
    }
  );

  const linkedAccounts = linkedAccountData?.members?.getAllAccounts?.data?.depositAccount;

  const groupConditions: Condition[] = useMemo(() => {
    const temp: Condition[] = [
      { column: 'groupId', comparator: 'EqualTo', value: groupId },
      { column: 'memberId', comparator: 'EqualTo', value: memberId },
    ];

    if (filterBy) {
      temp.push({ column: 'objState', comparator: 'EqualTo', value: filterBy });
    }

    if (natureOfDepositProduct?.length) {
      temp.push({ column: 'nature', comparator: 'IN', value: natureOfDepositProduct });
    }

    return temp;
  }, [filterBy, natureOfDepositProduct, groupId, memberId]);

  const { data: groupAccountList } = useGetAccountTableListQuery(
    {
      paginate: { ...getPaginationQuery(), first: -1 },
      filter: groupConditions?.length
        ? {
            orConditions: [
              {
                andConditions: groupConditions,
              },
            ],
          }
        : null,
    },
    { enabled: !!memberId }
  );

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
            accountId: curVal?.id,
            accountType: curVal?.product?.nature ? accountTypes[curVal?.product?.nature] : '',
            balance: curVal?.availableBalance as string,
            fine: '0',
            productName: curVal?.product?.productName,
          },
        } as Option,
      ];
    }, [] as Option[]) ?? [];

  const accountOptions: Option[] = useMemo(() => {
    if (groupAccountList) {
      return (
        groupAccountList?.account?.list?.edges?.reduce((prevVal, curVal) => {
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
                balance: curVal?.node?.availableBalance as string,
                fine: curVal?.node?.dues?.fine as string,
                productName: curVal?.node?.product?.productName,
              },
            } as Option,
          ];
        }, [] as Option[]) ?? []
      );
    }

    return (
      accountsList?.reduce((prevVal, curVal) => {
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
              accountId: curVal?.id,
              accountType: curVal?.product?.nature ? accountTypes[curVal?.product?.nature] : '',
              balance: curVal?.availableBalance as string,
              fine: curVal?.dues?.fine as string,
              productName: curVal?.product?.productName,
            },
          } as Option,
        ];
      }, [] as Option[]) ?? []
    );
  }, [accountsList, groupAccountList]);

  return (
    <Controller
      render={({ field: { value, onChange } }) => (
        <AccountSelect
          label={label}
          isRequired={isRequired}
          name={name}
          value={
            isLinkedAccounts
              ? linkedAccountsOptions?.find((option) => option.value === value)
              : accountOptions?.find((option) => option.value === value)
          }
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
          options={isLinkedAccounts ? linkedAccountsOptions : accountOptions}
          {...rest}
        />
      )}
      name={name}
    />
  );
};
