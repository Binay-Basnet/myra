import { IoChevronDownSharp, IoSearch } from 'react-icons/io5';
import { Box, Icon, Text } from '@chakra-ui/react';
import { chakraComponents, GroupBase, SelectComponentsConfig } from 'chakra-react-select';

export interface Option {
  label: string | number;
  value: string | number;
  accountInfo: {
    accountName: string;
    accountId: string;
    accountType: string;
    balance: string;
    fine?: string;
  };
}

const placeHolderText = ({ isMulti, selectProps, children }: any) => {
  if (isMulti) {
    if (Array.isArray(selectProps?.value)) {
      return (
        <Text color="gray.900">{`${(selectProps.value as Option[]).length} items selected`}</Text>
      );
    }
    return children;
  }
  return children;
};

export const components: SelectComponentsConfig<Option, boolean, GroupBase<Option>> = {
  Placeholder: ({ children, ...props }) => {
    const { selectProps, isMulti } = props;
    return (
      <chakraComponents.Placeholder {...props}>
        {placeHolderText({ isMulti, selectProps, children })}
      </chakraComponents.Placeholder>
    );
  },
  DropdownIndicator: (props) => {
    const { options } = props;
    return (
      <chakraComponents.DropdownIndicator {...props}>
        {options.length <= 5 ? (
          <Icon as={IoChevronDownSharp} w="20px" h="20px" cursor="pointer" />
        ) : (
          <Icon as={IoSearch} w="20px" h="20px" cursor="pointer" />
        )}
      </chakraComponents.DropdownIndicator>
    );
  },
  Option: (props) => {
    const { data } = props;
    return (
      <chakraComponents.Option {...props}>
        <Box display="flex" justifyContent="space-between" p="s12" width="100%">
          <Box display="flex" flexDirection="column" gap="s4">
            <Text fontSize="r1" fontWeight={500} color="neutralColorLight.Gray-80">
              {data.accountInfo.accountName}
            </Text>
            <Text fontSize="s3" fontWeight={500} color="neutralColorLight.Gray-60">
              {data.accountInfo.accountId}
            </Text>
            <Text fontSize="s3" fontWeight={400} color="neutralColorLight.Gray-60">
              {data.accountInfo.accountType}
            </Text>
          </Box>

          <Box display="flex" flexDirection="column" gap="s4" alignItems="flex-end">
            <Text fontSize="s3" fontWeight={500} color="neutralColorLight.Gray-80">
              {data.accountInfo.balance}
            </Text>

            {data.accountInfo.fine && (
              <Text fontSize="s3" fontWeight={500} color="danger.500">
                Fine: {data.accountInfo.fine}
              </Text>
            )}
          </Box>
        </Box>
      </chakraComponents.Option>
    );
  },
  SingleValue: (props) => {
    const { data } = props;
    return (
      <chakraComponents.SingleValue {...props}>
        <Text>{`${data.accountInfo.accountName} [${data.accountInfo.accountId}]`}</Text>
      </chakraComponents.SingleValue>
    );
  },
};
