import GeneralLayout from '../../../../components/SettingsLayout/GeneralLayout';
const Members = () => {
  return <>Members</>;
};

export default Members;
Members.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};
