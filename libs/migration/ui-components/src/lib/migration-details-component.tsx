import { useRouter } from 'next/router';
import { useGetDirectoryStructureQuery } from '@migration/data-access';

import { Box, Grid, GridItem, Text } from '@myra-ui';

import ExtractionData from '../components/ExtractionData';
import MapperCsv from '../components/MapperCsv';
import SourceCsv from '../components/SourceCsv';
import TransformationDataStatus from '../components/TransformationDataStatus';
import TransformCsv from '../components/TransformCsv';

export const MigrationDetailsComponents = () => {
  const router = useRouter();
  const { data: directoryStructureData, refetch: directoryRefetch } = useGetDirectoryStructureQuery(
    {
      dbName: router?.query?.['name'] as string,
    }
  );

  return (
    <Box display="flex" flexDir="column" gap={5}>
      <Box display="flex" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="semibold">
          Projects {'>'} {router?.query?.['name']}
        </Text>
      </Box>
      <Grid templateColumns="repeat(2, 1fr)" gap="s32">
        <GridItem>
          <Box display="flex" flexDir="column" gap="s32">
            <SourceCsv
              directoryStructureData={directoryStructureData}
              directoryRefetch={directoryRefetch}
            />
            <MapperCsv
              directoryStructureData={directoryStructureData}
              directoryRefetch={directoryRefetch}
            />
            <TransformCsv
              directoryStructureData={directoryStructureData}
              directoryRefetch={directoryRefetch}
            />
          </Box>
        </GridItem>
        <GridItem>
          <Box display="flex" flexDir="column" gap="s32">
            <ExtractionData />
            <TransformationDataStatus />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default MigrationDetailsComponents;
