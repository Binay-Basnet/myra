import { Navbar } from '../navbar/Navbar';
import { TabMenu } from '../tab-menu/TabMenu';
import {
  Box,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import {
  AddIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HamburgerIcon,
  SearchIcon,
} from '@chakra-ui/icons';
import { TabColumn, TabRow } from '@saccos/myra/components';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Button from '../button/Button';
import React from 'react';
import { useTranslation } from '@saccos/myra/util';
import Link from 'next/link';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries

export interface MainLayoutProps {
  children: React.ReactNode;
}

// ! TODO use THEMES
export function MainLayout(props: MainLayoutProps) {
  const { children } = props;
  return (
    // <Box
    //   position="fixed"
    //   width="100%"
    //   top={0}
    //   zIndex={2}
    //   backdropFilter="saturate(180%) blur(5px)"
    // >
    <div>
      <Box position="fixed" top={0} width="100%" zIndex={2}>
        <Navbar />
        <TabMenu />
      </Box>
      {children}
    </div>
  );
}

export interface IMainLayoutWithColumnProps {
  children: React.ReactNode;
  mainBtn: React.ReactNode;
  headingText: string;
  mainHeadingText: string;
  column: { title: string; link: string }[];
  rows: string[];
}

export const MainLayoutWithColumn = (props: IMainLayoutWithColumnProps) => {
  const { t } = useTranslation();

  return (
    <MainLayout>
      <Box mt="100px" p="16px" display="flex" width="100%" overflowX="hidden">
        <Box width={'15%'} mt="24px" minWidth="250px">
          <Text fontSize="24px" fontWeight="600" pl="16px">
            {props.mainHeadingText}
          </Text>

          <Box mt="58px" display="flex" flexDirection="column" width="238px">
            <Box pl="16px">{props.mainBtn}</Box>
            <br />

            <TabColumn list={props.column} />
          </Box>
        </Box>
        <Box width="85%" mt="12px" bg="white">
          <Box h="50px" w="100%" borderBottom="1px solid #E6E6E6" pl="16px">
            <Flex justify="flex-start" h="100%">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                maxH="50px"
              >
                <Text fontSize="16" fontWeight="600" color="#343C46">
                  {props.headingText}
                </Text>
              </Box>
              <Box ml="48px" display="flex" alignItems="flex-end">
                <TabRow t={t} list={props.rows} />
              </Box>
            </Flex>
          </Box>
          <Box
            h="50px"
            w="100%"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            borderBottom="1px solid #E6E6E6"
          >
            <Box w="500px" pt="15px" pl="20px">
              <InputGroup size="sm">
                <InputLeftElement pointerEvents="none" h="22px" zIndex="0">
                  <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  variant="unstyled"
                  type="search"
                  placeholder="Search Members"
                />
              </InputGroup>
            </Box>
            <Box display="flex">
              <Box
                w="184px"
                borderLeft="1px solid #E6E6E6"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <IconButton
                  aria-label="Previous"
                  variant="ghost"
                  icon={<ChevronLeftIcon />}
                  h="100%"
                />
                <Text fontSize="13px" fontWeight="600" color="#252525">
                  1 - 20 / 50
                </Text>
                <IconButton
                  variant="ghost"
                  aria-label="Next"
                  icon={<ChevronRightIcon />}
                  h="100%"
                />
              </Box>
              <Box
                flex={1}
                borderLeft="1px solid #E6E6E6"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Button variant="ghost">
                  <HamburgerIcon color="#1DB954" />{' '}
                  <Text ml="10px">Default</Text>
                </Button>
                <Button variant="ghost">
                  <Icon as={BsThreeDotsVertical} color="#636972" />{' '}
                  <Text ml="10px">Options</Text>
                </Button>
              </Box>
            </Box>
          </Box>
          <Box width={'100%'}>{props.children}</Box>
        </Box>
      </Box>
    </MainLayout>
  );
};

/** ======== SHARE PAGE LAYOUT ======== **/

const shareColumns = [
  {
    title: 'shareList',
    link: '/share/list',
  },
  {
    title: 'shareReport',
    link: '/share/report',
  },
  {
    title: 'shareConsolidatedReport',
    link: '/share/consolidatedReport',
  },
  {
    title: 'shareCertificatePrint',
    link: '/share/certificate',
  },
];

const shareRows = ['shareActive', 'shareSubmitted', 'shareDraft'];

interface ILayoutColumnProps {
  children: React.ReactNode;
  headingText: string;
  onClick?: () => void;
}

export const ShareLayout = (props: ILayoutColumnProps) => {
  return (
    <MainLayoutWithColumn
      mainBtn={
        // TODO ( Update this btn component )
        <Link href="/shares/list" passHref>
          <Button
            width="100%"
            display="flex"
            justifyContent="flex-start"
            leftIcon={<AddIcon h="11px" />}
            bg="#006837"
            fontSize="14px"
            py="6"
          >
            New Account
          </Button>
        </Link>
      }
      headingText={props.headingText}
      mainHeadingText="Shares"
      column={shareColumns}
      rows={shareRows}
    >
      {props.children}
    </MainLayoutWithColumn>
  );
};

/** ====== ACCOUNT PAGE LAYOUT END ========  **/

/** ======== ACCOUNT PAGE LAYOUT ======== **/

const accountColumns = [
  {
    title: 'accountList',
    link: '/accounts/list',
  },
  {
    title: 'accountReport',
    link: '/accounts/report',
  },
  {
    title: 'accountConsolidatedReport',
    link: '/accounts/consolidatedReport',
  },
  {
    title: 'accountCertificatePrint',
    link: '/accounts/certificate',
  },
];

const accountRows = [
  'accountNavActive',
  'accountNavSubmitted',
  'accountNavDraft',
];

export const AccountLayout = (props: ILayoutColumnProps) => {
  return (
    <MainLayoutWithColumn
      mainBtn={
        // TODO ( Update this btn component )
        <Link href="/accounts/list" passHref>
          <Button
            width="100%"
            display="flex"
            justifyContent="flex-start"
            leftIcon={<AddIcon h="11px" />}
            bg="#006837"
            fontSize="14px"
            py="6"
          >
            New Account
          </Button>
        </Link>
      }
      headingText={props.headingText}
      mainHeadingText="Accounts"
      column={accountColumns}
      rows={accountRows}
    >
      {props.children}
    </MainLayoutWithColumn>
  );
};

/** ====== ACCOUNT PAGE LAYOUT END ========  **/

/** ======== INVENTORY PAGE LAYOUT ======== **/

const inventoryColumns = [
  {
    title: 'inventoryItems',
    link: '/inventory/items',
  },
  {
    title: 'inventoryItemGroup',
    link: '/inventory/item-group',
  },

  {
    title: 'inventoryVendor',
    link: '/inventory/vendor',
  },
  {
    title: 'inventoryUnitOfMeasure',
    link: '/inventory/units-of-measure',
  },
];

const inventoryRows = ['shareActive', 'shareSubmitted', 'shareDraft'];

export const InventoryLayout = (props: ILayoutColumnProps) => {
  return (
    <MainLayoutWithColumn
      mainBtn={
        // TODO ( Update this btn component )
        <Button
          width="100%"
          display="flex"
          justifyContent="flex-start"
          leftIcon={<AddIcon h="11px" />}
          bg="#006837"
          fontSize="14px"
          py="6"
          onClick={props.onClick}
        >
          New Item
        </Button>
      }
      headingText={props.headingText}
      mainHeadingText="Inventory"
      column={inventoryColumns}
      rows={inventoryRows}
    >
      {props.children}
    </MainLayoutWithColumn>
  );
};

/** ====== INVENTORY PAGE LAYOUT END ========  **/

export default MainLayout;
