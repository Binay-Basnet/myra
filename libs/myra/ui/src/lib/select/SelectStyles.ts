import { ChakraStylesConfig } from 'chakra-react-select';

export const chakraStyles: ChakraStylesConfig = {
  menu: (provided) => ({
    ...provided,
    // mt: '0',
    maxHeight: '200px',
    boxShadow: 'E1',
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: '200px',
    paddingY: '0',
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
    p: 's12',
    height: 's40',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 's3',
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
    borderRadius: 'br2',
    px: 's12',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    p: 's12',
    display: 'flex',
    alignItems: 'center',
    height: '40px',
    color: state.hasValue
      ? 'neutralColorLight.Gray-80'
      : 'neutralColorLight.Gray-50',
    fontSize: 's3',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'neutralColorLight.Gray-50',
    fontSize: 's3',
  }),

  input: (provided) => ({
    ...provided,
    p: '0',
    mt: '-2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  singleValue: (provided) => ({
    ...provided,
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),

  dropdownIndicator: (provided, state) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    px: 's12',
    color: state.isFocused ? 'primary.500' : 'neutralColorLight.Gray-50',
  }),
};
