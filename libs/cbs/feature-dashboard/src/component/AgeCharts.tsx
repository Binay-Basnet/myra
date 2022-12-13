import dynamic from 'next/dynamic';
import dayjs from 'dayjs';

import { useGetMemberClassificationReportQuery } from '@coop/cbs/data-access';

const Charts = dynamic(() => import('react-apexcharts'), { ssr: false });

export const AgeCharts = () => {
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

  const ageData = data?.report?.memberReport?.memberClassificationReport?.data?.age;

  const ageList =
    ageData &&
    ageData?.map((item) => ({
      x: item?.entryName,
      y: item?.inNumber,
    }));
  if (!ageList) {
    return null;
  }

  return (
    <Charts
      series={[
        {
          name: 'Age',
          data: ageList,
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
        colors: ['#A6CEE3'],
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
