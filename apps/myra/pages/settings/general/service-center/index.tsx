import { CbsSettingsServiceCenter } from '@coop/cbs/settings/branches';
import {
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';

const ServiceCenter = () => {
  return <CbsSettingsServiceCenter />;
};

export default ServiceCenter;
ServiceCenter.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </SettingsLayout>
  );
};
