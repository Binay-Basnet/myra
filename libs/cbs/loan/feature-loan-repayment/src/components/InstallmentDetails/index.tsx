import { Box, Text } from '@myra-ui';

import { useGetLoanPreviewQuery } from '@coop/cbs/data-access';
import { amountConverter } from '@coop/shared/utils';

interface IProps {
  loanAccountId: string;
}
export const InstallmentData = ({ loanAccountId }: IProps) => {
  const loanPreview = useGetLoanPreviewQuery({ id: loanAccountId });
  const loanRepaymentData =
    loanPreview?.data?.loanAccount?.loanPreview?.data?.repaymentDetails?.remainingInstallments;
  const loanTotal =
    loanPreview?.data?.loanAccount?.loanPreview?.data?.repaymentDetails?.totalInstallmentAmount;

  return (
    <Box>
      {' '}
      <Box display="flex" flexDirection="column" gap="s16" bg="border.layout">
        {loanRepaymentData?.map((data) => (
          <Box
            display="flex"
            flexDirection="column"
            p="s16"
            gap="s16"
            key={`${data?.installmentNo}${data?.interestAmount}`}
          >
            <Box display="flex" justifyContent="space-between">
              <Text fontWeight="600" fontSize="s3">
                Installment No.{data?.installmentNo}{' '}
              </Text>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Text fontWeight="400" fontSize="s3">
                Principal Amount{' '}
              </Text>
              <Text fontWeight="600" fontSize="s3">
                {amountConverter(data?.principal as string)}{' '}
              </Text>
            </Box>
            {/* {data?.interestAmount && data.interestAmount !== '0' && ( */}
            <Box display="flex" justifyContent="space-between">
              <Text fontWeight="400" fontSize="s3">
                Interest Amount{' '}
              </Text>
              <Text fontWeight="600" fontSize="s3">
                {amountConverter(data?.interestAmount ?? 0)}{' '}
              </Text>
            </Box>
            {/* )} */}
            {/* {data?.fine && data.fine !== '0' && ( */}
            <Box display="flex" justifyContent="space-between">
              <Text fontWeight="400" fontSize="s3">
                Fine{' '}
              </Text>
              <Text fontWeight="600" fontSize="s3">
                {amountConverter(data?.fine ?? 0)}{' '}
              </Text>
            </Box>
            {/* )} */}
          </Box>
        ))}

        <Box display="flex" justifyContent="space-between" p="s16">
          <Text fontWeight="600" fontSize="s3">
            Total Amount{' '}
          </Text>
          <Text fontWeight="600" fontSize="s3">
            {amountConverter(loanTotal as string)}{' '}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
