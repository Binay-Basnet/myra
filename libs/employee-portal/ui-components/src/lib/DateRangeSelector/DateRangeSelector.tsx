import { useState } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import dayjs from 'dayjs';

import { Box, Icon, IconButton, Select, Text } from '@myra-ui';

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

const getRange = (selectValue: Period, date: Date) => {
  const from = dayjs(date).startOf(selectValue);
  const to = dayjs(date).endOf(selectValue);

  return { from, to };
};

export const DateRangeSelector = () => {
  const [selectValue, setSelectValue] = useState<Period>('week');
  const [date, setDate] = useState(new Date());

  const rangeDate = getRange(selectValue, date);

  return (
    <Box display="flex" gap="s24">
      <Box w="150px">
        <Select
          onChange={(e) => {
            if (e && 'value' in e) {
              setSelectValue(e.value as Period);
              setDate(new Date());
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
          onClick={() => setDate(dayjs(rangeDate.from).subtract(1, 'days').toDate())}
          icon={<Icon as={LuChevronLeft} />}
        />
        <Text fontSize="r2" color="gray.700">
          {dayjs(rangeDate.from).format('YYYY-MM-DD')} — {dayjs(rangeDate.to).format('YYYY-MM-DD')}
        </Text>
        <IconButton
          aria-label="left"
          variant="ghost"
          colorScheme="gray"
          onClick={() => setDate(dayjs(rangeDate.to).add(1, 'days').toDate())}
          icon={<Icon as={LuChevronRight} />}
        />
      </Box>
    </Box>
  );
};
