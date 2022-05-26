import GeneralLayout from '../../components/SettingsLayout';

const Settings = () => {
  return <></>;
};

export default Settings;
Settings.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};
