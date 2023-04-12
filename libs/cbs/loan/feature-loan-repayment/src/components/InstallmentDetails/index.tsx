import { Dispatch, SetStateAction, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, Chips, Divider, Text } from '@myra-ui';

import { useGetLoanPreviewQuery } from '@coop/cbs/data-access';
import { amountConverter } from '@coop/shared/utils';

interface IProps {
  loanAccountId: string;
  totalPayableAmount: number;
  setTotalPayableAmount: Dispatch<SetStateAction<number>>;
}

type CoveredInstallment = {
  principal: number;
  interest: number;
  fine: number;
  isPrincipalPartial: boolean;
  isInterestPartial: boolean;
  isFinePartial: boolean;
  installmentNo: number;
};

export const InstallmentData = ({
  loanAccountId,
  totalPayableAmount,
  setTotalPayableAmount,
}: IProps) => {
  const methods = useFormContext();
  const { watch } = methods;

  const amountPaid = Number(watch('amountPaid')) ?? 0;

  const { data: loanPreviewData } = useGetLoanPreviewQuery({ id: loanAccountId });

  const loanInstallments =
    loanPreviewData?.loanAccount?.loanPreview?.data?.paymentSchedule?.installments;

  const loanType =
    loanPreviewData?.loanAccount?.loanPreview?.data?.loanDetails?.loanRepaymentScheme;

  const remainingInstallments = useMemo(() => {
    const lastUnpaidInstallment = loanInstallments?.find(
      (installment) => installment?.status && installment?.status !== 'PAID'
    )?.installmentNo;

    return lastUnpaidInstallment
      ? loanInstallments?.slice(lastUnpaidInstallment - 1, Number(loanInstallments?.length))
      : loanInstallments;
  }, [loanInstallments]);

  const overDueInstallments = useMemo(
    () => loanInstallments?.filter((installment) => installment?.status === 'OVERDUE') ?? [],
    [loanInstallments]
  );

  const totalFine = useMemo(
    () =>
      overDueInstallments?.reduce(
        (sum, installment) => sum + Number(installment?.penalty ?? 0),
        0
      ) ?? 0,
    [overDueInstallments]
  );

  const discountAmount = watch('discount.amount');

  const discountedFine = totalFine - Number(discountAmount ?? 0);

  const coveredInstallments: CoveredInstallment[] = useMemo(() => {
    let tempAmount = Number(amountPaid) - discountedFine;

    if (tempAmount < 0 || !remainingInstallments?.length) return [];

    const tempCoveredInstallments: CoveredInstallment[] = [];

    for (let index = 0; index < remainingInstallments.length; index += 1) {
      if (tempAmount < 0) break;

      const installment = remainingInstallments[index];

      if (!installment) break;

      const tempInst: CoveredInstallment = {
        principal: 0,
        interest: 0,
        fine: 0,
        isPrincipalPartial: false,
        isInterestPartial: false,
        isFinePartial: false,
        installmentNo: installment.installmentNo,
      };

      const principal = installment?.isPartial
        ? Number(installment?.currentRemainingPrincipal)
        : Number(installment?.fullPrincipal);

      const interest = installment?.isPartial
        ? Number(installment?.remainingInterest)
        : Number(installment?.interest);

      const existingIndex = tempCoveredInstallments?.findIndex(
        (inst) => inst?.installmentNo === installment?.installmentNo
      );

      if (
        interest &&
        (loanType !== 'EPI' ||
          (loanType === 'EPI' && installment?.status && installment.status !== 'CURRENT'))
      ) {
        if (tempAmount > interest) {
          if (existingIndex !== -1) {
            tempCoveredInstallments[existingIndex].interest = interest;
            tempCoveredInstallments[existingIndex].isInterestPartial = false;
          } else {
            tempInst.interest = interest;
            tempInst.isInterestPartial = false;
          }
          tempAmount -= interest;
        } else {
          if (existingIndex !== -1) {
            tempCoveredInstallments[existingIndex].interest = tempAmount;
            tempCoveredInstallments[existingIndex].isInterestPartial = true;
          } else {
            tempInst.interest = tempAmount;
            tempInst.isInterestPartial = true;
            tempCoveredInstallments.push(tempInst);
          }
          break;
        }
      }

      if (principal) {
        if (tempAmount > principal) {
          if (existingIndex !== -1) {
            tempCoveredInstallments[existingIndex].principal = principal;
            tempCoveredInstallments[existingIndex].isPrincipalPartial = false;
          } else {
            tempInst.principal = principal;
            tempInst.isPrincipalPartial = false;
          }
          tempAmount -= principal;
        } else {
          if (existingIndex !== -1) {
            tempCoveredInstallments[existingIndex].principal = tempAmount;
            tempCoveredInstallments[existingIndex].isPrincipalPartial = true;
          } else {
            tempInst.principal = tempAmount;
            tempInst.isPrincipalPartial = true;

            tempCoveredInstallments.push(tempInst);
          }
          break;
        }
      }

      tempCoveredInstallments.push(tempInst);
    }

    return tempCoveredInstallments;
  }, [amountPaid, remainingInstallments, loanType, discountedFine]);

  const { totalCoveredPrincipal, totalCoveredInterest, returnAmount } = useMemo(() => {
    const tempPrincipal = coveredInstallments?.reduce(
      (sum, installment) => sum + Number(installment.principal),
      0
    );

    const tempInterest = coveredInstallments?.reduce(
      (sum, installment) => sum + Number(installment.interest),
      0
    );

    setTotalPayableAmount(tempPrincipal + tempInterest + discountedFine);

    return {
      totalCoveredPrincipal: tempPrincipal,
      totalCoveredInterest: tempInterest,
      returnAmount: amountPaid - tempPrincipal - tempInterest - discountedFine,
    };
  }, [coveredInstallments, amountPaid, discountedFine]);

  return amountPaid ? (
    <Box display="flex" flexDirection="column" gap="s16">
      <Box display="flex" flexDirection="column" gap="s8">
        <Text fontSize="s3" fontWeight={500} color="gray.700">
          Payment Details
        </Text>
        {coveredInstallments?.map(
          (installment) =>
            installment && (
              <Box
                display="flex"
                flexDirection="column"
                gap="s16"
                p="s16"
                bg="highlight.500"
                borderRadius="br3"
                key={installment.installmentNo}
              >
                <Box display="flex" flexDirection="column" gap="s4">
                  <Box display="flex" justifyContent="space-between">
                    <Text fontWeight="400" fontSize="s3" color="gray.600">
                      Installment No
                    </Text>
                    <Text fontWeight="500" fontSize="s3" color="gray.700">
                      {installment.installmentNo}
                    </Text>
                  </Box>
                  {installment.principal ? (
                    <Box display="flex" justifyContent="space-between">
                      <Box display="flex" alignItems="center" gap="s4">
                        <Text fontWeight="400" fontSize="s3" color="gray.600">
                          Principal
                        </Text>

                        {installment.isPrincipalPartial && (
                          <Chips
                            variant="solid"
                            theme="warning"
                            size="md"
                            type="label"
                            label="Partial"
                          />
                        )}
                      </Box>

                      <Text fontWeight="500" fontSize="s3" color="gray.700">
                        {amountConverter(installment.principal)}
                      </Text>
                    </Box>
                  ) : null}
                  {installment.interest ? (
                    <Box display="flex" justifyContent="space-between">
                      <Box display="flex" alignItems="center" gap="s4">
                        <Text fontWeight="400" fontSize="s3" color="gray.600">
                          Interest
                        </Text>

                        {installment.isInterestPartial && (
                          <Chips
                            variant="solid"
                            theme="warning"
                            size="md"
                            type="label"
                            label="Partial"
                          />
                        )}
                      </Box>
                      <Text fontWeight="500" fontSize="s3" color="gray.700">
                        {amountConverter(installment.interest)}
                      </Text>
                    </Box>
                  ) : null}
                  {installment.fine ? (
                    <Box display="flex" justifyContent="space-between">
                      <Box display="flex" alignItems="center" gap="s4">
                        <Text fontWeight="400" fontSize="s3" color="gray.600">
                          Fine
                        </Text>

                        {installment.isFinePartial && (
                          <Chips
                            variant="solid"
                            theme="warning"
                            size="md"
                            type="label"
                            label="Partial"
                          />
                        )}
                      </Box>
                      <Text fontWeight="500" fontSize="s3" color="gray.700">
                        {amountConverter(installment.fine)}
                      </Text>
                    </Box>
                  ) : null}
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <Text fontWeight="500" fontSize="r1" color="gray.800">
                    Total
                  </Text>
                  <Text fontWeight="500" fontSize="r1" color="gray.800">
                    {amountConverter(
                      installment.principal + installment.interest + installment.fine
                    )}
                  </Text>
                </Box>
              </Box>
            )
        )}
      </Box>

      <Divider />

      <Box
        display="flex"
        flexDirection="column"
        gap="s4"
        px="s16"
        py="s18"
        border="1px"
        borderColor="border.layout"
        borderRadius="br3"
      >
        {totalCoveredPrincipal ? (
          <Box display="flex" justifyContent="space-between">
            <Text fontSize="s3" fontWeight={500} color="gray.700">
              Total Principal
            </Text>

            <Text fontSize="s3" fontWeight={500} color="gray.700">
              {amountConverter(totalCoveredPrincipal)}
            </Text>
          </Box>
        ) : null}
        {totalCoveredInterest ? (
          <Box display="flex" justifyContent="space-between">
            <Text fontSize="s3" fontWeight={500} color="gray.700">
              Total Interest
            </Text>

            <Text fontSize="s3" fontWeight={500} color="gray.700">
              {amountConverter(totalCoveredInterest)}
            </Text>
          </Box>
        ) : null}
        {discountedFine ? (
          <Box display="flex" justifyContent="space-between">
            <Text fontSize="s3" fontWeight={500} color="gray.700">
              Total Fine
            </Text>

            <Text fontSize="s3" fontWeight={500} color="gray.700">
              {amountConverter(discountedFine)}
            </Text>
          </Box>
        ) : null}
        <Box display="flex" justifyContent="space-between">
          <Text fontSize="s3" fontWeight={500} color="gray.700">
            Total Payable Amount
          </Text>

          <Text fontSize="s3" fontWeight={500} color="gray.700">
            {amountConverter(totalPayableAmount)}
          </Text>
        </Box>
        {returnAmount > 0 ? (
          <Box display="flex" justifyContent="space-between">
            <Text fontSize="s3" fontWeight={500} color="gray.700">
              Return
            </Text>

            <Text fontSize="s3" fontWeight={500} color="gray.700">
              {amountConverter(returnAmount)}
            </Text>
          </Box>
        ) : null}
      </Box>
    </Box>
  ) : null;
};
