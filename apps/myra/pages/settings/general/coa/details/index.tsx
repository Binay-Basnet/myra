import { ReactElement } from 'react';
import { useRouter } from 'next/router';

import { COAAccountDetail, COALeafDetail } from '@coop/cbs/settings/coa';
import { SettingsGeneralLayout, SettingsLayout } from '@coop/cbs/settings/ui-layout';

const COADetailPage = () => {
  const router = useRouter();

  const { id } = router.query;

  if (id?.includes('-')) {
    return <COAAccountDetail />;
  }
  return <COALeafDetail />;
};

COADetailPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </SettingsLayout>
  );
};
export default COADetailPage;
