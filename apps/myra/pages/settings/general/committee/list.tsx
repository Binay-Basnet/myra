import { SettingsGeneralLayout, SettingsLayout } from '@coop/cbs/settings/ui-layout';
import { CommitteeList } from '@coop/settings/committee';

const Page = () => <CommitteeList />;

export default Page;

Page.getLayout = (page) => (
  <SettingsLayout>
    <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
  </SettingsLayout>
);
