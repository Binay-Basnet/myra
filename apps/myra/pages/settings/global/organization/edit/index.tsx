import { SettingsLayout } from '@coop/cbs/settings/ui-layout';
import { CbsSettingsFeatureOrgEdit } from '@coop/settings/org';

export const Page = () => <CbsSettingsFeatureOrgEdit />;

export default Page;

Page.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>;
