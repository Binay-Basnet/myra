import { useMemo, useState } from 'react';

import { GridItem } from '@myra-ui/components';

import {
  NatureOfDepositProduct,
  RecurringSavingInstallmentInput,
  RecurringSavingInstallmentResultData,
  useGetDepositProductSettingsListQuery,
  useGetRecurringSavingInstallmentReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
import { FormBranchSelect, FormSelect } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

export const RegularRecurringSavingInstallmentReport = () => {
  const [filters, setFilters] = useState<RecurringSavingInstallmentInput | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => (t as unknown as { value: string }).value)
      : null;

  const productIds =
    filters?.productName && filters?.productName?.length !== 0
      ? filters?.productName?.map((t) => (t as unknown as { value: string }).value)
      : null;

  const { data: edTdsReport, isFetching } = useGetRecurringSavingInstallmentReportQuery(
    {
      data: {
        ...filters,
        branchId: branchIds,
        productName: productIds,
      } as RecurringSavingInstallmentInput,
    },
    { enabled: !!filters }
  );

  const eTDSReportData = edTdsReport?.report?.depositReport?.recurringSavingInstallmentReport?.data;

  const { data: savingProductsListData } = useGetDepositProductSettingsListQuery({
    paginate: {
      after: '',
      first: -1,
    },
  });

  const productOptions = useMemo(() => {
    const temp: { label: string; value: string }[] = [];

    savingProductsListData?.settings?.general?.depositProduct?.list?.edges?.forEach((item) => {
      if (
        item?.node?.nature === NatureOfDepositProduct.RecurringSaving ||
        (item?.node?.nature === NatureOfDepositProduct.Saving && item?.node?.isMandatorySaving)
      ) {
        temp.push({
          label: item?.node?.productName as string,
          value: item?.node?.id as string,
        });
      }
    });

    return temp;
  }, [savingProductsListData]);

  return (
    <Report
      defaultFilters={null}
      data={eTDSReportData as RecurringSavingInstallmentResultData[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.REGULAR_RECURRING_SAVING_INSTALLMENT_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Saving Reports', link: '/cbs/reports/cbs-reports/savings' },
            {
              label: 'Regular/Recurring Saving Installment Report',
              link: '/cbs/reports/cbs-reports/savings/regular-recurring-saving-installment/new',
            },
          ]}
        />
        <Report.Inputs hideDate>
          <GridItem colSpan={2}>
            <FormBranchSelect
              showUserBranchesOnly
              name="branchId"
              label="Select Service Center"
              isMulti
            />
          </GridItem>
          <GridItem colSpan={2}>
            <FormSelect name="productName" label="Product Name" isMulti options={productOptions} />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<RecurringSavingInstallmentResultData>
            columns={[
              {
                header: 'Service Center',
                accessorKey: 'serviceCenter',
              },
              {
                header: 'Member Code',
                accessorFn: (row) => row?.memberId,
                cell: (props) => (
                  <RouteToDetailsPage
                    id={props?.row?.original?.memberId as string}
                    type="member"
                    label={props?.row?.original?.memberCode as string}
                  />
                ),
              },
              {
                header: 'Member Name',
                accessorFn: (row) => row?.memberName,
              },
              {
                header: 'Saving Account Number',
                accessorFn: (row) => row?.savingAccountNumber,
                cell: (props) => (
                  <RouteToDetailsPage
                    id={props?.row?.original?.savingAccountNumber as string}
                    type="savings"
                    label={props?.row?.original?.savingAccountNumber as string}
                  />
                ),
              },
              {
                header: 'Product Name',
                accessorFn: (row) => row.productName,
              },
              {
                header: 'Saving Balance',
                accessorFn: (row) => row.savingBalance,
                cell: (props) => amountConverter(props.row.original.savingBalance || '0.00'),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Deposit Frequency',
                accessorFn: (row) => row?.depositFrequency,
              },
              {
                header: 'Installment Amount',
                accessorFn: (row) => row.installmentAmount,
                cell: (props) => amountConverter(props.row.original.installmentAmount || '0.00'),
                meta: {
                  isNumeric: true,
                },
              },
              {
                id: 'installmentPaidUpto',
                header: 'Installment Paid Upto',
                cell: (props) => localizedDate(props?.row?.original?.installmentPaidUpto),
                meta: {
                  skipExcelFormatting: true,
                },
              },
              {
                header: 'Dues Installment',
                accessorFn: (row) => row?.duesInstallment,
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Fine Amount',
                accessorFn: (row) => row.fineAmount,
                cell: (props) => amountConverter(props.row.original.fineAmount || '0.00'),
                meta: {
                  isNumeric: true,
                },
              },
            ]}
          />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};
