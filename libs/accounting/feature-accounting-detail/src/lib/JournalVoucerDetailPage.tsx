import { useRouter } from 'next/router';

import { Box, Text } from '@myra-ui';

import { useGetJournalVoucherDetailQuery } from '@coop/cbs/data-access';

import { GlTransaction, SideBar, TransactionDetails } from '../components/journalVoucher';

/* eslint-disable-next-line */
export interface JournalVoucerDetailPageProps {}

export const JournalVoucerDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetJournalVoucherDetailQuery({ entryId: id as string });
  const voucherData = data?.accounting?.journalVoucher?.viewJournalVoucherDetail?.data;

  const detailData = {
    id: voucherData?.id,
    date: voucherData?.date?.local,
    reference: voucherData?.reference,
    note: voucherData?.note,
  };

  const sidebarDetailData = {
    id: voucherData?.id,
    date: voucherData?.date?.local,
    status: voucherData?.status,
    amount: voucherData?.amount,
  };

  return (
    <>
      <Box
        bg="gray.0"
        w="320px"
        position="fixed"
        h="calc(100vh - 110px)"
        borderRight="1px"
        borderRightColor="border.layout"
      >
        <SideBar sidebarData={sidebarDetailData} />
      </Box>

      <Box ml="320px" p="s16" display="flex" flexDir="column" gap="s16">
        <Text fontWeight="SemiBold" fontSize="r3" color="gray.800" lineHeight="150%">
          Overview
        </Text>
        <TransactionDetails detailData={detailData} />
        <GlTransaction
          data={voucherData?.glTransaction}
          totalDebit={voucherData?.totalDebit ?? '-'}
          totalCredit={voucherData?.totalCredit ?? '-'}
        />
      </Box>
    </>
  );
};
