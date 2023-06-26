import { FormSection } from '@myra-ui';

import { FormEditableTable } from '@coop/shared/form';

type ActivityInputType = {
  fromThis?: string;
  toThis: string;
};

export const PromotionTable = () => (
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
