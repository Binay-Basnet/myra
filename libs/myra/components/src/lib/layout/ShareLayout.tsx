import React from 'react';
import { useRouter } from 'next/router';

import { PageLayout } from './PageLayout';

interface IMemberPageLayout {
  children: React.ReactNode;
  rows?: {
    title: string;
    key: string;
  }[];
  mainTitle: string;
}

const shareColumns = [
  {
    title: 'shareBalance',
    link: '/share/balance',
  },
  {
    title: 'shareRegister',
    link: '/share/register',
  },
  {
    title: 'shareReport',
    link: '/share/report',
  },
];

const shareRows = [
  {
    title: 'shareActive',
    key: 'APPROVED',
  },
  {
    title: 'shareSubmitted',
    key: 'VALIDATED',
  },
  {
    title: 'shareDraft',
    key: 'DRAFT',
  },
];

export const SharePageLayout = ({
  children,
  rows,
  mainTitle,
}: IMemberPageLayout) => {
  const router = useRouter();

  return (
    <PageLayout
      mainTitle={mainTitle}
      settingOnClick={() => router.push('/share/settings')}
      rows={rows ?? shareRows}
      columns={shareColumns}
      btnOnClick={() => {
        return;
        // TODO ( Update this onclick)
        // newId
        //   .mutateAsync({})
        //   .then((res) => router.push(`/members/addMember/${res?.newId}`));
      }}
      heading={'Share'}
    >
      {children}
    </PageLayout>
  );
};
