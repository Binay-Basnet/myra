import { ReactElement } from 'react';
import { MemberPageLayout, MemberTable } from '@saccos/myra/components';
import { useGetNewIdMutation } from '@saccos/myra/graphql';
import { useTranslation } from '@saccos/myra/util';
import { useRouter } from 'next/router';

const column = [
  {
    title: 'memberList',
    link: '/members/list',
  },
  {
    title: 'balanceReport',
    link: '/members/balanceReport',
  },
  {
    title: 'memberDetails',
    link: '/members/details',
  },
  {
    title: 'memberSettings',
    link: '/members/settings',
  },
];

const rows = [
  'memberNavActive',
  'memberNavInactive',
  'memberNavWip',
  'memberNavDraft',
];

const Member = () => {
  const router = useRouter();
  const newId = useGetNewIdMutation();

  const { t } = useTranslation();

  return <MemberTable />;
};

Member.getLayout = function getLayout(page: ReactElement) {
  return <MemberPageLayout>{page}</MemberPageLayout>;
};

export default Member;
