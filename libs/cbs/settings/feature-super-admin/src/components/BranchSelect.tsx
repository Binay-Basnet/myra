import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { debounce } from 'lodash';

import { Filter_Mode, useGetBranchListQuery } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import { SelectProps } from '@coop/shared/ui';
import { getRouterQuery } from '@coop/shared/utils';

interface IBranchSelectProps extends SelectProps {
  name: string;
  label: string;
  placeholder: string;
}

export const BranchSelect = (props: IBranchSelectProps) => {
  const { name, label, placeholder, ...rest } = props;

  const { watch } = useFormContext();

  const [branchId, setBranchId] = useState('');

  const [trigger, setTrigger] = useState(false);

  const { data: branchListQueryData, isFetching } = useGetBranchListQuery(
    {
      paginate: {
        ...getRouterQuery({ type: ['PAGINATION'] }),
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

  const branchList =
    branchListQueryData?.settings?.general?.branch?.list?.edges;

  const branchOptions = branchList?.map((branch) => {
    return {
      label: `${branch?.node?.name} [${branch?.node?.branchCode}]` as string,
      value: branch?.node?.id as string,
    };
  });

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
      placeholder={placeholder}
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
