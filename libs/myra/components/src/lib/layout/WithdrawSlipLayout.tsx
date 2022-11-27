import React from 'react';

import { Box, Text } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

import { TabColumn } from '../tab/TabforMemberPage';

interface IMemberPageLayout {
  children: React.ReactNode;
}

const shareColumns = [
  {
    title: 'withdrawSlipRequests',
    link: '/withdraw/cheque-book',
  },
  {
    title: 'withdrawSlipBlockRequests',
    link: '/withdraw/block-cheque',
  },
];

export const WithdrawSlipLayout = ({ children }: IMemberPageLayout) => {
  // const router = useRouter();
  const { t } = useTranslation();

  return (
    <Box display="flex">
      <Box width="260px" flexShrink={0} position="fixed" zIndex={1}>
        <Box height="50px" alignItems="center" display="flex" py="s12" px="s16">
          <Text fontSize="l1" fontWeight="SemiBold" color="gray.800">
            {t['withdrawSlip']}
          </Text>
        </Box>
        <Box p="s16">
          {/* <PopOverComponentForButtonList buttonLabel="New">
            {addButtoncolumns.map((item) => (
              <Box key={item?.title}>
                <AddButtonList label={t[item.title]} onClick={() => router.push(`${item.link}`)} />
              </Box>
            ))}
          </PopOverComponentForButtonList> */}

          {/* <Divider my="s16" /> */}
          <TabColumn list={shareColumns} />
        </Box>
      </Box>
      <Box w="100%" ml="260px">
        <Box bg="white" minHeight="calc(100vh - 110px)" width="100%">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
export default WithdrawSlipLayout;
