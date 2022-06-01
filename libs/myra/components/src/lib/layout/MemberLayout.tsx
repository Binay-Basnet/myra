import React from 'react';
import { useGetNewIdMutation } from '@saccos/myra/graphql';
import { useRouter } from 'next/router';

import { PageLayout } from './PageLayout';

interface IMemberPageLayout {
  children: React.ReactNode;
}

const memberColumns = [
  {
    title: 'memberList',
    link: '/members/list',
  },
  {
    title: 'balanceReport',
    link: '/members/reports',
  },
];

const memberRows = [
  {
    title: 'memberNavActive',
    key: 'APPROVED',
  },
  {
    title: 'memberNavInactive',
    key: 'VALIDATED',
  },
  {
    title: 'memberNavDraft',
    key: 'DRAFT',
  },
];

export const MemberPageLayout = ({ children }: IMemberPageLayout) => {
  const newId = useGetNewIdMutation();
  const router = useRouter();

  return (
    <PageLayout
      rows={memberRows}
      columns={memberColumns}
      btnOnClick={() => {
        newId
          .mutateAsync({})
          .then((res) => router.push(`/members/addMember/${res?.newId}`));
      }}
      heading={'Member'}
    >
      {children}
    </PageLayout>
  );
};
