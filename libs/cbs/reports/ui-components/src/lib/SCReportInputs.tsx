import React from 'react';
import { useFormContext } from 'react-hook-form';
import { IoFilterOutline } from 'react-icons/io5';

import { BranchReportFilter, ReportPeriodType } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import { Box, Button, GridItem, Icon } from '@coop/shared/ui';

interface InterestTaxInputProps {
  hasShownFilter: boolean;
  setFilter: React.Dispatch<React.SetStateAction<BranchReportFilter | null>>;
  setHasShownFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ServiceCenterReportInputs = ({
  hasShownFilter,
  setHasShownFilter,
  setFilter,
}: InterestTaxInputProps) => {
  const methods = useFormContext<BranchReportFilter>();

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
          <FormSelect
            name="periodType"
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
            label="Branch Established Date"
          />
        </GridItem>
      </Box>

      <Box display="flex" gap="s16">
        <Button
          size="lg"
          isDisabled={!methods.watch()['periodType']}
          onClick={methods.handleSubmit((data) => {
            if (!data['periodType']) return;

            if (data['periodType'] === ReportPeriodType.CustomPeriod) {
              setFilter({
                periodType: data['periodType'],
                filter: null,
              });
            }

            setFilter({
              periodType: data['periodType'],
              filter: null,
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
