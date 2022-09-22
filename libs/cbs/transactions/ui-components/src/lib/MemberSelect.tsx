import { useState } from 'react';
import { debounce } from 'lodash';

import { Filter_Mode, useGetMemberListQuery } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import { getRouterQuery } from '@coop/shared/utils';

interface IMemberSelectProps {
  name: string;
  label: string;
  __placeholder?: string;
}
type OptionType = { label: string; value: string };

export const MemberSelect = ({ name, label, __placeholder }: IMemberSelectProps) => {
  const [IDMember, setIDMember] = useState('');
  const [trigger, setTrigger] = useState(false);

  const { data: memberList, isFetching } = useGetMemberListQuery(
    {
      pagination: getRouterQuery({ type: ['PAGINATION'] }),
      filter: {
        query: IDMember,
        id: IDMember,
        filterMode: Filter_Mode.Or,
      },
    },
    {
      staleTime: 0,
      enabled: trigger,
    }
  );

  // useEffect(() => {
  //   setIDMember(watch(name));
  // }, [watch(name)]);

  const memberListData = memberList?.members?.list?.edges;

  const memberOptions = memberListData?.reduce(
    (prevVal, curVal) => [
      ...prevVal,
      {
        label: `${curVal?.node?.name?.local} (ID:${curVal?.node?.id})`,
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
      __placeholder={__placeholder}
      onInputChange={debounce((id) => {
        if (id) {
          setIDMember(id);
          setTrigger(true);
        }
      }, 800)}
      options={memberOptions}
    />
  );
};
