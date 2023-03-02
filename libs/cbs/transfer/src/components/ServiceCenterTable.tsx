import { FormSection, GridItem } from '@myra-ui';

import { useAppSelector, useGetBranchListQuery } from '@coop/cbs/data-access';
import { FormEditableTable, FormTextArea } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

import { CashTransferTotalCard } from './CashTransferTotalCard';

export type ServiceCenterTableProps = {
  branchId: string;
  dr: string;
  cr: string;
};
export const ServiceCenterTable = () => {
  const user = useAppSelector((state) => state.auth?.user);
  const { data: branchListQueryData } = useGetBranchListQuery({
    paginate: {
      ...getPaginationQuery(),
      order: null,
    },
  });

  const serviceCenterList = branchListQueryData?.settings?.general?.branch?.list?.edges?.filter(
    (item) => user?.currentBranch?.id !== item?.node?.id
  );

  const serviceCenterOptions = serviceCenterList?.map((serviceCenter) => ({
    label: `${serviceCenter?.node?.name} [${serviceCenter?.node?.branchCode}]` as string,
    value: serviceCenter?.node?.id as string,
  }));

  return (
    <FormSection
      divider={false}
      header="Service Center"
      subHeader="Select Destination Service Center"
      templateColumns={3}
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
              getDisabled: (row) => !!row.cr,
            },
            {
              accessor: 'cr',
              header: 'CR',
              isNumeric: true,
              getDisabled: (row) => !!row.dr,
            },
          ]}
        />
      </GridItem>
      <CashTransferTotalCard />
      <GridItem colSpan={1}>
        <FormTextArea name="note" label="Note" isRequired />
      </GridItem>
    </FormSection>
  );
};
