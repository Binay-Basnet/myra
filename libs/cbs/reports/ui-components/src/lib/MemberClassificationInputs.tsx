import React from 'react';
import { useFormContext } from 'react-hook-form';
import { IoFilterOutline } from 'react-icons/io5';

import { Box, Button, GridItem, Icon } from '@myra-ui';

import { LocalizedDateFilter } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';

import { ReportDateRange } from '../components';

type ClassifyBy =
  | 'All'
  | 'Gender Wise'
  | 'Age Wise'
  | 'Occupation Wise'
  | 'Education Level Wise'
  | 'Income Level Wise'
  | 'Address Wise'
  | 'Member Category Wise';

type MemberClassificationFilter = {
  classificationBy: ClassifyBy[];
  period: LocalizedDateFilter;
};

interface ReportInputsProps {
  hasShownFilter: boolean;
  setFilter: React.Dispatch<React.SetStateAction<MemberClassificationFilter | null>>;
  setHasShownFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MemberClassificationInputs = ({
  hasShownFilter,
  setFilter,
  setHasShownFilter,
}: ReportInputsProps) => {
  const methods = useFormContext<{
    period: LocalizedDateFilter;
    classificationBy: { label: string; value: string }[];
  }>();

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
            isMulti
            options={[
              {
                label: 'All',
                value: 'All',
              },
              {
                label: 'Gender Wise',
                value: 'Gender Wise',
              },
              {
                label: 'Age Wise',
                value: 'Age Wise',
              },
              {
                label: 'Occupation Wise',
                value: 'Occupation Wise',
              },
              {
                label: 'Education Level Wise',
                value: 'Education Level Wise',
              },
              {
                label: 'Income Level Wise',
                value: 'Income Level Wise',
              },
              {
                label: 'Address Wise',
                value: 'Address Wise',
              },
              {
                label: 'Member Category Wise',
                value: 'Member Category Wise',
              },
            ]}
            name="classificationBy"
            label="Member Search"
          />
        </GridItem>
        <GridItem colSpan={1}>
          <ReportDateRange />
        </GridItem>
      </Box>

      <Box display="flex" gap="s16">
        <Button
          size="lg"
          isDisabled={!methods.watch()['classificationBy'] || !methods.watch()['period']}
          onClick={methods.handleSubmit((data) => {
            if (!data['classificationBy'] || !data['period']) return;

            setFilter({
              classificationBy: data['classificationBy'].map((a) => a.value) as ClassifyBy[],
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
