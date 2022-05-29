import {
  chakraComponents,
  ChakraStylesConfig,
  Props,
  Select as ChakraSelect,
  SelectComponentsConfig,
} from 'chakra-react-select';
import { Flex, Icon, Text } from '@chakra-ui/react';
import { IoCheckmarkSharp, IoChevronDownSharp } from 'react-icons/io5';

export interface SelectProps extends Omit<Props, 'size'> {
  label?: string;
}

export const stateOptions = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AS', label: 'American Samoa' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'DC', label: 'District Of Columbia' },
  { value: 'FM', label: 'Federated States Of Micronesia' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'GU', label: 'Guam' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MH', label: 'Marshall Islands' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'MP', label: 'Northern Mariana Islands' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PW', label: 'Palau' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'PR', label: 'Puerto Rico' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VI', label: 'Virgin Islands' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
];

const components: SelectComponentsConfig<any, any, any> = {
  DropdownIndicator: (props) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={IoChevronDownSharp} w="20px" h="20px" cursor="pointer" />
    </chakraComponents.DropdownIndicator>
  ),
  Option: ({ children, ...props }) => (
    <chakraComponents.Option {...props}>
      {children}
      {props.isSelected ? (
        <Icon as={IoCheckmarkSharp} w="20px" h="20px" cursor="pointer" />
      ) : null}
    </chakraComponents.Option>
  ),
};

const chakraStyles: ChakraStylesConfig = {
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
    color: state.isSelected ? 'primary.500' : 'neutralColorLight.Gray-80',
    fontWeight: state.isSelected ? 600 : 400,
    bg: 'none',
    p: 's12',
    height: 's40',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 'r1',
    _hover: {
      bg: 'highlight.500',
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

export function Select({ label, ...rest }: SelectProps) {
  return (
    <Flex direction="column">
      <Text
        fontSize="r1"
        color="neutralColorLight.Gray-70"
        fontWeight="500"
        textTransform="capitalize"
      >
        {label}
      </Text>
      <ChakraSelect
        chakraStyles={chakraStyles}
        components={components}
        options={stateOptions}
        {...rest}
      />
    </Flex>
  );
}

export default Select;
