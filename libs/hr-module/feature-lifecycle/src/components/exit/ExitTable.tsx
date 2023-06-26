import { FormSection } from '@myra-ui';

import { FormEditableTable } from '@coop/shared/form';

type ActivityInputType = {
  done: boolean;
  activityName: string;
  user: string;
  role: string;
  beginsOn: string;
  duration: string;
};

export const ExitChecklists = () => (
  <FormSection header="Checklists" flexLayout>
    <FormEditableTable<ActivityInputType>
      name="checklists"
      columns={[
        {
          accessor: 'done',
          fieldType: 'checkbox',
          cellWidth: 'sm',
        },
        {
          header: 'Activity Name',
          accessor: 'activityName',
        },
        {
          header: 'User ',
          accessor: 'user',
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
