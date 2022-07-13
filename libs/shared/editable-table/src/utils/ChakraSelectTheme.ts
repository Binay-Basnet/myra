import { ChakraStylesConfig } from 'chakra-react-select';

export interface Option {
  label: string | number;
  value: string | number;
}

export const chakraDefaultStyles: ChakraStylesConfig<any> | undefined = {
  menu: (provided) => ({
    ...provided,
    mt: '0',
    maxHeight: '200px',
    boxShadow: 'E1',
    zIndex: '5',
  }),
  menuList: (provided) => ({
    ...provided,
    width: '100%',
    maxHeight: '200px',
    paddingY: '0',
    borderRadius: 'none',

    minWidth: 'none',
  }),
  option: (provided, state) => ({
    ...provided,
    color:
      state.isSelected && !state.isMulti && state.options.length > 5
        ? 'primary.500'
        : state.isDisabled
        ? 'neutralColorLight.Gray-40'
        : 'neutralColorLight.Gray-80',
    fontWeight: state.isSelected && !state.isMulti ? 600 : 400,
    bg: state.isFocused ? 'highlight.500' : 'none',
    p: 's8',
    height: 's40',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 'r1',
    _hover: {
      bg: 'highlight.500',
    },
    _disabled: {
      opacity: 1,
    },
  }),
  control: (provided, state) => ({
    ...provided,
    bg: 'white',
    px: 's8',
    minHeight: 0,
    height: '36px',
    border: '0',
    borderRadius: '0',
    _focus: {
      bg: 'primary.100',
    },
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    p: '0',
    px: 's8',

    display: 'flex',
    alignItems: 'center',
    height: 's36',
    color: state.hasValue
      ? 'neutralColorLight.Gray-80'
      : 'neutralColorLight.Gray-50',
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
    h: 's36',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),

  singleValue: (provided) => ({
    ...provided,
  }),

  indicatorsContainer: (provided) => ({
    ...provided,
    height: '36px',
  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),

  dropdownIndicator: (provided, state) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    px: 's8',
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
};
