import { useGetSalaryAssignmentListWithExtraDetailsListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

interface SalaryAssignmentType {
  serviceCenter: string;
  department: string;
  designation: string;
}

export const useGetSalaryAssignmentsWithExtraDetails = (props: SalaryAssignmentType) => {
  const { serviceCenter, department, designation } = props;
  const { data } = useGetSalaryAssignmentListWithExtraDetailsListQuery({
    pagination: {
      ...getPaginationQuery(),
      first: -1,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
    filter: {
      orConditions: [
        {
          andConditions: [
            {
              column: 'serviceCenter',
              comparator: 'EqualTo',
              value: serviceCenter || '',
            },
            {
              column: 'department',
              comparator: 'EqualTo',
              value: department || '',
            },
            {
              column: 'designation',
              comparator: 'EqualTo',
              value: designation || '',
            },
          ],
        },
      ],
    },
  });
  const salaryAssignmentData =
    data?.hr?.payroll?.payrollRun?.ListSalaryAssignmentWithExtraDetails?.edges?.map(
      (item) => item?.node
    );

  return salaryAssignmentData;
};

export default useGetSalaryAssignmentsWithExtraDetails;
