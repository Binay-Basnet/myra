import { ReactElement } from 'react';
import { ShareLayout, ShareTable } from '@saccos/myra/components';

import { useMembersQuery } from '../../generated/graphql';

// TODO ( UPDATE THIS PAGE A/C TO DESIGN )
const ShareReportPage = () => {
  const { data, isLoading } = useMembersQuery();

  return <ShareTable data={data} isLoading={isLoading} />;
};

ShareReportPage.getLayout = function getLayout(page: ReactElement) {
  return <ShareLayout headingText="Share Report">{page}</ShareLayout>;
};
export default ShareReportPage;
