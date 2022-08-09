import { IoChevronDownSharp, IoSearch } from 'react-icons/io5';
import { Box, Icon, Text } from '@chakra-ui/react';
import {
  chakraComponents,
  GroupBase,
  SelectComponentsConfig,
} from 'chakra-react-select';

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

export const components: SelectComponentsConfig<
  Option,
  boolean,
  GroupBase<Option>
> = {
  Placeholder: ({ children, ...props }) => {
    return (
      <chakraComponents.Placeholder {...props}>
        {props.isMulti ? (
          Array.isArray(props.selectProps?.value) ? (
            <Text color="gray.900">
              {`${(props.selectProps.value as Option[]).length} items selected`}
            </Text>
          ) : (
            children
          )
        ) : (
          children
        )}
      </chakraComponents.Placeholder>
    );
  },
  DropdownIndicator: (props) => (
    <chakraComponents.DropdownIndicator {...props}>
      {props.options.length <= 5 ? (
        <Icon as={IoChevronDownSharp} w="20px" h="20px" cursor="pointer" />
      ) : (
        <Icon as={IoSearch} w="20px" h="20px" cursor="pointer" />
      )}
    </chakraComponents.DropdownIndicator>
  ),
  Option: (props) => {
    return (
      <chakraComponents.Option {...props}>
        <Box
          display="flex"
          justifyContent="space-between"
          p="s12"
          width="100%"
          height="80px"
        >
          <Box display="flex" flexDirection="column" gap="s4">
            <Text
              fontSize="r1"
              fontWeight={500}
              color="neutralColorLight.Gray-80"
            >
              {props.data.accountInfo.accountName}
            </Text>
            <Text
              fontSize="s3"
              fontWeight={500}
              color="neutralColorLight.Gray-60"
            >
              {props.data.accountInfo.accountId}
            </Text>
            <Text
              fontSize="s3"
              fontWeight={400}
              color="neutralColorLight.Gray-60"
            >
              {props.data.accountInfo.accountType}
            </Text>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            gap="s4"
            alignItems="flex-end"
          >
            <Text
              fontSize="s3"
              fontWeight={500}
              color="neutralColorLight.Gray-80"
            >
              {props.data.accountInfo.balance}
            </Text>

            {props.data.accountInfo.fine && (
              <Text fontSize="s3" fontWeight={500} color="danger.500">
                Fine: {props.data.accountInfo.fine}
              </Text>
            )}
          </Box>
        </Box>
      </chakraComponents.Option>
    );
  },
  SingleValue: (props) => {
    return (
      <chakraComponents.SingleValue {...props}>
        <Text>{`${props.data.accountInfo.accountName} [${props.data.accountInfo.accountId}]`}</Text>
      </chakraComponents.SingleValue>
    );
  },
};
