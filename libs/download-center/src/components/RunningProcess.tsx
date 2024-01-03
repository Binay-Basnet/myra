import { useMemo } from 'react';
import { HiOutlineDownload } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import { ApprovalStatusItem } from 'libs/cbs/requests/feature-lists/src/components/ApprovalStatusItem';

import { Button, Column, Icon, Table, Text } from '@myra-ui';

import {
  LeaveStatusEnum,
  useGetElementUrlMutation,
  useListDownloadCentreReportsQuery,
} from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const RunningProcess = () => {
  const { data } = useListDownloadCentreReportsQuery({
    pagination: getPaginationQuery(),
  });

  const { mutateAsync } = useGetElementUrlMutation();

  const rowData = useMemo(
    () => data?.downloadCentre?.listDownloadCentreReports?.edges ?? [],
    [data]
  );

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'S.N',
        accessorFn: (_, index) => index + 1,
      },
      {
        header: 'Process',
        accessorFn: (row) => row?.node?.title,
      },
      {
        header: 'Initiated Date',
        accessorFn: (row) => row?.node?.createdAt?.local,
      },
      {
        header: 'Status',
        accessorFn: (row) => row?.node?.statusOfCompletion,

        cell: (props) => (
          <ApprovalStatusItem
            status={props?.row?.original?.node?.statusOfCompletion as LeaveStatusEnum}
          />
        ),
      },
      {
        header: 'Actions',
        cell: (row) => {
          const status = row?.row?.original?.node?.statusOfCompletion;
          if (status === 'COMPLETED') {
            return (
              <Button
                variant="ghost"
                leftIcon={<Icon as={HiOutlineDownload} size="sm" />}
                onClick={() =>
                  mutateAsync({ id: row?.row?.original?.node?.id as string }).then((res) =>
                    window.open(res?.downloadCentre?.getElementUrl?.url as string, '_blank')
                  )
                }
              >
                Download
              </Button>
            );
          }
          return (
            <Button variant="ghost" leftIcon={<Icon as={IoMdClose} size="sm" />} onClick={() => {}}>
              Cancel
            </Button>
          );
        },
      },
    ],
    []
  );
  return (
    <>
      <Text>Running Process</Text>
      <Table data={rowData} columns={columns} variant="report" size="report" isStatic />
    </>
  );
};

export default RunningProcess;
