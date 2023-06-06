import { DetailsCard } from '@myra-ui';

import { DocumentComponent } from './DocumetComponent';
import { useSupplierDetails } from '../hooks/useSuppliersDetails';

export const DocumentPage = () => {
  const { detailData } = useSupplierDetails();

  return (
    <DetailsCard title="Documents" bg="white">
      <DocumentComponent data={detailData?.registrationDoc} label="Registration" />
      <DocumentComponent data={detailData?.applicationDoc} label="Applications" />
      <DocumentComponent data={detailData?.legalStatusDoc} label="Legal Status" />

      <DocumentComponent data={detailData?.othersDoc} label="Others" />
    </DetailsCard>
  );
};
