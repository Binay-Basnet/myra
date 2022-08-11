import React from 'react';
import { useFormContext } from 'react-hook-form';
import { IoFilterOutline } from 'react-icons/io5';

import {
  Arrange,
  ShareTransactionType,
  useGetMemberListQuery,
} from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import { Box, Button, GridItem, Icon } from '@coop/shared/ui';

import { getPeriodDate } from '../utils/getPeriodDate';

type ReportFilter = {
  memberId: string;
  period: {
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
      first: Number(50),
      after: '',
      column: 'ID',
      arrange: Arrange.Desc,
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
            placeholder="Search Member"
            isLoading={isLoading}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <FormSelect
            name={'period'}
            hasRadioOption
            options={[
              { label: 'Today', value: 'today' },
              {
                label: 'Yesterday',
                value: 'yesterday',
              },
              {
                label: 'This Week',
                value: 'week',
              },
              {
                label: 'Last 7 Days',
                value: 'last-7',
              },
              {
                label: 'Last 14 Days',
                value: 'last-14',
              },
              {
                label: 'Last 30 Days',
                value: 'last-30',
              },
              {
                label: 'This Fiscal Year To Date',
                value: 'last-year',
              },
              {
                label: 'Custom Period',
                value: 'custom-period',
              },
              {
                label: 'Everything',
                value: 'everything',
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

            setFilter({
              memberId: data['memberId'],
              period: {
                from: getPeriodDate({ period: data['period'] }).from,
                to: getPeriodDate({ period: data['period'] }).to,
              },
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
