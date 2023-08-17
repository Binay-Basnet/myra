import { useRouter } from 'next/router';

import { DetailsCard, Modal } from '@myra-ui';

import { useGetOperationsAutoOpenDetailsQuery } from '@coop/cbs/data-access';

import { AccountDetailsTable } from './AccountTable';

interface IPenaltyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AutoOpenAccountDetailModal = ({ isOpen, onClose }: IPenaltyDetailModalProps) => {
  const router = useRouter();
  const id = router?.query['id'] as string;
  const { data } = useGetOperationsAutoOpenDetailsQuery(
    {
      memberID: id as string,
    },
    {
      enabled: !!id,
    }
  );
  const accountDetails = data?.bpm?.operations?.autoOpenAccount?.getAutoOpenAccounts?.data;

  const detailData =
    accountDetails?.map((item, index) => ({
      sn: Number(index) + 1,
      accountID: item?.accountID,
      accountName: item?.accountName,
      status: item?.status,
    })) || [];
  return (
    <Modal title="Update Details" open={isOpen} onClose={onClose}>
      <DetailsCard hasTable bg="white" title="Auto-open Accounts Lists">
        <AccountDetailsTable data={detailData} />{' '}
      </DetailsCard>
    </Modal>
  );
};
