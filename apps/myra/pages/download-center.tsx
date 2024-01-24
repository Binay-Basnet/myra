import { ReactElement, ReactNode } from 'react';
import { DownloadCenterLib } from '@download-center';

import { TopLevelHeader } from '@myra-ui';

const TopLevelHeaderLayout = ({ children }: { children: ReactNode }) => (
  <>
    <TopLevelHeader />
    {children}
  </>
);

export const DownloadCenter = () => <DownloadCenterLib />;

DownloadCenter.getLayout = function getLayout(page: ReactElement) {
  return (
    <TopLevelHeaderLayout>
      {/* <Scrollable>{page}</Scrollable> */}
      {page}
    </TopLevelHeaderLayout>
  );
};

export default DownloadCenter;
