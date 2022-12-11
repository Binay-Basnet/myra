import { useMemo } from 'react';

import { SelectProps } from '@myra-ui';

import { useGetCoaAccountsUnderLeafListQuery } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import { featureCode } from '@coop/shared/utils';

interface IFormBankSelectProps extends SelectProps {
  name: string;
  label?: string;
}

export const FormBankSelect = (props: IFormBankSelectProps) => {
  const { name, label, ...rest } = props;

  const { data: accountsListQueryData, isFetching } = useGetCoaAccountsUnderLeafListQuery({
    parentId: featureCode.accountCode as string[],
    currentBranch: true,
  });

  const bankOptions = useMemo(
    () =>
      accountsListQueryData?.settings?.chartsOfAccount?.accountsUnderLeaf?.map((item) => ({
        label: item?.name as string,
        value: item?.accountId as string,
      })),
    [accountsListQueryData]
  );

  return (
    <FormSelect name={name} label={label} isLoading={isFetching} options={bankOptions} {...rest} />
  );
};

export default FormBankSelect;
