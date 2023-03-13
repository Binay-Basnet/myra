/* eslint-disable-next-line */
// export interface MigrationUiComponentsProps {}

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
  useGetDirectoryStructureQuery,
  useGetExtractionDataQuery,
  useGetTransformationDataQuery,
  useStartTransformMutation,
} from '@migration/data-access';

import { Box, Button, Collapse, Grid, GridItem, Text } from '@myra-ui';

import { FormSelect } from '@coop/shared/form';

export const MigrationDetailsComponents = () => {
  const [sourceCollapse, setSourceCollapse] = useState(false);
  const [mapperCollapse, setMapperCollapse] = useState(false);
  const [transformCollapse, setTransformCollapse] = useState(false);
  const [extractionCollapse, setExtractionCollapse] = useState(true);
  const [transformationCollapse, setTransformationCollapse] = useState(true);

  const router = useRouter();
  const methods = useForm();
  const { getValues, handleSubmit } = methods;
  const { data: directoryStructureData, refetch } = useGetDirectoryStructureQuery({
    dbName: router?.query?.['name'] as string,
  });
  const { data: extractionData } = useGetExtractionDataQuery({
    dbName: router?.query?.['name'] as string,
  });

  const { data: tansformationData } = useGetTransformationDataQuery({
    dbName: router?.query?.['name'] as string,
  });

  const { mutateAsync } = useStartTransformMutation();

  const sourceCSVData =
    directoryStructureData?.protectedQuery?.getDirectoryStructure?.data[0]?.sourceCSV;
  const mapperCSVData =
    directoryStructureData?.protectedQuery?.getDirectoryStructure?.data[0]?.mapperCSV;
  const transformedCSVData =
    directoryStructureData?.protectedQuery?.getDirectoryStructure?.data[0]?.transformedCSV;
  const transformedCSVDataKeys = transformedCSVData && Object.keys(transformedCSVData);
  const extractedData = extractionData?.protectedQuery?.getExtractionData?.data;
  const transformedData = tansformationData?.protectedQuery?.getTransformationData?.data;

  const onSubmit = () => {
    mutateAsync({
      input: {
        dbName: router?.query?.['name'] as string,
        choices: 'all',
        databaseType: getValues()?.databaseType,
      },
    }).then(() => refetch());
  };

  return (
    <Box display="flex" flexDir="column" gap={5}>
      <Box display="flex" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="semibold">
          Projects {'>'} {router?.query?.['name']}
        </Text>
        {/* <Button onClick={() => router.push(`/mapping/${router?.query?.['name']}`)}>
          Mapping Data
        </Button> */}
      </Box>
      <Grid templateColumns="repeat(2, 1fr)" gap="s32">
        <GridItem>
          <Box display="flex" flexDir="column" gap="s32">
            <Box
              display="flex"
              flexDir="column"
              p={5}
              gap={5}
              bg="whiteAlpha.900"
              borderRadius={6}
              boxShadow="lg"
            >
              <Text
                fontSize="r3"
                fontWeight="medium"
                onClick={() => setSourceCollapse(!sourceCollapse)}
                cursor="pointer"
              >
                Source CSV:
              </Text>
              <Collapse in={sourceCollapse}>
                {sourceCSVData?.map((item, index) => (
                  <Text
                    cursor="pointer"
                    onClick={() =>
                      router.push(`/${router?.query['name']}/${item}?csvType=sourceCSV`)
                    }
                  >
                    {index + 1}. {item}
                  </Text>
                ))}
              </Collapse>
            </Box>
            <Box
              display="flex"
              flexDir="column"
              p={5}
              gap={5}
              bg="whiteAlpha.900"
              borderRadius={6}
              boxShadow="lg"
            >
              <Text
                fontSize="r3"
                fontWeight="medium"
                onClick={() => setMapperCollapse(!mapperCollapse)}
                cursor="pointer"
              >
                Mapper CSV:{' '}
              </Text>
              <Collapse in={mapperCollapse}>
                {mapperCSVData?.map((item, index) => (
                  <Text
                    cursor="pointer"
                    onClick={() =>
                      router.push(`/${router?.query['name']}/${item}?csvType=mapperCSV`)
                    }
                  >
                    {index + 1}. {item}
                  </Text>
                ))}
              </Collapse>
            </Box>
            <Box
              display="flex"
              flexDir="column"
              p={5}
              gap={5}
              bg="whiteAlpha.900"
              borderRadius={6}
              boxShadow="lg"
            >
              <Text
                fontSize="r3"
                fontWeight="medium"
                onClick={() => setTransformCollapse(!transformCollapse)}
                cursor="pointer"
              >
                Transformed CSV:{' '}
              </Text>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box display="flex" flexDir="column" bg="gray.200" p={5} borderRadius={5} gap={5}>
                    <Text fontWeight="medium">Start Transform</Text>
                    <FormSelect
                      name="databaseType"
                      label="Database Type"
                      options={[
                        { label: 'Cooperative', value: 'COOPERATIVE' },
                        { label: 'Individual', value: 'INDIVIDUAL' },
                        { label: 'Institution', value: 'INSTITUTION' },
                        { label: 'Cooperative Union', value: 'COOPERATIVE_UNION' },
                      ]}
                    />
                    <Button type="submit" w={100}>
                      Submit
                    </Button>
                  </Box>
                </form>
              </FormProvider>

              <Collapse in={transformCollapse}>
                {transformedCSVDataKeys?.map((item) => {
                  const tableDataArray = transformedCSVData?.[item] as unknown as string[];
                  return (
                    <>
                      <Text fontSize="r2" fontWeight="medium">
                        {item} :
                      </Text>
                      {tableDataArray?.map((i, index) => (
                        <Text
                          cursor="pointer"
                          onClick={() =>
                            router.push(
                              `/${router?.query['name']}/${i}?csvType=transformedCSV&&folderName=${item}`
                            )
                          }
                        >
                          {index + 1}. {i}
                        </Text>
                      ))}
                    </>
                  );
                })}
              </Collapse>
            </Box>
          </Box>
        </GridItem>
        <GridItem>
          <Box display="flex" flexDir="column" gap="s32">
            <Box
              display="flex"
              flexDir="column"
              p={5}
              gap={5}
              bg="whiteAlpha.900"
              borderRadius={6}
              boxShadow="lg"
            >
              <Text
                fontSize="r3"
                fontWeight="medium"
                onClick={() => setExtractionCollapse(!extractionCollapse)}
                cursor="pointer"
              >
                Extraction Data:{' '}
              </Text>
              <Collapse in={extractionCollapse}>
                {extractedData?.map((item, index) => (
                  <Text>
                    {index + 1}. {item}
                  </Text>
                ))}
              </Collapse>
            </Box>
            <Box
              display="flex"
              flexDir="column"
              p={5}
              gap={5}
              bg="whiteAlpha.900"
              borderRadius={6}
              boxShadow="lg"
            >
              <Text
                fontSize="r3"
                fontWeight="medium"
                cursor="pointer"
                onClick={() => setTransformationCollapse(!transformationCollapse)}
              >
                Transformation Data:{' '}
              </Text>
              <Collapse in={transformationCollapse}>
                {transformedData?.map((item, index) => (
                  <Text>
                    {index + 1}. {item}
                  </Text>
                ))}
              </Collapse>
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default MigrationDetailsComponents;
