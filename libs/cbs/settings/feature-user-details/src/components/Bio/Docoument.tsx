import { DetailsCard } from '@myra-ui';

import { DocumentComponent } from './DocumentComponent';
import { useUserDetailsHooks } from '../../hooks/useUserDetailsHooks';

export const UserDocuments = () => {
  const { detailData } = useUserDetailsHooks();

  return (
    <DetailsCard title="Documents" bg="white">
      {detailData?.userBio?.documents?.map((docs) => (
        <DocumentComponent keyText={docs as string} value={docs as string} />
      ))}
    </DetailsCard>
  );
};
