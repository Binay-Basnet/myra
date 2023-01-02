import { useState } from 'react';
import { debounce } from 'lodash';

import { Roles, useGetSettingsUserListDataQuery } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import { getRouterQuery } from '@coop/shared/utils';

interface IFormTellerSelectProps {
  name: string;
  label: string;
  isRequired?: boolean;
  excludeIds?: string[];
}

type OptionType = { label: string; value: string };

export const FormTellerSelect = ({
  name,
  label,
  isRequired,
  excludeIds,
}: IFormTellerSelectProps) => {
  const [tellerId, setTellerId] = useState('');

  const { data: agentListQueryData, isFetching } = useGetSettingsUserListDataQuery({
    paginate: {
      ...getRouterQuery({ type: ['PAGINATION'] }),
      first: 10,
    },
    filter: {
      query: tellerId,
      role: [Roles.Teller, Roles.HeadTeller],
    },
  });

  const agentList = agentListQueryData?.settings?.myraUser?.list?.edges;

  const agentOptions = agentList?.reduce((prevVal, curVal) => {
    if (excludeIds?.includes(curVal?.node?.id as string)) return prevVal;

    return [
      ...prevVal,
      {
        label: `${curVal?.node?.name} [ID:${curVal?.node?.id}]`,
        value: curVal?.node?.id as string,
      },
    ];
  }, [] as OptionType[]);

  return (
    <FormSelect
      name={name}
      label={label}
      isRequired={isRequired}
      isLoading={isFetching}
      onInputChange={debounce((id) => {
        if (id) {
          setTellerId(id);
        }
      }, 800)}
      options={agentOptions}
    />
  );
};

export default FormTellerSelect;
