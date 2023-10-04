import { useRouter } from 'next/router';

import { DetailsPageHeaderBox } from '@coop/shared/components';

import IncomeTax from './IncomeTax';

export const Payroll = () => {
  const router = useRouter();
  const subTab = router?.query?.['subTab'];
  return (
    <>
      <DetailsPageHeaderBox title="Payroll" tablist={['Income Tax']} />
      {(subTab === 'income tax' || subTab === 'undefined' || !subTab) && <IncomeTax />}
    </>
  );
};

export default Payroll;
