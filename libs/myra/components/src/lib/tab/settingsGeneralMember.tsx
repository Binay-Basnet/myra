import { VerticalSideBarSettings } from './verticleSideBarSettings';
// TODO! ( REMOVE THIS COMPONENT )

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

// <Box bg="#EEF2F7" p="s16">
//             <Text fontSize={'r1'} fontWeight="600">

export const SettingsGeneralMember = () => {
  return <VerticalSideBarSettings tablinks={tabList} />;
};
