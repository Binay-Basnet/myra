import { IoChevronDownSharp, IoSearch } from 'react-icons/io5';
import { Box, Icon, Text } from '@chakra-ui/react';
import { chakraComponents, GroupBase, SelectComponentsConfig } from 'chakra-react-select';

import { amountConverter } from '@coop/shared/utils';

export interface Option {
  label: string | number;
  value: string | number;
  bankInfo: {
    bankName: string;
    accountNo: string;
    displayName: string;
    accountType: string;
    balance: string;
    branchName: string;
  };
}

export const components: SelectComponentsConfig<Option, boolean, GroupBase<Option>> = {
  Placeholder: ({ children, ...props }) => (
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
  ),
  DropdownIndicator: ({ options, ...rest }) => (
    <chakraComponents.DropdownIndicator options={options} {...rest}>
      {options.length <= 5 ? (
        <Icon as={IoChevronDownSharp} w="20px" h="20px" cursor="pointer" />
      ) : (
        <Icon as={IoSearch} w="20px" h="20px" cursor="pointer" />
      )}
    </chakraComponents.DropdownIndicator>
  ),
  Option: ({ data, ...props }) => (
    <chakraComponents.Option data={data} {...props}>
      <Box display="flex" justifyContent="space-between" width="100%" gap="s16">
        <Box display="flex" flexDirection="column" gap="s8">
          <Box display="flex" flexDirection="column" gap="s2">
            <Box display="flex" flexDirection="column">
              <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-80">
                {data.bankInfo.displayName}
              </Text>
              <Text fontSize="s3" fontWeight={400} color="neutralColorLight.Gray-50">
                {data.bankInfo.accountNo}
              </Text>
            </Box>

            <Text fontSize="s3" fontWeight={400} color="neutralColorLight.Gray-70">
              {data.bankInfo.bankName}
            </Text>
          </Box>
        </Box>

        <Box>
          <Text align="right" fontSize="s3" fontWeight={600} color="primary.500">
            {amountConverter(data.bankInfo.balance)}
          </Text>
          <Text
            align="right"
            fontSize="s3"
            fontWeight={400}
            color="neutralColorLight.Gray-60"
            textTransform="capitalize"
          >
            {data.bankInfo.accountType}
          </Text>
          <Text
            align="right"
            fontSize="s3"
            fontWeight={400}
            color="neutralColorLight.Gray-60"
            textTransform="capitalize"
          >
            {data.bankInfo.branchName}
          </Text>
        </Box>
      </Box>
    </chakraComponents.Option>
  ),
  SingleValue: ({ data, ...props }) => (
    <chakraComponents.SingleValue data={data} {...props}>
      <Text>{`${data.bankInfo.displayName} [${data.bankInfo.accountNo}]`}</Text>
    </chakraComponents.SingleValue>
  ),
};
