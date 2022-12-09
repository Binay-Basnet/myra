import React from 'react';
import Link from 'next/link';

import { Box, Text } from '@myra-ui';

import { TabColumn } from '@coop/myra/components';
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
    <Box display="flex">
      <Box width="260px" flexShrink={0} position="fixed" zIndex={1}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="start"
          py="s16"
          pb="s8"
          justifyContent="center"
          gap="s2"
          px="s16"
        >
          <Text fontSize="s2" fontWeight="600" color="primary.500">
            {t['corebankingSystems']}
          </Text>

          <Link href="/reports/cbs/organizations">
            <Text lineHeight="125%" fontSize="l1" fontWeight="600" color="gray.800">
              {t['reportsHeading']}
            </Text>
          </Link>
        </Box>

        <Box p="s16">
          <TabColumn list={reportColumns} />
        </Box>
      </Box>
      <Box width="100%" ml="260px" bg="white" minHeight="calc(100vh - 110px)">
        {children}
      </Box>
    </Box>
  );
};
