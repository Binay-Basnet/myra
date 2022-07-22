import { BsCash } from 'react-icons/bs';
import { FiBook } from 'react-icons/fi';
import { ImBlocked } from 'react-icons/im';
import { IoCashOutline } from 'react-icons/io5';
import { SiFormstack } from 'react-icons/si';
import { TbCalendarTime } from 'react-icons/tb';
import Link from 'next/link';
import { ChevronRightIcon } from '@chakra-ui/icons';

import { AccountPopover } from '@coop/ebanking/accounts';
import {
  CoopCard,
  CoopDownloadCard,
  COOPHeaderCard,
  InfoCard,
} from '@coop/ebanking/cards';
import {
  Box,
  Button,
  Divider,
  Grid,
  Icon,
  Text,
  VStack,
} from '@coop/shared/ui';

/* eslint-disable-next-line */
export interface EbankingFeatureCoopProps {}

export function EbankingFeatureCoop(props: EbankingFeatureCoopProps) {
  return (
    <Box display="flex" flexDir="column" gap="s16">
      <COOPHeaderCard />
      <Divider />
      <Box px="s16" py="s4" bg="white" borderRadius="br2">
        <VStack divider={<Divider />}>
          <Box
            py="s12"
            display="flex"
            alignItems="center"
            w="100%"
            justifyContent="space-between"
            cursor="pointer"
          >
            <Text fontSize="r1" fontWeight="600" color="gray.800">
              My Share Information
            </Text>
            <Icon as={ChevronRightIcon} size="lg" color="gray.500" />
          </Box>
          <Box
            py="s12"
            display="flex"
            alignItems="center"
            w="100%"
            justifyContent="space-between"
            cursor="pointer"
          >
            <Text fontSize="r1" fontWeight="600" color="gray.800">
              My KYM Details
            </Text>
            <Icon as={ChevronRightIcon} size="lg" color="gray.500" />
          </Box>
          <Box
            py="s8"
            display="flex"
            alignItems="center"
            w="100%"
            justifyContent="space-between"
          >
            <Text fontSize="r1" fontWeight="600" color="gray.800">
              Default Account
            </Text>
            <AccountPopover />
          </Box>
        </VStack>
      </Box>
      <InfoCard
        title="Cheque Services"
        btn={
          <Link href="/coop/cheque/all">
            <Box mr="-s12">
              <Button variant="ghost">
                View all applications
                <Icon as={ChevronRightIcon} color="priamry.500" />
              </Button>
            </Box>
          </Link>
        }
      >
        <Grid templateColumns="repeat(3, 1fr)" p="s16" gap="s16">
          <CoopCard
            icon={FiBook}
            title={'Request Chequebook'}
            link={'/coop/cheque/request'}
          />
          <CoopCard
            icon={IoCashOutline}
            title={'Withdraw Via Collector'}
            link={'/coop/cheque/withdraw'}
          />
          <CoopCard
            icon={ImBlocked}
            title={'Block Cheque'}
            link={'/coop/cheque/block'}
          />
        </Grid>
      </InfoCard>
      <InfoCard
        title="Loan Services"
        btn={
          <Link href="/coop/loan/all">
            <Box mr="-s12">
              <Button variant="ghost">
                View all applications
                <Icon as={ChevronRightIcon} color="priamry.500" />
              </Button>
            </Box>
          </Link>
        }
      >
        <Grid templateColumns="repeat(3, 1fr)" p="s16" gap="s16">
          <CoopCard
            icon={BsCash}
            title={'Apply for Loan'}
            link={'/coop/loan/apply'}
          />
          <CoopCard
            icon={TbCalendarTime}
            title={'View Loan Schedule'}
            link={'/coop/cheque/withdraw'}
          />
        </Grid>
      </InfoCard>
      <InfoCard
        title="Complaints"
        btn={
          <Link href="/coop/complaints/all">
            <Box mr="-s12">
              <Button variant="ghost">
                View all applications
                <Icon as={ChevronRightIcon} color="priamry.500" />
              </Button>
            </Box>
          </Link>
        }
      >
        <Grid templateColumns="repeat(3, 1fr)" p="s16" gap="s16">
          <CoopCard
            icon={BsCash}
            title={'Register New complaint'}
            link={'/coop/complaints/new'}
          />
        </Grid>
      </InfoCard>
      <InfoCard title="Downloads">
        <Grid templateColumns="repeat(2, 1fr)" p="s16" gap="s16">
          <CoopDownloadCard
            icon={SiFormstack}
            title={'Forms'}
            link={'/coop/downloads/forms'}
          />
          <CoopDownloadCard
            icon={SiFormstack}
            title={'Guidelines'}
            link={'/coop/downloads/guidelines'}
          />
          <CoopDownloadCard
            icon={SiFormstack}
            title={'Reports'}
            link={'/coop/downloads/reports'}
          />
          <CoopDownloadCard
            icon={SiFormstack}
            title={'Directives'}
            link={'/coop/downloads/directives'}
          />
        </Grid>
      </InfoCard>
    </Box>
  );
}

export default EbankingFeatureCoop;
