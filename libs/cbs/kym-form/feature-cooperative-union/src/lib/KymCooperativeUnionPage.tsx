import { useEffect } from 'react';

import { reset, useAppDispatch } from '@coop/shared/utils';

import { KYMCoopUnionFooter } from '../components/KYMCoopUnionFooter';
import { KymCoopUnionFormBody } from '../components/KYMCoopUnionFormBody';
import { KYMCoopUnionHeader } from '../components/KYMCoopUnionHeader';

export const KYMCooperativeUnionPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(reset());
  }, []);

  return (
    <>
      <KYMCoopUnionHeader />
      <KymCoopUnionFormBody />
      <KYMCoopUnionFooter />
    </>
  );
};

export default KYMCooperativeUnionPage;
