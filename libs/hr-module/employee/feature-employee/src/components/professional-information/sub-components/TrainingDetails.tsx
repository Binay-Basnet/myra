import { FormSection } from '@myra-ui';

import { FormEditableTable } from '@coop/shared/form';

export const TrainingDetails = () => (
  <FormSection id="Training Details" header="Training Details" flexLayout>
    <FormEditableTable
      name="trainingDetails"
      columns={[
        {
          accessor: 'trainingName',
          header: 'Training Name',
          cellWidth: 'lg',
        },
        {
          accessor: 'duration',
          header: 'Duration',
        },
        {
          accessor: 'subject',
          header: 'Subject',
        },
        {
          accessor: 'organizer',
          header: 'Organizer',
        },
      ]}
    />
  </FormSection>
);

export default TrainingDetails;
