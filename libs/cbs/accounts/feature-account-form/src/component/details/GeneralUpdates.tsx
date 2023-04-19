import { useMemo, useState } from 'react';
import { HiOutlineRefresh } from 'react-icons/hi';

import { DetailPageQuickLinks } from '@myra-ui';

import { useAccountDetails } from '@coop/cbs/data-access';

import { AddNomineeModal } from './ChangeNomineeModal';
import { AddTenureModal } from './ChangeTenureModal';
import { TabHeader } from './TabHeader';
import { UpdateInstallmentAmountModal } from './UpdateInstallmentAmountModal';
import { UpdateSignatureModal } from './UpdateSignatureModal';

export const GeneralUpdates = () => {
  const { accountDetails } = useAccountDetails();

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

  const updateOptions = useMemo(() => {
    if (accountDetails?.accountType === 'TERM_SAVING_OR_FD') {
      return [
        {
          title: 'Update Nominee',
          onClick: () => setIsAddNomineeAccountModalOpen(true),
          icon: HiOutlineRefresh,
        },
        {
          title: 'Update Tenure',
          onClick: () => setIsAddTenureModalOpen(true),
          icon: HiOutlineRefresh,
        },
        {
          title: 'Update Signature',
          onClick: () => setUpdateSinatureModalOpen(true),
          icon: HiOutlineRefresh,
        },
      ];
    }

    if (accountDetails?.accountType === 'RECURRING_SAVING') {
      return [
        {
          title: 'Update Nominee',
          onClick: () => setIsAddNomineeAccountModalOpen(true),
          icon: HiOutlineRefresh,
        },
        {
          title: 'Update Tenure',
          onClick: () => setIsAddTenureModalOpen(true),
          icon: HiOutlineRefresh,
        },
        {
          title: 'Update Signature',
          onClick: () => setUpdateSinatureModalOpen(true),
          icon: HiOutlineRefresh,
        },
        {
          title: 'Update Installment Amount',
          onClick: () => setUpdateInstallmentAmountModalOpen(true),
          icon: HiOutlineRefresh,
        },
      ];
    }

    if (accountDetails?.accountType === 'SAVING' && accountDetails?.product?.isMandatorySaving) {
      return [
        {
          title: 'Update Signature',
          onClick: () => setUpdateSinatureModalOpen(true),
          icon: HiOutlineRefresh,
        },
        {
          title: 'Update Installment Amount',
          onClick: () => setUpdateInstallmentAmountModalOpen(true),
          icon: HiOutlineRefresh,
        },
      ];
    }
    return [
      {
        title: 'Update Signature',
        onClick: () => setUpdateSinatureModalOpen(true),
        icon: HiOutlineRefresh,
      },
    ];
  }, [accountDetails?.accountType, accountDetails?.product?.isMandatorySaving]);

  return (
    <>
      <TabHeader heading="General Updates" />

      <DetailPageQuickLinks links={updateOptions} />

      <AddNomineeModal
        isOpen={isAddNomineeAccountModalOpen}
        onClose={handleNomineeAccountModalClose}
      />

      <AddTenureModal isOpen={isAddTenureModalOpen} onClose={handleAddTenureModalClose} />

      <UpdateSignatureModal
        isOpen={isUpdateSinatureModalOpen}
        onClose={handleUpdateSignatureModalClose}
      />

      <UpdateSignatureModal
        isOpen={isUpdateSinatureModalOpen}
        onClose={handleUpdateSignatureModalClose}
      />

      <UpdateInstallmentAmountModal
        isOpen={isUpdateInstallmentAmountModalOpen}
        onClose={handleUpdateInstallmentAmountModalClose}
      />
    </>
  );
};
