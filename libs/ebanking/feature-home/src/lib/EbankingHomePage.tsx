import { Skeleton } from '@chakra-ui/react';

import { useGetHomeServiceListQuery } from '@coop/shared/data-access';
import { Box, Divider, Grid, GridItem, Icon, Text } from '@coop/shared/ui';

import { SERVICE_ICON_DICT } from '../constants/SERVICE_ICON';

export function EbankingHomePage() {
  const { data: servicesList, isLoading } = useGetHomeServiceListQuery();

  return (
    <Box display="flex" flexDir="column" gap="s24">
      <Box display="flex" flexDir="column" gap="s8">
        <Text fontSize="r1" color="gray.700" fontWeight="600">
          Fund Transfer
        </Text>
        <Grid templateColumns="repeat(3, 1fr)" gap="s8">
          {isLoading && (
            <>
              <Skeleton h="s48" />
              <Skeleton h="s48" />
              <Skeleton h="s48" />
              <Skeleton h="s48" />
              <Skeleton h="s48" />
              <Skeleton h="s48" />
            </>
          )}
          {servicesList?.eBanking?.services?.map((service) => (
            <GridItem
              display="flex"
              h="s48"
              alignItems="center"
              gap="s16"
              px="s16"
              boxShadow="E0"
              borderRadius="br2"
              bg="white"
              cursor="pointer"
              tabIndex={0}
              key={service?.id}
            >
              <Icon
                as={
                  service?.service_id
                    ? SERVICE_ICON_DICT[service?.service_id]
                    : undefined
                }
                size="sm"
                color="primary.500"
              />
              <Text fontSize="s3" color="gray.800" fontWeight="500">
                {service?.name}
              </Text>
            </GridItem>
          ))}
        </Grid>
      </Box>
      <Divider />
      <Box display="flex" flexDir="column" gap="s8">
        <Text fontSize="r1" color="gray.700" fontWeight="600">
          Utility Payments
        </Text>
      </Box>
    </Box>
  );
}

export default EbankingHomePage;
