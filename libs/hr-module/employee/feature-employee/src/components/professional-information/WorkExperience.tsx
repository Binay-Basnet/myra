import { FormSection } from '@myra-ui';

import { FormEditableTable } from '@coop/shared/form';

type WorkTableType = {
  pastWorkedCompanyName: string;
  pastWorkedDesignation: string;
  pastWorkedSalary: string;
  pastWorkedAddress: string;
};

export const WorkExperienceTable = () => (
  <FormSection id="Work Experience" header="Work Experience" flexLayout>
    <FormEditableTable<WorkTableType>
      name="workExperience"
      columns={[
        {
          accessor: 'pastWorkedCompanyName',
          header: 'Company Name',
          cellWidth: 'lg',
        },
        {
          accessor: 'pastWorkedDesignation',
          header: 'Designation',
        },
        {
          accessor: 'pastWorkedSalary',
          header: 'Salary',
          isNumeric: true,
        },
        {
          accessor: 'pastWorkedAddress',
          header: 'Address',
        },
      ]}
    />
  </FormSection>
);
