import React from 'react';

import { TDateState } from '../types/date';
import { ad2bs, bs2ad } from '../utils/ad-bs-converter';
import { getNextMonth, getPreviousMonth } from '../utils/calendar-builder';

interface IUseMonthNavigateHookProps {
  state: TDateState;
  setState: React.Dispatch<React.SetStateAction<TDateState>>;
  calendarType: 'AD' | 'BS';
}

export const useMonthNavigateHook = ({
  state,
  setState,
  calendarType,
}: IUseMonthNavigateHookProps) => {
  const gotoPreviousMonth = () => {
    if (calendarType === 'BS') {
      const { bs } = state;
      const { year, month, day } = bs;
      const previousMonth = getPreviousMonth(month, year);
      const ad = bs2ad(previousMonth.year, previousMonth.month, day);

      setState((prev) => ({
        ...prev,
        bs: {
          ...prev.bs,
          month: previousMonth.month,
          year: previousMonth.year,
        },
        ad,
      }));
      return;
    }

    const { ad } = state;
    const { year, month, day } = ad;
    const previousMonth = getPreviousMonth(month, year);
    const bs = ad2bs(previousMonth.year, previousMonth.month, day);

    setState((prev) => ({
      ...prev,
      ad: {
        ...prev.ad,
        month: previousMonth.month,
        year: previousMonth.year,
      },
      bs,
    }));
  };

  const gotToNextMonth = () => {
    if (calendarType === 'BS') {
      const { bs } = state;
      const { year, month, day } = bs;
      // this.setState(getPreviousMonth(month, year));
      const nexMonth = getNextMonth(month, year);
      const ad = ad2bs(nexMonth.year, nexMonth.month, day);

      setState((prev) => ({
        ...prev,
        bs: {
          ...prev.bs,
          month: nexMonth.month,
          year: nexMonth.year,
        },
        ad,
      }));
      return;
    }

    const { ad } = state;
    const { year, month, day } = ad;
    const nexMonth = getNextMonth(month, year);
    const bs = ad2bs(nexMonth.year, nexMonth.month, day);

    setState((prev) => ({
      ...prev,
      ad: {
        ...prev.ad,
        month: nexMonth.month,
        year: nexMonth.year,
      },
      bs,
    }));
  };

  return { gotToNextMonth, gotoPreviousMonth };
};
