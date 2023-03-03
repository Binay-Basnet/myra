import { useEffect, useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';

import { MemberSelect, MemberSelectProps, Option } from '@myra-ui/forms';

import { KymIndFormStateQuery, useAppSelector, useGetMemberListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';
// import FormCustomSelect from './FormCustomSelect';

interface IMemberSelectProps extends MemberSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  allMembers?: boolean;
  excludeIds?: string[];
  forceEnableAll?: boolean;
  isCurrentBranchMember?: boolean;
}

export const FormMemberSelect = ({
  name,
  label,
  placeholder,
  allMembers,
  excludeIds,
  forceEnableAll,
  isCurrentBranchMember,
  ...rest
}: IMemberSelectProps) => {
  const [IDMember, setIDMember] = useState('');
  const { watch, control } = useFormContext();
  const currrentBranch = useAppSelector((state) => state?.auth?.user?.currentBranch?.name);

  const router = useRouter();

  const memberId = watch(name);
  const isDisabledCheck = useMemo(() => {
    if (forceEnableAll) {
      return false;
    }
    if (router?.asPath?.includes('/edit')) {
      return true;
    }
    if (router?.query?.['memberId']) {
      return true;
    }
    return false;
  }, [router?.asPath]);

  const isFetchEnabled = useMemo(() => {
    if (forceEnableAll) {
      return true;
    }
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
        ...getPaginationQuery(),
        first: 20,
        order: {
          arrange: 'ASC',
          column: 'ID',
        },
      },
      filter: {
        query: isCurrentBranchMember ? (currrentBranch as unknown as string) : IDMember,
        orConditions: allMembers
          ? []
          : [
              {
                andConditions: [
                  {
                    column: 'objState',
                    comparator: 'EqualTo',
                    value: 'APPROVED',
                  },
                ],
              },
            ],
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
          isDisabled={isDisabledCheck}
          placeholder={placeholder}
          onChange={(newValue: Option | Option[]) => {
            if (Array.isArray(newValue)) {
              onChange(newValue);
            } else {
              // const { value: newVal } = newValue as Option;

              const newVal = (newValue as Option)?.value;

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
