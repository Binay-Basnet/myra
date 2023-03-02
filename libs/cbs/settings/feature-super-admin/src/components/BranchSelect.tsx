import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { debounce } from 'lodash';

import { Filter_Mode, useGetBranchListQuery } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import { SelectProps } from '@myra-ui';
import { getPaginationQuery } from '@coop/shared/utils';

interface IBranchSelectProps extends SelectProps {
  name: string;
  label: string;
  __placeholder: string;
}

export const BranchSelect = (props: IBranchSelectProps) => {
  const { name, label, __placeholder: placeholder, ...rest } = props;

  const { watch } = useFormContext();

  const [branchId, setBranchId] = useState('');

  const [trigger, setTrigger] = useState(false);

  const { data: branchListQueryData, isFetching } = useGetBranchListQuery(
    {
      paginate: {
        ...getPaginationQuery(),
        order: null,
      },
      filter: {
        query: branchId,
        id: branchId,
        filterMode: Filter_Mode.Or,
      },
    },
    {
      staleTime: 0,
      enabled: trigger,
    }
  );

  const branchList = branchListQueryData?.settings?.general?.branch?.list?.edges;

  const branchOptions = branchList?.map((branch) => ({
    label: `${branch?.node?.name} [${branch?.node?.branchCode}]` as string,
    value: branch?.node?.id as string,
  }));

  const branch = watch('branch');

  useEffect(() => {
    if (branch && !branchOptions?.length) {
      setBranchId(branch);
      setTrigger(true);
    }
  }, [branch, branchOptions]);

  return (
    <FormSelect
      name={name}
      label={label}
      isLoading={isFetching}
      __placeholder={placeholder}
      onInputChange={debounce((id) => {
        if (id) {
          setBranchId(id);
          setTrigger(true);
        }
      }, 800)}
      options={branchOptions}
      {...rest}
    />
  );
};
