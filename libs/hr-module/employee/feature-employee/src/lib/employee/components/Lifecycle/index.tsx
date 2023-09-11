import { useRouter } from 'next/router';

import { DetailsPageHeaderBox } from '@coop/shared/components';

import Exit from './Exit';
import Promotion from './Promotion';
import Transfer from './Transfer';

export const Lifecycle = () => {
  const router = useRouter();
  const subTab = router?.query?.['subTab'];
  return (
    <>
      <DetailsPageHeaderBox title="Lifecycle" tablist={['Transfer', 'Promotion', 'Exit']} />
      {(subTab === 'transfer' || subTab === 'undefined' || !subTab) && <Transfer />}
      {subTab === 'promotion' && <Promotion />}
      {subTab === 'exit' && <Exit />}
    </>
  );
};

export default Lifecycle;
