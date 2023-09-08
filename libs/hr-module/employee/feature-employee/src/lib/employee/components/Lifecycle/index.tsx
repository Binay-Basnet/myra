import { useRouter } from 'next/router';

import { DetailsPageHeaderBox } from '@coop/shared/components';

import Transfer from './Transfer';

export const Lifecycle = () => {
  const router = useRouter();
  const subTab = router?.query?.['subTab'];
  return (
    <>
      <DetailsPageHeaderBox title="Lifecycle" tablist={['Transfer', 'Promotion']} />
      {(subTab === 'transfer' || subTab === 'undefined' || !subTab) && <Transfer />}
    </>
  );
};

export default Lifecycle;
