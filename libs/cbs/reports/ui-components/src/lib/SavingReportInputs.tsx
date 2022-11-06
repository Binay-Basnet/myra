import React from 'react';
import { useFormContext } from 'react-hook-form';
import { IoFilterOutline } from 'react-icons/io5';

import {
  ReportPeriodType,
  SavingServiceType,
  SavingStatementReportSettings,
  SavingTransactionType,
} from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import { Box, Button, FormAccountSelect, FormMemberSelect, GridItem, Icon } from '@coop/shared/ui';

interface ReportInputsProps {
  hasShownFilter: boolean;
  setFilter: React.Dispatch<React.SetStateAction<SavingStatementReportSettings | null>>;
  setHasShownFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SavingReportInputs = ({
  hasShownFilter,
  setHasShownFilter,
  setFilter,
}: ReportInputsProps) => {
  const methods = useFormContext<SavingStatementReportSettings>();

  const memberId = methods.watch('memberId');

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
        <GridItem colSpan={2}>
          <FormMemberSelect name="memberId" label="Member Search" />
        </GridItem>
        <GridItem colSpan={1}>
          <FormAccountSelect name="accountId" memberId={memberId} label="Select Account" />
        </GridItem>
        <GridItem colSpan={1}>
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
            label="Select Period"
          />
        </GridItem>
      </Box>

      <Box display="flex" gap="s16">
        <Button
          size="lg"
          isDisabled={!methods.watch()['memberId'] || !methods.watch()['periodType']}
          onClick={methods.handleSubmit((data) => {
            if (!data['memberId'] || !data['periodType']) return;

            if (data['periodType'] === ReportPeriodType.CustomPeriod) {
              setFilter({
                memberId: data['memberId'],
                periodType: data['periodType'],
                accountId: data['accountId'],
                // TODO CHANGE THIS LATER
                customPeriod: {
                  from: '2002-01-20',
                  to: '2080-01-10',
                },
                filter: {
                  transactionType: data.filter?.transactionType ?? SavingTransactionType.All,
                  service: data.filter?.service ?? SavingServiceType.Charges,
                },
              });
            }

            setFilter({
              memberId: data['memberId'],
              periodType: data['periodType'],
              accountId: data['accountId'],
              filter: {
                transactionType: data.filter?.transactionType ?? SavingTransactionType.All,
                service: data.filter?.service ?? SavingServiceType.Charges,
              },
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
