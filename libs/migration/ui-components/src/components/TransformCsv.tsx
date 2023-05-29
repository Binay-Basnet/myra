import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useStartTransformMutation } from '@migration/data-access';

import { Box, Button, Collapse, Text } from '@myra-ui';

import { FormInput, FormSelect } from '@coop/shared/form';

export const TransformCsv = (props) => {
  const { directoryStructureData, directoryRefetch } = props;
  const [transformCollapse, setTransformCollapse] = useState(true);
  const router = useRouter();
  const methods = useForm();
  const { handleSubmit, getValues, reset } = methods;
  const { mutateAsync } = useStartTransformMutation();

  const transformedCSVData =
    directoryStructureData?.protectedQuery?.getDirectoryStructure?.data[0]?.transformedCSV;
  const transformedCSVDataKeys = transformedCSVData && Object.keys(transformedCSVData);

  const onSubmit = () => {
    mutateAsync({
      input: {
        dbName: router?.query?.['name'] as string,
        choices: 'all',
        databaseType: getValues()?.databaseType,
        newDB: getValues()?.newDB,
      },
    }).then(() => {
      directoryRefetch();
      reset({ databaseType: null, newDB: '' });
    });
  };
  return (
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
          Transform CSV:{' '}
        </Text>
        <Button onClick={() => directoryRefetch()}>Reload</Button>
      </Box>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDir="column" bg="gray.200" p={5} borderRadius={5} gap={5}>
            <Text fontWeight="medium">Start Transform</Text>
            <FormSelect
              name="databaseType"
              label="Member Type"
              options={[
                { label: 'Cooperative', value: 'COOPERATIVE' },
                { label: 'Individual', value: 'INDIVIDUAL' },
                { label: 'Institution', value: 'INSTITUTION' },
                { label: 'Cooperative Union', value: 'COOPERATIVE_UNION' },
              ]}
            />
            <FormInput name="newDB" label="New Database" />
            <Button type="submit" w={100}>
              Submit
            </Button>
          </Box>
        </form>
      </FormProvider>

      <Collapse in={transformCollapse}>
        {transformedCSVDataKeys?.map((item) => {
          const tableDataArray = Object.keys(transformedCSVData?.[item]) as unknown as string[];
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
                      <Th />
                    </Tr>
                  </Thead>
                  <Tbody>
                    {tableDataArray
                      ?.filter((j) => j !== 'error_records')
                      ?.map((i, index) => (
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
                          <Td>
                            {i === 'errors' ? (
                              <Text bg="red.800" color="white" w="-webkit-fit-content">
                                Errors: {transformedCSVData[item]?.['error_records']}
                              </Text>
                            ) : (
                              ''
                            )}
                          </Td>
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
  );
};

export default TransformCsv;
