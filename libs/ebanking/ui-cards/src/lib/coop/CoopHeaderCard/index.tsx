import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { IoCashOutline } from 'react-icons/io5';
import Image from 'next/image';

import { useGetAccountSummaryQuery } from '@coop/shared/data-access';
import { Box, Grid, Icon, TextFields } from '@coop/shared/ui';

export const COOPHeaderCard = () => {
  const { data: accountSummary } = useGetAccountSummaryQuery();

  return (
    <Box
      display="flex"
      flexDir="column"
      p="s16"
      bg="primary.500"
      color="white"
      gap="s24"
      borderRadius="br2"
    >
      <Box display="flex" alignItems="center" gap="s12">
        <Box w="s48" h="s48" position="relative">
          <Image src="/logo1.svg" layout="fill" alt="Logo Image" />
        </Box>
        <TextFields variant="stickyCardHeader">
          Namuna Saving and Credit Co-operative Limited
        </TextFields>
      </Box>

      <Grid templateColumns="repeat(2, 1fr)" gap="s16">
        <Box display="flex" alignItems="center" gap="s12">
          <Box
            borderRadius="br2"
            bg="primary.100"
            w="s32"
            h="s32"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={FaUsers} color="primary.500" size="sm" />
          </Box>
          <Box display="flex" flexDir="column">
            <TextFields color="primary.200" variant="tableHeader">
              Members
            </TextFields>
            <TextFields variant="stickyCardHeader">
              {accountSummary?.eBanking?.account?.summary?.totalSaving.toLocaleString(
                'en-IN',
                { maximumFractionDigits: 0 }
              ) ?? 'N/A'}
            </TextFields>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" gap="s12">
          <Box
            borderRadius="br2"
            bg="primary.100"
            w="s32"
            h="s32"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={IoCashOutline} color="primary.500" size="lg" />
          </Box>
          <Box display="flex" gap="s4" flexDir="column">
            <TextFields color="primary.200" variant="tableHeader">
              Total Capital
            </TextFields>
            <TextFields variant="stickyCardHeader">
              {accountSummary?.eBanking?.account?.summary?.totalLoan.toLocaleString(
                'en-IN',
                { maximumFractionDigits: 0 }
              ) ?? 'N/A'}
            </TextFields>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};
