import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { useRouter } from 'next/router';

import { TabColumn } from '@coop/myra/components';
import { Box, Button, Divider, Icon, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

interface IMemberPageLayout {
  children: React.ReactNode;
}

const reportColumns = [
  {
    title: 'reportsCbsReports',
    link: '/reports/cbs/share-report',
  },
  {
    title: 'reportsSavedReports',
    link: '/reports/saved',
  },
];

export const ReportMainLayout = ({ children }: IMemberPageLayout) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Box display="flex">
      <Box width="260px" flexShrink={0} position="fixed" zIndex={1}>
        <Box height="60px" py="s12" px="s16">
          <Text fontSize="l1" pb="s16" fontWeight="600" color="gray.800">
            {t['reportsHeading']}
          </Text>
        </Box>
        <Box p="s16">
          <TabColumn list={reportColumns} />
          <Divider my="s16" />
          <Button
            onClick={() => router.push('/settings/general/share')}
            variant="ghost"
            color="#37474F"
            height="s48"
            width="full"
            justifyContent="start"
            leftIcon={<Icon as={AiOutlineSetting} size="md" color="primary.500" />}
          >
            {t['reportsSettings']}
          </Button>
        </Box>
      </Box>
      <Box width="100%" ml="260px" bg="white" minHeight="calc(100vh - 110px)">
        {children}
      </Box>
    </Box>
  );
};
