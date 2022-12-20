import { useMemo } from 'react';

import { SelectProps } from '@myra-ui';

import { useGetBankAccountListQuery } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import { getRouterQuery } from '@coop/shared/utils';

interface IFormBankSelectProps extends SelectProps {
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
        label: item?.node?.displayName as string,
        value: item?.node?.id as string,
      })),
    [bankAccountListQueryData]
  );

  return (
    <FormSelect name={name} label={label} isLoading={isFetching} options={bankOptions} {...rest} />
  );
};

export default FormBankSelect;
