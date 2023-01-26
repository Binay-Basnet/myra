import { Box, Chips, Text, Tooltip } from '@myra-ui';

import { TransferType } from '@coop/cbs/data-access';
import { localizedDate, RedirectButton, ROUTES } from '@coop/cbs/utils';
import { amountConverter, useTranslation } from '@coop/shared/utils';

type SummaryProps = {
  summary: {
    transactionId?: string | undefined | null;
    memberId?: string | undefined | null;
    transactionDate?: Record<'local' | 'en' | 'np', string> | null | undefined;
    paymentMode?: string | undefined | null;
    amount?: string | undefined | null;
    method?: string | undefined | null;
    loanAccountName?: string | undefined | null;
    loanSubtype?: string | undefined | null;
    loanAccId?: string | undefined | null;
    repaymentDate?: Record<'local' | 'en' | 'np', string> | undefined | null;
  };
  detailPage?: 'deposit' | 'withdraw' | 'accountTransfer' | 'agentTransaction' | 'loanRepayment';
};

const agentSlug = {
  AGENT: 'Market Representative',
};

export const Summary = ({ summary, detailPage }: SummaryProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Box p="s16" borderBottom="1px" borderBottomColor="border.layout" display="flex" gap="s16">
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
                  {localizedDate(summary.transactionDate)}
                </Text>
                {detailPage === 'accountTransfer' ? (
                  <Text fontSize="s3" fontWeight="Medium" color="neutralColorLight.Gray-80">
                    {summary.method === TransferType.Self && t['transDetailSelf']}
                    {summary.method === TransferType.Member && t['transDetailMembertoMember']}
                  </Text>
                ) : (
                  <Text fontSize="r1" fontWeight="Regular" color="neutralColorLight.Gray-80">
                    {detailPage === 'withdraw' ? 'Withdraw' : 'Deposit'} -&nbsp;
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
                {localizedDate(summary.transactionDate)}
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
            <Box display="flex" flexDirection="column" gap="s4" justifyContent="space-between">
              <Text
                fontSize="r1"
                fontWeight="Medium"
                color="neutralColorLight.Gray-80"
                lineHeight="17px"
              >
                #{summary.transactionId}
              </Text>
              <Box display="flex">
                <RedirectButton
                  link={`${ROUTES.CBS_LOAN_ACCOUNTS_DETAILS}?id=${summary?.loanAccId}`}
                  label={<Tooltip title={summary.loanAccountName as string} />}
                />
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Text fontSize="s3" fontWeight="Regular" color="gray.900" lineHeight="16px">
                  {summary.loanSubtype}
                </Text>
                {summary?.paymentMode && (
                  <Chips
                    theme="success"
                    variant="solid"
                    label={summary?.paymentMode}
                    size="sm"
                    type="label"
                  />
                )}
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      {detailPage === 'loanRepayment' && (
        <Box p="s16" display="flex" borderBottom="1px solid" borderColor="border.layout" gap="s4">
          <Text fontSize="s3" fontWeight="Regular" color="neutralColorLight.Gray-80">
            Repayment Date:
          </Text>
          <Text fontSize="s3" fontWeight="Medium" color="neutralColorLight.Gray-80">
            {localizedDate(summary.repaymentDate)}
          </Text>
        </Box>
      )}
    </>
  );
};
