import { SettingsGeneralLayout, SettingsLayout } from '@coop/cbs/settings/ui-layout';
import { ReportingTagsList } from '@coop/settings/reporting-tags';

const SettingsReportingTagsPage = () => <ReportingTagsList />;

export default SettingsReportingTagsPage;
SettingsReportingTagsPage.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </SettingsLayout>
  );
};
