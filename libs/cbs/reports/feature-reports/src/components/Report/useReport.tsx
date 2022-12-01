import React, { useState } from 'react';
import { DeepPartial, FormProvider, useForm } from 'react-hook-form';
import { Box } from '@myra-ui';

import { ReportHeader as ReportPageHeader, ReportOrganization } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';

import {
  OrganizationHeader,
  ReportBody,
  ReportContent,
  ReportFilter,
  ReportFilters,
  ReportHeader,
  ReportInputs,
  ReportMeta,
  ReportTable,
} from './Report';

interface IReportContext<
  T extends Record<string, unknown> | null,
  Q extends Record<string, unknown> | null
> {
  data: T[];
  isLoading: boolean;
  report: ReportEnum;
  isFilterShown: boolean;
  setIsFilterShown: React.Dispatch<React.SetStateAction<boolean>>;
  filters: Q | null;
  defaultFilters: Partial<Q> | null;
  setFilters: React.Dispatch<React.SetStateAction<Q | null>>;
}

interface IReportProps<
  T extends Record<string, unknown> | null,
  Q extends Record<string, unknown> | null
> {
  data: T[];
  isLoading: boolean;
  report: ReportEnum;
  children: React.ReactNode;
  filters: Q | null;
  defaultFilters: Partial<Q> | null;
  setFilters: React.Dispatch<React.SetStateAction<Q | null>>;
}

export const createReportContext = <
  T extends Record<string, unknown>,
  Q extends Record<string, unknown> | null
>() => React.createContext<IReportContext<T, Q> | null>(null);

const ReportContext = createReportContext<Record<string, unknown>, Record<string, unknown>>();

const Report = <T extends Record<string, unknown>, Q extends Record<string, unknown> | null>({
  children,
  report,
  data,
  isLoading,
  filters,
  defaultFilters,
  setFilters,
}: IReportProps<T, Q>) => {
  const methods = useForm({
    defaultValues: (defaultFilters ?? {}) as DeepPartial<Q>,
  });

  const [isFilterShown, setIsFilterShown] = useState(false);

  const memoizedContextValue = React.useMemo<IReportContext<T, Q>>(
    () => ({
      report,
      data,
      isLoading,
      isFilterShown,
      setIsFilterShown,
      filters,
      defaultFilters,
      setFilters,
    }),
    [report, data, isLoading, isFilterShown, filters, defaultFilters, setFilters]
  );

  return (
    <Box minH="calc(100vh - 110px)" w="100%" display="flex" flexDir="column">
      <FormProvider {...methods}>
        <ReportContext.Provider
          value={
            memoizedContextValue as IReportContext<
              Record<string, unknown>,
              Record<string, unknown>
            > | null
          }
        >
          {children}
        </ReportContext.Provider>
      </FormProvider>
    </Box>
  );
};

export const useReport = <
  T extends Record<string, unknown>,
  Q extends Record<string, unknown> | null
>(): IReportContext<T, Q> => {
  const context = React.useContext(ReportContext);

  if (!context) {
    throw new Error('This component must be used within a <Report> component.');
  }

  return context as IReportContext<T, Q>;
};

Report.Header = ReportHeader;
Report.PageHeader = ReportPageHeader;
Report.OrganizationHeader = OrganizationHeader;
Report.Organization = ReportOrganization;
Report.Inputs = ReportInputs;
Report.Body = ReportBody;
Report.Content = ReportContent;
Report.Filters = ReportFilters;
Report.Filter = ReportFilter;
Report.Table = ReportTable;
Report.Meta = ReportMeta;

export { Report };
