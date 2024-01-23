import { FormProvider, useForm } from 'react-hook-form';

import { Box, Grid, Text } from '@myra-ui';

import { useGetElementUrlMutation, useListDownloadCentreReportsQuery } from '@coop/cbs/data-access';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { getPaginationQuery } from '@coop/shared/utils';

import PreviousExportCard, { CardInfoProps } from './PreviousExportCard';

export const PreviousExports = () => {
  const methods = useForm();
  const { getValues } = methods;

  const { data } = useListDownloadCentreReportsQuery(
    {
      pagination: getPaginationQuery(),
      filter: {
        orConditions: [
          {
            andConditions: [
              { column: 'statusOfCompletion', comparator: 'EqualTo', value: 'COMPLETED' },
              {
                column: 'createdAt',
                comparator: 'BETWEEN',
                value: {
                  from: getValues()?.period?.from?.en,
                  to: getValues()?.period?.to?.en,
                },
              },
            ],
          },
        ],
      },
    },
    { enabled: !!getValues()?.period }
  );
  const { mutateAsync } = useGetElementUrlMutation();

  const downloadCenterData = data?.downloadCentre?.listDownloadCentreReports?.edges;

  return (
    <>
      <Box display="flex" justifyContent="space-between" mb="s16">
        <Text fontSize="r1">Previous Exports</Text>
        <FormProvider {...methods}>
          <Box w="-webkit-fit-content">
            <ReportDateRange label=" Filter by Date:" baseDate={new Date()} />
          </Box>
        </FormProvider>
      </Box>
      <Grid templateColumns="repeat(3, 1fr)" gap="s24">
        {downloadCenterData?.map((item) => (
          <PreviousExportCard
            item={item as CardInfoProps}
            onClick={() =>
              mutateAsync({ id: item?.node?.id as string }).then((res) =>
                window.open(res?.downloadCentre?.getElementUrl?.url as string, '_blank')
              )
            }
          />
        ))}
      </Grid>
    </>
  );
};

export default PreviousExports;
