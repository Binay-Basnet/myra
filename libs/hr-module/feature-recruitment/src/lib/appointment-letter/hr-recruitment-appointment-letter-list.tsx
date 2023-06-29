import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, PageHeader, Table, TablePopover } from '@myra-ui';

import { useGetAppointmentLetterListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

export const HrRecruitmentAppointmentLetterList = () => {
  const router = useRouter();
  const { data, isFetching } = useGetAppointmentLetterListQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(
    () => data?.hr?.recruitment?.recruitmentAppointmentLetter?.listAppointmentLetter?.edges ?? [],
    [data]
  );

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Application ID',
        accessorFn: (row) => row?.node?.applicantId,
      },
      {
        header: 'Name',
        accessorFn: (row) => row?.node?.name,
      },
      // {
      //   header: 'Probation Peroid',
      //   accessorFn: (row) => row?.node?.probationPeriod,
      // },
      {
        header: 'Offer Date',
        accessorFn: (row) => row?.node?.offerDate?.local,
      },
      {
        header: 'Email',
        accessorFn: (row) => row?.node?.email,
      },
      {
        header: 'Designation',
        accessorFn: (row) => row?.node?.designation,
      },
      {
        id: '_actions',
        header: '',
        cell: (props) =>
          props?.row?.original?.node && (
            <TablePopover
              node={props?.row?.original?.node}
              items={[
                {
                  title: 'Edit',
                  onClick: (row) => {
                    router.push(
                      `${ROUTES?.HR_RECRUITMENT_APPOINTMENT_LETTER_EDIT}?id=${row?.applicantId}`
                    );
                  },
                },
              ]}
            />
          ),
        meta: {
          width: '3.125rem',
        },
      },
    ],
    []
  );
  return (
    <>
      <PageHeader heading="Appointment letter" />{' '}
      <Table
        isLoading={isFetching}
        data={rowData}
        columns={columns}
        pagination={{
          total: data?.hr?.recruitment?.recruitmentAppointmentLetter?.listAppointmentLetter
            ?.totalCount as number,
          pageInfo:
            data?.hr?.recruitment?.recruitmentAppointmentLetter?.listAppointmentLetter?.pageInfo,
        }}
      />
    </>
  );
};

export default HrRecruitmentAppointmentLetterList;
