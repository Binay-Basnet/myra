import { useState } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import qs from 'qs';

import { Box, Icon, IconButton, Select, Text } from '@myra-ui';

import { URLFilter } from '@coop/shared/utils';

const dateRangeOptions = [
  {
    label: 'This Week',
    value: 'week',
  },
  {
    label: 'This Month',
    value: 'month',
  },
  {
    label: 'This Year',
    value: 'year',
  },
];

type Period = 'week' | 'month' | 'year';

export const getRange = (selectValue: Period, date: Date) => {
  const from = dayjs(date).startOf(selectValue);
  const to = dayjs(date).endOf(selectValue);

  return { from, to };
};

interface DateRangeSelectorProps {
  value: { from: string; to: string } | undefined;
  onChange: (newValue: { from: string; to: string }) => void;
}

export const DateRangeSelector = ({ value, onChange }: DateRangeSelectorProps) => {
  const [selectValue, setSelectValue] = useState<Period>('week');

  return (
    <Box display="flex" gap="s24">
      <Box w="150px">
        <Select
          onChange={(e) => {
            if (e && 'value' in e) {
              setSelectValue(e.value as Period);
              const rangeDate = getRange(e.value as Period, new Date());
              onChange({
                from: rangeDate.from.format('YYYY-MM-DD'),
                to: rangeDate.to.format('YYYY-MM-DD'),
              });
            }
          }}
          value={dateRangeOptions?.find((a) => a.value === selectValue)}
          options={dateRangeOptions}
        />
      </Box>

      <Box display="flex" alignItems="center" gap="s10">
        <IconButton
          aria-label="left"
          colorScheme="gray"
          variant="ghost"
          onClick={() => {
            const rangeDate = getRange(
              selectValue,
              dayjs(value?.from).subtract(1, 'days').toDate()
            );

            onChange({
              from: rangeDate.from.format('YYYY-MM-DD'),
              to: rangeDate.to.format('YYYY-MM-DD'),
            });
          }}
          icon={<Icon as={LuChevronLeft} />}
        />
        <Text fontSize="r2" color="gray.700">
          {dayjs(getRange(selectValue, dayjs(value?.from).toDate()).from).format('YYYY-MM-DD')} —{' '}
          {dayjs(getRange(selectValue, dayjs(value?.from).toDate()).to).format('YYYY-MM-DD')}
        </Text>
        <IconButton
          aria-label="left"
          variant="ghost"
          colorScheme="gray"
          onClick={() => {
            const rangeDate = getRange(selectValue, dayjs(value?.to).add(1, 'days').toDate());

            onChange({
              from: rangeDate.from.format('YYYY-MM-DD'),
              to: rangeDate.to.format('YYYY-MM-DD'),
            });
          }}
          icon={<Icon as={LuChevronRight} />}
        />
      </Box>
    </Box>
  );
};

export const DateRangeSelectorWithFilter = () => {
  const router = useRouter();

  const parsedQuery = qs.parse(router.query['filter'] as string, {
    allowDots: true,
    parseArrays: true,
    comma: true,
  }) as URLFilter;

  const parsedValue = parsedQuery?.leaveFrom?.value;
  const parsedDate = parsedValue
    ? typeof parsedValue !== 'string' && !Array.isArray(parsedValue)
      ? parsedValue
      : undefined
    : undefined;

  return (
    <DateRangeSelector
      value={parsedDate}
      onChange={(newDate) => {
        const queryString = qs.stringify(
          {
            ...parsedQuery,
            leaveFrom: {
              value: {
                from: newDate?.from,
                to: newDate?.to,
              },
              compare: '< >',
            },
          },
          { allowDots: true, arrayFormat: 'brackets', encode: false }
        );

        router.push(
          {
            query: {
              ...router.query,
              filter: queryString,
            },
          },
          undefined,
          { shallow: true }
        );
      }}
    />
  );
};
