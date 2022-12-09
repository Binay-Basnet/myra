import { Grid, GridItem } from '@chakra-ui/react';

import { en, np, rm } from '../../utils/constants';

interface ICalendarWeekProps {
  locale: 'en' | 'ne';
  calendarType: 'AD' | 'BS';
}

// TODO! Optimize and get locale for ne / AD
const getDayNames = ({ locale, calendarType }: ICalendarWeekProps) => {
  if (locale === 'en' && calendarType === 'AD') {
    return en.dayName.min;
  }

  if (locale === 'en' && calendarType === 'BS') {
    return rm.dayName.min;
  }

  if (locale === 'ne' && calendarType === 'AD') {
    return np.dayName.min;
  }

  if (locale === 'ne' && calendarType === 'BS') {
    return np.dayName.min;
  }

  return en.dayName.min;
};

export const CalendarWeek = ({ locale, calendarType }: ICalendarWeekProps) => (
  <Grid templateColumns="repeat(7, 1fr)" w="100%" placeItems="center">
    {getDayNames({ locale, calendarType }).map((day) => (
      <GridItem
        color="#000"
        w="40px"
        h="40px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        key={day}
      >
        {day}
      </GridItem>
    ))}
  </Grid>
);
