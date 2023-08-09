import { CbsSettingsServiceCenter } from '@coop/cbs/settings/branches';
import { SettingsGlobalLayout, SettingsLayout } from '@coop/cbs/settings/ui-layout';
import { Can } from '@coop/cbs/utils';

const ServiceCenter = () => (
  <Can I="SHOW_IN_MENU" a="SETTINGS_SERVICE_CENTER" showError isErrorCentered>
    <CbsSettingsServiceCenter />
  </Can>
);

export default ServiceCenter;
ServiceCenter.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGlobalLayout>{page}</SettingsGlobalLayout>
    </SettingsLayout>
  );
};
