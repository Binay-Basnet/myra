import { ReactElement, useState } from 'react';

import { MainLayout } from '@myra-ui';

import { LoanDetailsHeader } from '@coop/cbs/loan/details';
import { LoanListLayout } from '@coop/cbs/loan/layouts';
import { CbsLoanFeatureLoanAccountDetail } from '@coop/loan/account-details';

const LoanDetailsPage = () => {
  const [isLocModalOpen, setIsLocModalOpen] = useState(false);
  const handleModalClose = () => {
    setIsLocModalOpen(false);
  };

  return (
    <>
      <LoanDetailsHeader
        title="Loan Account List"
        options={[{ label: 'Update LOC amount', handler: () => setIsLocModalOpen(true) }]}
      />
      <CbsLoanFeatureLoanAccountDetail
        isLocModalOpen={isLocModalOpen}
        handleLocModalClose={handleModalClose}
      />
    </>
  );
};

LoanDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <LoanListLayout>{page}</LoanListLayout>
    </MainLayout>
  );
};

export default LoanDetailsPage;
