import { useRouter } from 'next/router';

import { Box, Scrollable, Text } from '@myra-ui';

import { useGetJournalVoucherDetailQuery } from '@coop/cbs/data-access';

import {
  GlTransaction,
  Note,
  OtherDetails,
  SideBar,
  TransactionDetails,
} from '../components/journalVoucher';

/* eslint-disable-next-line */
export interface JournalVoucerDetailPageProps {}

export const JournalVoucerDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetJournalVoucherDetailQuery({ entryId: id as string });
  const voucherData = data?.accounting?.journalVoucher?.viewJournalVoucherDetail?.data;

  const detailData = {
    id: voucherData?.transactionCode,
    date: voucherData?.date,
    reference: voucherData?.reference,
    // note: voucherData?.note,
  };

  const sidebarDetailData = {
    id: voucherData?.transactionCode,
    date: voucherData?.date,
    status: voucherData?.status,
    amount: voucherData?.amount,
  };

  const otherData = {
    tellerName: voucherData?.note,
    serviceCenter: voucherData?.reference,
  };

  return (
    <Box bg="gray.100">
      <Box display="flex">
        <Box
          bg="gray.0"
          w="320px"
          position="fixed"
          h="calc(100vh - 170px)"
          borderRight="1px"
          borderRightColor="border.layout"
        >
          <SideBar sidebarData={sidebarDetailData} />
        </Box>

        <Scrollable detailPage>
          <Box ml="320px" p="s16" display="flex" flexDir="column" gap="s16" minH="100vh">
            <Text fontWeight="SemiBold" fontSize="r3" color="gray.800" lineHeight="150%">
              Overview
            </Text>
            <TransactionDetails detailData={detailData} />
            {voucherData?.note && <Note note={voucherData?.note} />}
            <OtherDetails otherData={otherData} />
            <GlTransaction
              data={voucherData?.glTransaction}
              totalDebit={voucherData?.totalDebit ?? '-'}
              totalCredit={voucherData?.totalCredit ?? '-'}
            />
          </Box>
        </Scrollable>
      </Box>
    </Box>
  );
};
