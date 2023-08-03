import { ReactElement } from 'react';
import { useRouter } from 'next/router';

import { COAAccountDetail, COALeafDetail } from '@coop/cbs/settings/coa';
import { SettingsGeneralLayout, SettingsLayout } from '@coop/cbs/settings/ui-layout';

const COADetailPage = () => {
  const router = useRouter();

  const { id } = router.query;

  if (/^\d+(\.\d+)*$/.test(id as string)) {
    return <COALeafDetail />;
  }

  return <COAAccountDetail />;
};

COADetailPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </SettingsLayout>
  );
};
export default COADetailPage;
