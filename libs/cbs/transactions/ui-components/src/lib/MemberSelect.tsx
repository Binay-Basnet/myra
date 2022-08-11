import { useState } from 'react';
import { debounce } from 'lodash';

import { Arrange, useGetMemberListQuery } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import { DEFAULT_PAGE_SIZE } from '@coop/shared/ui';

interface IMemberSelectProps {
  name: string;
  label: string;
  placeholder?: string;
}

export const MemberSelect = ({
  name,
  label,
  placeholder,
}: IMemberSelectProps) => {
  const [IDMember, setIDMember] = useState('');
  // const [trigger, setTrigger] = useState(false);

  const { data: memberList, isFetching } = useGetMemberListQuery(
    {
      first: DEFAULT_PAGE_SIZE,
      after: '',
      column: 'ID',
      arrange: Arrange.Desc,
      query: IDMember ?? '',
    },
    {
      staleTime: 0,
      // enabled: trigger,
    }
  );

  const memberListData = memberList?.members?.list?.edges;

  type optionType = { label: string; value: string };

  const memberOptions = memberListData?.reduce((prevVal, curVal) => {
    return [
      ...prevVal,
      {
        label: `${curVal?.node?.name?.local} (ID:${curVal?.node?.id})`,
        value: curVal?.node?.id as string,
      },
    ];
  }, [] as optionType[]);

  return (
    <FormSelect
      name={name}
      label={label}
      isLoading={isFetching}
      placeholder={placeholder}
      onInputChange={debounce((id) => {
        setIDMember(id);
        // setTrigger(true);
      }, 800)}
      options={memberOptions}
    />
  );
};
