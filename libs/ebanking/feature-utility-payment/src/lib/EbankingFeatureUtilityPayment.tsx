import { Box, Divider, Grid, Text } from '@myra-ui';

import { UtilityDetailPageCard } from '@coop/ebanking/cards';
import { LoaderOverlay } from '@coop/ebanking/components';
import { useGetUtilityListQuery } from '@coop/ebanking/data-access';
import { UTILITY_ICON_DICT, UTILITY_LINK_DICT } from '@coop/ebanking/utils';

export const EbankingFeatureUtilityPayment = () => {
  const { data: utilityList, isFetching } = useGetUtilityListQuery();

  const utilityPayments = utilityList?.eBanking?.utilityPayments ?? [];

  return (
    <>
      <Box display="flex" flexDir="column" gap="s16">
        <Text fontSize="r1" color="gray.700" fontWeight="600">
          Utility Payments
        </Text>

        <Divider />

        <Grid templateColumns="repeat(3, 1fr)" p="s16" rowGap="s8" columnGap="s8">
          {utilityPayments?.map((utilityPayment) => (
            <UtilityDetailPageCard
              icon={
                utilityPayment?.service_id
                  ? UTILITY_ICON_DICT[utilityPayment?.service_id]
                  : undefined
              }
              link={utilityPayment?.service_id ? UTILITY_LINK_DICT[utilityPayment?.service_id] : ''}
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
