import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, Button, Text } from '@myra-ui';

import {
  Filter_Mode,
  LocalizedDateFilter,
  useAppSelector,
  useGetBranchListQuery,
} from '@coop/cbs/data-access';
import { formatAddress, getLocalizedTodaysDate, localizedDate } from '@coop/cbs/utils';

type SelectType = {
  label: string;
  value: string;
}[];

export const ReportOrganization = () => {
  const { getValues } = useFormContext();
  const [showAllBranch, setShowAllBranch] = useState<boolean>(false);

  const user = useAppSelector((state) => state.auth.user);

  const period = getValues('period') as LocalizedDateFilter;
  const branchId = getValues('branchId');
  const { data: branchListQueryData } = useGetBranchListQuery(
    {
      paginate: {
        first: -1,
        after: '',
        order: null,
      },
      filter: {
        filterMode: Filter_Mode.Or,
      },
    },
    {
      staleTime: 0,
    }
  );

  const branchList = branchListQueryData?.settings?.general?.branch?.list?.edges;

  const singleName =
    typeof branchId !== 'object'
      ? branchList?.find((c) => c.node?.id === branchId)?.node?.name
      : null;

  const nameList = typeof branchId === 'object' ? (branchId as SelectType) : null;
  useEffect(() => {
    setShowAllBranch(false);
  }, [nameList?.length]);

  return (
    <Box
      borderBottom="1px"
      borderBottomColor="border.layout"
      px="s16"
      py="s16"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        <Box display="flex" gap="s4">
          <Text fontSize="r1" color="gray.700">
            Address:
          </Text>
          <Text fontSize="r1" color="gray.700" fontWeight="500">
            {formatAddress(user?.organization?.address)}
          </Text>
        </Box>

        <Box display="flex" gap="s4">
          <Text fontSize="r1" color="gray.700">
            Regd No:
          </Text>
          <Text fontSize="r1" color="gray.700" fontWeight="500">
            {user?.organization?.registrationDetails?.regdNo ?? 'N/A'}
          </Text>
        </Box>

        <Box display="flex" gap="s4">
          <Text fontSize="r1" color="gray.700">
            Pan:
          </Text>
          <Text fontSize="r1" color="gray.700" fontWeight="500">
            {user?.organization?.registrationDetails?.panOrVat ?? 'N/A'}
          </Text>
        </Box>
        <Box display="flex" gap="s4">
          <Text fontSize="r1" color="gray.700">
            Service Center:
          </Text>
          {singleName?.length && (
            <Text fontSize="r1" color="gray.700" fontWeight="500">
              {singleName}
            </Text>
          )}
          {nameList?.length && nameList?.length > 1 && !showAllBranch && (
            <Box maxW="50ch">
              {nameList?.map((data, index) => {
                if (index === 0) {
                  return (
                    <Box display="flex" flexDirection="row" alignItems="center">
                      <Text as="span" fontSize="r1" color="gray.700" fontWeight="500">
                        {data?.label},{' '}
                      </Text>
                      <Button variant="link" onClick={() => setShowAllBranch(true)}>
                        {`and ${nameList.length - 1} others`}
                      </Button>
                    </Box>
                  );
                }
                return null;
              })}
            </Box>
          )}
          {((nameList?.length && showAllBranch) || (nameList?.length === 1 && !showAllBranch)) && (
            <Box maxW="50ch">
              {nameList?.map((data) => (
                <Text as="span" fontSize="r1" color="gray.700" fontWeight="500">
                  {data?.label},{' '}
                </Text>
              ))}
            </Box>
          )}
        </Box>
      </Box>
      <Box display="flex" flexDir="column" alignItems="flex-end">
        {period?.to ? (
          <Box display="flex" gap="s4">
            <Text fontSize="r1" color="gray.700">
              Statement from:
            </Text>

            <Text fontSize="r1" color="gray.700" fontWeight="500">
              {localizedDate(period?.from)}
            </Text>
            <Text fontSize="r1" color="gray.700">
              to
            </Text>
            <Text fontSize="r1" color="gray.700" fontWeight="500">
              {localizedDate(period?.to)}
            </Text>
          </Box>
        ) : (
          <Box display="flex" gap="s4">
            <Text fontSize="r1" color="gray.700">
              Statement at:
            </Text>

            <Text fontSize="r1" color="gray.700" fontWeight="500">
              {localizedDate(period?.from)}
            </Text>
          </Box>
        )}

        <Box display="flex" gap="s4">
          <Text fontSize="r1" color="gray.700">
            Printed Date:
          </Text>
          <Text fontSize="r1" color="gray.700" fontWeight="500">
            {getLocalizedTodaysDate()}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
