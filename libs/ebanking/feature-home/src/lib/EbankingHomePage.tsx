import { ChevronDownIcon } from '@chakra-ui/icons';
import { Skeleton, useDisclosure } from '@chakra-ui/react';

import { UtilityHomeCard } from '@coop/ebanking/cards';
import {
  useGetHomeServiceListQuery,
  useGetUtilityListQuery,
} from '@coop/shared/data-access';
import {
  Box,
  Button,
  Collapse,
  Divider,
  Grid,
  GridItem,
  Icon,
  Text,
} from '@coop/shared/ui';

import {
  SERVICE_ICON_DICT,
  UTILITY_ICON_DICT,
} from '../constants/SERVICE_ICON';

export function EbankingHomePage() {
  const { isOpen, onToggle } = useDisclosure();

  const { data: servicesList, isLoading } = useGetHomeServiceListQuery();
  const { data: utilityList, isLoading: utilityLoading } =
    useGetUtilityListQuery();

  const utilityPayments = [
    ...(utilityList?.eBanking?.utilityPayments ?? []),
    ...(utilityList?.eBanking?.utilityPayments ?? []),
  ];

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
                size="lg"
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

        <Box bg="white" borderRadius="br2">
          <Grid
            templateColumns="repeat(5, 1fr)"
            p="s16"
            rowGap="s16"
            columnGap="s16"
          >
            {utilityPayments.slice(0, 10).map((utilityPayment, index) => {
              return (
                <UtilityHomeCard
                  icon={
                    utilityPayment?.service_id
                      ? UTILITY_ICON_DICT[utilityPayment?.service_id]
                      : undefined
                  }
                  label={utilityPayment?.name ?? 'N/A'}
                />
              );
            })}
          </Grid>
          <Collapse in={isOpen} animateOpacity>
            <Grid
              templateColumns="repeat(5, 1fr)"
              p="s16"
              rowGap="s16"
              columnGap="s16"
            >
              {utilityPayments
                .slice(10, utilityPayments.length)
                .map((utilityPayment, index) => {
                  return (
                    <UtilityHomeCard
                      icon={
                        utilityPayment?.service_id
                          ? UTILITY_ICON_DICT[utilityPayment?.service_id]
                          : undefined
                      }
                      label={utilityPayment?.name ?? 'N/A'}
                    />
                  );
                })}
            </Grid>
          </Collapse>
          {utilityPayments.length > 10 && (
            <Box
              h="50px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="s4"
              _hover={{ bg: 'gray.0' }}
              onClick={onToggle}
            >
              <Button variant="link">
                See all
                <Icon as={ChevronDownIcon} color="primary.500" />
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default EbankingHomePage;
