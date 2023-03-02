/* eslint-disable-next-line */
// export interface MigrationUiComponentsProps {}

import { useRouter } from 'next/router';
import { useGetDirectoryStructureQuery } from '@migration/data-access';

import { Box, Button, Text } from '@myra-ui';

export const MigrationDetailsComponents = () => {
  const router = useRouter();
  const { data } = useGetDirectoryStructureQuery({ dbName: router?.query?.['name'] as string });

  const sourceCSVData = data?.protectedQuery?.getDirectoryStructure?.data[0]?.sourceCSV;
  const mapperCSVData = data?.protectedQuery?.getDirectoryStructure?.data[0]?.mapperCSV;
  const transformedCSVData = data?.protectedQuery?.getDirectoryStructure?.data[0]?.transformedCSV;
  const transformedCSVDataKeys = transformedCSVData && Object.keys(transformedCSVData);
  return (
    <Box display="flex" flexDir="column" gap={5}>
      <Box display="flex" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="semibold">
          Projects {'>'} {router?.query?.['name']}
        </Text>
        <Button onClick={() => router.push(`/mapping/${router?.query?.['name']}`)}>
          Mapping Data
        </Button>
      </Box>
      <Box display="flex" flexDir="column" p={5} gap={5} bg="whiteAlpha.900" borderRadius={6}>
        <Text fontSize="r3" fontWeight="medium">
          SourceCSV:
        </Text>
        {sourceCSVData?.map((item, index) => (
          <Text>
            {index + 1}. {item}
          </Text>
        ))}
      </Box>
      <Box display="flex" flexDir="column" p={5} gap={5} bg="whiteAlpha.900" borderRadius={6}>
        <Text fontSize="r3" fontWeight="medium">
          MapperCSV:{' '}
        </Text>
        {mapperCSVData?.map((item, index) => (
          <Text>
            {index + 1}. {item}
          </Text>
        ))}
      </Box>
      <Box display="flex" flexDir="column" p={5} gap={5} bg="whiteAlpha.900" borderRadius={6}>
        <Text fontSize="r3" fontWeight="medium">
          TransformedCSV:{' '}
        </Text>
        {transformedCSVDataKeys?.map((item) => {
          const tableDataArray = transformedCSVData?.[item] as unknown as string[];
          return (
            <>
              <Text fontSize="r2" fontWeight="medium">
                {item} :
              </Text>
              {tableDataArray?.map((i, index) => (
                <Text>
                  {index + 1}. {i}
                </Text>
              ))}
            </>
          );
        })}
      </Box>
    </Box>
  );
};

export default MigrationDetailsComponents;
