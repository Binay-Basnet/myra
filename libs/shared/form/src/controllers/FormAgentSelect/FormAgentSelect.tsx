import { useState } from 'react';
import { debounce } from 'lodash';

import { Roles, useGetSettingsUserListDataQuery } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import { getRouterQuery } from '@coop/shared/utils';

interface IFormAgentSelectProps {
  name: string;
  label: string;
}

type OptionType = { label: string; value: string };

export const FormAgentSelect = ({ name, label }: IFormAgentSelectProps) => {
  const [agentId, setAgentId] = useState('');

  const { data: agentListQueryData, isFetching } = useGetSettingsUserListDataQuery({
    paginate: {
      ...getRouterQuery({ type: ['PAGINATION'] }),
      first: 10,
    },
    filter: {
      query: agentId,
      role: Roles.Agent,
    },
  });

  const agentList = agentListQueryData?.settings?.myraUser?.list?.edges;

  const agentOptions = agentList?.reduce(
    (prevVal, curVal) => [
      ...prevVal,
      {
        label: `${curVal?.node?.name} [ID:${curVal?.node?.id}]`,
        value: curVal?.node?.id as string,
      },
    ],
    [] as OptionType[]
  );

  return (
    <FormSelect
      name={name}
      label={label}
      isLoading={isFetching}
      onInputChange={debounce((id) => {
        if (id) {
          setAgentId(id);
        }
      }, 800)}
      options={agentOptions}
    />
  );
};

export default FormAgentSelect;
