import React from 'react';

import { KYMCoopUnionFooter } from '../components/KYMCoopUnionFooter';
import { KymCoopUnionFormBody } from '../components/KYMCoopUnionFormBody';
import { KYMCoopUnionHeader } from '../components/KYMCoopUnionHeader';

export function KYMCooperativeUnionPage() {
  return (
    <>
      <KYMCoopUnionHeader />
      <KymCoopUnionFormBody />
      <KYMCoopUnionFooter />
    </>
  );
}

export default KYMCooperativeUnionPage;
