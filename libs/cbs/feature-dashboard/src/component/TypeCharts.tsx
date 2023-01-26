import dynamic from 'next/dynamic';
import dayjs from 'dayjs';

import { useGetMemberClassificationReportQuery } from '@coop/cbs/data-access';

const Charts = dynamic(() => import('react-apexcharts'), { ssr: false });

export const TypeCharts = () => {
  const { data } = useGetMemberClassificationReportQuery({
    data: {
      period: {
        from: {
          local: '',
          en: '2019-10-10',
          np: '',
        },
        to: {
          local: '',
          en: dayjs(new Date()).format('YYYY-MM-DD'),
          np: '',
        },
      },
    },
  });

  const typeData = data?.report?.memberReport?.memberClassificationReport?.data?.memberCategory;

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

        theme: {
          palette: 'palette2', // upto palette10
        },
        legend: {
          show: false,
          horizontalAlign: 'right',
          position: 'bottom',

          showForSingleSeries: true,
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          borderColor: '#ffffff',
          strokeDashArray: 2,
          yaxis: {
            lines: {
              show: true,
            },
          },
          xaxis: {
            lines: {
              show: false,
            },
          },
        },
      }}
    />
  );
};
