import { ReactElement } from 'react';
import { ShareLayout, ShareTable } from '@saccos/myra/components';

import { useMembersQuery } from '../../generated/graphql';

// TODO ( Update this page when design arrives )

const ShareList = () => {
  const { data, isLoading } = useMembersQuery();

  return <ShareTable data={data} isLoading={isLoading} />;
};

ShareList.getLayout = function getLayout(page: ReactElement) {
  return <ShareLayout headingText="Share Register">{page}</ShareLayout>;
};
export default ShareList;
