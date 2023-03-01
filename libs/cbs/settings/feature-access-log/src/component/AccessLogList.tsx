import { useMemo, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { AUDIT_LOG_ICONS } from 'libs/cbs/settings/feature-audit-log/constants/AUDIT_LOG_ICONS';

import { Box, Column, Drawer, Grid, GridItem, Icon, Table, Text } from '@myra-ui';

import { useGetAccessLogListQuery } from '@coop/cbs/data-access';
import { getRouterQuery } from '@coop/shared/utils';

export const AccessLogList = () => {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const [accessLogId, setAccessLogId] = useState('');

  const { data } = useGetAccessLogListQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
  });

  const accessList = data?.accessLog?.raw?.data;

  const accessLogList = accessList && accessList?.filter((item) => item?.id === accessLogId);

  const filteredData = {
    ...accessLogList,
    AuditLog:
      accessLogList &&
      (accessLogList[0]?.AuditLog as
        | ({
            timestamp?: string | null;
            narration?: string | null;
            extraData?: string[];
          } | null)[]
        | null
        | undefined),
  };
  const auditLogList = filteredData?.AuditLog ?? [];

  const rowData = useMemo(() => data?.accessLog?.raw?.data ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'User',
        accessorFn: (row) => row?.User?.name,
        cell: (props) => props?.row?.original?.User?.name ?? '-',
      },
      {
        header: 'Timestamp',
        accessorFn: (row) => row?.createdAt,
      },
      {
        header: 'Source IP',
        accessorFn: (row) => row?.ip,
      },
      {
        header: 'Transferred Data',
        accessorFn: (row) => row?.bytesSent,
        cell: (props) =>
          `${(Number(props?.row?.original?.bytesSent) / 1024).toFixed(2)}kb/${(
            Number(props?.row?.original?.bytesReceived) / 1024
          ).toFixed(2)}kb`,
      },
      {
        header: 'Time Elapsed',
        accessorFn: (row) => row?.elapsedTime,
        cell: (props) => `${props?.row?.original?.elapsedTime}ms`,
      },
    ],
    []
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      p="s16"
      gap="s8"
      borderRadius="br2"
      border="1px solid"
      borderColor="border.layout"
    >
      <Box gap="s4">
        <Text fontWeight="SemiBold" color="gray.800" fontSize="r1" lineHeight="125%">
          Access Logs
        </Text>
        <Text fontWeight="Regular" color="gray.600" fontSize="r1" lineHeight="125%">
          a log file that records all events related to client applications and user access to a
          resource on a computer.
        </Text>
      </Box>
      <Table
        isDetailPageTable
        showFooter
        isStatic
        isLoading={false}
        data={rowData ?? []}
        columns={columns}
        rowOnClick={(row) => {
          setAccessLogId(row?.id ?? '0');
          onOpen();
        }}
        pagination={{
          total: 'Many',
        }}
      />

      <Drawer title="Access Log - 765468" open={isOpen} onClose={onClose}>
        <Box display="flex" flexDirection="column" gap="s16">
          <Grid
            templateColumns="repeat(2,1fr)"
            gap="s16"
            pb="s16"
            borderBottom="1px solid"
            borderBottomColor="border.layout"
            borderRadius="br2"
          >
            {accessLogList?.map((item) => (
              <>
                <GridItem>
                  <Text fontWeight="Regular" color="gray.600" lineHeight="125%" fontSize="r1">
                    User
                  </Text>
                  <Text fontWeight="SemiBold" color="gray.800" lineHeight="125%" fontSize="r1">
                    {item?.User?.name ?? '-'}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="Regular" color="gray.600" lineHeight="125%" fontSize="r1">
                    Source IP
                  </Text>
                  <Text fontWeight="SemiBold" color="gray.800" lineHeight="125%" fontSize="r1">
                    {item?.ip ?? '-'}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="Regular" color="gray.600" lineHeight="125%" fontSize="r1">
                    Time Elapsed
                  </Text>
                  <Text fontWeight="SemiBold" color="gray.800" lineHeight="125%" fontSize="r1">
                    {item?.elapsedTime ?? '-'}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="Regular" color="gray.600" lineHeight="125%" fontSize="r1">
                    Timestamp
                  </Text>
                  <Text fontWeight="SemiBold" color="gray.800" lineHeight="125%" fontSize="r1">
                    {item?.createdAt ?? '-'}
                  </Text>
                </GridItem>
              </>
            ))}
          </Grid>

          <Box display="flex" flexDirection="column" gap="s16">
            <Text fontWeight="Regular" color="gray.600" lineHeight="125%" fontSize="r1">
              Audit Logs
            </Text>
            <Box display="flex" flexDir="column" gap="s8">
              <Box display="flex" flexDir="column" gap="s16">
                {auditLogList?.length !== 0 ? (
                  auditLogList?.map((audit) => (
                    <Box
                      p="s8"
                      display="flex"
                      borderRadius="br2"
                      border="1px"
                      borderColor="border.layout"
                      justifyContent="space-between"
                    >
                      <Box display="flex" gap="s16">
                        <Icon as={AUDIT_LOG_ICONS['ADD']} size="xl" />
                        <Text color="gray.700" fontSize="r1" fontWeight="Medium">
                          {audit?.narration}
                        </Text>
                      </Box>
                      <Text fontSize="s3" color="gray.500">
                        {dayjs(audit?.timestamp).format('DD MMM YYYY [at] hh:mm A')}
                      </Text>
                    </Box>
                  ))
                ) : (
                  <Text fontWeight="Regular" color="gray.600" lineHeight="125%" fontSize="s3">
                    No Data
                  </Text>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
