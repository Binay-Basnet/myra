import { CbsSettingsFeatureDocumentsKym } from '@coop/cbs/settings/documents';
import {
  SettingsDocumentsLayout,
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';

const Documents = () => <CbsSettingsFeatureDocumentsKym />;

export default Documents;

Documents.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsDocumentsLayout>{page}</SettingsDocumentsLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
