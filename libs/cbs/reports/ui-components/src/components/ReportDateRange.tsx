import { ReportPeriodType } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';

interface IReportDateRange {
  label?: string;
}

export const ReportDateRange = ({ label = 'Select Period' }: IReportDateRange) => (
  <FormSelect
    name="period.periodType"
    hasRadioOption
    options={[
      { label: 'Today', value: ReportPeriodType.Today },
      {
        label: 'Yesterday',
        value: ReportPeriodType.Yesterday,
      },
      {
        label: 'Last 7 Days',
        value: ReportPeriodType.Last_7Days,
      },
      {
        label: 'Last 14 Days',
        value: ReportPeriodType.Last_14Days,
      },
      {
        label: 'Last 30 Days',
        value: ReportPeriodType.Last_30Days,
      },
      {
        label: 'This Fiscal Year To Date',
        value: ReportPeriodType.ThisFiscalYearToDate,
      },
      {
        label: 'Custom Period',
        value: ReportPeriodType.CustomPeriod,
      },
      {
        label: 'Lifetime',
        value: ReportPeriodType.Lifetime,
      },
    ]}
    label={label}
  />
);
