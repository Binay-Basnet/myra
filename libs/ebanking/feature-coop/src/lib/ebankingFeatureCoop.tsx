import { IconType } from 'react-icons';
import { BsCash } from 'react-icons/bs';
import { FiBook } from 'react-icons/fi';
import { ImBlocked } from 'react-icons/im';
import { IoCashOutline } from 'react-icons/io5';
import { SiFormstack } from 'react-icons/si';
import { TbCalendarTime } from 'react-icons/tb';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Skeleton } from '@chakra-ui/react';

import { Box, Button, Divider, Grid, Icon, Text, VStack } from '@myra-ui';

import { DefaultAccountPopover } from '@coop/ebanking/accounts';
import { CoopCard, CoopDownloadCard, COOPHeaderCard, InfoCard } from '@coop/ebanking/cards';
import {
  useGetCoopChequeServicesQuery,
  useGetCoopComplaintServicesQuery,
  useGetCoopDownloadsQuery,
  useGetCoopLoanServicesQuery,
} from '@coop/ebanking/data-access';

const CHEQUE_SERVICE_DICT: Record<string, { icon: IconType; link: string }> = {
  'Request Withdraw slip': {
    link: '/coop/cheque/request',
    icon: FiBook,
  },
  'Withdraw via market representative': {
    icon: IoCashOutline,
    link: '/coop/cheque/withdraw',
  },
  'Block Withdraw Slip': {
    icon: ImBlocked,
    link: '/coop/cheque/block',
  },
};

const LOAN_SERVICE_DICT: Record<string, { icon: IconType; link: string }> = {
  'Apply for loan': {
    link: '/coop/loan/apply',
    icon: BsCash,
  },
  'View loan schedule': {
    icon: TbCalendarTime,
    link: '/coop/loan/schedule',
  },
};

const COMPLAINTS_SERVICE_DICT: Record<string, { icon: IconType; link: string }> = {
  'Register new grievance': {
    link: '/coop/complaints/new',
    icon: BsCash,
  },
};

const DOWNLOADS_DICT: Record<
  string,
  {
    icon: IconType;
    link: string;
  }
> = {
  Forms: {
    icon: SiFormstack,
    link: '/coop/downloads/forms',
  },
  Guidelines: {
    icon: SiFormstack,
    link: '/coop/downloads/guidelines',
  },
  Reports: {
    icon: SiFormstack,
    link: '/coop/downloads/reports',
  },
  Directives: {
    icon: SiFormstack,
    link: '/coop/downloads/directives',
  },
};

export const EbankingFeatureCoop = () => {
  const router = useRouter();

  const { data: chequeServices, isLoading: chequeLoading } = useGetCoopChequeServicesQuery();
  const { data: loanList, isLoading: loanLoading } = useGetCoopLoanServicesQuery();
  const { data: complaintList, isLoading: complaintLoading } = useGetCoopComplaintServicesQuery();

  const { data: downloadsList, isLoading: downloadLoading } = useGetCoopDownloadsQuery();

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
            onClick={() => router.push('/share-info')}
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
            onClick={() => router.push('/settings/profile')}
          >
            <Text fontSize="r1" fontWeight="600" color="gray.800">
              My KYM Details
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
            onClick={() => router.push('/coop/products/loan')}
          >
            <Text fontSize="r1" fontWeight="600" color="gray.800">
              View All Products
            </Text>
            <Icon as={ChevronRightIcon} size="lg" color="gray.500" />
          </Box>

          <Box py="s8" display="flex" alignItems="center" w="100%" justifyContent="space-between">
            <Text fontSize="r1" fontWeight="600" color="gray.800">
              Default Account
            </Text>
            <DefaultAccountPopover />
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
          {chequeLoading && (
            <>
              <Skeleton h="86px" />
              <Skeleton h="86px" />
              <Skeleton h="86px" />
            </>
          )}
          {chequeServices?.eBanking?.cooperativeServices?.cheque?.options
            ?.filter((cheque) => cheque.enabled)
            .map((cheque) => (
              <CoopCard
                icon={CHEQUE_SERVICE_DICT[cheque.name]?.icon}
                title={cheque.name.replace('collector', 'Market Representative')}
                link={String(CHEQUE_SERVICE_DICT[cheque.name]?.link)}
              />
            ))}
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
          {loanLoading && (
            <>
              <Skeleton h="86px" />
              <Skeleton h="86px" />
              <Skeleton h="86px" />
            </>
          )}
          {loanList?.eBanking?.cooperativeServices?.loan?.options
            ?.filter((loan) => loan.enabled)
            .map((loan) => (
              <CoopCard
                icon={LOAN_SERVICE_DICT[loan.name]?.icon}
                title={loan.name}
                link={String(LOAN_SERVICE_DICT[loan.name]?.link)}
              />
            ))}
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
          {complaintLoading && (
            <>
              <Skeleton h="86px" />
              <Skeleton h="86px" />
              <Skeleton h="86px" />
            </>
          )}
          {complaintList?.eBanking?.cooperativeServices?.complaint?.options
            ?.filter((complaint) => complaint.enabled)
            .map((complaint) => (
              <CoopCard
                icon={COMPLAINTS_SERVICE_DICT[complaint.name]?.icon}
                title={complaint.name}
                link={String(COMPLAINTS_SERVICE_DICT[complaint.name]?.link)}
              />
            ))}
        </Grid>
      </InfoCard>
      <InfoCard title="Downloads">
        <Grid templateColumns="repeat(2, 1fr)" p="s16" gap="s16">
          {downloadLoading && (
            <>
              <Skeleton h="86px" />
              <Skeleton h="86px" />
              <Skeleton h="86px" />
            </>
          )}
          {downloadsList?.eBanking?.cooperativeServices?.downloads?.options
            ?.filter((download) => download.enabled)
            .map((download) => (
              <CoopDownloadCard
                icon={DOWNLOADS_DICT[download.name]?.icon}
                title={download.name}
                link={String(DOWNLOADS_DICT[download.name]?.link)}
              />
            ))}
        </Grid>
      </InfoCard>
    </Box>
  );
};

export default EbankingFeatureCoop;
