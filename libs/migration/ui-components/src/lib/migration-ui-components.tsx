/* eslint-disable-next-line */
// export interface MigrationUiComponentsProps {}

import Link from 'next/link';
import { useGetProjectsQuery } from '@migration/data-access';

import { Box, Grid, GridItem, Text } from '@myra-ui';

export const MigrationUiComponents = () => {
  const { data } = useGetProjectsQuery();
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap="s16">
      <GridItem>
        <Box display="flex" gap={5} flexDir="column">
          <Text fontSize="r3" fontWeight="medium">
            Projects
          </Text>
          <ul>
            {data?.protectedQuery?.getProjects?.map((item) => (
              <Link href={`/${item}`}>
                <li>{item}</li>
              </Link>
            ))}
          </ul>
        </Box>
      </GridItem>
      <GridItem>
        {' '}
        <Box display="flex" gap={5} flexDir="column">
          <Text fontSize="r3" fontWeight="medium">
            New Project
          </Text>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default MigrationUiComponents;
