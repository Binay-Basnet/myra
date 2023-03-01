import { useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';
import debounce from 'lodash/debounce';

import { BankSelect, BankSelectProps } from '@myra-ui/forms';

import {
  AccountingBankAccountType,
  Filter_Mode,
  useGetBankAccountListQuery,
} from '@coop/cbs/data-access';
import { debitCreditConverter, getRouterQuery } from '@coop/shared/utils';

interface Option {
  label?: string;
  value: string;
  bankInfo: {
    bankName: string;
    accountNo: string;
    displayName: string;
    accountType: AccountingBankAccountType;
    balance: string;
    branchName: string;
  };
}

interface IFormBankSelectProps extends BankSelectProps {
  name: string;
  label?: string;
  currentBranchOnly?: boolean;
}

export const FormBankSelect = (props: IFormBankSelectProps) => {
  const { name, label, currentBranchOnly = false, ...rest } = props;

  const [searchQuery, setSearchQuery] = useState('');

  const { data: bankAccountListQueryData, isFetching } = useGetBankAccountListQuery({
    pagination: { ...getRouterQuery({ type: ['PAGINATION'] }), first: 20 },
    filter: {
      id: searchQuery,
      bankId: searchQuery,
      bankName: searchQuery,
      bankDisplayName: searchQuery,
      accountName: searchQuery,
      filterMode: Filter_Mode.Or,
    },
    currentBranchOnly,
  });

  const bankOptions = useMemo(
    () =>
      bankAccountListQueryData?.accounting?.bankAccounts?.list?.edges?.map((item) => ({
        value: item?.node?.id as string,
        bankInfo: {
          bankName: item?.node?.bankName as string,
          accountNo: item?.node?.accountNo as string,
          displayName: item?.node?.displayName as string,
          accountType: item?.node?.accountType?.replace(/_/gi, ' ').toLowerCase() ?? '',
          balance: debitCreditConverter(
            item?.node?.balance as string,
            item?.node?.balanceType as string
          ),
          branchName: item?.node?.branchName as string,
        },
      })),
    [bankAccountListQueryData, isFetching]
  );

  return (
    <Controller
      render={({ field: { value, onChange } }) => (
        <BankSelect
          label={label}
          value={bankOptions?.find((option) => option.value === value)}
          isLoading={isFetching}
          onChange={(newValue: Option | Option[]) => {
            if (Array.isArray(newValue)) {
              onChange(newValue);
            } else {
              // const { value: newVal } = newValue as Option;
              const newVal = (newValue as Option)?.value;
              onChange(newVal);
            }
          }}
          onInputChange={debounce((query) => {
            // if (query) {
            setSearchQuery(query);
            // }
          }, 800)}
          options={bankOptions}
          filterOption={() => true}
          {...rest}
        />
      )}
      name={name}
    />
  );
};

export default FormBankSelect;
