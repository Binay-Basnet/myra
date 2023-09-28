import { useEffect, useMemo } from 'react';
import { useFormContext, UseFormReturn } from 'react-hook-form';
import { useDeepCompareEffect } from 'react-use';
import { useRouter } from 'next/router';

import {
  useGetCoaAccountDetailsQuery,
  useGetFundManagementFormStateQuery,
} from '@coop/cbs/data-access';
import { debitCreditConverter } from '@coop/shared/utils';

import { CustomFundManagementInput } from '../lib/type';

interface IFundMangementProps {
  methods?: UseFormReturn<CustomFundManagementInput, any>;
}

export const useFundManagement = ({ methods }: IFundMangementProps) => {
  const router = useRouter();

  const id = router?.query?.['id'];

  const formContext = useFormContext<CustomFundManagementInput>();

  const { watch, getValues, setValue, reset } = methods || formContext;

  const destinationLedger = watch('destinationLedger');

  const { data: accountQueryData } = useGetCoaAccountDetailsQuery(
    {
      id:
        destinationLedger && typeof destinationLedger === 'object'
          ? (destinationLedger as { value: string })?.['value']
          : destinationLedger,
    },
    {
      enabled: !!destinationLedger,
    }
  );

  const currentFund = useMemo(() => {
    if (!destinationLedger) return { amount: 0 };

    const accountData =
      accountQueryData?.settings?.chartsOfAccount?.coaAccountDetails?.data?.overview;

    return {
      amount: accountData?.closingBalance,
      amountType: accountData?.balanceType,
    };
  }, [accountQueryData, destinationLedger]);

  const { data: editData } = useGetFundManagementFormStateQuery(
    { id: id as string },
    { enabled: !!id }
  );

  const formData = editData?.profitToFundManagement?.get?.record;

  const currentFundAmount = useMemo(
    () =>
      formData?.state === 'COMPLETED'
        ? Number(formData?.grossProfit || 0)
        : Number(currentFund.amount || 0),
    [formData, currentFund]
  );

  // staff bonus fund section
  const staffBonusFundAmount = Number(watch('staffBonus.amount') || 0);

  const remainingProfitAfterStaff = Number((currentFundAmount - staffBonusFundAmount).toFixed(2));

  useEffect(() => {
    const incomeTaxPercent = getValues()?.['incomeTax']?.['percent'];

    setValue(
      'incomeTax.amount',
      ((Number(incomeTaxPercent || 0) / 100) * remainingProfitAfterStaff).toFixed(2)
    );
  }, [remainingProfitAfterStaff]);

  // income tax section
  const incomeTaxAmount = Number(watch('incomeTax.amount') || 0);

  const remainingProfitAfterTax = Number((remainingProfitAfterStaff - incomeTaxAmount).toFixed(2));

  useEffect(() => {
    const generalReserveFundData = getValues()?.generalReserveFund;

    reset({
      ...getValues(),
      generalReserveFund: generalReserveFundData?.map((row) => ({
        ledgerId: row?.ledgerId,
        ledgerName: row?.ledgerName,
        percent: row?.percent,
        amount: ((Number(row?.percent || 0) / 100) * remainingProfitAfterTax).toFixed(2),
      })),
    });
  }, [remainingProfitAfterTax]);

  // general reserve fund section
  const generalReserveFund = watch('generalReserveFund');

  const generalReserveFundTotal =
    generalReserveFund?.reduce(
      (accumulator: number, curr) => accumulator + Number(curr.amount),
      0 as number
    ) ?? 0;

  const remainingProfitAfterReserve = useMemo(
    () => Number((remainingProfitAfterTax - generalReserveFundTotal).toFixed(2)),
    [remainingProfitAfterTax, generalReserveFundTotal]
  );

  useDeepCompareEffect(() => {
    if (generalReserveFund) {
      const distributionTableData = getValues()?.distributionTable;

      reset({
        ...getValues(),
        distributionTable: distributionTableData?.map((row) => ({
          ledgerId: row?.ledgerId,
          ledgerName: row?.ledgerName,
          percent: row?.percent,
          amount: ((Number(row?.percent || 0) / 100) * remainingProfitAfterReserve).toFixed(2),
        })),
      });
    }
  }, [generalReserveFund]);

  // patronage refund/cooperative promotion fund section
  const distributionTable = watch('distributionTable');

  const distributionTableTotal =
    distributionTable?.reduce(
      (accumulator: number, curr) => accumulator + Number(curr.amount),
      0 as number
    ) ?? 0;

  const remainingProfitAfterDistribution = useMemo(
    () => Number((remainingProfitAfterReserve - distributionTableTotal).toFixed(2)),
    [remainingProfitAfterReserve, distributionTableTotal]
  );

  useDeepCompareEffect(() => {
    const values = getValues();

    reset({
      ...getValues(),
      otherFunds: values?.otherFunds?.map((other) => ({
        ledgerId: other?.ledgerId,
        ledgerName: other?.ledgerName,
        percent: other?.percent as number,
        amount: ((Number(other?.percent || 0) / 100) * remainingProfitAfterDistribution).toFixed(2),
      })),
    });
  }, [distributionTable]);

  // other funds section
  const otherFunds = watch('otherFunds');

  const otherFundsTotal =
    otherFunds?.reduce(
      (accumulator: number, curr) => accumulator + Number(curr.amount),
      0 as number
    ) ?? 0;

  const otherFundsPercentTotal =
    otherFunds?.reduce(
      (accumulator: number, curr) => accumulator + Number(curr.percent),
      0 as number
    ) ?? 0;

  const remainingProfitAfterOther = useMemo(
    () => Number((remainingProfitAfterDistribution - otherFundsTotal).toFixed(2)),
    [remainingProfitAfterDistribution, otherFundsTotal]
  );

  // for edit and view
  useEffect(() => {
    if (formData) {
      const grossProfit =
        formData?.state === 'COMPLETED'
          ? Number(formData?.grossProfit || 0)
          : Number(currentFund?.amount || 0);

      const staffBonusAmount = Number(formData?.staffBonus?.amount || 0);

      const incometTaxAmountForm = Number(formData?.incometax?.amount || 0);

      const netProfit = (grossProfit - staffBonusAmount - incometTaxAmountForm).toFixed(2);

      const generalReserveFundForm =
        formData?.fundDistribution?.filter((fund) => fund?.tableIndex === 0) ?? [];

      const distributionFund =
        formData?.fundDistribution?.filter((fund) => fund?.tableIndex === 1) ?? [];

      const otherFundsTable =
        formData?.fundDistribution?.filter((fund) => fund?.tableIndex === 2) ?? [];

      reset({
        // ...methods.getValues(),
        grossProfit,
        destinationLedger: {
          label: formData?.grossProfitLedgerName,
          value: formData?.grossProfitLedgerID,
        } as unknown as string,
        // grossProfitCoa:
        //   formData?.state === 'COMPLETED'
        //     ? (formData?.grossProfitCoa as string)
        //     : `${currentFund?.coaHead} - ${currentFund?.coaHeadName}`,
        grossProfitDr:
          formData?.state === 'COMPLETED'
            ? debitCreditConverter(grossProfit, 'CR')
            : debitCreditConverter(
                currentFund?.amount as string,
                currentFund?.amountType as string
              ),
        staffBonus: {
          ledgerId: {
            label: formData?.staffBonus?.ledgerName,
            value: formData?.staffBonus?.ledgerID,
          } as unknown as string,
          percent: formData?.staffBonus?.percent,
          amount: formData?.staffBonus?.amount as string,
        },
        incomeTax: {
          ledgerId: {
            label: formData?.incometax?.ledgerName,
            value: formData?.incometax?.ledgerID,
          } as unknown as string,
          percent: formData?.incometax?.percent,
          amount: formData?.incometax?.amount as string,
        },
        generalReserveFund: generalReserveFundForm?.map((g) => ({
          ledgerId: g?.ledgerID as string,
          ledgerName: g?.ledgerName as string,
          percent: String(g?.percent),
          amount: g?.amount as string,
        })),
        distributionTable: distributionFund?.map((g) => ({
          ledgerId: g?.ledgerID as string,
          ledgerName: g?.ledgerName as string,
          percent: String(g?.percent),
          amount: g?.amount as string,
        })),
        otherFunds: otherFundsTable?.map((g) => ({
          ledgerId: g?.ledgerID as string,
          ledgerName: g?.ledgerName as string,
          percent: String(g?.percent),
          amount: g?.amount as string,
        })),
        netProfit,
      });
    }
  }, [formData, currentFund]);

  return {
    currentFund,
    currentFundAmount,
    staffBonusFundAmount,
    remainingProfitAfterStaff,
    remainingProfitAfterTax,
    remainingProfitAfterReserve,
    remainingProfitAfterDistribution,
    remainingProfitAfterOther,
    otherFundsTotal,
    otherFundsPercentTotal,
  };
};
