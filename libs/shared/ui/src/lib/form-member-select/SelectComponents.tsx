import { IoChevronDownSharp, IoSearch } from 'react-icons/io5';
import { Box, Icon, Text } from '@chakra-ui/react';
import {
  chakraComponents,
  GroupBase,
  SelectComponentsConfig,
} from 'chakra-react-select';

import { Avatar } from '@coop/shared/ui';

export interface Option {
  label: string | number;
  value: string | number;
  memberInfo?: {
    image?: string;
    memberName?: string;
    memberId?: string;
    gender?: string;
    age?: number;
    maritialStatus?: string;
    address?: string;
    profilePicUrl?: string | null | undefined;
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
        <Box display="flex" p="s8" gap="s16">
          <Box borderRadius="50%">
            <Avatar
              src={props.data.memberInfo?.profilePicUrl ?? ''}
              size="lg"
              name={props.data.memberInfo?.memberName}
            />
          </Box>
          <Box display="flex" flexDirection="column">
            <Text
              fontWeight="Medium"
              fontSize="r1"
              color="neutralColorLight.Gray-80"
            >
              {props.data.memberInfo?.memberName}
            </Text>
            <Text
              fontWeight="Regular"
              fontSize="s3"
              color="neutralColorLight.Gray-80"
            >
              {props.data.memberInfo?.memberId}
            </Text>
            <Text
              fontWeight="Regular"
              fontSize="s3"
              color="neutralColorLight.Gray-80"
            >
              {props.data.memberInfo?.gender ?? '-'} |{' '}
              {props.data.memberInfo?.age ?? '-'} |{' '}
              {props.data.memberInfo?.maritialStatus ?? '-'}
            </Text>
            <Text
              fontWeight="Regular"
              fontSize="s3"
              color="neutralColorLight.Gray-60"
            >
              {props.data.memberInfo?.address}
            </Text>
          </Box>
        </Box>
      </chakraComponents.Option>
    );
  },
  SingleValue: (props) => {
    return (
      <chakraComponents.SingleValue {...props}>
        <Text>{`${props.data.memberInfo?.memberName} [${props.data.memberInfo?.memberId}]`}</Text>
      </chakraComponents.SingleValue>
    );
  },
};
