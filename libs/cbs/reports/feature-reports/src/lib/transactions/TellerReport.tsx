import { useState } from 'react';

import { Box, GridItem, MultiFooter, Text } from '@myra-ui';

import {
  LocalizedDateFilter,
  TellerDataEntry,
  TellerType,
  useGetTellerListQuery,
  useGetTransactionTellerReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormBranchSelect, FormRadioGroup, FormSelect } from '@coop/shared/form';
import { amountConverter, useIsCbs } from '@coop/shared/utils';

type Filter = {
  branchId: string;
  filter?: {
    tellerType?: TellerType;
    tellerId?: {
      label: string;
      value: string;
    }[];
  };
  period: LocalizedDateFilter;
};
export const TellerReport = () => {
  const [filters, setFilters] = useState<Filter | null>(null);
  const tellerIds =
    filters?.filter?.tellerId && filters?.filter?.tellerId.length !== 0
      ? filters?.filter?.tellerId?.map((t) => t.value)
      : null;

  const { isCbs } = useIsCbs();

  const { data: userListData } = useGetTellerListQuery();
  const userList = userListData?.settings?.myraUser?.tellers;

  const { data, isFetching } = useGetTransactionTellerReportQuery(
    {
      data: {
        branchId: filters?.branchId as string,
        period: filters?.period as LocalizedDateFilter,
        filter: {
          ...filters?.filter,
          tellerId: tellerIds,
        },
      },
    },
    { enabled: !!filters }
  );

  const headTellerData =
    data?.report?.transactionReport?.financial?.tellerReport?.data?.headTeller?.entries;
  const headTellerStats =
    data?.report?.transactionReport?.financial?.tellerReport?.data?.headTeller;
  const allTellerData =
    data?.report?.transactionReport?.financial?.tellerReport?.data?.teller?.entries;
  const allTellerStats = data?.report?.transactionReport?.financial?.tellerReport?.data?.teller;
  return (
    <Report
      defaultFilters={{}}
      data={(headTellerData ?? allTellerData) as TellerDataEntry[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.TRANSACTION_TELLER_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            {
              label: 'Transaction Reports',
              link: isCbs ? '/reports/cbs/transactions' : '/accounting/reports/transactions',
            },
            {
              label: 'Teller Report',
              link: isCbs
                ? '/reports/cbs/transactions/teller/new'
                : '/accounting/reports/transactions/teller/new',
            },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect name="branchId" label="Service Center" />
          </GridItem>
          <GridItem colSpan={1}>
            <ReportDateRange label="Date Period" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Box display="flex" py="s32" flexDir="column">
            {headTellerData && (
              <Box display="flex" py="s8" flexDir="column">
                <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                  Head Teller
                </Text>
                <Report.Table<TellerDataEntry & { index: number }>
                  showFooter
                  columns={[
                    {
                      header: 'Head Teller Name',
                      footer: () => <Box textAlign="right">Total </Box>,
                      accessorKey: 'name',
                      meta: {
                        width: '60px',
                        Footer: {
                          colspan: 2,
                        },
                      },
                    },
                    {
                      header: 'Currency',
                      accessorKey: 'index',
                      cell: () => <Box> NPR </Box>,
                      meta: {
                        Footer: {
                          display: 'none',
                        },
                      },
                    },
                    {
                      header: 'In Transit Amount',
                      accessorKey: 'inTransit',
                      cell: (props) => props.getValue(),
                      footer: () => amountConverter(headTellerStats?.inTransitTotal as string),
                      meta: {
                        width: '100%',
                      },
                    },
                    {
                      header: 'Stack Amount',
                      cell: (props) => props.getValue(),

                      footer: () => amountConverter(headTellerStats?.stackTotal as string),

                      accessorKey: 'stack',
                      meta: {
                        isNumeric: true,
                      },
                    },
                    {
                      header: 'In Amount',
                      cell: (props) => amountConverter(props.getValue() as string),
                      footer: () => amountConverter(headTellerStats?.inAmountTotal as string),

                      accessorKey: 'inAmount',
                      meta: {
                        isNumeric: true,
                      },
                    },
                    {
                      header: 'Out Amount',
                      footer: () => amountConverter(headTellerStats?.outAmountTotal as string),
                      cell: (props) => amountConverter(props.getValue() as string),
                      accessorKey: 'outAmount',
                      meta: {
                        isNumeric: true,
                      },
                    },
                    {
                      header: 'Balance',
                      footer: () => amountConverter(headTellerStats?.balanceTotal as string),
                      cell: (props) => amountConverter(props.getValue() as string),
                      accessorKey: 'balance',
                      meta: {
                        isNumeric: true,
                      },
                    },
                  ]}
                  tableTitle="Head Teller"
                />
              </Box>
            )}
            {allTellerData && (
              <Box display="flex" py="s8" flexDir="column">
                <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                  Teller
                </Text>
                <Report.Table<TellerDataEntry & { index: number }>
                  data={allTellerData?.map((d, index) => ({ ...d, index: index + 1 }))}
                  showFooter
                  columns={[
                    {
                      header: 'Teller Name',
                      footer: () => <MultiFooter texts={['Total', 'Grand Total']} />,

                      accessorKey: 'name',
                      meta: {
                        width: '60px',
                        Footer: {
                          colspan: 2,
                        },
                      },
                    },
                    {
                      header: 'Currency',
                      accessorKey: 'index',
                      cell: () => <Box> NPR </Box>,

                      meta: {
                        Footer: {
                          display: 'none',
                        },
                      },
                    },
                    {
                      header: 'In Transit Amount',
                      accessorKey: 'inTransit',
                      cell: (props) => props.getValue(),
                      footer: () => (
                        <MultiFooter
                          texts={[
                            amountConverter(allTellerStats?.inTransitTotal as string) as string,
                            amountConverter(
                              Number(allTellerStats?.inTransitTotal) +
                                Number(headTellerStats?.inTransitTotal)
                            ) as string,
                          ]}
                        />
                      ),

                      meta: {
                        width: '100%',
                      },
                    },
                    {
                      header: 'Stack Amount',
                      footer: () => (
                        <MultiFooter
                          texts={[
                            amountConverter(allTellerStats?.stackTotal as string) as string,
                            amountConverter(
                              Number(allTellerStats?.stackTotal) +
                                Number(headTellerStats?.stackTotal)
                            ) as string,
                          ]}
                        />
                      ),

                      cell: (props) => props.getValue(),

                      accessorKey: 'stack',
                      meta: {
                        isNumeric: true,
                      },
                    },
                    {
                      header: 'In Amount',
                      cell: (props) => amountConverter(props.getValue() as string),

                      footer: () => (
                        <MultiFooter
                          texts={[
                            amountConverter(allTellerStats?.inAmountTotal as string) as string,
                            amountConverter(
                              Number(allTellerStats?.inAmountTotal) +
                                Number(headTellerStats?.inAmountTotal)
                            ) as string,
                          ]}
                        />
                      ),

                      accessorKey: 'inAmount',
                      meta: {
                        isNumeric: true,
                      },
                    },
                    {
                      header: 'Out Amount',
                      footer: () => (
                        <MultiFooter
                          texts={[
                            amountConverter(allTellerStats?.outAmountTotal as string) as string,
                            amountConverter(
                              Number(allTellerStats?.outAmountTotal) +
                                Number(headTellerStats?.outAmountTotal)
                            ) as string,
                          ]}
                        />
                      ),
                      cell: (props) => amountConverter(props.getValue() as string),

                      accessorKey: 'outAmount',
                      meta: {
                        isNumeric: true,
                      },
                    },
                    {
                      header: 'Balance',
                      footer: () => (
                        <MultiFooter
                          texts={[
                            amountConverter(allTellerStats?.balanceTotal as string) as string,
                            amountConverter(
                              Number(allTellerStats?.balanceTotal) +
                                Number(headTellerStats?.balanceTotal)
                            ) as string,
                          ]}
                        />
                      ),
                      cell: (props) => amountConverter(props.getValue() as string),

                      accessorKey: 'balance',
                      meta: {
                        isNumeric: true,
                      },
                    },
                  ]}
                  tableTitle="Teller"
                />
              </Box>
            )}
          </Box>
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="Teller Wise">
            <FormSelect
              isMulti
              options={userList?.map((user) => ({
                label: user?.name as string,
                value: user?.id as string,
              }))}
              name="filter.tellerId"
            />
          </Report.Filter>
          <Report.Filter title="Type of Teller">
            <FormRadioGroup
              name="filter.tellerType"
              options={[
                { label: 'All', value: TellerType.All },
                { label: 'Head Teller', value: TellerType?.HeadTeller },
                { label: 'Teller', value: TellerType?.Teller },
              ]}
              direction="column"
            />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};
