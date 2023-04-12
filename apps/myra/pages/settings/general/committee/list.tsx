import { SettingsGeneralLayout, SettingsLayout } from '@coop/cbs/settings/ui-layout';
import { CommitteListTable } from '@coop/settings/committee';

const Page = () => <CommitteListTable />;

export default Page;

Page.getLayout = (page) => (
  <SettingsLayout>
    <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
  </SettingsLayout>
);
