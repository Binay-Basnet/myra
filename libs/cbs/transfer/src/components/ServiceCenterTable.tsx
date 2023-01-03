import { FormSection, GridItem } from '@myra-ui';

import { useGetBranchListQuery } from '@coop/cbs/data-access';
import { FormEditableTable } from '@coop/shared/form';
import { getRouterQuery } from '@coop/shared/utils';

export type ServiceCenterTableProps = {
  branchId: string;
  dr: string;
  cr: string;
};
export const ServiceCenterTable = () => {
  const { data: branchListQueryData } = useGetBranchListQuery({
    paginate: {
      ...getRouterQuery({ type: ['PAGINATION'] }),
      order: null,
    },
  });

  const serviceCenterList = branchListQueryData?.settings?.general?.branch?.list?.edges;

  const serviceCenterOptions = serviceCenterList?.map((serviceCenter) => ({
    label: `${serviceCenter?.node?.name} [${serviceCenter?.node?.branchCode}]` as string,
    value: serviceCenter?.node?.id as string,
  }));

  return (
    <FormSection
      header="Service Center"
      subHeader="Select Destination Service Center"
      templateColumns={1}
    >
      <GridItem colSpan={3}>
        <FormEditableTable<ServiceCenterTableProps>
          name="branchEntries"
          debug={false}
          columns={[
            {
              accessor: 'branchId',
              header: 'Service Center',
              fieldType: 'select',
              cellWidth: 'auto',
              selectOptions: serviceCenterOptions,
            },
            {
              accessor: 'dr',
              header: 'DR',
              isNumeric: true,
            },
            {
              accessor: 'cr',
              header: 'CR',
              isNumeric: true,
            },
          ]}
        />
      </GridItem>
    </FormSection>
  );
};
