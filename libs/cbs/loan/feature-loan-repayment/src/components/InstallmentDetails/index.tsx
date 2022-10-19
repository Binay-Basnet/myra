import { useGetLoanPreviewQuery } from '@coop/cbs/data-access';
import { Box, Divider, Text } from '@coop/shared/ui';

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
    <Box display="flex" flexDirection="column" gap="s32">
      {loanRepaymentData?.map((data) => (
        <Box
          display="flex"
          flexDirection="column"
          p="s16"
          gap="s18"
          bg="border.layout"
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
              {data?.principal}{' '}
            </Text>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Text fontWeight="400" fontSize="s3">
              Interest Amount{' '}
            </Text>
            <Text fontWeight="600" fontSize="s3">
              {data?.interestAmount}{' '}
            </Text>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="space-between">
            <Text fontWeight="600" fontSize="s3">
              Total Amount{' '}
            </Text>
            <Text fontWeight="600" fontSize="s3">
              {loanTotal}{' '}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
