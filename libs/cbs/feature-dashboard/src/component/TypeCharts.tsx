import dynamic from 'next/dynamic';

import { useGetMemberClassificationReportQuery } from '@coop/cbs/data-access';

const Charts = dynamic(() => import('react-apexcharts'), { ssr: false });

export const TypeCharts = () => {
  const { data } = useGetMemberClassificationReportQuery();

  const typeData = data?.report?.memberClassificationReport?.data?.memberCategory;

  const typeList =
    typeData &&
    typeData?.map((item) => ({
      x: item?.entryName,
      y: item?.inNumber,
    }));
  if (!typeList) {
    return null;
  }

  return (
    <Charts
      series={[
        {
          name: 'Type',
          data: typeList,
        },
      ]}
      type="bar"
      height="400px"
      w="100%"
      options={{
        chart: {
          toolbar: {
            show: false,
          },
        },
        colors: ['#B2D97E'],
        legend: {
          show: true,
          horizontalAlign: 'right',
          position: 'bottom',

          showForSingleSeries: true,
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          borderColor: '#cccccc',
          strokeDashArray: 2,
          yaxis: {
            lines: {
              show: true,
            },
          },
          xaxis: {
            lines: {
              show: true,
            },
          },
        },
      }}
    />
  );
};
