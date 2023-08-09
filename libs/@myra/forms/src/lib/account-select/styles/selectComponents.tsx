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

export const components: (
  name?: string
) => SelectComponentsConfig<Option, boolean, GroupBase<Option>> = (name) => ({
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
  Control: ({ innerProps, ...props }) => (
    <chakraComponents.Control
      {...props}
      innerProps={
        {
          ...innerProps,
          'data-testid': `${name}`,
        } as unknown as Record<string, string>
      }
    />
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
    <chakraComponents.Option
      data={data}
      {...props}
      innerProps={
        {
          ...props.innerProps,
          'data-testid': `${name}-${data?.value?.toString()}`,
        } as unknown as Record<string, string>
      }
    >
      <Box display="flex" justifyContent="space-between" width="100%" gap="s16">
        <Box display="flex" flexDirection="column" gap="s8">
          <Box display="flex" flexDirection="column" gap="s2">
            <Box display="flex" flexDirection="column">
              <Text fontSize="r1" fontWeight={500} color="neutralColorLight.Gray-80">
                {data.accountInfo.accountName}
              </Text>
              <Text fontSize="s3" fontWeight={400} color="neutralColorLight.Gray-50">
                {data.accountInfo.accountId}
              </Text>
            </Box>
            <Box display="flex" gap="s4">
              <Text fontSize="s3" fontWeight={400} color="neutralColorLight.Gray-70">
                {data.accountInfo.productName}
              </Text>
              <Text fontSize="s3" fontWeight={400} color="neutralColorLight.Gray-50">
                [{data.accountInfo.accountType}]
              </Text>
            </Box>
          </Box>
        </Box>

        <Box display="flex" flexDirection="column" gap="s4" alignItems="flex-end">
          <Text fontSize="s3" fontWeight={600} color="primary.500">
            {amountConverter(data.accountInfo.balance)}
          </Text>

          {data.accountInfo.fine !== '0' && (
            <Text fontSize="s3" fontWeight={600} color="danger.500">
              Fine: {amountConverter(data.accountInfo.fine || 0)}
            </Text>
          )}
        </Box>
      </Box>
    </chakraComponents.Option>
  ),
  SingleValue: ({ data, ...props }) => {
    const { selectProps } = props;
    return (
      <chakraComponents.SingleValue data={data} {...props}>
        <Text
          fontSize="r1"
          fontWeight={400}
          color={selectProps?.menuIsOpen ? 'gray.500' : 'gray.800'}
        >{`${data.accountInfo.accountName} [${data.accountInfo.accountId}]`}</Text>
      </chakraComponents.SingleValue>
    );
  },
});
