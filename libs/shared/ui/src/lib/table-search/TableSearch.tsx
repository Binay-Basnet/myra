import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useRouter } from 'next/router';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  Text,
} from '@chakra-ui/react';

import {
  DEFAULT_PAGE_SIZE,
  Grid,
  GridItem,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  TextFields,
} from '@coop/shared/ui';

import Button from '../button/Button';
import Icon from '../icon/Icon';
import SmallPagination from '../small-pagination/SmallPagination';

export const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M15.7022 14.5748L11.8509 10.7103C13.8645 8.10663 13.6825 4.33514 11.3007 1.94562C10.0502 0.690903 8.3878 0 6.61969 0C4.85142 0 3.18918 0.690903 1.93887 1.94545C0.6884 3.2 0 4.86805 0 6.64233C0 8.4166 0.688567 10.0847 1.93871 11.3394C3.18918 12.5939 4.85142 13.2848 6.61969 13.2848C8.10734 13.2848 9.51893 12.7942 10.6744 11.8917L14.5253 15.7557C14.6876 15.9187 14.9008 16 15.1137 16C15.3266 16 15.5396 15.9187 15.7021 15.7557C16.0273 15.4295 16.0273 14.9008 15.7022 14.5748ZM3.11544 10.1585C2.17955 9.21923 1.66391 7.97052 1.66391 6.64249C1.66391 5.31429 2.17955 4.06576 3.11578 3.12652C4.05168 2.18728 5.29599 1.67006 6.61969 1.67006C7.94323 1.67006 9.18788 2.18728 10.1239 3.12652C12.056 5.06496 12.056 8.2197 10.1239 10.1583C9.18788 11.0975 7.94323 11.6149 6.61969 11.6149C5.29599 11.6149 4.05168 11.0975 3.11544 10.1585Z"
        fill="#91979F"
      />
    </svg>
  );
};

export const RefreshIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
    >
      <path
        d="M10.7998 4.5625C10.7998 4.5625 11.5611 4.1875 8.79981 4.1875C7.8109 4.1875 6.8442 4.48074 6.02196 5.03015C5.19971 5.57956 4.55885 6.36045 4.18041 7.27408C3.80197 8.18771 3.70295 9.19305 3.89588 10.163C4.08881 11.1329 4.56501 12.0238 5.26427 12.723C5.96354 13.4223 6.85445 13.8985 7.82436 14.0914C8.79426 14.2844 9.79959 14.1853 10.7132 13.8069C11.6269 13.4285 12.4077 12.7876 12.9572 11.9654C13.5066 11.1431 13.7998 10.1764 13.7998 9.1875"
        stroke="#006837"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M8.7998 1.8125L11.2998 4.3125L8.7998 6.8125"
        stroke="#006837"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const OptionsIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="18"
      viewBox="0 0 17 18"
      fill="none"
    >
      <path
        d="M8.89961 10.5187C9.73839 10.5187 10.4184 9.83874 10.4184 8.99995C10.4184 8.16117 9.73839 7.4812 8.89961 7.4812C8.06083 7.4812 7.38086 8.16117 7.38086 8.99995C7.38086 9.83874 8.06083 10.5187 8.89961 10.5187Z"
        fill="#91979F"
      />
      <path
        d="M13.9621 10.5187C14.8009 10.5187 15.4809 9.83874 15.4809 8.99995C15.4809 8.16117 14.8009 7.4812 13.9621 7.4812C13.1233 7.4812 12.4434 8.16117 12.4434 8.99995C12.4434 9.83874 13.1233 10.5187 13.9621 10.5187Z"
        fill="#91979F"
      />
      <path
        d="M3.83711 10.5187C4.67589 10.5187 5.35586 9.83874 5.35586 8.99995C5.35586 8.16117 4.67589 7.4812 3.83711 7.4812C2.99833 7.4812 2.31836 8.16117 2.31836 8.99995C2.31836 9.83874 2.99833 10.5187 3.83711 10.5187Z"
        fill="#91979F"
      />
    </svg>
  );
};

export type TableSearchProps = {
  placeholder?: string;
  pagination?: {
    startCursor: string;
    endCursor: string;
    total: number | string;
  };
  size: 'default' | 'compact';
  setSize: (size: 'default' | 'compact') => void;
};

export function TableSearch({
  placeholder,
  pagination,
  size,
  setSize,
}: TableSearchProps) {
  const router = useRouter();

  const pageSize = Number(
    router?.query['first'] ?? router?.query['last'] ?? DEFAULT_PAGE_SIZE
  );

  return (
    <Box
      h="50px"
      bg="white"
      display="flex"
      borderBottom="1px"
      borderColor="border.layout"
    >
      <InputGroup
        h="50px"
        bg="white"
        borderBottom="1px"
        borderColor="border.layout"
      >
        <InputLeftElement h="50px">
          <Icon as={SearchIcon} size="sm" color="gray.500" />
        </InputLeftElement>
        <Input
          placeholder={placeholder ?? 'Search'}
          variant="outline"
          h="50px"
          borderRadius={0}
          outline="none"
          border="none"
          borderBottom="1px"
          borderBottomColor="border.layout"
          color="gray.600"
          _hover={{
            border: 'solid 1px',
            borderColor: 'gray.300',
          }}
          _focus={{ border: 'solid 1px', borderColor: 'primary.300' }}
          _active={{ border: 'solid 1px', borderColor: 'primary.500' }}
        />
      </InputGroup>
      <Box
        px="s16"
        borderLeft="1px"
        borderRight="1px"
        borderColor="border.layout"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Button
          variant="ghost"
          colorScheme="gray"
          color="gray.600"
          fontSize="r1"
          display="flex"
          alignItems="center"
          gap="s8"
          onClick={() => router.push({ query: {} })}
        >
          <Icon as={RefreshIcon} size="sm" />
          <span>Reset Table</span>
        </Button>
      </Box>

      <Box
        px="s16"
        borderRight="1px"
        borderColor="border.layout"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
      >
        {/* TODO (REPLACE THIS IF) */}
        <SmallPagination
          limit={pageSize}
          total={pagination?.total ?? 'Many'}
          startCursor={pagination?.startCursor ?? '1310910'}
          endCursor={pagination?.endCursor ?? '139199103'}
        />
      </Box>

      <Box
        px="s16"
        borderRight="1px"
        borderColor="border.layout"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Button
          variant="ghost"
          colorScheme="gray"
          color="gray.600"
          fontSize="r1"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="s8"
          onClick={() => {
            setSize(
              size === 'default'
                ? 'compact'
                : size === 'compact'
                ? 'default'
                : 'default'
            );
          }}
        >
          <Icon as={GiHamburgerMenu} size="sm" color="primary.500" />
          <Text textTransform="capitalize">{size}</Text>
        </Button>
      </Box>
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <Box
            px="s16"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
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
        <PopoverContent
          minWidth="180px"
          w="180px"
          color="white"
          _focus={{ boxShadow: 'none' }}
        >
          <PopoverBody px="0" py="s8">
            <Grid>
              <GridItem
                px="s16"
                py="s8"
                _hover={{ bg: 'gray.100' }}
                cursor="pointer"
              >
                <TextFields
                  variant="bodyRegular"
                  color="neutralColorLight.Gray-80"
                >
                  Export All (.xlsx)
                </TextFields>
              </GridItem>
              <GridItem
                px="s16"
                py="s8"
                _hover={{ bg: 'gray.100' }}
                cursor="pointer"
              >
                <TextFields
                  variant="bodyRegular"
                  color="neutralColorLight.Gray-80"
                >
                  Export Visible (.xlsx)
                </TextFields>
              </GridItem>
            </Grid>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}

export default TableSearch;
