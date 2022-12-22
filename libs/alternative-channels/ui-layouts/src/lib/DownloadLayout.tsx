import React from 'react';

import { Box, Divider, Text } from '@myra-ui';

import { TabColumn } from '@coop/myra/components';
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
    <Box display="flex">
      <Box width="260px" flexShrink={0} position="fixed">
        <Box height="60px" py="s12" px="s16">
          <Text fontSize="s2" fontWeight="600" color="primary.500">
            Alternative Channels
          </Text>
          <Text fontSize="l1" fontWeight="600" color="gray.800">
            {t['acDownload']}
          </Text>
        </Box>
        <Box p="s16">
          <Divider my="s16" />
          <TabColumn list={userColumns} />
          <Divider my="s16" />
        </Box>
      </Box>
      <Box width="calc(100% - 260px)" marginLeft="260px">
        <Box bg="white" minHeight="calc(100vh - 110px)">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
