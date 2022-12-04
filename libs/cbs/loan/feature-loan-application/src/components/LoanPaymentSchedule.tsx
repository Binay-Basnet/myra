import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';

import {
  LoanAccountInput,
  LoanInstallment,
  LoanRepaymentScheme,
  useGetLoanInstallmentsQuery,
} from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import { Table } from '@myra-ui/table';
import { Alert, Box, Button, Icon, IconButton, Text } from '@myra-ui';

export const LoanPaymentSchedule = () => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<LoanAccountInput>();

  const [trigger, setTrigger] = useState(false);

  const productId = watch('productId');
  const tenure = watch('tenure');
  const sanctionAmount = watch('totalSanctionedAmount');
  const interest = watch('intrestRate');
  const repaymentScheme = watch('repaymentScheme');
  const gracePeriod = watch('gracePeriod');

  const [isOpen, setIsOpen] = useState(false);

  const { data } = useGetLoanInstallmentsQuery(
    {
      interest: interest ?? 12,
      productId: String(productId),
      tenure: Number(tenure),
      sanctionAmount: Number(sanctionAmount),
      repaymentScheme: repaymentScheme ?? LoanRepaymentScheme.Emi,
      gracePeriod: gracePeriod
        ? {
            interestGracePeriod: Number(gracePeriod?.interestGracePeriod) ?? null,
            principalGracePeriod: Number(gracePeriod?.principalGracePeriod) ?? null,
          }
        : null,
    },
    {
      enabled: trigger,
      onSuccess: () => setTrigger(false),
    }
  );

  useEffect(() => {
    if (!!productId && !!tenure && !!sanctionAmount && !!interest && !!repaymentScheme) {
      setTrigger(true);
    }
  }, [
    productId,
    tenure,
    sanctionAmount,
    interest,
    repaymentScheme,
    errors,
    gracePeriod?.interestGracePeriod,
    gracePeriod?.principalGracePeriod,
  ]);

  return (
    <Box display="flex" flexDirection="column" gap="s16">
      <Box display="flex" flexDirection="column" gap="s8">
        <Text fontSize="r1" fontWeight="600">
          Loan Payment Schedule
        </Text>
        <Box>
          <Button
            variant="outline"
            gap="s4"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <Icon as={AiOutlinePlus} />
            Add Grace Period
          </Button>
        </Box>
      </Box>

      {(isOpen || gracePeriod?.interestGracePeriod || gracePeriod?.principalGracePeriod) && (
        <Box bg="background.500" p="s16" display="flex" flexDir="column" alignItems="end">
          <Box alignContent="end">
            <IconButton
              aria-label="close"
              variant="ghost"
              onClick={() => {
                setValue('gracePeriod', {
                  principalGracePeriod: null,
                  interestGracePeriod: null,
                });

                setIsOpen(false);
              }}
            >
              <Icon as={IoClose} />
            </IconButton>
          </Box>
          <Box w="100%" display="flex" alignItems="center" gap="s16">
            <Box w="50%">
              <FormInput
                label="Grace Period On Principal"
                name="gracePeriod.principalGracePeriod"
                type="number"
              />
            </Box>

            <Box w="50%">
              <FormInput
                label="Grace Period On Interest"
                name="gracePeriod.interestGracePeriod"
                type="number"
              />
            </Box>
          </Box>
        </Box>
      )}

      {data?.loanAccount?.getLoanInstallments?.error?.__typename === 'BadRequestError' ? (
        <Alert
          status="error"
          title={data?.loanAccount?.getLoanInstallments?.error?.badRequestErrorMessage}
        />
      ) : (
        data &&
        data?.loanAccount?.getLoanInstallments?.data?.installments && (
          <Table<LoanInstallment>
            variant="report"
            size="small"
            isStatic
            showFooter
            data={data?.loanAccount.getLoanInstallments?.data?.installments as LoanInstallment[]}
            columns={[
              {
                header: 'Installment No.',
                footer: 'Total Cost of Loan',
                accessorKey: 'installmentNo',
                meta: {
                  Footer: {
                    colspan: 4,
                  },
                },
              },
              {
                header: 'Principal',
                accessorKey: 'principal',
                meta: {
                  isNumeric: true,
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Interest',
                accessorKey: 'interest',
                meta: {
                  isNumeric: true,
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Payment',
                accessorKey: 'payment',
                meta: {
                  isNumeric: true,
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Remaining Principal',
                footer: data?.loanAccount.getLoanInstallments?.data?.total,
                accessorKey: 'remainingPrincipal',
                meta: {
                  isNumeric: true,
                },
              },
            ]}
          />
        )
      )}
      {gracePeriod?.gracePeriod && gracePeriod?.installmentNo && (
        <Alert status="info" hideCloseIcon>
          <Text fontWeight="500">
            Initial Grace Period on {gracePeriod?.gracePeriod.toLowerCase()} has been applied to
            Installment No. {gracePeriod?.installmentNo}.
          </Text>
        </Alert>
      )}
    </Box>
  );
};
