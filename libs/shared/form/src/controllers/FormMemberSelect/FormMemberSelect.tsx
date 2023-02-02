import { useEffect, useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';

import { MemberSelect, MemberSelectProps, Option } from '@myra-ui/forms';

import {
  Filter_Mode,
  KymIndFormStateQuery,
  ObjState,
  useGetMemberListQuery,
} from '@coop/cbs/data-access';
import { getRouterQuery } from '@coop/shared/utils';
// import FormCustomSelect from './FormCustomSelect';

interface IMemberSelectProps extends MemberSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  allMembers?: boolean;
  excludeIds?: string[];
}

export const FormMemberSelect = ({
  name,
  label,
  placeholder,
  allMembers,
  excludeIds,
  ...rest
}: IMemberSelectProps) => {
  const [IDMember, setIDMember] = useState('');
  const { watch, control } = useFormContext();

  const router = useRouter();

  const memberId = watch(name);

  const isFetchEnabled = useMemo(() => {
    if (router?.asPath?.includes('/edit') || router?.asPath?.includes('/print')) {
      return !!IDMember;
    }

    if (router?.query?.['memberId']) {
      return !!IDMember;
    }

    return IDMember !== 'undefined';
  }, [router?.asPath, IDMember]);

  const { data: memberList, isFetching } = useGetMemberListQuery(
    {
      pagination: {
        ...getRouterQuery({ type: ['PAGINATION'] }),
        first: 8,
      },
      filter: {
        query: IDMember,
        id: IDMember,
        memberCode: IDMember,
        mobileNo: IDMember,
        filterMode: Filter_Mode.Or,
        objState: allMembers ? null : ObjState?.Approved,
      },
    },
    {
      staleTime: 0,
      enabled: isFetchEnabled,
    }
  );

  const memberListData = memberList?.members?.list?.edges;

  const memberOptions: Option[] =
    memberListData?.reduce((prevVal, curVal) => {
      if (excludeIds?.includes(curVal?.node?.id as string) || !curVal) {
        return prevVal;
      }

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
            branch: curVal?.node?.branch,
          },
        },
      ];
    }, [] as Option[]) ?? [];

  useEffect(() => {
    if (
      (router?.query?.['memberId'] ||
        router?.asPath?.includes('/edit') ||
        router?.asPath?.includes('/print')) &&
      memberId
    ) {
      setIDMember(memberId);
    }
  }, [memberId, router]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <MemberSelect
          name={name}
          value={memberOptions?.find((option) => option.value === value)}
          label={label}
          isLoading={isFetching}
          placeholder={placeholder}
          onChange={(newValue: Option | Option[]) => {
            if (Array.isArray(newValue)) {
              onChange(newValue);
            } else {
              const { value: newVal } = newValue as Option;
              onChange(newVal);
            }
          }}
          onInputChange={debounce((id) => {
            // if (id) {
            setIDMember(id);
            // }
          }, 800)}
          options={memberOptions}
          filterOption={() => true}
          {...rest}
        />
      )}
    />
  );
};
