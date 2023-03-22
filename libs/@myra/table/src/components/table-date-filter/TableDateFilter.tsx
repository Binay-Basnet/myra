import { BsFilter } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { Box, Icon } from '@chakra-ui/react';
import qs from 'qs';

import { RangedDatePicker } from '@myra-ui/date-picker';

import { useAppSelector, useGetEndOfDayDateDataQuery } from '@coop/cbs/data-access';
import { URLFilter } from '@coop/shared/utils';

interface TableDateFilterProps {
  column: string;
}

export const TableDateFilter = ({ column }: TableDateFilterProps) => {
  const router = useRouter();
  const { data } = useGetEndOfDayDateDataQuery();

  const calendarType = useAppSelector((state) => state?.auth?.preference?.date);
  const transactionDate = data?.transaction?.endOfDayDate?.value?.en;

  const parsedQuery = qs.parse(router.query['filter'] as string, {
    allowDots: true,
    parseArrays: true,
    comma: true,
  }) as URLFilter;

  const parsedDate = parsedQuery?.[column]?.value;

  const filterCols = Object.keys(parsedQuery);

  return (
    <Box fontWeight="normal">
      <RangedDatePicker
        trigger={(isOpen) => (
          <Box as="button" display="flex" alignItems="center">
            <Icon
              as={BsFilter}
              w="s20"
              h="s20"
              p="s4"
              rounded="br1"
              _hover={{ bg: 'background.500' }}
              bg={isOpen || filterCols.includes(column) ? 'background.500' : 'transparent'}
              color={isOpen ? 'primary.500' : ''}
            />
          </Box>
        )}
        baseDate={new Date(transactionDate || '')}
        tillDateStart={new Date('2014-07-14')}
        locale={router.locale === 'ne' ? 'ne' : 'en'}
        calendarType={calendarType || 'BS'}
        value={
          parsedDate && typeof parsedDate !== 'string' && 'from' in parsedDate
            ? { from: { date: new Date(parsedDate.from) }, to: { date: new Date(parsedDate.to) } }
            : undefined
        }
        onChange={(newDate) => {
          const queryString = qs.stringify(
            {
              ...parsedQuery,
              [column]: {
                value: {
                  from: newDate?.from?.en,
                  to: newDate?.to?.en,
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
        label=""
      />
    </Box>
  );
};
