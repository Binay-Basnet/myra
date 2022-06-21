import { VerticalSideBarSettings } from './verticleSideBarSettings';
// TODO! ( REMOVE THIS COMPONENT )

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

// <Box bg="#EEF2F7" p="s16">
//             <Text fontSize={'r1'} fontWeight="600">

export const SettingsGeneralMember = () => {
  return <VerticalSideBarSettings tablinks={tabList} />;
};
