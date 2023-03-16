import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDeepCompareEffect } from 'react-use';

import { Box, Text } from '@myra-ui';

import {
  BulkDepositInput,
  Installment,
  InstallmentState,
  NatureOfDepositProduct,
  ObjState,
  useGetAccountTableListMinimalQuery,
  useGetBulkInstallmentsDataQuery,
} from '@coop/cbs/data-access';
import { FormEditableTable } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type DepositAccountTable = {
  accountId: string;
  noOfInstallments: string;
  amount: string;
  rebate: string;
  fine: string;
  installmentAmount: number;
  hasInstallment: boolean;
};

type CustomBulkDepositInput = Omit<BulkDepositInput, 'cash' | 'accounts'> & {
  cash?:
    | {
        cashPaid: string;
        disableDenomination: boolean;
        total: string;
        returned_amount: string;
        denominations: { value?: string; quantity?: number; amount?: string }[];
      }
    | undefined
    | null;
  accounts: DepositAccountTable[];
};

interface IGetInstallmentSummaryArgs {
  noOfInstallments: number;
  installmentList: Installment[] | undefined | null;
  installmentAmount: number;
}

const getInstallmentSummary = ({
  noOfInstallments,
  installmentList,
  installmentAmount,
}: IGetInstallmentSummaryArgs) => {
  if (!installmentList?.length || !noOfInstallments) {
    return { total: 0, rebate: 0, fine: 0 };
  }

  const filteredInstallments = installmentList?.filter(
    (installment) =>
      installment?.status === InstallmentState.Cancelled ||
      installment?.status === InstallmentState.Paid
  );

  const pendingInstallments = installmentList.slice(
    filteredInstallments.length,
    filteredInstallments.length + Number(noOfInstallments)
  );

  const tempFine = pendingInstallments.reduce(
    (accumulator, curr) => accumulator + Number(curr?.fine),
    0
  );
  const tempRebate = pendingInstallments.reduce(
    (accumulator, curr) => accumulator + Number(curr?.rebate),
    0
  );

  const tempInstallmentAmount = noOfInstallments * installmentAmount;

  return {
    total: tempInstallmentAmount,
    fine: String(tempFine),
    rebate: String(tempRebate),
  };
};

interface IBulkDepositAccountsTableProps {
  memberId: string;
  setTotalDepositAmount: Dispatch<SetStateAction<number>>;
  setTotalRebate: Dispatch<SetStateAction<number>>;
}

export const BulkDepositAccountsTable = ({
  memberId,
  setTotalDepositAmount,
  setTotalRebate,
}: IBulkDepositAccountsTableProps) => {
  const { t } = useTranslation();

  const { setValue, watch, getValues } = useFormContext<CustomBulkDepositInput>();

  const [installmentAccountIds, setInstallmentAccountIds] = useState<string[]>([]);

  const [noOfInstallmentsArr, setNoOfInstallmentsArr] = useState<(number | string)[]>([]);

  const accountTypes = {
    [NatureOfDepositProduct.Saving]: t['addDepositSaving'],
    [NatureOfDepositProduct.RecurringSaving]: t['addDepositRecurringSavingAccount'],
    [NatureOfDepositProduct.TermSavingOrFd]: t['addDepositTermSavingAccount'],
    [NatureOfDepositProduct.Current]: t['addDepositCurrent'],
  };

  const { data: accountListData } = useGetAccountTableListMinimalQuery(
    {
      paginate: {
        first: -1,
        after: '',
      },
      filter: {
        query: memberId,
        orConditions: [
          {
            andConditions: [
              {
                column: 'objState',
                comparator: 'EqualTo',
                value: ObjState.Active,
              },
            ],
          },
        ],
      },
    },
    {
      staleTime: 0,
      enabled: !!memberId,
    }
  );

  const { data: bulkInstallmentsListData } = useGetBulkInstallmentsDataQuery(
    {
      ids: installmentAccountIds,
    },
    { enabled: !!installmentAccountIds?.length }
  );

  useEffect(() => {
    const temp: string[] = [];

    accountListData?.account?.list?.edges?.forEach((account) => {
      if (
        account?.node?.product?.nature === NatureOfDepositProduct.RecurringSaving ||
        (account?.node?.product?.nature === NatureOfDepositProduct.Saving &&
          account?.node?.product?.isMandatorySaving)
      ) {
        temp.push(account?.node?.id);
      }
    });

    setInstallmentAccountIds(temp);
  }, [accountListData]);

  useDeepCompareEffect(() => {
    setValue(
      'accounts',
      accountListData?.account?.list?.edges?.map((account) => {
        const hasInstallment =
          account?.node?.product?.nature === NatureOfDepositProduct.RecurringSaving ||
          (account?.node?.product?.nature === NatureOfDepositProduct.Saving &&
            account?.node?.product?.isMandatorySaving);

        return {
          accountId: account?.node?.id as string,
          noOfInstallments: hasInstallment ? 'Enter Installment' : 'N/A',
          amount: '',
          rebate: hasInstallment ? '' : 'N/A',
          fine: hasInstallment ? '' : 'N/A',
          installmentAmount: Number(account?.node?.installmentAmount) ?? 0,
          hasInstallment: Boolean(hasInstallment),
        };
      }) ?? []
    );
  }, [accountListData]);

  const accountListSearchOptions = useMemo(
    () =>
      accountListData?.account?.list?.edges?.map((account) => ({
        label: account?.node?.product?.productName as string,
        value: account?.node?.id as string,
      })) ?? [],
    [accountListData]
  );

  const accounts = watch('accounts');

  useDeepCompareEffect(() => {
    if (accounts?.length) {
      const temp: (number | string)[] = [];

      let tempTotal = 0;

      accounts?.forEach((account) => {
        tempTotal += Number(account?.amount) ?? 0;
        temp.push(account?.noOfInstallments);
      });

      setNoOfInstallmentsArr(temp);
      setTotalDepositAmount(tempTotal);
    }
  }, [accounts]);

  // console.log({ accounts });

  useEffect(() => {
    const { accounts: accountsArr } = getValues();

    if (accountsArr?.length) {
      let sum = 0;
      let rebateSum = 0;

      setValue(
        'accounts',
        accountsArr?.map((record) => {
          const { total, rebate, fine } = record?.hasInstallment
            ? getInstallmentSummary({
                noOfInstallments: Number(record?.noOfInstallments ?? 0),
                installmentList: bulkInstallmentsListData?.account?.getBulkInstallments?.find(
                  (installment) => installment?.accountId === record?.accountId
                )?.value?.data as Installment[],
                installmentAmount: Number(record?.installmentAmount ?? 0),
              })
            : { total: record?.amount ?? 0, rebate: 0, fine: 0 };

          sum += Number(total) + (Number(fine) ?? 0) || Number(record?.amount);

          rebateSum += Number(rebate);

          return (
            record && {
              accountId: record?.accountId,
              noOfInstallments: record?.noOfInstallments,
              amount: String(total || record?.amount),
              rebate: record.hasInstallment ? String(rebate) : record?.rebate,
              fine: record.hasInstallment ? String(fine) : record?.fine,
              installmentAmount: record?.installmentAmount,
              hasInstallment: record?.hasInstallment,
            }
          );
        })
      );

      setTotalDepositAmount(sum);
      setTotalRebate(rebateSum);
    }
  }, [JSON.stringify(noOfInstallmentsArr)]);

  // useDeepCompareEffect(() => {
  //   if (accounts?.length) {
  //     let sum = 0;
  //     let rebateSum = 0;

  //     setValue(
  //       'accounts',
  //       accounts?.map((record) => {
  //         const { total, rebate, fine } = record?.hasInstallment
  //           ? getInstallmentSummary({
  //               noOfInstallments: Number(record?.noOfInstallments ?? 0),
  //               installmentList: bulkInstallmentsListData?.account?.getBulkInstallments?.find(
  //                 (installment) => installment?.accountId === record?.accountId
  //               )?.value?.data as Installment[],
  //               installmentAmount: Number(record?.installmentAmount ?? 0),
  //             })
  //           : { total: 0, rebate: 0, fine: 0 };

  //         sum += total + (Number(fine) ?? 0) || Number(record?.amount);

  //         rebateSum += Number(rebate);

  //         return (
  //           record && {
  //             accountId: record?.accountId,
  //             noOfInstallments: record?.noOfInstallments,
  //             amount: String(total || record?.amount),
  //             rebate: record.hasInstallment ? String(rebate) : record?.rebate,
  //             fine: record.hasInstallment ? String(fine) : record?.fine,
  //             installmentAmount: record?.installmentAmount,
  //             hasInstallment: record?.hasInstallment,
  //           }
  //         );
  //       })
  //     );

  //     setTotalDepositAmount(sum);
  //     setTotalRebate(rebateSum);
  //   }
  // }, [accounts]);

  return (
    <FormEditableTable<DepositAccountTable>
      name="accounts"
      columns={[
        {
          accessor: 'accountId',
          header: 'Accounts',
          cellWidth: 'auto',
          fieldType: 'search',
          searchOptions: accountListSearchOptions,
          cell: (row) => {
            const accountInfo = accountListData?.account?.list?.edges?.find(
              (account) => account?.node?.id === row.accountId
            )?.node;
            return (
              <Box display="flex" justifyContent="space-between" p="s12" width="100%">
                <Box display="flex" flexDirection="column" gap="s4">
                  <Text fontSize="r1" fontWeight={500} color="neutralColorLight.Gray-80">
                    {accountInfo?.product?.productName}
                  </Text>
                  <Text fontSize="s3" fontWeight={500} color="neutralColorLight.Gray-60">
                    {accountInfo?.id}
                  </Text>
                  <Text fontSize="s3" fontWeight={400} color="neutralColorLight.Gray-60">
                    {accountInfo?.product?.nature ? accountTypes[accountInfo?.product?.nature] : ''}
                  </Text>
                </Box>

                <Box display="flex" flexDirection="column" gap="s4" alignItems="flex-end">
                  <Text fontSize="s3" fontWeight={500} color="primary.500">
                    {accountInfo?.balance ?? ''}
                  </Text>
                </Box>
              </Box>
            );
          },
        },
        {
          accessor: 'noOfInstallments',
          header: 'No of Installments',
          isNumeric: true,
        },
        {
          accessor: 'amount',
          header: 'Amount',
          isNumeric: true,
          // accessorFn: (row) =>
          //   row.quantity
          //     ? Number(row.value) * Number(row.quantity)
          //     : '0',
        },
        {
          accessor: 'fine',
          header: 'Fine',
          isNumeric: true,
          accessorFn: (row) => row.fine ?? 'N/A',
        },
        {
          accessor: 'rebate',
          header: 'Rebate',
          isNumeric: true,
          accessorFn: (row) => row.rebate ?? 'N/A',
        },
      ]}
      // defaultData={accountListDefaultData}
      searchPlaceholder="Search for a/c name or number"
      // canDeleteRow={false}
      // canAddRow={false}
    />
  );
};
