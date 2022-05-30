import GeneralLayout from '../../../../components/SettingsLayout/GeneralLayout';

const DepositWithdraw = () => {
  return <> Deposit Withdraw</>;
};

export default DepositWithdraw;
DepositWithdraw.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};
