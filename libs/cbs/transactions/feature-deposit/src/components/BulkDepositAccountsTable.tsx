import { useEffect, useMemo, useState } from 'react';
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
  totalFine: number | undefined | null;
}

const getInstallmentSummary = ({
  noOfInstallments,
  installmentList,
  installmentAmount,
  totalFine,
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

  const tempFine = totalFine;
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
}

export const BulkDepositAccountsTable = ({ memberId }: IBulkDepositAccountsTableProps) => {
  const { t } = useTranslation();

  const { setValue } = useFormContext<CustomBulkDepositInput>();

  const [installmentAccountIds, setInstallmentAccountIds] = useState<string[]>([]);

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
              {
                column: 'groupId',
                comparator: 'HasNoValue',
                value: '',
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
  const filteredAccountValues = accountListData?.account?.list?.edges?.filter(
    (d) => d?.node?.product?.nature !== NatureOfDepositProduct?.TermSavingOrFd
  );
  useDeepCompareEffect(() => {
    setValue(
      'accounts',
      filteredAccountValues?.map((account) => {
        const hasInstallment =
          account?.node?.product?.nature === NatureOfDepositProduct.RecurringSaving ||
          (account?.node?.product?.nature === NatureOfDepositProduct.Saving &&
            account?.node?.product?.isMandatorySaving);

        return {
          accountId: account?.node?.id as string,
          noOfInstallments: hasInstallment ? 'Enter Installment' : 'N/A',
          amount: '',
          rebate: hasInstallment ? '' : 'N/A',
          fine: hasInstallment
            ? (bulkInstallmentsListData?.account?.getBulkInstallments?.find(
                (installment) => installment?.accountId === account?.node?.id
              )?.totalFine as string)
            : 'N/A',
          installmentAmount: Number(account?.node?.installmentAmount) ?? 0,
          hasInstallment: Boolean(hasInstallment),
        };
      }) ?? []
    );
  }, [accountListData, bulkInstallmentsListData]);

  const accountListSearchOptions = useMemo(
    () =>
      accountListData?.account?.list?.edges?.map((account) => ({
        label: account?.node?.product?.productName as string,
        value: account?.node?.id as string,
      })) ?? [],
    [accountListData]
  );

  return (
    <FormEditableTable<DepositAccountTable>
      name="accounts"
      canAddRow={false}
      columns={[
        {
          accessor: 'accountId',
          header: 'Accounts',
          cellWidth: 'auto',
          fieldType: 'select',
          selectOptions: accountListSearchOptions,
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
          getDisabled: (row) => !row?.hasInstallment,
        },
        {
          accessor: 'amount',
          header: 'Amount',
          isNumeric: true,
          accessorFn: (row) =>
            getInstallmentSummary({
              noOfInstallments: Number(row?.noOfInstallments ?? 0),
              installmentList: bulkInstallmentsListData?.account?.getBulkInstallments?.find(
                (installment) => installment?.accountId === row?.accountId
              )?.value?.data as Installment[],
              installmentAmount: Number(row?.installmentAmount ?? 0),
              totalFine: Number(
                bulkInstallmentsListData?.account?.getBulkInstallments?.find(
                  (installment) => installment?.accountId === row?.accountId
                )?.totalFine as string
              ),
            })?.total,
          getDisabled: (row) => row?.noOfInstallments !== 'N/A',
        },
        {
          accessor: 'fine',
          header: 'Fine',
          isNumeric: true,
          accessorFn: (row) =>
            (bulkInstallmentsListData?.account?.getBulkInstallments?.find(
              (installment) => installment?.accountId === row?.accountId
            )?.totalFine as string) ?? 'N/A',
          getDisabled: (row) => row?.noOfInstallments === 'N/A',
        },
        {
          accessor: 'rebate',
          header: 'Rebate',
          isNumeric: true,
          accessorFn: (row) =>
            String(
              getInstallmentSummary({
                noOfInstallments: Number(row?.noOfInstallments ?? 0),
                installmentList: bulkInstallmentsListData?.account?.getBulkInstallments?.find(
                  (installment) => installment?.accountId === row?.accountId
                )?.value?.data as Installment[],
                installmentAmount: Number(row?.installmentAmount ?? 0),
                totalFine: Number(
                  bulkInstallmentsListData?.account?.getBulkInstallments?.find(
                    (installment) => installment?.accountId === row?.accountId
                  )?.totalFine as string
                ),
              })?.rebate
            ) ?? '0',
          getDisabled: () => true,
        },
      ]}
      // defaultData={accountListDefaultData}
      searchPlaceholder="Search for a/c name or number"
      // canDeleteRow={false}
      // canAddRow={false}
    />
  );
};
