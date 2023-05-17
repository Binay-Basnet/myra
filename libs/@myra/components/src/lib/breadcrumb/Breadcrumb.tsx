import { Fragment } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useRouter } from 'next/router';

import { Box, Icon, Text } from '@myra-ui';

interface BreadcrumbComponentProps {
  paths: { label: string; link?: string }[];
}

export const Breadcrumb = ({ paths }: BreadcrumbComponentProps) => {
  const router = useRouter();
  return (
    <Box
      h="3.125rem"
      display="flex"
      alignItems="center"
      borderBottom="1px"
      borderColor="border.layout"
      pl="s8"
      py="s8"
    >
      {paths.map((item, index) => (
        <Fragment key={`${item?.link}-${item?.label}`}>
          <Text
            fontSize="r1"
            px="s8"
            py="s4"
            color="gray.800"
            _hover={{
              bg: 'background.500',
              borderRadius: 'br2',
            }}
            fontWeight={index === paths.length - 1 ? '600' : '500'}
            cursor={item?.link ? 'pointer' : 'auto'}
            onClick={() => {
              item.link && router.push(item.link);
            }}
          >
            {item.label}
          </Text>
          {index + 1 !== paths.length && <Icon as={FiChevronRight} size="lg" />}
        </Fragment>
      ))}
    </Box>
  );
};
