import { BsChevronRight } from 'react-icons/bs';
import { FiDatabase } from 'react-icons/fi';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { startCase } from 'lodash';

import { Box, Icon, Text } from '@myra-ui';

import { getDatabaseSlug } from '@coop/shared/utils';

import { Header, LogoSecondary } from './Header';

export const AppBar = () => {
  const router = useRouter();
  const isReport = router?.pathname?.includes('report');

  return (
    <>
      <Header />
      <Box
        h="2.75rem"
        px="s16"
        borderBottom="1px"
        bg="#F3F3F3"
        borderBottomColor="border.layout"
        display="flex"
        alignItems="center"
        flexShrink={0}
      >
        <Box display="flex" alignItems="center" gap="s16">
          <Box display="flex" alignItems="center" gap="s8">
            <LogoSecondary />
            <Text fontSize="s3" fontWeight={500} color="gray.800" textTransform="capitalize">
              {startCase(getDatabaseSlug())}
            </Text>
          </Box>

          <Icon size="lg" as={BsChevronRight} color="gray.600" />

          <Box
            h="35px"
            display="flex"
            alignItems="center"
            gap="s8"
            bg={isReport ? '' : 'white'}
            cursor="pointer"
            px="s16"
            boxShadow={isReport ? '' : 'E1'}
            borderRadius="br1"
            onClick={() => router?.replace('/')}
          >
            <Icon size="sm" as={FiDatabase} color="gray.600" />
            <Text fontSize="s3" fontWeight={500} color="gray.800" textTransform="capitalize">
              Table
            </Text>
          </Box>
          <Box
            h="35px"
            display="flex"
            alignItems="center"
            gap="s8"
            bg={!isReport ? '' : 'white'}
            cursor="pointer"
            px="s16"
            boxShadow={!isReport ? '' : 'E1'}
            borderRadius="br1"
            onClick={() => router?.push('/report')}
          >
            <Icon size="sm" as={HiOutlineDocumentReport} color="gray.600" />
            <Text fontSize="s3" fontWeight={500} color="gray.800" textTransform="capitalize">
              Report
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};
