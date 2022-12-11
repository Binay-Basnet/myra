import { GroupBase, Select } from 'chakra-react-select';

import { calendarData, ordinal } from '../../utils/constants';

interface SelectOption {
  label: string | number;
  value: string | number;
  disabled?: boolean;
}

interface IYearSelectProps {
  calendarType: 'AD' | 'BS';
  locale?: 'en' | 'ne';
  year: number;
  onChange: (newYear: number) => void;
}

export const YearSelect = ({ calendarType, year, onChange, locale = 'en' }: IYearSelectProps) => {
  const options =
    calendarType === 'BS'
      ? Object.keys(calendarData).map((fullYear) => ({
          label: fullYear,
          value: Number(fullYear),
        }))
      : Array.from(Array(100), (_, x) => x + 1943).map((fullYear) => ({
          label: locale === 'ne' ? ordinal(String(fullYear)) : String(fullYear),
          value: Number(fullYear),
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
          mt: '0',
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
        control: (provided) => ({
          ...provided,
          bg: 'white',
          borderRadius: 'br2',
          px: 's4',
          height: 's32',
          w: '70px',

          cursor: 'pointer',
          minH: '0',
        }),
        valueContainer: (provided, state) => ({
          ...provided,
          p: 's4',
          display: 'flex',
          alignItems: 'center',
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
      isClearable={false}
      components={{ ClearIndicator: () => null }}
      value={options.find((option) => option.value === year)}
    />
  );
};
