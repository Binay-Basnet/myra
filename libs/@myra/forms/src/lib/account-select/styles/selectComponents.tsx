import { IoChevronDownSharp, IoSearch } from 'react-icons/io5';
import { Box, Icon, Text } from '@chakra-ui/react';
import { chakraComponents, GroupBase, SelectComponentsConfig } from 'chakra-react-select';

import { amountConverter } from '@coop/shared/utils';

export interface Option {
  label: string | number;
  value: string | number;
  accountInfo: {
    accountName: string;
    accountId: string;
    accountType: string;
    balance: string;
    fine?: string;
    productName: string;
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
      <Box display="flex" justifyContent="space-between" p="s12" width="100%" gap="s16">
        <Box display="flex" flexDirection="column" gap="s8">
          <Box display="flex" flexDirection="column" gap="s4">
            <Box display="flex" flexDirection="column">
              <Text fontSize="r1" fontWeight={600} color="primary.500">
                {data.accountInfo.accountName}
              </Text>
              <Text fontSize="s3" fontWeight={500} color="neutralColorLight.Gray-50">
                {data.accountInfo.accountId}
              </Text>
            </Box>

            <Text fontSize="s3" fontWeight={400} color="neutralColorLight.Gray-50">
              {data.accountInfo.productName}
            </Text>
          </Box>

          <Text fontSize="s3" fontWeight={400} color="neutralColorLight.Gray-60">
            {data.accountInfo.accountType}
          </Text>
        </Box>

        <Box display="flex" flexDirection="column" gap="s4" alignItems="flex-end">
          <Text fontSize="s3" fontWeight={500} color="neutralColorLight.Gray-80">
            {amountConverter(data.accountInfo.balance)}
          </Text>

          {data.accountInfo.fine !== '0' && (
            <Text fontSize="s3" fontWeight={500} color="danger.500">
              Fine: {amountConverter(data.accountInfo.fine || 0)}
            </Text>
          )}
        </Box>
      </Box>
    </chakraComponents.Option>
  ),
  SingleValue: ({ data, ...props }) => (
    <chakraComponents.SingleValue data={data} {...props}>
      <Text>{`${data.accountInfo.accountName} [${data.accountInfo.accountId}]`}</Text>
    </chakraComponents.SingleValue>
  ),
};