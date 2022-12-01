import { Box, Text } from '@myra-ui';

import { amountConverter, useTranslation } from '@coop/shared/utils';

import {
  GlTransaction,
  InstallmentDetails,
  LoanRepaymentDetails,
  OtherDetails,
  PaymentDetails,
  SideBar,
} from '../component';
import { useTransactionDetailHooks } from '../hooks/useTransactionDetailHooks';

export const LoanRepaymentDetailPage = () => {
  const { t } = useTranslation();
  const { loanRepaymentDetailData } = useTransactionDetailHooks();
  const loanRepaymentData = loanRepaymentDetailData?.installmentDetails;
  const glTransData = loanRepaymentDetailData?.glTransaction;

  const summary = {
    memberId: loanRepaymentDetailData?.member?.id,
    code: loanRepaymentDetailData?.member?.code,
    name: loanRepaymentDetailData?.member?.name?.local,
    profilePic: loanRepaymentDetailData?.member?.profilePicUrl,
    transactionId: loanRepaymentDetailData?.member?.id,
    loanAccountName: loanRepaymentDetailData?.loanAccountName,
    loanSubtype: loanRepaymentDetailData?.loanSubType,
    loanAccId: loanRepaymentDetailData?.loanAccountId,
    repaymentDate: loanRepaymentDetailData?.repaymentDate,
    //  interestRate: loanRepaymentDetailData?.transactionDate,
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
        <SideBar summary={summary} detailPage="loanRepayment" />
      </Box>

      <Box ml="320px" p="s16" display="flex" flexDir="column" gap="s16">
        <Text color="gray.800" fontWeight="SemiBold" fontSize="r3">
          {t['transDetailOverview']}
        </Text>
        <LoanRepaymentDetails />
        <InstallmentDetails data={loanRepaymentData ?? []} />
        <PaymentDetails detailPage="loanRepayment" />
        <OtherDetails
          branch={loanRepaymentDetailData?.transactionBranch as string}
          teller={loanRepaymentDetailData?.teller as string}
        />
        <GlTransaction
          data={glTransData ?? []}
          totalCredit={String(amountConverter(loanRepaymentDetailData?.totalCredit ?? 0))}
          totalDebit={String(amountConverter(loanRepaymentDetailData?.totalDebit ?? 0))}
        />
      </Box>
    </>
  );
};
