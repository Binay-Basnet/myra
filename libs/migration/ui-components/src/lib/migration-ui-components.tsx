/* eslint-disable-next-line */
// export interface MigrationUiComponentsProps {}

import Link from 'next/link';
import { useGetProjectsQuery } from '@migration/data-access';

import { Box, Grid, GridItem, Text } from '@myra-ui';

export const MigrationUiComponents = () => {
  const { data } = useGetProjectsQuery();
  return (
    <Box display="flex" flexDir="column" gap={5}>
      <Text fontSize="3xl" fontWeight="semibold">
        Migration
      </Text>
      <Grid templateColumns="repeat(2, 1fr)" gap="s32">
        <GridItem>
          <Box display="flex" flexDir="column" p={5} gap={5} bg="whiteAlpha.900" borderRadius={6}>
            <Text fontSize="r3" fontWeight="medium">
              Projects
            </Text>
            {data?.protectedQuery?.getProjects?.map((item, index) => (
              <Link href={`/${item}`}>
                {index}. {item}
              </Link>
            ))}
          </Box>
        </GridItem>
        <GridItem>
          <Box display="flex" flexDir="column" p={5} gap={5} bg="whiteAlpha.900" borderRadius={6}>
            <Text fontSize="r3" fontWeight="medium">
              New Project
            </Text>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default MigrationUiComponents;
