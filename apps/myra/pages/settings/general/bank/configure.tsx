import { SettingsGeneralLayout, SettingsLayout } from '@coop/cbs/settings/ui-layout';
import { CbsSettingsFeatureBank } from '@coop/settings/bank';

export const BankPage = () => <CbsSettingsFeatureBank />;

export default BankPage;

BankPage.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </SettingsLayout>
  );
};
