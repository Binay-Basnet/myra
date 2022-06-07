import { Box } from '@chakra-ui/react';

import { VerticalSideBarSettings } from './verticleSideBarSettings';
import {} from '../';

type TabList = {
  title: string;
  to: string;
};

const tabList: TabList[] = [
  {
    title: 'General',
    to: '/settings/general/members',
  },
  {
    title: 'KYM Form - Individual',
    to: '/settings/general/members/kym-individual',
  },
  {
    title: 'KYM Form - Institutional',
    to: '/settings/general/members/kym-institutional',
  },
  {
    title: 'KYM Form - CoOperative',
    to: '/settings/general/members/kym-cooperative',
  },
  {
    title: 'KYM Form - CoOperative Union',
    to: '/settings/general/members/kym-cooperative-union',
  },
];

export const SettingsGeneralMember = () => {
  return (
    <Box
      w="13%"
      display="flex"
      flexDirection="column"
      gap="s16"
      flexShrink={0}
      minWidth="250px"
      pt="s8"
      pl="s8"
    >
      <VerticalSideBarSettings tablinks={tabList} />
    </Box>
  );
};
