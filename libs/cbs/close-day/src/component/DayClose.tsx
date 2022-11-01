import { FormProvider, useForm } from 'react-hook-form';
import { IoCheckmarkDone, IoRefreshOutline } from 'react-icons/io5';

import { FormCheckbox } from '@coop/shared/form';
import { Alert, Box, Button, Divider, Icon, Text } from '@coop/shared/ui';
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

const dayCloseList = [
  {
    index: 1,
    title: 'dayCloseDailyInterestBooking',
    subTitle: 'dayCloseInterestBooking',
    isDisabled: false,
  },
  {
    index: 2,
    title: 'dayCloseCheckFrequency',
    subTitle: 'dayCloseImplementthedayend',
    isDisabled: true,
  },
  {
    index: 3,
    title: 'dayCloseTransactionDateProgress',
    subTitle: 'dayCloseChecktransactiondate',
    isDisabled: false,
  },
  {
    index: 4,
    title: 'dayCloseCheckMaturity',
    subTitle: 'dayCloseCheckAccount',
    isDisabled: true,
  },
  {
    index: 5,
    title: 'dayCloseCashVault',
    subTitle: 'dayCloseCheckCashVault',
    isDisabled: false,
  },
];

export const DayClose = () => {
  const methods = useForm();
  const { t } = useTranslation();

  // const { mutateAsync: closeDay } = useSetEndOfDayDataMutation();

  // const closeDayFxn = () => {
  //   asyncToast({
  //     id: 'set-close-day',
  //     promise: closeDay({}),
  //     msgs: {
  //       loading: 'Closing the Day',
  //       success: 'Day Closed',
  //     },
  //     // onSuccess: () => refetchEndOfDay(),
  //   });
  // };

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
          <Button leftIcon={<IoRefreshOutline />}>{t['dayCloseReload']} </Button>
        </Box>
        {dayCloseList?.map(({ index, title, subTitle, isDisabled }) => (
          <>
            <Box display="flex" gap="s16" py="s16">
              <NumberStatus number={index} active={isDisabled} />
              <Box display="flex" flexDirection="column" gap="s16">
                <Box>
                  <Text
                    fontSize="r1"
                    fontWeight="SemiBold"
                    color="neutralColorLight.Gray-80"
                    lineHeight="150%"
                  >
                    {t[title]}
                  </Text>
                  <Text
                    fontSize="r1"
                    fontWeight="Regular"
                    color="neutralColorLight.Gray-80"
                    lineHeight="150%"
                  >
                    {t[subTitle]}
                  </Text>
                </Box>

                <Box display="flex" gap="s4">
                  <Icon color="primary.500" as={IoCheckmarkDone} />
                  <Text
                    fontSize="s3"
                    fontWeight="SemiBold"
                    color="neutralColorLight.Gray-70"
                    lineHeight="150%"
                  >
                    {t['dayCloseCompleted']}
                  </Text>
                </Box>

                {/* <Box display="flex" gap="s4">
                  <Icon color="danger.500" as={IoCloseOutline} />
                  <Text
                    fontSize="s3"
                    fontWeight="SemiBold"
                    color="neutralColorLight.Gray-70"
                    lineHeight="150%"
                  >
                    {t['dayCloseNotCompleted']}
                  </Text>
                </Box>

                <Box display="flex" gap="s4">
                  <Icon color="primary.500" as={RiLoader5Fill} />
                  <Text
                    fontSize="s3"
                    fontWeight="SemiBold"
                    color="neutralColorLight.Gray-70"
                    lineHeight="150%"
                  >
                    {t['dayCloseOngoing']}
                  </Text>
                </Box> */}

                {isDisabled && (
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
                )}
              </Box>
            </Box>
            <Divider />
          </>
        ))}

        <Box display="flex" flexDirection="column" gap="s48">
          <Box mt="s48" w="148px">
            <Button> {t['dayCloseReinitiateDayEnd']} </Button>
          </Box>
          <FormProvider {...methods}>
            <FormCheckbox name="ignore" label={t['dayCloseIgnoreErrors']} />
          </FormProvider>
        </Box>
      </Box>
    </Box>
  );
};
