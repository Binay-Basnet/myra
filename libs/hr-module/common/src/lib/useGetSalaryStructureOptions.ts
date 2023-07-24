import { useGetSalaryStructureListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const useGetSalaryStructureOptions = () => {
  const { data: salaryStructureData } = useGetSalaryStructureListQuery({
    pagination: {
      ...getPaginationQuery(),
      first: -1,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
  });
  const salaryStructureOptions =
    salaryStructureData?.settings?.general?.HCM?.payroll?.salaryStructure?.listSalaryStructure?.edges?.map(
      (item) => ({
        label: item?.node?.name as string,
        value: item?.node?.id as string,
      })
    );

  return { salaryStructureOptions };
};

export default useGetSalaryStructureOptions;
