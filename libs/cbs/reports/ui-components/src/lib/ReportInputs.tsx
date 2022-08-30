import React from 'react';
import { useFormContext } from 'react-hook-form';
import { IoFilterOutline } from 'react-icons/io5';

import {
  ReportPeriodType,
  ShareTransactionType,
  useGetMemberListQuery,
} from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import { Box, Button, GridItem, Icon } from '@coop/shared/ui';
import { getRouterQuery } from '@coop/shared/utils';

type ReportFilter = {
  memberId: string;
  predefinedPeriod: ReportPeriodType;

  period?: {
    from: string;
    to: string;
  };
  type: ShareTransactionType;
};

interface ReportInputsProps {
  filter: ReportFilter;
  hasShownFilter: boolean;
  setFilter: React.Dispatch<React.SetStateAction<ReportFilter>>;
  setHasShownFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ReportInputs = ({
  hasShownFilter,
  setFilter,
  setHasShownFilter,
}: ReportInputsProps) => {
  const methods = useFormContext();

  const { data: memberList, isLoading } = useGetMemberListQuery(
    {
      pagination: getRouterQuery({ type: ['PAGINATION'] }),
    },
    {
      staleTime: 0,
    }
  );

  const memberListData = memberList?.members?.list?.edges;

  const memberOptions =
    memberListData &&
    memberListData.map((member) => {
      return {
        label: `${member?.node?.id} - ${member?.node?.name?.local}`,
        value: String(member?.node?.id),
      };
    });

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
      <Box
        as="form"
        display="grid"
        width="100%"
        gridTemplateColumns="repeat(4, 1fr)"
        gap="s20"
      >
        <GridItem colSpan={3}>
          <FormSelect
            name={'memberId'}
            options={memberOptions ?? []}
            label="Member Search"
            __placeholder="Search Member"
            isLoading={isLoading}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <FormSelect
            name={'period'}
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
          isDisabled={
            !methods.watch()['memberId'] || !methods.watch()['period']
          }
          onClick={methods.handleSubmit((data) => {
            if (!data['memberId'] || !data['period']) return;

            if (data['period'] === ReportPeriodType.CustomPeriod) {
              setFilter({
                memberId: data['memberId'],
                predefinedPeriod: data['period'],
                // TODO CHANGE THIS LATER
                period: {
                  from: '2002-01-20',
                  to: '2080-01-10',
                },
                type: data['transaction_type'] ?? ShareTransactionType.All,
              });
            }

            setFilter({
              memberId: data['memberId'],
              predefinedPeriod: data['period'],
              type: data['transaction_type'] ?? ShareTransactionType.All,
            });
          })}
        >
          Create Report
        </Button>

        {hasShownFilter ? (
          <Button gap="s4" onClick={() => setHasShownFilter((prev) => !prev)}>
            <Icon as={IoFilterOutline} />
            Hide Filter
          </Button>
        ) : (
          <Button
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
