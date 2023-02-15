import { Box, Text } from '@myra-ui';

import { useGetLoanPreviewQuery } from '@coop/cbs/data-access';
import { amountConverter } from '@coop/shared/utils';

interface IProps {
  loanAccountId: string;
}

export const InstallmentData = ({ loanAccountId }: IProps) => {
  // const methods = useFormContext();
  // const { watch } = methods;

  // const amountPaid = watch('amountPaid');

  const loanPreview = useGetLoanPreviewQuery({ id: loanAccountId });
  const loanRepaymentData =
    loanPreview?.data?.loanAccount?.loanPreview?.data?.repaymentDetails?.remainingInstallments;
  const loanTotal =
    loanPreview?.data?.loanAccount?.loanPreview?.data?.repaymentDetails?.totalInstallmentAmount;

  // const loanCalculatedData = loanRepaymentData?.map((item) => {
  //   let fineTemp = 0;
  //   let interestTemp = 0;
  //   let principalTemp = 0;

  //   console.log(principalTemp, Number(item?.fine), amountPaid);
  //   if (principalTemp > Number(item?.fine)) {
  //     fineTemp = principalTemp - Number(item?.fine);
  //   } else if (Number(item?.fine) > 0) {
  //     fineTemp = Number(amountPaid) - Number(item?.fine);
  //   } else {
  //     fineTemp = principalTemp;
  //   }

  //   if (fineTemp > Number(item?.interestAmount)) {
  //     interestTemp = fineTemp - Number(item?.interestAmount);
  //   } else {
  //     interestTemp = fineTemp;
  //   }

  //   if (interestTemp > Number(item?.principal)) {
  //     principalTemp = interestTemp - Number(item?.principal);
  //   } else {
  //     principalTemp = interestTemp;
  //   }

  //   return {
  //     installmentNo: item?.installmentNo,
  //     fine: principalTemp > Number(item?.fine) ? item?.fine : fineTemp,
  //     interestAmount: fineTemp > Number(item?.interestAmount) ? item?.interestAmount : interestTemp,
  //     principal: interestTemp > Number(item?.principal) ? item?.principal : principalTemp,
  //   };
  // });

  return (
    <Box>
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
                Installment No.{data?.installmentNo}
              </Text>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Text fontWeight="400" fontSize="s3">
                Principal Amount
              </Text>
              <Text fontWeight="600" fontSize="s3">
                {amountConverter(data?.principal ?? 0)}
              </Text>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Text fontWeight="400" fontSize="s3">
                Interest Amount
              </Text>
              <Text fontWeight="600" fontSize="s3">
                {amountConverter(data?.interestAmount ?? 0)}
              </Text>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Text fontWeight="400" fontSize="s3">
                Fine
              </Text>
              <Text fontWeight="600" fontSize="s3">
                {amountConverter(data?.fine ?? 0)}
              </Text>
            </Box>
          </Box>
        ))}

        <Box display="flex" justifyContent="space-between" p="s16">
          <Text fontWeight="600" fontSize="s3">
            Total Amount
          </Text>
          <Text fontWeight="600" fontSize="s3">
            {amountConverter(loanTotal as string)}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
