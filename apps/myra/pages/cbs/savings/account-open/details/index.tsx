import { ReactElement, useState } from 'react';

import { MainLayout } from '@myra-ui';

import { AccountDetails } from '@coop/cbs/accounts/account-form';
import { AccountPagesLayout } from '@coop/myra/components';

const AccountListPage = () => {
  const [isAddNomineeAccountModalOpen, setIsAddNomineeAccountModalOpen] = useState(false);
  const [isAddTenureModalOpen, setIsAddTenureModalOpen] = useState(false);

  const handleNomineeAccountModalClose = () => {
    setIsAddNomineeAccountModalOpen(false);
  };
  const handleAddTenureModalClose = () => {
    setIsAddTenureModalOpen(false);
  };

  return (
    <AccountDetails
      isNomineeAccountModalOpen={isAddNomineeAccountModalOpen}
      handleNomineeModalClose={handleNomineeAccountModalClose}
      handleTenureModalClose={handleAddTenureModalClose}
      isTenureModalOpen={isAddTenureModalOpen}
      pathbarOptions={[
        { label: 'Update Nominee', handler: () => setIsAddNomineeAccountModalOpen(true) },
        { label: 'Update Tenure', handler: () => setIsAddTenureModalOpen(true) },
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
