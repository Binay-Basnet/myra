import React from 'react';

import { Sidebar } from '@myra-ui';

import { useTranslation } from '@coop/shared/utils';

interface IMemberPageLayout {
  children: React.ReactNode;
}

const reportColumns = [
  {
    title: 'reportsCbsReports',
    link: '/reports/cbs/organizations',
  },
  {
    title: 'reportsSavedReports',
    link: '/reports/saved',
  },
];

export const ReportMainLayout = ({ children }: IMemberPageLayout) => {
  const { t } = useTranslation();

  return (
    <Sidebar
      applicationName={t['corebankingSystems']}
      featureName={t['reportsHeading']}
      featureLink="/reports/cbs/organizations"
      tabColumns={reportColumns}
      children={children}
    />
  );
};
