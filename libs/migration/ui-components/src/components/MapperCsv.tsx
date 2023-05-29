import { useState } from 'react';
import { useRouter } from 'next/router';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { store } from '@migration/data-access';
import axios from 'axios';

import { Box, Button, Collapse, Input, Text, toast } from '@myra-ui';

export const MapperCsv = (props) => {
  const { directoryStructureData, directoryRefetch } = props;
  const router = useRouter();
  const [mapperCollapse, setMapperCollapse] = useState(true);
  const [selectedFile, setSelectedFile] = useState();

  const uploadFile = async (file: File[]) => {
    const formData = new FormData();
    formData.append(
      'operations',
      JSON.stringify({
        query: `
        mutation ($file: [Upload!]!) {
          protectedMutation{
            uploadCSV(input: { file: $file, dbName: "${router?.query?.['name'] as string}" }){
              status
              data
            }
          }
        }
    `,
        variables: {
          file: Array.from({ length: file.length }),
        },
      })
    );

    const map = {};
    Array.from(file).forEach((f, index) => {
      map[index] = [`variables.file.${index}`];
    });

    formData.append('map', JSON.stringify(map));

    // formData.append('0', file);

    Array.from(file).forEach((f, index) => {
      formData.append(`${index}`, f);
    });

    const API = axios.create({ baseURL: `${process.env['NX_SCHEMA_PATH']}/query` });

    API.interceptors.request.use((req) => {
      req.headers.Authorization = `Bearer ${store.getState().auth.token}`;
      req.headers.slug = 'neosys';
      return req;
    });

    await API({
      url: `${process.env['NX_SCHEMA_PATH']}/query`,
      method: 'post',
      data: formData,
    }).then((res) => {
      toast({
        id: 'migration-file-upload',
        type: 'success',
        message: res?.data?.data?.protectedMutation?.uploadCSV?.status,
      });
    });
  };

  const mapperCSVData =
    directoryStructureData?.protectedQuery?.getDirectoryStructure?.data[0]?.mapperCSV;

  const handleUploadFile = (e) => {
    setSelectedFile(e.target.files);
  };

  const onSubmitCSV = (e) => {
    e.preventDefault();
    uploadFile(selectedFile);
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
            <Input
              type="file"
              border="none"
              onChange={handleUploadFile}
              w="-webkit-fit-content"
              multiple
            />
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
