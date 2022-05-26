import GeneralLayout from '../../../../components/SettingsLayout/GeneralLayout';

const ChartsOfAccounts = () => {
  return <> Charts of Accounts</>;
};

export default ChartsOfAccounts;
ChartsOfAccounts.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};
