import { useState } from 'react';
import { debounce } from 'lodash';

import { Roles, useGetSettingsUserListDataQuery } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import { getRouterQuery } from '@coop/shared/utils';

interface IAgentSelectProps {
  name: string;
  label: string;
  __placeholder?: string;
}

export const AgentSelect = ({
  name,
  label,
  __placeholder,
}: IAgentSelectProps) => {
  const [agentId, setAgentId] = useState('');
  const [trigger, setTrigger] = useState(false);

  const { data: agentListQueryData, isFetching } =
    useGetSettingsUserListDataQuery(
      {
        paginate: getRouterQuery({ type: ['PAGINATION'] }),
        filter: {
          query: agentId,
          role: Roles.Agent,
        },
      },
      {
        staleTime: 0,
        enabled: trigger,
      }
    );

  // useEffect(() => {
  //   setAgentId(watch(name));
  // }, [watch(name)]);

  const agentList = agentListQueryData?.settings?.myraUser?.list?.edges;

  type optionType = { label: string; value: string };

  const agentOptions = agentList?.reduce((prevVal, curVal) => {
    return [
      ...prevVal,
      {
        label: `${curVal?.node?.name} [ID:${curVal?.node?.id}]`,
        value: curVal?.node?.id as string,
      },
    ];
  }, [] as optionType[]);

  return (
    <FormSelect
      name={name}
      label={label}
      isLoading={isFetching}
      __placeholder={__placeholder}
      onInputChange={debounce((id) => {
        if (id) {
          setAgentId(id);
          setTrigger(true);
        }
      }, 800)}
      options={agentOptions}
    />
  );
};
