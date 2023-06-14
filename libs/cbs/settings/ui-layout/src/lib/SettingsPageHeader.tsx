import { IoChevronForwardOutline } from 'react-icons/io5';
import Link from 'next/link';
import { AddIcon } from '@chakra-ui/icons';

import {
  Box,
  Button,
  Grid,
  GridItem,
  Icon,
  OptionsIcon,
  PageHeaderTab,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@myra-ui';

interface ITableListPageHeader {
  heading?: string;
  tabItems?: {
    title: string;
    key: string;
  }[];
  buttonLabel?: string;
  buttonHandler?: () => void;
  breadcrumbs?: { label: string; link?: string }[];
  options?: { label: string; handler: () => void }[];
}

export const SettingsPageHeader = ({
  tabItems,
  heading,
  buttonLabel,
  buttonHandler,
  breadcrumbs,
  options,
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

    {options?.length ? (
      <Box display="flex" justifyContent="flex-end" flexGrow={100}>
        <Popover placement="bottom-end">
          <PopoverTrigger>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Button
                variant="ghost"
                colorScheme="gray"
                color="gray.600"
                fontSize="r1"
                display="flex"
                alignItems="center"
                gap="s8"
              >
                <Icon as={OptionsIcon} size="sm" />
                <span>Options</span>
              </Button>
            </Box>
          </PopoverTrigger>
          <PopoverContent minWidth="180px" w="180px" color="white" boxShadow="E2">
            <PopoverBody px="0" py="0">
              <Grid>
                {options.map(({ label, handler }) => (
                  <GridItem
                    px="s16"
                    py="s8"
                    _hover={{ bg: 'gray.100' }}
                    cursor="pointer"
                    onClick={handler}
                  >
                    <Text fontSize="s3" color="neutralColorLight.Gray-80">
                      {label}
                    </Text>
                  </GridItem>
                ))}
              </Grid>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
    ) : null}

    {buttonLabel && buttonHandler && (
      <Box display="flex" justifyContent="flex-end" flexGrow={100}>
        <Button leftIcon={<AddIcon />} onClick={buttonHandler}>
          {buttonLabel}
        </Button>
      </Box>
    )}
  </Box>
);
