import { Box } from '@chakra-ui/react';

import { VerticalSideBarSettings } from './verticleSideBarSettings';
import {} from '../';

type TabList = {
  title: string;
  to: string;
};

const tabList: TabList[] = [
  {
    title: 'settingsSideGeneral',
    to: '/settings/general/members',
  },
  {
    title: 'settingsSideIndividual',
    to: '/settings/general/members/kym-individual',
  },
  {
    title: 'settingsSideInstitutional',
    to: '/settings/general/members/kym-institutional',
  },
  {
    title: 'settingsSideCoop',
    to: '/settings/general/members/kym-cooperative',
  },
  {
    title: 'settingsSideCoopUnion',
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
