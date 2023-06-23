import { FormSection } from '@myra-ui';

import { FormEditableTable } from '@coop/shared/form';

type ActivityInputType = {
  beginsOn: string;

  duration: string;
  isDone: boolean;
  name: string;
  role: string;
  userName: string;
};

export const PromotionTable = () => (
  <FormSection header="Employee Promotion Details" flexLayout>
    <FormEditableTable<ActivityInputType>
      canAddRow={false}
      canDeleteRow={false}
      name="activity_details"
      columns={[
        {
          accessor: 'isDone',
          fieldType: 'checkbox',
          cellWidth: 'sm',
        },
        {
          header: 'Activity Name',
          accessor: 'name',
        },
        {
          header: 'User Name',
          accessor: 'userName',
        },
        {
          header: 'Role',
          accessor: 'role',
        },
        {
          header: 'Begins on',
          accessor: 'beginsOn',
          fieldType: 'date',
        },
        {
          header: 'Duration(h)',
          accessor: 'duration',
        },
      ]}
    />
  </FormSection>
);
