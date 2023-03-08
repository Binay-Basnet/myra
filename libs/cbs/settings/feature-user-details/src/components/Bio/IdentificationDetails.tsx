import { Box, DetailCardContent, DetailsCard, Grid, Text } from '@myra-ui';

import { localizedDate } from '@coop/cbs/utils';

import { useUserDetailsHooks } from '../../hooks/useUserDetailsHooks';

export const UserIdentificationDetails = () => {
  const { detailData } = useUserDetailsHooks();

  return (
    <DetailsCard title="Identification Details" bg="white" hasTable>
      {detailData?.userBio?.identificationDetail?.map((item) => (
        <Box display="flex" flexDirection="column" gap="s16">
          <Text>{item?.idType}</Text>
          <Grid p="s16" templateColumns="repeat(3,1fr)" gap="s16">
            <DetailCardContent title="Id No" subtitle={item?.idNo} />
            <DetailCardContent title="Place of Issue" subtitle={item?.place} />
            <DetailCardContent title="Issued Date" subtitle={localizedDate(item?.date)} />
          </Grid>
        </Box>
      ))}
    </DetailsCard>
  );
};
