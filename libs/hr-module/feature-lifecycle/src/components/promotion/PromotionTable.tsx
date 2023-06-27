import { FormSection } from '@myra-ui';

import { useGetDesignationListQuery } from '@coop/cbs/data-access';
import { FormEditableTable } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

type ActivityInputType = {
  fromThis?: string;
  toThis: string;
};

export const PromotionTable = () => {
  const { data: designationData } = useGetDesignationListQuery({
    pagination: {
      ...getPaginationQuery(),
      first: -1,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
  });
  const designationOptions =
    designationData?.settings?.general?.HCM?.employee?.employee?.listDesignation?.edges?.map(
      (item) => ({
        label: item?.node?.name as string,
        value: item?.node?.id as string,
      })
    );

  return (
    <FormSection header="Employee Promotion Details" flexLayout>
      <FormEditableTable<ActivityInputType>
        canAddRow={false}
        canDeleteRow={false}
        name="activity_details"
        columns={[
          {
            header: 'New Degisnation',
            accessor: 'toThis',
            cellWidth: 'lg',
            fieldType: 'select',
            selectOptions: designationOptions,
          },
          {
            header: 'Current Degisnation',
            accessor: 'fromThis',
            cellWidth: 'auto',
          },
        ]}
      />
    </FormSection>
  );
};
