/* eslint-disable-next-line */
// export interface MigrationUiComponentsProps {}

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import {
  useGetDirectoryStructureQuery,
  useGetExtractionDataQuery,
  useGetTransformationDataQuery,
  useStartTransformMutation,
} from '@migration/data-access';

import { Box, Button, Collapse, Grid, GridItem, Text } from '@myra-ui';

import { FormDatePicker, FormSelect } from '@coop/shared/form';

export const MigrationDetailsComponents = () => {
  const [sourceCollapse, setSourceCollapse] = useState(true);
  const [mapperCollapse, setMapperCollapse] = useState(true);
  const [transformCollapse, setTransformCollapse] = useState(true);
  const [extractionCollapse, setExtractionCollapse] = useState(true);
  const [transformationCollapse, setTransformationCollapse] = useState(true);

  const router = useRouter();
  const methods = useForm();
  const { getValues, handleSubmit } = methods;
  const { data: directoryStructureData, refetch: directoryRefetch } = useGetDirectoryStructureQuery(
    {
      dbName: router?.query?.['name'] as string,
    }
  );
  const { data: extractionData, refetch: extractionRefetch } = useGetExtractionDataQuery({
    dbName: router?.query?.['name'] as string,
  });

  const { data: tansformationData, refetch: transformationRefetch } = useGetTransformationDataQuery(
    {
      dbName: router?.query?.['name'] as string,
    }
  );

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
        reportDate: getValues()?.reportDate?.en,
      },
    }).then(() => directoryRefetch());
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
              <Box display="flex" justifyContent="space-between">
                <Text
                  fontSize="r3"
                  fontWeight="medium"
                  onClick={() => setSourceCollapse(!sourceCollapse)}
                  cursor="pointer"
                >
                  Source CSV:
                </Text>
                <Button onClick={() => directoryRefetch()}>Reload</Button>
              </Box>
              <Collapse in={sourceCollapse}>
                <Box maxH="35vh" overflowY="scroll">
                  <TableContainer>
                    <Table size="sm">
                      <Thead>
                        <Tr>
                          <Th>S.N</Th>
                          <Th>Filename</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {sourceCSVData?.map((item, index) => (
                          <Tr
                            cursor="pointer"
                            onClick={() =>
                              router.push(`/${router?.query['name']}/${item}?csvType=sourceCSV`)
                            }
                          >
                            <Td>{index + 1}</Td>
                            <Td>{item}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
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
              <Box display="flex" justifyContent="space-between">
                <Text
                  fontSize="r3"
                  fontWeight="medium"
                  onClick={() => setMapperCollapse(!mapperCollapse)}
                  cursor="pointer"
                >
                  Mapper CSV:
                </Text>
                <Button onClick={() => directoryRefetch()}>Reload</Button>
              </Box>
              <Collapse in={mapperCollapse}>
                <Box maxH="35vh" overflowY="scroll">
                  <TableContainer>
                    <Table size="sm">
                      <Thead>
                        <Tr>
                          <Th>S.N</Th>
                          <Th>Filename</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {mapperCSVData?.map((item, index) => (
                          <Tr
                            cursor="pointer"
                            onClick={() =>
                              router.push(`/${router?.query['name']}/${item}?csvType=mapperCSV`)
                            }
                          >
                            <Td>{index + 1}</Td>
                            <Td>{item}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
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
              <Box display="flex" justifyContent="space-between">
                <Text
                  fontSize="r3"
                  fontWeight="medium"
                  onClick={() => setTransformCollapse(!transformCollapse)}
                  cursor="pointer"
                >
                  Transformed CSV:{' '}
                </Text>
                <Button onClick={() => directoryRefetch()}>Reload</Button>
              </Box>
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
                    <FormDatePicker name="reportDate" label="Report date" />
                    <Button type="submit" w={100}>
                      Submit
                    </Button>
                  </Box>
                </form>
              </FormProvider>

              <Collapse in={transformCollapse}>
                {transformedCSVDataKeys?.map((item) => {
                  const tableDataArray = Object.keys(
                    transformedCSVData?.[item]
                  ) as unknown as string[];

                  return (
                    <>
                      <Text fontSize="r2" fontWeight="medium">
                        {item} :
                      </Text>

                      <TableContainer border="1px" borderColor="gray.100">
                        <Table size="sm">
                          <Thead>
                            <Tr>
                              <Th>S.N</Th>
                              <Th>Foldername</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {tableDataArray?.map((i, index) => (
                              <Tr
                                cursor="pointer"
                                onClick={() =>
                                  router.push(
                                    `/${router?.query['name']}/details?folderName=${item}&&subfolder=${i}&&csvType=transformedCSV`
                                  )
                                }
                              >
                                <Td>{index + 1}</Td>
                                <Td>{i}</Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </TableContainer>
                      <br />
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
              <Box display="flex" justifyContent="space-between">
                <Text
                  fontSize="r3"
                  fontWeight="medium"
                  onClick={() => setExtractionCollapse(!extractionCollapse)}
                  cursor="pointer"
                >
                  Extraction Data:{' '}
                </Text>
                <Button onClick={() => extractionRefetch()}>Reload</Button>
              </Box>
              <Collapse in={extractionCollapse}>
                <Box maxH="35vh" overflowY="scroll">
                  <TableContainer>
                    <Table size="sm">
                      <Thead>
                        <Tr>
                          <Th>S.N</Th>
                          <Th>Status</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {extractedData?.map((i, index) => (
                          <Tr>
                            <Td>{index + 1}</Td>
                            <Td>{i}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
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
              <Box display="flex" justifyContent="space-between">
                <Text
                  fontSize="r3"
                  fontWeight="medium"
                  cursor="pointer"
                  onClick={() => setTransformationCollapse(!transformationCollapse)}
                >
                  Transformation Data:{' '}
                </Text>
                <Button onClick={() => transformationRefetch()}>Reload</Button>
              </Box>
              <Collapse in={transformationCollapse}>
                <Box maxH="35vh" overflowY="scroll">
                  <TableContainer>
                    <Table size="sm">
                      <Thead>
                        <Tr>
                          <Th>S.N</Th>
                          <Th>Status</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {transformedData?.map((i, index) => (
                          <Tr>
                            <Td>{index + 1}</Td>
                            <Td>{i}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              </Collapse>
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default MigrationDetailsComponents;
