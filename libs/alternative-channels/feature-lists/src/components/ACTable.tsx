import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import dayjs from 'dayjs';

import {
  AlternativeChannelServiceType,
  AlternativeChannelStatus,
  useGetAlternativeChannelListQuery,
} from '@coop/cbs/data-access';
import { Column, Table } from '@coop/shared/table';
import { Box, ChakraModal, DetailCardContent, Grid, SwitchTabs } from '@coop/shared/ui';
import { getRouterQuery, useTranslation } from '@coop/shared/utils';

interface ACTableProps {
  serviceType: AlternativeChannelServiceType;
}

export const ACTable = ({ serviceType }: ACTableProps) => {
  const { t } = useTranslation();
  const { isOpen, onClose, onToggle } = useDisclosure();
  const router = useRouter();

  const { data, isLoading } = useGetAlternativeChannelListQuery({
    filter: {
      serviceType,
    },
    paginate: getRouterQuery({ type: ['PAGINATION'] }),
  });

  const alternativeList = data?.alternativeChannel?.list?.edges ?? [];

  const selectedMember = alternativeList?.find((member) => member?.data?.id === router.query['id']);

  const columns = useMemo<Column<typeof alternativeList[0]>[]>(
    () => [
      {
        accessorFn: (row) => row?.data?.name?.local,
        header: t['acName'],
        meta: {
          width: '80%',
        },
      },

      {
        header: t['acStatus'],
        accessorFn: (row) => row?.data?.serviceStatus,
        cell: ({ getValue }) => (
          <Box display="flex" alignItems="center" gap="s8">
            {getValue() === AlternativeChannelStatus.Active ? (
              <Box w="8px" h="8px" bg="primary.500" borderRadius="100%" />
            ) : (
              <Box w="8px" h="8px" bg="danger.500" borderRadius="100%" />
            )}
            <Box>
              {getValue() === AlternativeChannelStatus.Active ? t['acActive'] : t['acInactive']}
            </Box>
          </Box>
        ),
      },
      {
        id: 'phoneNumber',
        header: t['acPhoneNumber'],

        accessorFn: (row) => row?.data?.phoneNumber,
        meta: {
          width: '150px',
        },
      },
      {
        id: 'status',
        header: t['acCoopConnection'],
        meta: {
          width: '200px',
        },
        accessorFn: (row) => row?.data?.coopConnection,
        cell: ({ getValue }) => (getValue() ? t['yes'] : t['no']),
      },
    ],
    [t]
  );

  return (
    <>
      <Table
        isLoading={isLoading}
        columns={columns}
        rowOnClick={(row) => {
          router.push(
            {
              query: {
                id: row?.data?.id,
              },
            },
            undefined,
            { shallow: true }
          );
          onToggle();
        }}
        data={alternativeList}
        pagination={{
          total: data?.alternativeChannel?.list?.totalCount ?? 'Many',
          pageInfo: data?.alternativeChannel?.list?.pageInfo,
        }}
      />

      <ChakraModal
        width="2xl"
        primaryButtonLabel={t['saveChanges']}
        secondaryButtonLabel={t['discardChanges']}
        isSecondaryDanger
        onClose={onClose}
        title="acUpdateUser"
        open={isOpen}
      >
        <Grid templateColumns="repeat(2, 1fr)" gap="s32">
          <DetailCardContent title={t['acName']} subtitle={selectedMember?.data?.name?.local} />
          <DetailCardContent
            title={t['acPhoneNumber']}
            subtitle={selectedMember?.data?.phoneNumber}
          />
          <DetailCardContent
            title={t['acCoopConnection']}
            subtitle={selectedMember?.data?.coopConnection ? t['yes'] : t['no']}
          />
          <DetailCardContent
            title={t['acLastActive']}
            subtitle={dayjs(selectedMember?.data?.lastActive).format('DD MMM YYYY [at] hh:mm A')}
          />
          <SwitchTabs
            value={selectedMember?.data?.serviceStatus ?? AlternativeChannelStatus?.Inactive}
            options={[
              { label: 'Active', value: AlternativeChannelStatus?.Active },
              { label: 'Inactive', value: AlternativeChannelStatus?.Inactive },
            ]}
            label={t['acServiceStatus']}
          />
        </Grid>
      </ChakraModal>
    </>
  );
};
