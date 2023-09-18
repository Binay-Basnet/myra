import { FormSection } from '@myra-ui';

import { FormEditableTable } from '@coop/shared/form';

export const AwardCashAndCertificates = () => (
  <FormSection id="Award Cash and Certificates" header="Award Cash and Certificates" flexLayout>
    <FormEditableTable
      name="awardsCashAndCertificates"
      columns={[
        {
          accessor: 'description',
          header: 'Description',
        },
        {
          accessor: 'receivedDate',
          header: 'Received Date',
          fieldType: 'date',
          cellWidth: 'lg',
        },
        {
          accessor: 'cashOrPrizeName',
          header: 'Cash or Prize Name',
        },
        {
          accessor: 'organization',
          header: 'Organization',
        },
        {
          accessor: 'verifiedBy',
          header: 'Verified by',
        },
      ]}
    />
  </FormSection>
);

export default AwardCashAndCertificates;
