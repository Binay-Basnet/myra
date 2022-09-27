import { useEffect, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';

import {
  GracePeriod,
  LoanAccountInput,
  LoanInstallment,
  LoanRepaymentScheme,
  useGetLoanInstallmentsQuery,
} from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import { Table } from '@coop/shared/table';
import { Alert, Box, Button, ChakraModal, Icon, Text } from '@coop/shared/ui';

export const LoanPaymentSchedule = () => {
  const [isOpen, setIsOpen] = useState(false);

  const methods = useForm();

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

  const { data } = useGetLoanInstallmentsQuery(
    {
      interest: interest ?? 12,
      productId,
      tenure: Number(tenure),
      sanctionAmount: Number(sanctionAmount),
      repaymentScheme: repaymentScheme ?? LoanRepaymentScheme.Emi,
      gracePeriod: gracePeriod?.installmentNo
        ? {
            gracePeriod: gracePeriod?.gracePeriod ?? GracePeriod.Interest,
            installmentNo: gracePeriod.installmentNo,
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
    gracePeriod?.gracePeriod,
    gracePeriod?.installmentNo,
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

      <ChakraModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add Grace Period"
        primaryButtonLabel="Save"
        primaryButtonHandler={() => {
          setValue('gracePeriod', {
            installmentNo: methods.getValues()['installmentNo'],
            gracePeriod: methods.getValues()['gracePeriod'],
          });
          setIsOpen(false);
        }}
      >
        <FormProvider {...methods}>
          <Box display="flex" alignItems="center" gap="s16">
            <FormSelect
              name="gracePeriod"
              options={[
                { label: 'Principal', value: GracePeriod.Principal },
                { label: 'Interest', value: GracePeriod.Interest },
              ]}
              label="Grace period on"
            />
            <FormSelect
              name="installmentNo"
              label="Installment No."
              options={
                data?.loanAccount?.getLoanInstallments
                  ? data?.loanAccount.getLoanInstallments?.data?.installments?.map(
                      (installment) => ({
                        label: installment?.installmentNo as number,
                        value: installment?.installmentNo as number,
                      })
                    )
                  : [
                      {
                        label: 1,
                        value: 1,
                      },
                    ]
              }
            />
          </Box>
        </FormProvider>
      </ChakraModal>

      {data && data?.loanAccount.getLoanInstallments?.data?.installments && (
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
