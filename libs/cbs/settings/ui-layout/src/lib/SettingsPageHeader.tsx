import { IoChevronForwardOutline } from 'react-icons/io5';
import Link from 'next/link';
import { AddIcon } from '@chakra-ui/icons';

import { Box, Button, Icon, PageHeaderTab, Text } from '@myra-ui';

interface ITableListPageHeader {
  heading?: string;
  tabItems?: {
    title: string;
    key: string;
  }[];
  buttonLabel?: string;
  buttonHandler?: () => void;
  breadcrumbs?: { label: string; link?: string }[];
}

export const SettingsPageHeader = ({
  tabItems,
  heading,
  buttonLabel,
  buttonHandler,
  breadcrumbs,
}: ITableListPageHeader) => (
  <Box
    bg="white"
    zIndex="10"
    w="100%"
    top="0px"
    position="sticky"
    borderBottom="1px solid "
    borderColor="border.layout"
    display="flex"
    alignItems="center"
    px="s16"
    py="s8"
    height="3.125rem"
    gap="s48"
  >
    {breadcrumbs?.length ? (
      <Box display="flex" gap="s18">
        {breadcrumbs?.map((item, index) => (
          <>
            {index + 1 === breadcrumbs.length ? (
              <Text fontSize="r2" fontWeight={600} color="gray.700">
                {item?.label}
              </Text>
            ) : item?.link ? (
              <Link href={item.link}>
                <Text fontSize="r2" fontWeight={500} color="gray.800">
                  {item?.label}
                </Text>
              </Link>
            ) : (
              <Text fontSize="r2" fontWeight={500} color="gray.800">
                {item?.label}
              </Text>
            )}

            {index + 1 !== breadcrumbs.length && (
              <Icon as={IoChevronForwardOutline} size="md" color="gray.600" />
            )}
          </>
        ))}
      </Box>
    ) : (
      <Text fontSize="r2" fontWeight={500} color="gray.800">
        {heading}
      </Text>
    )}

    <PageHeaderTab list={tabItems ?? []} />

    {buttonLabel && buttonHandler && (
      <Box display="flex" justifyContent="flex-end" flexGrow={100}>
        <Button leftIcon={<AddIcon />} onClick={buttonHandler}>
          {buttonLabel}
        </Button>
      </Box>
    )}
  </Box>
);
