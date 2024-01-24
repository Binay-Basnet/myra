import { useMemo, useState } from 'react';
import { HiOutlineDownload } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import { ApprovalStatusItem } from 'libs/cbs/requests/feature-lists/src/components/ApprovalStatusItem';
import isEmpty from 'lodash/isEmpty';

import { Box, Button, Column, Divider, Icon, Modal, Table, Text } from '@myra-ui';

import {
  LeaveStatusEnum,
  useGetElementUrlMutation,
  useListDownloadCentreReportsQuery,
} from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = `${(date.getMonth() + 1).toString().padStart(2, '0')}`;
  const day = `${date.getDate().toString().padStart(2, '0')}`;
  return `${year}-${month}-${day}`;
};

export const RunningProcess = () => {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [remark, setRemark] = useState('');
  const dateToBeSent = formatDate(new Date());

  const { data } = useListDownloadCentreReportsQuery({
    pagination: getPaginationQuery(),
    filter: {
      orConditions: [
        {
          andConditions: [
            {
              column: 'createdAt',
              comparator: 'BETWEEN',
              value: {
                from: dateToBeSent,
                to: dateToBeSent,
              },
            },
          ],
        },
      ],
    },
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
        meta: {
          width: '1%',
        },
      },
      {
        header: 'Process',
        accessorFn: (row) => row?.node?.title,
      },
      {
        header: 'Initiated Date',
        accessorFn: (row) => localizedDate(row?.node?.createdAtLocalized),
      },
      {
        header: 'File Type',
        accessorFn: (row) => row?.node?.fileType,
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
            <Button
              variant="ghost"
              leftIcon={<Icon as={IoMdClose} size="sm" />}
              onClick={() => {
                setIsErrorModalOpen(true);
                setRemark(row?.row?.original?.node?.remark as string);
              }}
            >
              View Error
            </Button>
          );
        },
      },
    ],
    []
  );

  const handleErrorModalClose = () => {
    setIsErrorModalOpen(false);
    setRemark('');
  };

  if (!isEmpty(rowData)) {
    return (
      <>
        <Text fontSize="r1">Running Process</Text>
        <Box maxH="30vh" overflowY="auto">
          <Table data={rowData} columns={columns} variant="report" size="report" isStatic />
        </Box>
        <Divider my="s16" />
        <Modal
          open={isErrorModalOpen}
          onClose={handleErrorModalClose}
          isCentered
          title="Error"
          width="3xl"
        >
          <Text>{remark}</Text>
        </Modal>
      </>
    );
  }
  return null;
};

export default RunningProcess;
