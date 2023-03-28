import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import NepaliDate from 'nepali-date-converter';

import { Alert, Box, Button, Grid, Icon, IconButton, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import {
  DateType,
  LoanAccountInput,
  LoanInstallment,
  LoanRepaymentScheme,
  store,
  useGetEndOfDayDateDataQuery,
  useGetLoanInstallmentsQuery,
} from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { FormDatePicker, FormInput } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

export const LoanPaymentSchedule = () => {
  const dateType = store.getState().auth?.preference?.date || DateType.Ad;

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
  const installmentFrequency = watch('installmentFrequency');

  const disburseDate = watch('disbursementDate');
  const installmentBeginDate = watch('installmentBeginDate');

  const [isOpen, setIsOpen] = useState(false);

  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();

  const closingDate = useMemo(() => endOfDayData?.transaction?.endOfDayDate?.value, [endOfDayData]);

  const { data } = useGetLoanInstallmentsQuery(
    {
      interest: interest ?? 12,
      productId: String(productId),
      tenure: Number(tenure),
      sanctionAmount: Number(sanctionAmount),
      installmentFrequency,
      repaymentScheme: repaymentScheme ?? LoanRepaymentScheme.Emi,
      gracePeriod: gracePeriod
        ? {
            interestGracePeriod: Number(gracePeriod?.interestGracePeriod) ?? null,
            principalGracePeriod: Number(gracePeriod?.principalGracePeriod) ?? null,
          }
        : null,
      disburseDate,
      installmentBeginDate,
    },
    {
      enabled: trigger,
      onSuccess: () => setTrigger(false),
    }
  );

  useEffect(() => {
    if (
      !!productId &&
      !!tenure &&
      !!sanctionAmount &&
      !!interest &&
      !!repaymentScheme &&
      !!installmentFrequency &&
      !!disburseDate &&
      !!installmentBeginDate
    ) {
      setTrigger(true);
    }
  }, [
    productId,
    tenure,
    sanctionAmount,
    interest,
    repaymentScheme,
    errors,
    installmentFrequency,
    gracePeriod?.interestGracePeriod,
    gracePeriod?.principalGracePeriod,
    disburseDate,
    installmentBeginDate,
  ]);

  const loanInstallmentData = data?.loanAccount?.getLoanInstallments?.data
    ?.installments as LoanInstallment[];

  const loanInstallmentColumns = useMemo<Column<typeof loanInstallmentData[0]>[]>(
    () => [
      {
        header: 'Installment No.',
        footer: 'Total Cost of Loan',
        accessorKey: 'installmentNo',
        meta: {
          Footer: {
            colspan: 1,
          },
        },
      },
      {
        header: 'Installment Date',
        cell: (props) => localizedDate(props?.row?.original?.installmentDate),
      },
      {
        header: 'Principal',
        accessorFn: (row) => amountConverter(row?.principal ?? 0),
        footer: () =>
          amountConverter(data?.loanAccount?.getLoanInstallments?.data?.totalPrincipal ?? 0),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Interest',
        accessorFn: (row) => amountConverter(row?.interest ?? 0),
        footer: () =>
          amountConverter(data?.loanAccount?.getLoanInstallments?.data?.totalInterest ?? 0),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Payment',
        accessorKey: 'payment',
        accessorFn: (row) => amountConverter(row?.payment),
        footer: () => amountConverter(data?.loanAccount.getLoanInstallments?.data?.total ?? 0),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Remaining Principal',
        accessorFn: (row) => amountConverter(row?.remainingPrincipal),
        meta: {
          isNumeric: true,
        },
      },
    ],
    [loanInstallmentData]
  );

  return (
    <Box display="flex" flexDirection="column" gap="s16">
      <Grid templateColumns="repeat(2, 1fr)" gap="s16">
        <FormDatePicker
          name="disbursementDate"
          label="Disburse Date"
          minDate={
            closingDate?.local
              ? dateType === 'BS'
                ? new NepaliDate(closingDate?.np).toJsDate()
                : new Date(closingDate?.en)
              : new Date()
          }
          isRequired
        />
        <FormDatePicker
          name="installmentBeginDate"
          label="Installment Begin Date"
          // minDate={closingDate ? new Date(localizedDate(closingDate) as string) : new Date()}
          minDate={
            closingDate?.local
              ? dateType === 'BS'
                ? new NepaliDate(closingDate?.np).toJsDate()
                : new Date(closingDate?.en)
              : new Date()
          }
          isRequired
        />
      </Grid>
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
                rightAddonText="installment"
                textAlign="right"
              />
            </Box>

            <Box w="50%">
              <FormInput
                label="Grace Period On Interest"
                name="gracePeriod.interestGracePeriod"
                type="number"
                rightAddonText="installment"
                textAlign="right"
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
            size="report"
            isStatic
            showFooter
            data={loanInstallmentData}
            columns={loanInstallmentColumns}
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
