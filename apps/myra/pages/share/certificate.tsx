import { ReactElement } from 'react';
import { ShareLayout, ShareTable } from '@saccos/myra/components';

import { useMembersQuery } from '../../generated/graphql';

// TODO ( Update this page when design arrives )
const ShareCertificatePrint = () => {
  const { data, isLoading } = useMembersQuery();

  return <ShareTable data={data} isLoading={isLoading} />;
};

ShareCertificatePrint.getLayout = function getLayout(page: ReactElement) {
  return (
    <ShareLayout headingText={'Share Certificate Print'}>{page}</ShareLayout>
  );
};
export default ShareCertificatePrint;
