import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { debounce } from 'lodash';

import {
  Filter_Mode,
  KymIndFormStateQuery,
  ObjState,
  useGetMemberListQuery,
} from '@coop/cbs/data-access';
import { getRouterQuery } from '@coop/shared/utils';

import { Option, SelectProps } from './CustomSelect';
import FormCustomSelect from './FormCustomSelect';

interface IMemberSelectProps extends SelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  allMembers?: boolean;
}

export const FormMemberSelect = ({
  name,
  label,
  placeholder,
  allMembers,
  ...rest
}: IMemberSelectProps) => {
  const [IDMember, setIDMember] = useState('');
  const { watch } = useFormContext();

  const memberId = watch(name);

  const { data: memberList, isFetching } = useGetMemberListQuery(
    {
      pagination: {
        ...getRouterQuery({ type: ['PAGINATION'] }),
        first: 10,
      },
      filter: {
        query: IDMember,
        id: IDMember,
        filterMode: Filter_Mode.Or,
        objState: allMembers ? null : ObjState?.Approved,
      },
    },
    {
      staleTime: 0,
    }
  );

  const memberListData = memberList?.members?.list?.edges;

  const memberOptions: Option[] =
    memberListData?.reduce((prevVal, curVal) => {
      const profileData = curVal?.node?.profile as KymIndFormStateQuery;
      return [
        ...prevVal,
        {
          label: `${curVal?.node?.name?.local} (ID:${curVal?.node?.id})`,
          value: curVal?.node?.id as string,
          memberInfo: {
            address: curVal?.node?.address?.district?.local,
            memberId: curVal?.node?.id,
            code: curVal?.node?.code,
            memberName: curVal?.node?.name?.local,
            age: profileData?.data?.formData?.basicInformation?.age,
            gender: profileData?.data?.formData?.basicInformation?.gender?.local,
            maritialStatus: profileData?.data?.formData?.maritalStatus?.local,
            profilePicUrl: curVal?.node?.profilePicUrl,
          },
        },
      ];
    }, [] as Option[]) ?? [];

  useEffect(() => {
    setIDMember(memberId);
  }, [memberId]);

  return (
    <FormCustomSelect
      name={name}
      label={label}
      isLoading={isFetching}
      placeholder={placeholder}
      onInputChange={debounce((id) => {
        if (id) {
          setIDMember(id);
        } else {
          setIDMember('');
        }
      }, 800)}
      options={memberOptions}
      {...rest}
    />
  );
};
