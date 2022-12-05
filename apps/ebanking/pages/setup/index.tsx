import { ReactElement } from 'react';
import { IoIosInformationCircle } from 'react-icons/io';
import { useRouter } from 'next/router';

import { Box, Button, Icon, Text } from '@myra-ui';

import { useAppSelector } from '@coop/ebanking/data-access';
import { EbankingHeaderLayout } from '@coop/ebanking/ui-layout';

const SetupPage = () => {
  const user = useAppSelector((state) => state.auth?.user);
  const router = useRouter();

  return (
    <>
      <Text fontSize="r2" color="primary.500" fontWeight="600">
        Welcome to Myra, {user?.name} <br />
        Your account is created successfully
      </Text>
      <Box display="flex" flexDir="column" gap="s24">
        <Box display="flex" flexDir="column" gap="s16">
          <Text variant="bodyRegular" color="gray.700">
            Start using Myra by connecting your cooperative.
          </Text>
          <Button variant="outline" width="100%" onClick={() => router.push('/setup/connect')}>
            Connect to an existing COOP
          </Button>
        </Box>
        <Box display="flex" alignItems="center" gap="s16">
          <Box h="1px" bg="#DCDCDC" w="100%" />
          <Text fontSize="r1" color="gray.500">
            OR
          </Text>
          <Box h="1px" bg="#DCDCDC" w="100%" />
        </Box>
        <Box display="flex" flexDir="column" gap="s16">
          <Text variant="bodyRegular" color="gray.700">
            Apply for a membership to any cooperative of your choice.
          </Text>
          <Button variant="outline" width="100%">
            Apply for COOP membership
          </Button>
        </Box>
      </Box>
      <Box
        bg="primary.100"
        fontSize="r1"
        color="primary.500"
        w="100%"
        display="flex"
        mt="s32"
        gap="s8"
        p="s16"
      >
        <Icon as={IoIosInformationCircle} />
        <Text>If you have any queries on how to use Myra, feel free to contact us</Text>
      </Box>
    </>
  );
};

export default SetupPage;

SetupPage.getLayout = (page: ReactElement) => <EbankingHeaderLayout>{page}</EbankingHeaderLayout>;
