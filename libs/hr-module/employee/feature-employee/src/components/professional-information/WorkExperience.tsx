import { FormSection } from '@myra-ui';

import { FormEditableTable } from '@coop/shared/form';

export const WorkExperienceTable = () => (
  <FormSection id="Work Experience" header="Work Experience" flexLayout>
    <FormEditableTable
      name="workExperience"
      columns={[
        {
          accessor: 'CompanyName',
          header: 'Company Name',
          cellWidth: 'lg',
        },
        {
          accessor: 'Designation',
          header: 'Designation',
        },
        {
          accessor: 'Salary',
          header: 'Salary',
          isNumeric: true,
        },
        {
          accessor: 'Address',
          header: 'Address',
        },
      ]}
    />
  </FormSection>
);
