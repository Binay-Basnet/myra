import { Box, Divider, Grid, Text } from '@myra-ui';

import { UtilityDetailPageCard } from '@coop/ebanking/cards';
import { LoaderOverlay } from '@coop/ebanking/components';
import { useListUtilityServiceTypeQuery } from '@coop/ebanking/data-access';
import { UTILITY_ICON_DICT, UTILITY_LINK_DICT } from '@coop/ebanking/utils';

export const EbankingFeatureUtilityPayment = () => {
  const { data: utilityServicesData, isFetching } = useListUtilityServiceTypeQuery({
    filter: { isActive: true },
  });

  const utilityServices = utilityServicesData?.eBanking?.utility?.listServiceType?.data ?? [];

  return (
    <>
      <Box display="flex" flexDir="column" gap="s16">
        <Text fontSize="r1" color="gray.700" fontWeight="600">
          Utility Payments
        </Text>

        <Divider />

        <Grid templateColumns="repeat(3, 1fr)" p="s16" rowGap="s8" columnGap="s8">
          {utilityServices?.map((utilityPayment) => (
            <UtilityDetailPageCard
              icon={utilityPayment?.slug ? UTILITY_ICON_DICT[utilityPayment?.slug] : undefined}
              link={utilityPayment?.slug ? UTILITY_LINK_DICT[utilityPayment?.slug] : ''}
              label={utilityPayment?.name ?? 'N/A'}
            />
          ))}
        </Grid>
      </Box>

      {isFetching && <LoaderOverlay />}
    </>
  );
};

export default EbankingFeatureUtilityPayment;
