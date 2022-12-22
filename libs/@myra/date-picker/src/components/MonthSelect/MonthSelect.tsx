import React from 'react';
import { GroupBase, Select } from 'chakra-react-select';

import { ne } from '../../locale/ne';
import { useLocale } from '../../locale/useLocale';
import { TDateState } from '../../types/date';
import { ad2bs, bs2ad } from '../../utils/ad-bs-converter';
import { getNextMonth } from '../../utils/calendar-builder';
import { en, rm } from '../../utils/constants';

interface SelectOption {
  label: string | number;
  value: string | number;
  disabled?: boolean;
}

interface IMonthBaseSelectProps {
  calendarType: 'AD' | 'BS';
  locale?: 'en' | 'ne';
  month: number;
  onChange: (newMonth: number) => void;
  rightAlignMonth?: boolean;
}

const MonthBaseSelect = ({
  calendarType,
  month,
  onChange,
  locale = 'en',
  rightAlignMonth = false,
}: IMonthBaseSelectProps) => {
  const { t } = useLocale(locale);

  const options =
    calendarType === 'BS'
      ? rm.monthName.full.map((fullMonth, index) => ({
          label: t[fullMonth as keyof typeof ne],
          value: index + 1,
        }))
      : en.monthName.full.map((fullMonth, index) => ({
          label: t[fullMonth as keyof typeof ne],
          value: index + 1,
        }));

  return (
    <Select<SelectOption, boolean, GroupBase<SelectOption>>
      options={options}
      onChange={(newValue) => {
        if (newValue) {
          if ('value' in newValue) {
            onChange(newValue?.value as number);
          }
        }
      }}
      chakraStyles={{
        menu: (provided) => ({
          ...provided,
          mt: '-32px',
          maxHeight: '300px',
          zIndex: '5',
          boxShadow: 'E1',
        }),
        menuList: (provided) => ({
          ...provided,
          width: '100%',
          maxHeight: '300px',
          borderRadius: 'br2',
          paddingY: '0',
          minWidth: 'none',
          boxShadow: 'E1',
          p: 's4',
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          /* Track */
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
            border: '2px white',
          },

          /* Handle */
          '&::-webkit-scrollbar-thumb': {
            border: '2px white',
            background: 'gray.100',
            borderRadius: '40px',
            cursor: 'pointer',
          },

          /* Handle on hover */
          '::-webkit-scrollbar-thumb:hover': {
            background: 'gray.500',
          },
        }),
        option: (provided, state) => ({
          color: state.isSelected ? 'white' : 'gray.800',
          bg: state.isSelected ? 'primary.500' : 'none',
          borderRadius: 'br2',
          px: 's8',
          py: 's4',
          w: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          fontSize: 'r1',
          _hover: {
            bg: !state.isSelected ? 'highlight.500' : 'primary.500',
          },
          _disabled: {
            opacity: 1,
          },
        }),
        control: () => ({
          cursor: 'pointer',
          bg: 'white',
          borderRadius: 'br2',
          px: 's4',
          height: 's32',
          w: '121px',
          minH: '0',
        }),
        valueContainer: (provided, state) => ({
          ...provided,
          p: 's4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: rightAlignMonth ? 'end' : 'start',
          height: 's32',
          marginTop: '-1px',
          color: state.hasValue ? 'gray.800' : 'gray.500',
          fontSize: 'r1',
        }),
        placeholder: (provided) => ({
          ...provided,
          color: 'neutralColorLight.Gray-50',
          fontSize: 'r1',
          noOfLines: 1,
        }),

        input: (provided) => ({
          ...provided,
          p: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }),
        singleValue: (provided) => ({
          ...provided,
        }),

        indicatorSeparator: () => ({
          display: 'none',
        }),

        dropdownIndicator: (provided, state) => ({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 's4',
          minW: '0',
          color: state.isFocused ? 'primary.500' : 'neutralColorLight.Gray-50',
        }),
        loadingIndicator: () => ({
          display: 'none',
        }),
        loadingMessage: (provided) => ({
          ...provided,
          fontSize: 'r1',
        }),
        noOptionsMessage: (provided) => ({
          ...provided,
          fontSize: 'r1',
        }),
        clearIndicator: (provided) => ({
          ...provided,
        }),
      }}
      isSearchable={false}
      components={{ ClearIndicator: () => null, DropdownIndicator: null }}
      value={options.find((option) => option.value === month)}
    />
  );
};

interface IMonthSelectProps {
  calendarType: 'AD' | 'BS';
  locale?: 'en' | 'ne';
  rightAlignMonth?: boolean;

  showNextMonth?: boolean;
  state: TDateState;
  setState: React.Dispatch<React.SetStateAction<TDateState>>;
}

export const MonthSelect = ({
  calendarType,
  locale,
  rightAlignMonth,
  state,
  setState,
  showNextMonth,
}: IMonthSelectProps) => (
  <MonthBaseSelect
    locale={locale}
    calendarType={calendarType}
    rightAlignMonth={rightAlignMonth}
    month={
      showNextMonth
        ? calendarType === 'AD'
          ? getNextMonth(state.ad.month, state.ad.year).month
          : getNextMonth(state.bs.month, state.ad.year).month
        : calendarType === 'AD'
        ? state.ad.month
        : state.bs.month
    }
    onChange={(newMonth) => {
      if (calendarType === 'AD') {
        const bs = ad2bs(state.ad.year, newMonth, state.ad.day);

        setState((prev) => ({
          ...prev,
          bs,
          ad: {
            ...prev.ad,
            month: newMonth,
          },
        }));
      } else {
        const ad = bs2ad(state.bs.year, newMonth, state.bs.day);

        setState((prev) => ({
          ...prev,
          bs: {
            ...prev.bs,
            month: newMonth,
          },
          ad,
        }));
      }
    }}
  />
);
