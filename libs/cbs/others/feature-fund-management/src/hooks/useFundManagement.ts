import { useEffect, useMemo } from 'react';
import { useFormContext, UseFormReturn } from 'react-hook-form';
import { useDeepCompareEffect } from 'react-use';
import { useRouter } from 'next/router';

import {
  useGetCurrentFundAmountQuery,
  useGetFundManagementFormStateQuery,
} from '@coop/cbs/data-access';

import { CustomFundManagementInput } from '../lib/type';

interface IFundMangementProps {
  methods?: UseFormReturn<CustomFundManagementInput, any>;
}

export const useFundManagement = ({ methods }: IFundMangementProps) => {
  const router = useRouter();

  const id = router?.query?.['id'];

  const formContext = useFormContext<CustomFundManagementInput>();

  const { watch, getValues, setValue, reset } = methods || formContext;

  const { data: currentFundAmountHOData } = useGetCurrentFundAmountQuery({ forHeadOffice: true });

  const currentFund = currentFundAmountHOData?.profitToFundManagement?.getCurrentFundAmount;

  const { data: editData } = useGetFundManagementFormStateQuery(
    { id: id as string },
    { enabled: !!id }
  );

  const formData = editData?.profitToFundManagement?.get?.record;

  const currentFundAmount = useMemo(
    () =>
      formData?.state === 'COMPLETED'
        ? Number(formData?.grossProfit || 0)
        : Number(
            currentFundAmountHOData?.profitToFundManagement?.getCurrentFundAmount?.amount?.amount ||
              0
          ),
    [formData, currentFundAmountHOData]
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
        coaHead: row?.coaHead,
        coaHeadName: row?.coaHeadName,
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
          coaHead: row?.coaHead,
          coaHeadName: row?.coaHeadName,
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
        coaHead: other?.coaHead,
        coaHeadName: other?.coaHeadName,
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
