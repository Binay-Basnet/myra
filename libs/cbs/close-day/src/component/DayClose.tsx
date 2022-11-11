import { useMemo } from 'react';
import { IoCheckmarkDone, IoClose, IoRefreshOutline } from 'react-icons/io5';
import { Spinner } from '@chakra-ui/react';

import { EodState, useGetEodStatusQuery } from '@coop/cbs/data-access';
import { FormCheckbox } from '@coop/shared/form';
import { Box, Button, Divider, Icon, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

interface INumberStatusProps {
  active: boolean;
  number: number | string;
}

export const NumberStatus = ({ number, active }: INumberStatusProps) => (
  <Box
    w="s20"
    h="s20"
    display="flex"
    alignItems="center"
    justifyContent="center"
    fontSize="s2"
    fontWeight="600"
    borderRadius="100%"
    bg={active ? 'primary.500' : 'gray.500'}
    color="white"
  >
    {number}
  </Box>
);

export const DayClose = () => {
  const { t } = useTranslation();

  const { data: eodStatusQueryData, refetch } = useGetEodStatusQuery();

  const dayCloseList = useMemo(() => {
    const eodStatus = eodStatusQueryData?.transaction?.eodStatus;

    return [
      {
        title: 'dayCloseDailyInterestBooking',
        subTitle: 'dayCloseInterestBooking',
        status: eodStatus?.interestBooking,
      },
      {
        title: 'dayCloseCheckFrequency',
        subTitle: 'dayCloseImplementthedayend',
        status: eodStatus?.interestPosting,
      },
      {
        title: 'dayCloseTransactionDateProgress',
        subTitle: 'dayCloseChecktransactiondate',
        status: eodStatus?.transactionDate,
      },
      {
        title: 'dayCloseCheckMaturity',
        subTitle: 'dayCloseCheckAccount',
        status: eodStatus?.maturity,
      },
      {
        title: 'Check Dormant',
        subTitle: 'Check if the account is dormant or not.',
        status: eodStatus?.dormancy,
      },
      {
        title: 'dayCloseCashVault',
        subTitle: 'dayCloseCheckCashVault',
        status: eodStatus?.cashInVault,
      },
    ];
  }, [eodStatusQueryData]);

  const eodStatusIcon = (status: EodState | undefined | null) => {
    switch (status) {
      case EodState.Completed:
        return <Icon color="primary.500" as={IoCheckmarkDone} />;
      case EodState.CompletedWithErrors:
        return <Icon color="danger.500" as={IoClose} />;
      case EodState.Ongoing:
        return <Spinner size="sm" />;
      default:
        return <Icon color="danger.500" as={IoClose} />;
    }
  };
  const eodStatusText = (status: EodState | undefined | null) => {
    let statusText = '';
    switch (status) {
      case EodState.Completed:
        statusText = 'Completed';
        break;
      case EodState.CompletedWithErrors:
        statusText = 'Not completed';
        break;
      case EodState.Ongoing:
        statusText = 'Ongoing';
        break;
      default:
        statusText = 'Not completed';
    }

    return statusText;
  };

  return (
    <Box display="flex" flexDirection="column" py="s16">
      <Box display="flex" flexDirection="column">
        <Box display="flex" py="s16" justifyContent="space-between">
          <Text
            fontSize="r2"
            fontWeight="SemiBold"
            color="neutralColorLight.Gray-80"
            lineHeight="s20"
          >
            {t['dayCloseInOrder']}
          </Text>
          <Button leftIcon={<IoRefreshOutline />} onClick={() => refetch()}>
            {t['dayCloseReload']}{' '}
          </Button>
        </Box>
        {dayCloseList?.map(({ title, subTitle, status }, index) => (
          <>
            <Box display="flex" gap="s16" py="s16" key={title}>
              <NumberStatus number={index + 1} active={status === EodState.Completed} />
              <Box display="flex" flexDirection="column" gap="s16">
                <Box>
                  <Text
                    fontSize="r1"
                    fontWeight="SemiBold"
                    color="neutralColorLight.Gray-80"
                    lineHeight="150%"
                  >
                    {t[title] ?? title}
                  </Text>
                  <Text
                    fontSize="r1"
                    fontWeight="Regular"
                    color="neutralColorLight.Gray-80"
                    lineHeight="150%"
                  >
                    {t[subTitle] ?? subTitle}
                  </Text>
                </Box>

                <Box display="flex" alignItems="center" gap="s8">
                  {eodStatusIcon(status)}

                  <Text
                    fontSize="s3"
                    fontWeight="SemiBold"
                    color="neutralColorLight.Gray-70"
                    lineHeight="150%"
                  >
                    {eodStatusText(status)}
                  </Text>
                </Box>

                {/* {status === EodState.CompletedWithErrors && (
                  <Alert status="error">
                    <Text
                      fontSize="r1"
                      fontWeight="SemiBold"
                      color="neutralColorLight.Gray-80"
                      lineHeight="150%"
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing alit.
                    </Text>
                  </Alert>
                )} */}
              </Box>
            </Box>
            <Divider />
          </>
        ))}

        <Box display="flex" flexDirection="column" gap="s48" py="s32">
          {/* <Box w="148px">
            <Button variant="outline">{t['dayCloseReinitiateDayEnd']}</Button>
          </Box> */}

          <FormCheckbox name="ignore" label={t['dayCloseIgnoreErrors']} />
        </Box>
      </Box>
    </Box>
  );
};
