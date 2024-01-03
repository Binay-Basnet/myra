import { useEffect, useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';
import { MultiValue, SingleValue } from 'chakra-react-select';
import { debounce } from 'lodash';

import { MemberSelect, MemberSelectProps, Option } from '@myra-ui/forms';

import {
  MemberType,
  useAppSelector,
  useGetMemberListQuery,
  useListGroupMemberQuery,
} from '@coop/cbs/data-access';
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
  memberType?: MemberType;
  groupId?: string;
  onChangeAction?: (newValue: MultiValue<Option> | SingleValue<Option>) => void;
}

export const FormMemberSelect = ({
  name,
  label,
  placeholder,
  allMembers,
  excludeIds,
  forceEnableAll,
  isCurrentBranchMember,
  memberType,
  groupId,
  onChangeAction,
  ...rest
}: IMemberSelectProps) => {
  const [IDMember, setIDMember] = useState('');
  const { watch, control } = useFormContext();
  const currrentBranchId = useAppSelector((state) => state?.auth?.user?.currentBranch?.id);

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

    if (groupId) {
      return false;
    }

    return IDMember !== 'undefined';
  }, [router?.asPath, IDMember, groupId]);

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
      /* eslint-disable no-nested-ternary */
      filter: {
        // query: isCurrentBranchMember ? `${currrentBranch} ${IDMember}` : IDMember,
        query: IDMember,
        orConditions: allMembers
          ? []
          : isCurrentBranchMember
          ? [
              {
                andConditions: [
                  {
                    column: 'objState',
                    comparator: 'EqualTo',
                    value: 'APPROVED',
                  },
                  {
                    column: 'serviceCenter',
                    comparator: 'EqualTo',
                    value: currrentBranchId,
                  },
                  {
                    column: 'type',
                    comparator: 'EqualTo',
                    value: memberType || '',
                  },
                ],
              },
              {
                andConditions: [
                  {
                    column: 'objState',
                    comparator: 'EqualTo',
                    value: 'DORMANT',
                  },
                  {
                    column: 'serviceCenter',
                    comparator: 'EqualTo',
                    value: currrentBranchId,
                  },
                  {
                    column: 'type',
                    comparator: 'EqualTo',
                    value: memberType || '',
                  },
                ],
              },
            ]
          : [
              {
                andConditions: [
                  {
                    column: 'objState',
                    comparator: 'EqualTo',
                    value: 'APPROVED',
                  },
                  {
                    column: 'type',
                    comparator: 'EqualTo',
                    value: memberType || '',
                  },
                ],
              },
              {
                andConditions: [
                  {
                    column: 'objState',
                    comparator: 'EqualTo',
                    value: 'DORMANT',
                  },
                  {
                    column: 'type',
                    comparator: 'EqualTo',
                    value: memberType || '',
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

  const { data: groupMembersData, isFetching: isGroupMemberFetching } = useListGroupMemberQuery(
    {
      pagination: { ...getPaginationQuery(), first: 20 },
      groupID: groupId as string,
      filter: {
        query: IDMember,
      },
    },
    { enabled: !!groupId }
  );

  const memberOptions: Option[] = useMemo(() => {
    if (groupMembersData) {
      return (
        groupMembersData?.microFinance?.group?.listGroupMembers?.edges?.reduce(
          (prevVal, curVal) => {
            if (excludeIds?.includes(curVal?.node?.id as string) || !curVal) {
              return prevVal;
            }

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
                  age: curVal?.node?.age,
                  gender: curVal?.node?.gender || 'N/A',
                  maritialStatus: curVal?.node?.maritalStatus || 'N/A',
                  profilePicUrl: curVal?.node?.profilePicUrl,
                  branch: curVal?.node?.branch,
                },
              },
            ];
          },
          [] as Option[]
        ) ?? []
      );
    }

    return (
      memberListData?.reduce((prevVal, curVal) => {
        if (excludeIds?.includes(curVal?.node?.id as string) || !curVal) {
          return prevVal;
        }

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
              age: curVal?.node?.age,
              gender: curVal?.node?.gender || 'N/A',
              maritialStatus: curVal?.node?.maritalStatus || 'N/A',
              profilePicUrl: curVal?.node?.profilePicUrl,
              branch: curVal?.node?.branch,
            },
          },
        ];
      }, [] as Option[]) ?? []
    );
  }, [memberListData, groupMembersData]);

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
          data-testid="member-select"
          value={memberOptions?.find((option) => option.value === value)}
          label={label}
          isLoading={groupId ? isGroupMemberFetching : isFetching}
          isDisabled={isDisabledCheck}
          placeholder={placeholder}
          onChange={(newValue: Option | Option[]) => {
            if (Array.isArray(newValue)) {
              onChange(newValue);
              onChangeAction && onChangeAction(newValue);
            } else {
              // const { value: newVal } = newValue as Option;

              const newVal = (newValue as Option)?.value;

              onChange(newVal);
              onChangeAction && onChangeAction(newValue);
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
