import React from 'react';
import { useFormContext } from 'react-hook-form';
import { IoFilterOutline } from 'react-icons/io5';

import { ReportPeriodType } from '@coop/cbs/data-access';
import { FormCOASelect, FormSelect } from '@coop/shared/form';
import { Box, Button, GridItem, Icon } from '@coop/shared/ui';

type GeneralLedgerReport = {
  ledgerId: string;
  period: ReportPeriodType;
};

interface ReportInputsProps {
  hasShownFilter: boolean;
  setFilter: React.Dispatch<React.SetStateAction<GeneralLedgerReport | null>>;
  setHasShownFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LedgerReportInputs = ({
  hasShownFilter,
  setHasShownFilter,
  setFilter,
}: ReportInputsProps) => {
  const methods = useFormContext<GeneralLedgerReport>();

  return (
    <Box
      display="flex"
      alignItems="flex-end"
      gap="s20"
      borderBottom="1px"
      borderColor="border.layout"
      px="s32"
      py="s16"
    >
      <Box as="form" display="grid" width="100%" gridTemplateColumns="repeat(4, 1fr)" gap="s20">
        <GridItem colSpan={3}>
          <FormCOASelect name="ledgerId" label="Ledger Name" />
        </GridItem>

        <GridItem colSpan={1}>
          <FormSelect
            name="period"
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
            label="Select Period"
          />
        </GridItem>
      </Box>

      <Box display="flex" gap="s16">
        <Button
          size="lg"
          isDisabled={!methods.watch()['ledgerId'] || !methods.watch()['period']}
          onClick={methods.handleSubmit((data) => {
            if (!data['ledgerId'] || !data['period']) return;

            if (data['period'] === ReportPeriodType.CustomPeriod) {
              setFilter({
                ledgerId: data.ledgerId,
                period: ReportPeriodType.CustomPeriod,
              });
            }

            setFilter({
              ledgerId: data['ledgerId'],
              period: data['period'],
            });
          })}
        >
          Create Report
        </Button>

        {hasShownFilter ? (
          <Button size="lg" gap="s4" onClick={() => setHasShownFilter((prev) => !prev)}>
            <Icon as={IoFilterOutline} />
            Hide Filter
          </Button>
        ) : (
          <Button
            size="lg"
            variant="outline"
            shade="neutral"
            gap="s4"
            onClick={() => setHasShownFilter((prev) => !prev)}
          >
            <Icon as={IoFilterOutline} />
            Show Filter
          </Button>
        )}
      </Box>
    </Box>
  );
};
