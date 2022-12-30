import { useMemo } from 'react';
import { Controller } from 'react-hook-form';

import { BankSelect, BankSelectProps } from '@myra-ui/forms';

import { AccountingBankAccountType, useGetBankAccountListQuery } from '@coop/cbs/data-access';
import { getRouterQuery } from '@coop/shared/utils';

interface Option {
  label?: string;
  value: string;
  bankInfo: {
    bankName: string;
    accountNo: string;
    displayName: string;
    accountType: AccountingBankAccountType;
    balance: string;
  };
}

interface IFormBankSelectProps extends BankSelectProps {
  name: string;
  label?: string;
}

export const FormBankSelect = (props: IFormBankSelectProps) => {
  const { name, label, ...rest } = props;

  const { data: bankAccountListQueryData, isFetching } = useGetBankAccountListQuery({
    pagination: { ...getRouterQuery({ type: ['PAGINATION'] }), first: -1 },
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
          balance: item?.node?.balance as string,
        },
      })),
    [bankAccountListQueryData]
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
              const { value: newVal } = newValue as Option;
              onChange(newVal);
            }
          }}
          options={bankOptions}
          {...rest}
        />
      )}
      name={name}
    />
  );
};

export default FormBankSelect;
