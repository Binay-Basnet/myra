import { ReactElement, useState } from 'react';

import { MainLayout } from '@myra-ui';

import { LoanDetailsHeader } from '@coop/cbs/loan/details';
import { LoanListLayout } from '@coop/cbs/loan/layouts';
import { CbsLoanFeatureLoanAccountDetail } from '@coop/loan/account-details';

export const LoanDetailsPage = () => {
  const [isLocModalOpen, setIsLocModalOpen] = useState(false);
  const handleModalClose = () => {
    setIsLocModalOpen(false);
  };

  const [isLinkedAccountModalOpen, setIsLinkedAccountModalOpen] = useState(false);
  const handleLinkedAccountModalClose = () => {
    setIsLinkedAccountModalOpen(false);
  };

  return (
    <>
      <LoanDetailsHeader
        title="Loan Account List"
        options={[
          { label: 'Update LOC amount', handler: () => setIsLocModalOpen(true) },
          { label: 'Update Linked Account', handler: () => setIsLinkedAccountModalOpen(true) },
        ]}
      />
      <CbsLoanFeatureLoanAccountDetail
        isLocModalOpen={isLocModalOpen}
        handleLocModalClose={handleModalClose}
        isLinkedAccountModalOpen={isLinkedAccountModalOpen}
        handleLinkedAccountModalClose={handleLinkedAccountModalClose}
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
