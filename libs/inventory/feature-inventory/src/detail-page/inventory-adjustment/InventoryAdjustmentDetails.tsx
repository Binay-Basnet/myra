import { useRouter } from 'next/router';

import { Box, Breadcrumb, Scrollable } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';

import { InventoryAdjustmentDetailsSidebar } from './components/InventoryAdjustmentSidebar';
import { useInventoryAdjustmentHook } from './hooks/useInventoryAdjustmentHook';
import { Overview } from './tabs/OVerview';

export const InventoryAdjustmentDetails = () => {
  const router = useRouter();
  const { detailData } = useInventoryAdjustmentHook();

  const tabQuery = router.query['tab'] as string;
  const paths = [
    {
      label: 'Adjustment Table',
      link: ROUTES.INVENTORY_INVENTORY_ADJUSTMENT,
    },

    {
      label: `${detailData?.code}`,
      link: `${ROUTES.INVENTORY_INVENTORY_ADJUSTMENT_DETAILS}?id=${router?.query['id']}`,
    },
  ];

  return (
    <>
      {/* <ProductDetailPathBar name={`${detailData?.code}`} title="Inventory Adjustment" /> */}
      <Breadcrumb paths={paths} />
      <Box display="flex">
        <Box
          w="320px"
          position="fixed"
          h="calc(100vh - 110px)"
          borderRight="1px"
          borderRightColor="border.layout"
          overflowY="auto"
        >
          <InventoryAdjustmentDetailsSidebar />
        </Box>
        <Scrollable detailPage>
          <Box
            display="flex"
            p="s16"
            flexDir="column"
            gap="s16"
            ml="320px"
            bg="background.500"
            minH="calc(100vh - 170px)"
          >
            {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && <Overview />}
          </Box>
        </Scrollable>
      </Box>
    </>
  );
};
