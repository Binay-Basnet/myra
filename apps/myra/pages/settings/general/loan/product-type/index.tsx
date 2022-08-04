import {
  SettingsGeneralLayout,
  SettingsLayout,
  SettingsLoanLayout,
} from '@coop/cbs/settings/ui-layout';
const LoanProductType = () => {
  return <div> product-type</div>;
};

export default LoanProductType;

LoanProductType.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsLoanLayout>{page}</SettingsLoanLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
