import { useMemo } from 'react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetAppointmentLetterListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const HrRecruitmentAppointmentLetterList = () => {
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
      {
        header: 'Probation Peroid',
        accessorFn: (row) => row?.node?.probationPeriod,
      },
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
          total: data?.hr?.recruitment?.recruitmentJobOffer?.listJobOffer?.totalCount as number,
          pageInfo: data?.hr?.recruitment?.recruitmentJobOffer?.listJobOffer?.pageInfo,
        }}
      />
    </>
  );
};

export default HrRecruitmentAppointmentLetterList;
