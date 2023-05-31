import { useEffect, useMemo, useState } from 'react';
import { Spreadsheet } from 'react-spreadsheet';
import { useRouter } from 'next/router';
import { editCsv, viewCsv } from '@dhadda-migration/data-access';
import { useMutation, useQuery } from '@tanstack/react-query';
import MigrationPaginationComponent from 'libs/migration/ui-components/src/lib/migration-pagination-component';
import { isEmpty } from 'lodash';
import differenceWith from 'lodash/differenceWith';
import isEqual from 'lodash/isEqual';

import { Box, Button, Loader, Select, Text, toast } from '@myra-ui';

export const CsvFileView = () => {
  const router = useRouter();
  const [changedRows, setChangedRows] = useState([]);
  const [noOfRows, setNoOfRows] = useState(10);

  const { data, refetch, isLoading, isFetching } = useQuery(
    ['csv-file-view'],
    () =>
      viewCsv({
        project_name: router?.query?.['projectName'] as string,
        csv_name: router?.query?.['csvName'] as string,
        page_number: (router?.query?.['pageNo'] as unknown as number) || 1,
        rows: noOfRows,
      }),
    { enabled: router?.query?.['pageNo'] !== 'undefined' }
  );

  useEffect(() => {
    refetch();
  }, [JSON.stringify(router?.query?.['projectName']), router?.query?.['pageNo'], noOfRows]);

  const tableData = data?.data?.data || [];
  const tableDataArray =
    tableData &&
    tableData?.reduce(
      (acc: [], curr: { row_number: string; data: [] }) => [
        ...acc,
        { row_number: curr?.row_number, ...curr?.data },
      ],
      []
    );
  const columnLabel = !isEmpty(tableData) && Object?.keys(tableDataArray?.[0]);

  const csvArray =
    tableData &&
    tableDataArray?.map((obj: object) =>
      Object?.values(obj)?.map((value) => ({ value: String(value) }))
    );

  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    setCsvData(csvArray);
  }, [JSON.stringify(tableData)]);

  const { mutateAsync: editCsvMutation, isLoading: editCsvLoading } = useMutation(editCsv, {});

  const editedData = csvData?.map((innerArr) =>
    innerArr.reduce((acc: any, curr: any, index: number) => {
      acc[columnLabel[index]] = curr.value;
      return acc;
    }, {})
  );

  const finalEditedData = editedData.map((item) => ({
    ...item,
    row_number: Number(item.row_number),
  }));
  const finalData = differenceWith(finalEditedData, tableDataArray, isEqual);

  const rowLabel = useMemo(
    () =>
      tableDataArray?.map((item: { row_number: number }) =>
        changedRows.includes(item?.row_number) ? 'Edited' : ''
      ),
    [changedRows]
  );

  useEffect(() => {
    const changedData = finalData?.map((item) => item?.row_number);
    setChangedRows(changedData);
  }, [JSON.stringify(csvData)]);

  const onSubmit = () => {
    editCsvMutation({
      project_name: router?.query?.['projectName'] as string,
      csv_name: router?.query?.['csvName'] as string,
      data: finalData,
    })
      .then((res) => {
        toast({
          id: 'csv-file',
          type: 'success',
          message: res?.data?.message,
        });
      })
      .catch(() => {
        toast({
          id: 'csv-file',
          type: 'error',
          message: 'Something went wrong',
        });
      });
  };

  if (isLoading || isFetching) {
    return (
      <Box>
        <Loader />
      </Box>
    );
  }
  /* eslint-disable no-nested-ternary */
  return (
    <Box p={5}>
      {tableData && (
        <Box display="flex" flexDir="column">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Text fontSize="r3" fontWeight="medium">
                Project Name: {router?.query['projectName']}
              </Text>
              <Text fontSize="r3" fontWeight="medium">
                CSV Name: {router?.query['csvName']}
              </Text>
              <br />
              <Box>
                <Text>Select No of rows:</Text>
                <Select
                  options={[
                    { label: '10', value: 10 },
                    { label: '20', value: 20 },
                    { label: '50', value: 50 },
                    { label: '100', value: 100 },
                    { label: '500', value: 500 },
                    { label: '1000', value: 1000 },
                  ]}
                  onChange={(e) =>
                    setNoOfRows(typeof e === 'object' && 'value' in e && Number(e?.value))
                  }
                />
              </Box>
              <br />
            </Box>

            <Button width="-webkit-fit-content" onClick={onSubmit} isLoading={editCsvLoading}>
              Submit
            </Button>

            <br />
          </Box>
          <Box width="-webkit-fit-content">
            {!isEmpty(columnLabel) && isEmpty(csvData) ? (
              <Loader />
            ) : isEmpty(columnLabel) && isEmpty(csvData) ? (
              <Text fontSize="r3" fontWeight="medium">
                No data in csv
              </Text>
            ) : (
              <Box mb={10}>
                <Spreadsheet
                  data={csvData}
                  columnLabels={columnLabel}
                  // hideRowIndicators
                  onChange={setCsvData}
                  rowLabels={rowLabel}
                />
              </Box>
            )}
          </Box>
        </Box>
      )}
      <Box overflowX="scroll">
        <MigrationPaginationComponent totalPages={data?.data?.no_of_pages} />
      </Box>
    </Box>
  );
};

export default CsvFileView;
