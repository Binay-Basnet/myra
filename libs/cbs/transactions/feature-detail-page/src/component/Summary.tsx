import { IoCopyOutline } from 'react-icons/io5';

import { TransferType } from '@coop/cbs/data-access';
import { Box, Icon, Tags, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

type SummaryProps = {
  summary: {
    transactionId?: string | undefined | null;
    memberId?: string | undefined | null;
    transactionDate?: string | undefined | null;
    paymentMode?: string | undefined | null;
    amount?: string | undefined | null;
    method?: string | undefined | null;
    loanAccountName?: string | undefined | null;
    loanSubtype?: string | undefined | null;
    loanAccId?: string | undefined | null;
    repaymentDate?: string | undefined | null;
    //  interestRate?: loanRepaymentDetailData?.transactionDate,
  };
  detailPage?: 'deposit' | 'withdraw' | 'accountTransfer' | 'agentTransaction' | 'loanRepayment';
};

const agentSlug = {
  AGENT: 'Market Representative',
};

export const Summary = ({ summary, detailPage }: SummaryProps) => {
  const { t } = useTranslation();

  return (
    <Box
      p="s16"
      borderBottom="1px"
      // justifyContent="space-between"
      borderBottomColor="border.layout"
      display="flex"
      gap="s16"
    >
      {(detailPage === 'accountTransfer' ||
        detailPage === 'deposit' ||
        detailPage === 'withdraw') && (
        <>
          <Box w="100%" display="flex" flexDirection="column">
            <Text fontSize="r1" fontWeight="Regular" color="neutralColorLight.Gray-70">
              #{summary.transactionId}
            </Text>
            <Text fontSize="r1" fontWeight="Medium" color="neutralColorLight.Gray-80">
              {summary.transactionDate}
            </Text>
            {detailPage === 'accountTransfer' ? (
              <Text fontSize="s3" fontWeight="Medium" color="neutralColorLight.Gray-80">
                {summary.method === TransferType.Self && t['transDetailSelf']}
                {summary.method === TransferType.Member && t['transDetailMembertoMember']}
              </Text>
            ) : (
              <Text fontSize="r1" fontWeight="Regular" color="neutralColorLight.Gray-80">
                {t['transDetailDeposit']} -{' '}
                {summary.method === 'AGENT' ? agentSlug[summary.method] : summary.method}
              </Text>
            )}
          </Box>
          <Box display="flex" flexDirection="column">
            <Text fontSize="r1" fontWeight="SemiBold" color="neutralColorLight.Gray-80">
              {summary.amount}
            </Text>
            <Tags
              type="chip"
              label={summary.paymentMode ?? ''}
              tagColor="primary.100"
              labelColor="success.500"
            />
          </Box>
        </>
      )}

      {detailPage === 'agentTransaction' && (
        <>
          <Box w="100%" display="flex" flexDirection="column">
            <Text fontSize="r1" fontWeight="Regular" color="neutralColorLight.Gray-70">
              #{summary.transactionId}
            </Text>
            <Text fontSize="r1" fontWeight="Medium" color="neutralColorLight.Gray-80">
              {summary.transactionDate}
            </Text>
          </Box>

          <Box display="flex" flexDirection="column">
            <Text fontSize="r1" fontWeight="SemiBold" color="neutralColorLight.Gray-80">
              {summary.amount}
            </Text>
          </Box>
        </>
      )}

      {detailPage === 'loanRepayment' && (
        <Box display="flex" w="100%" flexDirection="column" gap="s16">
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" flexDirection="column">
              <Text fontSize="s3" fontWeight="SemiBold" color="neutralColorLight.Gray-80">
                {summary.loanAccountName}
              </Text>
              <Text fontSize="r1" fontWeight="Regular" color="neutralColorLight.Gray-70">
                {summary.loanSubtype}
              </Text>
              <Box display="flex">
                <Text fontSize="s3" fontWeight="Medium" color="neutralColorLight.Gray-70">
                  {summary.loanAccId}
                </Text>
                <Icon ml="s4" as={IoCopyOutline} />
              </Box>
            </Box>

            <Box display="flex" flexDirection="column">
              <Text fontSize="s3" fontWeight="Regular" color="neutralColorLight.Gray-80">
                {t['transDetailInterest']}
              </Text>
              {/* <Text fontSize="s3" fontWeight="Medium" color="neutralColorLight.Gray-80">
              {summary.interestRate}
            </Text> */}
            </Box>
          </Box>
          <Box display="flex" flexDirection="column">
            <Text fontSize="s3" fontWeight="Regular" color="neutralColorLight.Gray-80">
              {t['transDetailSubmittedDate']}
            </Text>
            <Text fontSize="s3" fontWeight="Medium" color="neutralColorLight.Gray-80">
              {summary.repaymentDate}
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};
