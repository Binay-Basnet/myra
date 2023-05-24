import React from 'react';

import { Box } from '@myra-ui';

import { useGetCopomisReportSettingsQuery } from '@coop/cbs/data-access';

import { SettingsPageHeader } from './SettingsPageHeader';
import { SettingsInnerVerticalMenu } from '../components/SettingsInnerVerticalMenu';

interface SettingsMemberLayoutProps {
  children: React.ReactNode;
}

export const SettingsCOPOMISLayout = ({ children }: SettingsMemberLayoutProps) => {
  const { data } = useGetCopomisReportSettingsQuery();

  const tabs =
    data?.settings?.general?.reports?.copomis?.list?.map((tab) => ({
      title: tab?.indicatorName as string,
      to: `/settings/general/copomis-report/${tab?.id}/configure` as string,
    })) || [];

  return (
    <>
      <SettingsPageHeader heading="COPOMIS Financial" />
      <Box
        w="260px"
        px="s8"
        position="fixed"
        py="s16"
        borderRight="1px"
        borderRightColor="border.layout"
        height="calc(100vh - 160px)"
        zIndex={20}
        overflowY="auto"
        sx={{
          scrollbarWidth: 'none',
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <SettingsInnerVerticalMenu tablinks={tabs} />
      </Box>
      <Box ml="260px">{children}</Box>
    </>
  );
};
