import { IoCopyOutline } from 'react-icons/io5';

import { Box, Chips, Icon, Text } from '@myra-ui';

import { TransferType } from '@coop/cbs/data-access';
import { amountConverter, useTranslation } from '@coop/shared/utils';

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
        <Box gap="s8" display="flex" flexDirection="column" width="full">
          <Text fontSize="r1" fontWeight="Regular" color="neutralColorLight.Gray-70">
            #{summary.transactionId}
          </Text>
          <Box gap="s8" display="flex" width="full" justifyContent="space-between">
            <Box gap="s4" w="100%" display="flex" flexDirection="column">
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
                  {t['transDetailDeposit']} -&nbsp;
                  {summary.method === 'AGENT' ? agentSlug[summary.method] : summary.method}
                </Text>
              )}
            </Box>
            <Box w="100%" gap="s4" display="flex" flexDirection="column">
              <Box display="flex" justifyContent="flex-end">
                <Text fontSize="r1" fontWeight="SemiBold" color="neutralColorLight.Gray-80">
                  {amountConverter(summary.amount ?? 0)}
                </Text>
              </Box>
              <Box display="flex" justifyContent="flex-end">
                <Chips
                  type="label"
                  theme="success"
                  variant="solid"
                  label={summary.paymentMode ?? ''}
                  size="md"
                />
              </Box>
            </Box>
          </Box>
        </Box>
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
              {amountConverter(summary.amount ?? 0)}
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
