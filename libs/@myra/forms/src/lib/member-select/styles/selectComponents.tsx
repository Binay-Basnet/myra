import { IoChevronDownSharp, IoSearch } from 'react-icons/io5';
import { Box, Icon, Text } from '@chakra-ui/react';
import { chakraComponents, GroupBase, SelectComponentsConfig } from 'chakra-react-select';

import { Avatar } from '@myra-ui/foundations';

export interface Option {
  label: string | number;
  value: string | number;
  memberInfo?: {
    image?: string;
    memberName?: string;
    memberId?: string;
    code?: string;
    gender?: string;
    age?: number;
    maritialStatus?: string;
    address?: string;
    profilePicUrl?: string | null | undefined;
    branch?: string;
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
    const { data, ...rest } = props;

    return (
      <chakraComponents.Option
        {...props}
        innerProps={
          {
            ...rest.innerProps,
            'data-testid': `${name}-${data?.value?.toString()}`,
          } as unknown as Record<string, string>
        }
      >
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box gap="s16" display="flex">
            <Box borderRadius="50%">
              <Avatar
                src={data.memberInfo?.profilePicUrl ?? ''}
                size="md"
                name={data.memberInfo?.memberName}
              />
            </Box>
            <Box display="flex" gap="s4" flexDirection="column">
              <Text
                lineHeight="100%"
                fontWeight="Medium"
                fontSize="r2"
                color="neutralColorLight.Gray-80"
              >
                {data.memberInfo?.memberName}
              </Text>

              <Text
                lineHeight="100%"
                fontWeight="Regular"
                fontSize="s3"
                color="neutralColorLight.Gray-70"
              >
                {data.memberInfo?.gender ?? '-'} | {data.memberInfo?.age ?? '-'} |{' '}
                {data.memberInfo?.maritialStatus ?? '-'}
              </Text>
              <Box display="flex" gap="s16">
                <Text
                  lineHeight="100%"
                  fontWeight="Regular"
                  fontSize="s3"
                  color="neutralColorLight.Gray-60"
                >
                  {data.memberInfo?.address}
                </Text>

                <Box display="flex" gap="s4">
                  <Text
                    lineHeight="100%"
                    fontWeight="Regular"
                    fontSize="s3"
                    color="neutralColorLight.Gray-60"
                  >
                    Service-Center:
                  </Text>
                  <Text
                    lineHeight="100%"
                    fontWeight="Regular"
                    fontSize="s3"
                    color="neutralColorLight.Gray-60"
                  >
                    {data.memberInfo?.branch}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            <Text
              lineHeight="100%"
              fontWeight="Regular"
              fontSize="s3"
              color="neutralColorLight.Gray-60"
            >
              {data.memberInfo?.code}
            </Text>
          </Box>
        </Box>
      </chakraComponents.Option>
    );
  },
  SingleValue: (props) => {
    const { data, selectProps } = props;
    return (
      <chakraComponents.SingleValue {...props}>
        <Text
          fontSize="r1"
          fontWeight={400}
          color={selectProps?.menuIsOpen ? 'gray.500' : 'gray.800'}
        >{`${data.memberInfo?.memberName} [${data.memberInfo?.code}]`}</Text>
      </chakraComponents.SingleValue>
    );
  },
});
