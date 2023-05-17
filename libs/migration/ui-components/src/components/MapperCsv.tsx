import { useState } from 'react';
import { useRouter } from 'next/router';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useUploadCsvMutation } from '@migration/data-access';

import { Box, Button, Collapse, Input, Text } from '@myra-ui';

export const MapperCsv = (props) => {
  const { directoryStructureData, directoryRefetch } = props;
  const router = useRouter();
  const [mapperCollapse, setMapperCollapse] = useState(true);
  const [selectedFile, setSelectedFile] = useState();

  const { mutateAsync: uploadCSVMutateAsync } = useUploadCsvMutation();

  const mapperCSVData =
    directoryStructureData?.protectedQuery?.getDirectoryStructure?.data[0]?.mapperCSV;

  const handleUploadFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const onSubmitCSV = (e) => {
    e.preventDefault();
    uploadCSVMutateAsync({
      input: { dbName: router?.query?.['name'] as string, file: [selectedFile] },
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
          onClick={() => setMapperCollapse(!mapperCollapse)}
          cursor="pointer"
        >
          Mapper CSV:
        </Text>
        <Button onClick={() => directoryRefetch()}>Reload</Button>
      </Box>
      <Box display="flex">
        <form onSubmit={onSubmitCSV}>
          <Box
            display="flex"
            flexDir="column"
            gap={5}
            bg="gray.200"
            p={5}
            w="-webkit-fit-content"
            borderRadius={5}
            boxShadow="lg"
          >
            <Text fontSize="r3" fontWeight="medium">
              Upload Csv
            </Text>
            <Input type="file" border="none" onChange={handleUploadFile} w="-webkit-fit-content" />
            <Button type="submit" w="-webkit-fit-content">
              Submit
            </Button>
          </Box>
        </form>
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
  );
};

export default MapperCsv;
