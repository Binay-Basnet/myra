import { useMemo } from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { chakra, Image, Tab, Tabs } from '@chakra-ui/react';

import { Box, Text } from '@myra-ui';

import { useTranslation } from '@coop/shared/utils';

const TabCol = chakra(Tab, {
  baseStyle: {
    color: 'gray.800',
    height: '48px',
    fontSize: 'r1',
    fontWeight: '400',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    _selected: {
      bg: '#EEF2F7',
      fontWeight: '600',
    },
    _focus: {
      boxShadow: 'none',
    },
  },
});

export interface ClientDetailLayoutProps {
  children: React.ReactNode;
}

export const ClientDetailLayout = (props: ClientDetailLayoutProps) => {
  const { children } = props;

  const router = useRouter();

  const { t } = useTranslation();

  const clientId = router?.query['id'];

  const tabLinks = [
    { title: t['neoClientDetailsOverview'], to: `/clients/${clientId}` },
    {
      title: t['neoClientDetailsBranches'],
      to: `/clients/${clientId}/branches`,
    },
    {
      title: t['neoClientDetailsDocuments'],
      to: `/clients/${clientId}/documents`,
    },
    {
      title: t['neoClientDetailsEmployee'],
      to: `/clients/${clientId}/employee-admin`,
    },
    {
      title: t['neoClientDetailsSubscription'],
      to: `/clients/${clientId}/subscription`,
    },
    { title: t['neoClientDetailsCodes'], to: `/clients/${clientId}/codes` },

    {
      title: t['neoClientDetailsActivity'],
      to: `/clients/${clientId}/activity`,
    },
  ];

  const currentIndex = useMemo(
    () => tabLinks.findIndex((link) => router.asPath === link.to),
    [router.asPath]
  );

  return (
    <Box>
      <Box
        height="3.125rem"
        p="s16"
        borderBottom="1px solid"
        borderColor="border.layout"
        position="sticky"
        zIndex="10"
        display="flex"
        gap="s10"
        alignItems="center"
      >
        <Text color="gray.600" fontWeight={600} fontSize="r2">
          {t['neoClientDetailsClients']}
        </Text>

        <AiOutlineRight />

        <Text color="gray.800" fontSize="r2">
          Namuna Saving and Credit Cooperative
        </Text>
      </Box>
      <Box width="300px" position="fixed">
        <Box display="flex" gap="s16" borderBottom="1px solid" borderColor="border.layout" p="s16">
          <Box boxSize="s60">
            <Image src="/client-avatar.png" alt="Dan Abramov" borderRadius="s4" />
          </Box>

          <Box display="flex" flexDirection="column" gap="s4">
            <Text color="gray.800" fontSize="r2" fontWeight={600}>
              Namuna Saving and Credit Cooperative
            </Text>

            <Text color="gray.700" fontSize="s3">
              namuna.myraerp.com
            </Text>
          </Box>
        </Box>

        <Box>
          <Box px="s16" py="s24">
            <Tabs variant="unstyled" index={currentIndex}>
              {tabLinks.map(({ title, to }) => (
                <Link href={to} key={to}>
                  <TabCol>
                    <Text>{title}</Text>
                  </TabCol>
                </Link>
              ))}
            </Tabs>
          </Box>
        </Box>
      </Box>
      <Box
        marginLeft="300px"
        bg="#EEF2F7"
        p="s16"
        width="calc(100%-300px)"
        minHeight="calc(100vh - 160px) "
      >
        {children}
      </Box>
    </Box>
  );
};

export default ClientDetailLayout;
