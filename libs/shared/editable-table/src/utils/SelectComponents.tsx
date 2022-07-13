import { IoSearch } from 'react-icons/io5';
import { Icon } from '@chakra-ui/react';
import {
  chakraComponents,
  GroupBase,
  SelectComponentsConfig,
} from 'chakra-react-select';

export interface Option {
  label: string | number;
  value: string | number;
}

const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        d="M11.8166 10.9311L8.91831 8.03269C10.4336 6.07997 10.2966 3.25135 8.50422 1.45921C7.56319 0.518178 6.31216 0 4.98159 0C3.65089 0 2.39998 0.518178 1.45908 1.45909C0.518049 2.4 0 3.65104 0 4.98174C0 6.31245 0.518174 7.56349 1.45895 8.50453C2.39998 9.44544 3.65089 9.96361 4.98159 9.96361C6.1011 9.96361 7.16338 9.59562 8.03289 8.91874L10.9309 11.8168C11.053 11.939 11.2135 12 11.3737 12C11.5339 12 11.6942 11.939 11.8164 11.8168C12.0612 11.5721 12.0612 11.1756 11.8166 10.9311ZM2.3445 7.61885C1.6402 6.91442 1.25216 5.97789 1.25216 4.98187C1.25216 3.98572 1.6402 3.04932 2.34475 2.34489C3.04905 1.64046 3.98544 1.25254 4.98159 1.25254C5.9776 1.25254 6.91425 1.64046 7.61868 2.34489C9.07262 3.79872 9.07262 6.16477 7.61868 7.61873C6.91425 8.32316 5.9776 8.71119 4.98159 8.71119C3.98544 8.71119 3.04905 8.32316 2.3445 7.61885Z"
        fill="#AFB4BB"
      />
    </svg>
  );
};

export const components: SelectComponentsConfig<
  Option,
  boolean,
  GroupBase<Option>
> = {
  DropdownIndicator: (props) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={IoSearch} fontSize="lg" cursor="pointer" />
    </chakraComponents.DropdownIndicator>
  ),
};
