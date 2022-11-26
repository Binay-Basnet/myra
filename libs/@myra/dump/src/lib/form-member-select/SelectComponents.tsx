import { IoChevronDownSharp, IoSearch } from 'react-icons/io5';
import { Box, Icon, Text } from '@chakra-ui/react';
import { Avatar } from '@myra-ui/foundations';
import { chakraComponents, GroupBase, SelectComponentsConfig } from 'chakra-react-select';

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
        <Box display="flex" p="s8" gap="s16">
          <Box borderRadius="50%">
            <Avatar
              src={data.memberInfo?.profilePicUrl ?? ''}
              size="lg"
              name={data.memberInfo?.memberName}
            />
          </Box>
          <Box display="flex" flexDirection="column">
            <Text fontWeight="Medium" fontSize="r1" color="neutralColorLight.Gray-80">
              {data.memberInfo?.memberName}
            </Text>
            <Text fontWeight="Regular" fontSize="s3" color="neutralColorLight.Gray-80">
              {data.memberInfo?.code}
            </Text>
            <Text fontWeight="Regular" fontSize="s3" color="neutralColorLight.Gray-80">
              {data.memberInfo?.gender ?? '-'} | {data.memberInfo?.age ?? '-'} |{' '}
              {data.memberInfo?.maritialStatus ?? '-'}
            </Text>
            <Text fontWeight="Regular" fontSize="s3" color="neutralColorLight.Gray-60">
              {data.memberInfo?.address}
            </Text>
          </Box>
        </Box>
      </chakraComponents.Option>
    );
  },
  SingleValue: (props) => {
    const { data } = props;
    return (
      <chakraComponents.SingleValue {...props}>
        <Text>{`${data.memberInfo?.memberName} [${data.memberInfo?.code}]`}</Text>
      </chakraComponents.SingleValue>
    );
  },
};
