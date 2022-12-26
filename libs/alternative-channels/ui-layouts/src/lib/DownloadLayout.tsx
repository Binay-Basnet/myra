import React from 'react';

import { Sidebar } from '@myra-ui';

import { useTranslation } from '@coop/shared/utils';

interface IAccountPageLayoutProps {
  children: React.ReactNode;
}

const userColumns = [
  {
    title: 'acDownloadsForms',
    link: '/alternative-channels/downloads/forms',
  },
  {
    title: 'acDownloadsGuidelines',
    link: '/alternative-channels/downloads/guidelines',
  },
  {
    title: 'acDownloadsReports',
    link: '/alternative-channels/downloads/reports',
  },
  {
    title: 'acDwnloadsDirectives',
    link: '/alternative-channels/downloads/directives',
  },
];

export const DownloadLayout = ({ children }: IAccountPageLayoutProps) => {
  const { t } = useTranslation();

  return (
    <Sidebar
      applicationName="Alternative Channels"
      featureName={t['acDownload']}
      featureLink="/alternative-channels/downloads/forms"
      tabColumns={userColumns}
      children={children}
    />
  );
};
