import { useEffect, useMemo, useState } from 'react';
import { Spreadsheet } from 'react-spreadsheet';
import { useRouter } from 'next/router';
import { useGetCsvDataQuery, useSetCsvDataMutation } from '@migration/data-access';
import { differenceWith, isEmpty, isEqual, omit } from 'lodash';

import { Box, Button, Loader, Text, toast } from '@myra-ui';

export const MigrationFileComponent = () => {
  const router = useRouter();
  const [changedRows, setChangedRows] = useState([]);

  const { data, refetch, isLoading } = useGetCsvDataQuery({
    input: {
      fileName: router?.query['filename'] as string,
      dbName: router?.query['name'] as string,
      folderName:
        router?.query['csvType'] !== 'transformedCSV'
          ? ([router?.query['csvType']] as string[])
          : ([
              router?.query['csvType'],
              router?.query['folderName'],
              router?.query['subfolder'],
            ] as unknown as string[]),
      pageNo: 1 as unknown as string,
      data: null,
    },
  });

  const tableData = data?.protectedQuery?.getFileData || [];
  const tableDataArray =
    tableData && tableData?.reduce((acc, curr) => [...acc, { row: curr?.row, ...curr?.data }], []);
  const columnLabel = !isEmpty(tableData) && Object?.keys(tableDataArray?.[0]);

  const outputArray =
    tableData &&
    tableDataArray?.map((obj) => Object?.values(obj)?.map((value) => ({ value: String(value) })));
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    setCsvData(outputArray);
  }, [JSON.stringify(tableDataArray)]);

  const { mutateAsync } = useSetCsvDataMutation();
  const dataToBeSent = csvData?.map((innerArr) =>
    innerArr.reduce((acc, curr, index) => {
      acc[columnLabel[index]] = curr.value;
      return acc;
    }, {})
  );
  const finalData = differenceWith(dataToBeSent, tableDataArray, isEqual);

  const rowLabel = useMemo(
    () => tableDataArray?.map((item) => (changedRows.includes(item?.row) ? 'Edited' : '')),
    [changedRows]
  );

  // const rowLabel = tableData?.map((item) => (changedRows.includes(item?.row) ? 'Edited' : ''));

  useEffect(() => {
    const changedData = finalData?.map((item) => item?.row);
    setChangedRows(changedData);
  }, [JSON.stringify(csvData)]);

  const onSubmit = () => {
    mutateAsync({
      input: {
        fileName: router?.query['filename'] as string,
        dbName: router?.query['name'] as string,
        folderName:
          router?.query['csvType'] !== 'transformedCSV'
            ? ([router?.query['csvType']] as string[])
            : ([
                router?.query['csvType'],
                router?.query['folderName'],
                router?.query['subfolder'],
              ] as unknown as string[]),
        pageNo: 1 as unknown as string,
        data: finalData?.reduce(
          (acc, curr) => [...acc, { row: curr?.row, data: omit({ ...curr }, ['row']) }],
          []
        ),
      },
    }).then((res) => {
      refetch();
      toast({
        id: 'csv-file',
        type: 'success',
        message: res?.protectedMutation?.sendFileData?.status,
      });
    });
  };

  if (isLoading) {
    return (
      <Box>
        <Loader />
      </Box>
    );
  }

  return (
    <Box p={5}>
      {tableData && (
        <Box display="flex" flexDir="column">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Text fontSize="r3" fontWeight="medium">
                Project: {router?.query['name']}
              </Text>
              <Text fontSize="r3" fontWeight="medium">
                CSV type: {router?.query['csvType']}
              </Text>
              <Text fontSize="r3" fontWeight="medium">
                Migration File: {router?.query['filename']}
              </Text>
              <br />
            </Box>
            <Button width="-webkit-fit-content" onClick={onSubmit}>
              Submit
            </Button>
            <br />
          </Box>
          <Box
            display="flex"
            p={2}
            bg="gray.500"
            borderRadius={5}
            w="-webkit-fit-content"
            position="fixed"
            top={90}
            left={500}
            zIndex={1}
          >
            Changed Row: {changedRows?.map((item) => `${item}, `)}
          </Box>
          <Box width="-webkit-fit-content">
            <Spreadsheet
              data={csvData}
              columnLabels={columnLabel}
              // hideRowIndicators
              onChange={setCsvData}
              rowLabels={rowLabel}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MigrationFileComponent;
