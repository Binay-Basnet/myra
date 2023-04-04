import { ReactElement, useState } from 'react';

import { MainLayout } from '@myra-ui';

import { AccountDetails } from '@coop/cbs/accounts/account-form';
import { AccountPagesLayout } from '@coop/myra/components';

const AccountListPage = () => {
  const [isAddNomineeAccountModalOpen, setIsAddNomineeAccountModalOpen] = useState(false);
  const [isAddTenureModalOpen, setIsAddTenureModalOpen] = useState(false);
  const [isUpdateSinatureModalOpen, setUpdateSinatureModalOpen] = useState(false);
  const [isUpdateInstallmentAmountModalOpen, setUpdateInstallmentAmountModalOpen] = useState(false);

  const handleNomineeAccountModalClose = () => {
    setIsAddNomineeAccountModalOpen(false);
  };
  const handleAddTenureModalClose = () => {
    setIsAddTenureModalOpen(false);
  };
  const handleUpdateSignatureModalClose = () => {
    setUpdateSinatureModalOpen(false);
  };
  const handleUpdateInstallmentAmountModalClose = () => {
    setUpdateInstallmentAmountModalOpen(false);
  };

  return (
    <AccountDetails
      isNomineeAccountModalOpen={isAddNomineeAccountModalOpen}
      handleNomineeModalClose={handleNomineeAccountModalClose}
      handleTenureModalClose={handleAddTenureModalClose}
      handleUpdateSignatureModalClose={handleUpdateSignatureModalClose}
      isTenureModalOpen={isAddTenureModalOpen}
      isUpdateSignatureModalOpen={isUpdateSinatureModalOpen}
      isUpdateInstallmentAmountModalOpen={isUpdateInstallmentAmountModalOpen}
      handleUpdateInstallmentAmountModalClose={handleUpdateInstallmentAmountModalClose}
      pathbarOptions={[
        { label: 'Update Nominee', handler: () => setIsAddNomineeAccountModalOpen(true) },
        { label: 'Update Tenure', handler: () => setIsAddTenureModalOpen(true) },
        { label: 'Update Signature', handler: () => setUpdateSinatureModalOpen(true) },
        {
          label: 'Update Installment Amount',
          handler: () => setUpdateInstallmentAmountModalOpen(true),
        },
      ]}
    />
  );
};

AccountListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AccountPagesLayout>{page}</AccountPagesLayout>
    </MainLayout>
  );
};
export default AccountListPage;
