import { AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/router';

import { Box, DetailsCard, Icon, Text } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';

import { Statistics, TabHeader } from '../component';
import { CollateralList } from '../component/CollateralList';
import { useLoanAccountDetailHooks } from '../hooks/useLoanAccountDetailHooks';

export const CollateralPage = () => {
  const { collateralSummary, collatListInfo } = useLoanAccountDetailHooks();
  const router = useRouter();

  return (
    <>
      <TabHeader heading="Collateral" />
      <Statistics statsData={collateralSummary} />
      <DetailsCard title={`Collateral List (${collatListInfo?.length || 0})`} hasTable>
        <Box
          display="flex"
          gap="s4"
          justifyContent="flex-end"
          alignItems="center"
          cursor="pointer"
          onClick={() =>
            router.push(`${ROUTES?.CBS_LOAN_ACCOUNTS_COLLATERAL_ADD}?id=${router?.query?.id}`)
          }
        >
          <Icon as={AiOutlinePlus} size="sm" color="primary" />
          <Text fontSize="s3" fontWeight="medium" color="primary">
            Add New Collateral
          </Text>
        </Box>
        {collatListInfo && collatListInfo?.map((item) => <CollateralList collatDataList={item} />)}
      </DetailsCard>
    </>
  );
};
