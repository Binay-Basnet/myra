import { FormSection } from '@myra-ui';

import { FormEditableTable } from '@coop/shared/form';

export const InternationalTour = () => (
  <FormSection id="International Tour" header="International Tour" flexLayout>
    <FormEditableTable
      name="internationalTour"
      columns={[
        {
          accessor: 'tourCountry',
          header: 'Tour Country',
        },
        {
          accessor: 'objective',
          header: 'Objective',
        },
        {
          accessor: 'duration',
          header: 'Duration',
        },
      ]}
    />
  </FormSection>
);

export default InternationalTour;
