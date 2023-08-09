import { Fragment } from 'react';
import { IconType } from 'react-icons';
import { FiChevronRight } from 'react-icons/fi';
import { useRouter } from 'next/router';

import { Box, Icon, Text } from '@myra-ui';

interface BreadcrumbComponentProps {
  paths: { label: string; link?: string }[];
  separator?: IconType | string;
}

export const Breadcrumb = ({ paths, separator }: BreadcrumbComponentProps) => {
  const router = useRouter();
  return (
    <Box display="flex" alignItems="center">
      {paths.map((item, index) => (
        <Fragment key={`${item?.link}-${item?.label}`}>
          <Text
            fontSize="r1"
            px="s8"
            py="s4"
            color="gray.800"
            _hover={
              item?.link
                ? {
                    bg: 'background.500',
                    borderRadius: 'br2',
                  }
                : {}
            }
            fontWeight={index === paths.length - 1 ? '600' : '500'}
            cursor={item?.link ? 'pointer' : 'auto'}
            onClick={() => {
              item.link && router.push(item.link);
            }}
          >
            {item.label}
          </Text>

          {index + 1 !== paths.length &&
            (typeof separator === 'string' ? (
              separator
            ) : (
              <Icon as={(separator as IconType) || FiChevronRight} size="lg" />
            ))}
        </Fragment>
      ))}
    </Box>
  );
};
