import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Option } from '@myra-ui/forms';

import { useAppSelector, useGetMemberListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

interface UseMemberSelectProps {
  memberSearch?: string;
  forceEnableAll?: boolean;
  memberType?: string;
  allMembers?: boolean;
  isCurrentBranchMember?: boolean;
  excludeIds?: string[];
}

export const useMemberSelect = ({
  memberSearch,
  forceEnableAll,
  memberType,
  isCurrentBranchMember,
  excludeIds,
  allMembers,
}: UseMemberSelectProps) => {
  const currrentBranchId = useAppSelector((state) => state?.auth?.user?.currentBranch?.id);

  const router = useRouter();

  const isFetchEnabled = useMemo(() => {
    if (forceEnableAll) {
      return true;
    }
    if (router?.asPath?.includes('/edit') || router?.asPath?.includes('/print')) {
      return !!memberSearch;
    }

    if (router?.query?.['memberId']) {
      return !!memberSearch;
    }

    return memberSearch !== 'undefined';
  }, [router?.asPath, memberSearch]);

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
        query: memberSearch,
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

  const memberOptions: Option[] =
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
    }, [] as Option[]) ?? [];

  return { memberOptions, isFetching };
};
