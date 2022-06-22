import { ChakraStylesConfig } from 'chakra-react-select';

export const chakraStyles: ChakraStylesConfig = {
  inputContainer: () => ({
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '-4px',
  }),
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
    p: 's12',
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
    borderRadius: 'br2',
    px: 's12',
    height: '44px',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    p: 's12',
    display: 'flex',
    alignItems: 'center',
    height: '44px',
    marginTop: '-1px',
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
    px: 's12',
    color: state.isFocused ? 'primary.500' : 'neutralColorLight.Gray-50',
  }),
  loadingIndicator: () => ({
    display: 'none',
  }),
  loadingMessage: () => ({
    fontSize: 'r1',
  }),
  noOptionsMessage: () => ({
    fontSize: 'r1',
  }),
};
