import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { debounce } from 'lodash';

import { SelectProps } from '@myra-ui';

import { useGetCoaAccountListWithoutBalanceQuery } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';

interface IFormBranchSelectProps extends SelectProps {
  name: string;
  label: string;
  branchId: string;
}

export const FormCOASelect = (props: IFormBranchSelectProps) => {
  const { name, label, branchId, ...rest } = props;

  const { watch } = useFormContext();

  const [coaName, setCOAName] = useState('');

  const { data: branchListQueryData, isFetching } = useGetCoaAccountListWithoutBalanceQuery(
    {
      pagination: {
        after: '',
        first: 20,
      },
      filter: {
        query: coaName,
        orConditions: [
          {
            andConditions: [
              {
                column: 'branch',
                comparator: 'EqualTo',
                value: branchId,
              },
            ],
          },
        ],
      },
    },
    {
      staleTime: 0,
      enabled: !!branchId,
    }
  );

  const coaList =
    branchListQueryData?.settings?.chartsOfAccount?.coaAccountListWithoutBalance?.edges;

  const coaOptions = coaList?.map((coa) => ({
    label: `${coa?.node?.accountName?.local}` as string,
    value: coa?.node?.accountCode as string,
  }));

  const coa = watch(name);

  useEffect(() => {
    if (coa && !coaOptions?.length) {
      setCOAName(coa);
      // setTrigger(true);
    }
  }, [coa, coaOptions]);

  return (
    <FormSelect
      name={name}
      label={label}
      isLoading={isFetching}
      onInputChange={debounce((newCoaName) => {
        if (newCoaName) {
          setCOAName(newCoaName);
        }
      }, 800)}
      options={coaOptions}
      {...rest}
    />
  );
};

export default FormCOASelect;
