import { useMemo, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useRouter } from 'next/router';

import { Box, DetailPageHeader, SuccessPrint, Text } from '@myra-ui';

import { localizedDate, localizedText } from '@coop/cbs/utils';
import { amountConverter, amountToWordsConverter, quantityConverter } from '@coop/shared/utils';

import { Overview } from './Overview';
import { SideBar } from './SideBar';
import { useShareRegisterDetailHooks } from '../hooks/useShareRegisterDetailHooks';

/* eslint-disable-next-line */
export interface CbsShareFeatureShareRegisterDetailProps {}

export const CbsShareFeatureShareRegisterDetail = () => {
  const router = useRouter();
  const tabQuery = router.query['tab'] as string;
  const { shareDetails } = useShareRegisterDetailHooks();

  const printComponentRef = useRef<HTMLInputElement | null>(null);

  const voucherPrintRef = useRef<HTMLInputElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
  });

  const handlePrintVoucher = useReactToPrint({
    content: () => voucherPrintRef.current,
  });

  const headerOptions = [
    { label: 'Print', handler: handlePrint },
    {
      label: 'Print Voucher',
      handler: handlePrintVoucher,
    },
  ];

  const { total, details, glTransactions } = useMemo(() => {
    let tempDetails = {};

    const charges: Record<string, string> = {};

    shareDetails?.charges?.forEach((fee) => {
      if (fee?.name && fee?.value) {
        charges[String(fee.name)] = String(fee.value);
      }
    });

    tempDetails = {
      'Transaction Id': (
        <Text fontSize="s3" color="primary.500" fontWeight="600">
          {shareDetails?.transactionCode}
        </Text>
      ),
      Date: localizedDate(shareDetails?.date),
    };

    if (shareDetails?.type === 'Share Issue') {
      tempDetails = {
        ...tempDetails,
        'No of Share Issued': quantityConverter(String(shareDetails?.noOfShare ?? 0)),
        'Share Amount': amountConverter(shareDetails?.amount ?? 0),
        ...charges,
        'Payment Mode': shareDetails?.paymentDetail?.paymentMode,
      };
    }

    if (shareDetails?.type === 'Share Return') {
      tempDetails = {
        ...tempDetails,
        'No of Shares Returned': quantityConverter(shareDetails?.noOfShare || 0),
        'Withdraw Amount': amountConverter(shareDetails?.amount || 0),
        ...charges,
        'Payment Mode': shareDetails?.paymentDetail?.paymentMode,
      };
    }

    const tempTotal = shareDetails?.total as string;

    const tempGLTransactions = shareDetails?.glTransactions;

    return {
      total: tempTotal,
      details: tempDetails,
      glTransactions: tempGLTransactions,
    };
  }, [shareDetails]);

  return (
    <>
      <Box bg="gray.100">
        <Box position="sticky" top="0" zIndex={10}>
          <DetailPageHeader
            title="Share Register List"
            name={shareDetails?.member?.name?.local ?? ''}
            options={headerOptions}
          />
        </Box>
        <Box
          w="320px"
          position="fixed"
          h="calc(100vh - 110px)"
          borderRight="1px"
          borderRightColor="border.layout"
          bg="gray.0"
        >
          <SideBar />
        </Box>

        <Box ml="320px" p="s16" display="flex" flexDir="column" gap="s16">
          {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && <Overview />}
        </Box>
      </Box>
      <SuccessPrint
        meta={{
          memberId: shareDetails?.member?.code,
          member: localizedText(shareDetails?.member?.name),
        }}
        total={amountConverter(total)}
        totalWords={amountToWordsConverter(total)}
        details={details}
        showSignatures={false}
        dublicate
        ref={printComponentRef}
      />

      <SuccessPrint
        meta={{
          memberId: shareDetails?.member?.code,
          member: localizedText(shareDetails?.member?.name),
        }}
        total={amountConverter(total)}
        totalWords={amountToWordsConverter(total)}
        details={details}
        showSignatures={false}
        glTransactions={glTransactions}
        glTransactionsTotal={total}
        ref={voucherPrintRef}
      />
    </>
  );
};

export default CbsShareFeatureShareRegisterDetail;
