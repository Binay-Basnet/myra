import { useState } from 'react';

import { Box, Column, GridItem, Text } from '@myra-ui';

import { PearlsRecord, PearlsReportInput, useGetPearlsReportQuery } from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormDatePicker } from '@coop/shared/form';

export const PearlsReport = () => {
  const [filters, setFilters] = useState<PearlsReportInput | null>(null);

  const { data, isFetching } = useGetPearlsReportQuery({
    data: {
      period: {
        from: filters?.period.from,
        to: filters?.period.from,
      },
    } as PearlsReportInput,
  });

  const pearlsTypeP = data?.report?.pearlsReport?.typeP as PearlsRecord[];
  const pearlsTypeE = data?.report?.pearlsReport?.typeE as PearlsRecord[];
  const pearlsTypeA = data?.report?.pearlsReport?.typeA as PearlsRecord[];
  const pearlsTypeR = data?.report?.pearlsReport?.typeR as PearlsRecord[];
  const pearlsTypeL = data?.report?.pearlsReport?.typeL as PearlsRecord[];
  const pearlsTypeS = data?.report?.pearlsReport?.typeS as PearlsRecord[];

  return (
    <Report
      defaultFilters={null}
      data={pearlsTypeP as PearlsRecord[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.PEARLS_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Others Reports', link: '/reports/cbs/others' },
            { label: 'Pearls Report', link: '/reports/cbs/others/pearls-report/new' },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={1}>
            <FormDatePicker name="period.from" label="Date" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Box display="flex" flexDir="column" py="s16" gap="s12">
            <PearlsReportIndTable data={pearlsTypeP} title="P = Protection" />
            <PearlsReportIndTable data={pearlsTypeE} title="E = Effective Financial Structure" />
            <PearlsReportIndTable data={pearlsTypeA} title="A = Assets Quality" />
            <PearlsReportIndTable data={pearlsTypeR} title="R = Rate of Return" />
            <PearlsReportIndTable data={pearlsTypeL} title="L = Liquidity" />
            <PearlsReportIndTable data={pearlsTypeS} title="S = Sign of Growth" />
          </Box>
        </Report.Content>
      </Report.Body>
    </Report>
  );
};

type PearlsReportIndTableProps = {
  title: string;
  data: PearlsRecord[];
};

export const PearlsReportIndTable = ({ title, data }: PearlsReportIndTableProps) => {
  const columns: Column<PearlsRecord>[] = [
    {
      header: '',
      accessorKey: 'pearl',
      meta: {
        width: '50px',
      },
    },

    {
      header: 'Description',
      accessorKey: 'description',
      meta: {
        width: '70%',
      },
    },
    {
      header: 'Numerator',
      accessorKey: 'numerator',
    },
    {
      header: 'Denominator',
      accessorKey: 'denominator',
    },
    {
      header: 'Goal',
      accessorKey: 'goal',
    },
    {
      header: 'This Month Result',
      accessorKey: 'thisMonth',
    },
    {
      header: 'Last Month Result',
      accessorKey: 'lastMonth',
    },
  ];

  return (
    <Box display="flex" flexDir="column">
      <Text px="s16" fontSize="r2" fontWeight={500} color="gray.800">
        {title}
      </Text>
      <Report.Table data={data} columns={columns} />
    </Box>
  );
};
