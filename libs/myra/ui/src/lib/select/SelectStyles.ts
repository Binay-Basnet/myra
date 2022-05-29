import { ChakraStylesConfig } from 'chakra-react-select';

export const chakraStyles: ChakraStylesConfig = {
  menu: (provided) => ({
    ...provided,
    // mt: '0',
    maxHeight: '200px',
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: '200px',
  }),
  option: (provided, state) => ({
    ...provided,
    color:
      state.isSelected && !state.isMulti
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
    borderRadius: 'br1',
    px: 's12',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    p: 's12',
    display: 'flex',
    alignItems: 'center',
    height: '40px',
    color: 'neutralColorLight.Gray-50',
    fontSize: 'r1',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'neutralColorLight.Gray-50',
    fontSize: 'r1',
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
