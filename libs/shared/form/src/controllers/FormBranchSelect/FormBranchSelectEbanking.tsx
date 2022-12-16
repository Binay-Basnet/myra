import { SelectProps } from '@myra-ui';

import { useGetBranchListEbankingQuery } from '@coop/ebanking/data-access';
import { FormSelect } from '@coop/shared/form';

interface IFormBranchSelectProps extends SelectProps {
  name: string;
  label: string;
}

export const FormBranchSelectEbanking = (props: IFormBranchSelectProps) => {
  const { name, label, ...rest } = props;

  const { data: branchListQueryData, isFetching } = useGetBranchListEbankingQuery();

  const branchList = branchListQueryData?.eBanking?.cooperativeServices?.cheque?.branchList?.data;

  const branchOptions = branchList?.map((branch) => ({
    label: `${branch?.name} [${branch?.branchCode}]` as string,
    value: branch?.id as string,
  }));

  return (
    <FormSelect
      name={name}
      label={label}
      isLoading={isFetching}
      options={branchOptions}
      {...rest}
    />
  );
};

export default FormBranchSelectEbanking;
