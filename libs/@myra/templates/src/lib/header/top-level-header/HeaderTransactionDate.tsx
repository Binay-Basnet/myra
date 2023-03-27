import { useMemo, useState } from 'react';
import { BiLinkExternal } from 'react-icons/bi';
import { BsCheckCircleFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { Spinner } from '@chakra-ui/react';
import format from 'date-fns/format';

import { Box, Button, Chips, Icon, Text } from '@myra-ui';
import { Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@myra-ui/components';

import {
  BranchCategory,
  EodOption,
  EodState,
  useAppSelector,
  useEodHistoryQuery,
  useGetEndOfDayDateDataQuery,
  useSetEndOfDayDataMutation,
} from '@coop/cbs/data-access';
import { getLocalizedTodaysDate, localizedDate, ROUTES } from '@coop/cbs/utils';

const eodStatusIcon = (status: EodState | undefined | null, errors: number | null | undefined) => {
  switch (status) {
    case EodState.Completed:
      if (errors) {
        return <Icon color="warning.500" as={BsCheckCircleFill} size="sm" />;
      }

      return <Icon color="primary.500" as={BsCheckCircleFill} size="sm" />;
    case EodState.Ongoing:
      return <Spinner size="sm" />;

    default:
      return <Spinner size="sm" />;
  }
};

export const HeaderTransactionDate = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state?.auth?.user);

  const [stopFetch, setStopFetch] = useState(false);

  const { data: eodHistoryData } = useEodHistoryQuery(
    {},
    {
      onSuccess: async (res) => {
        if (res?.endOfDay?.history?.[0]?.status !== 'ONGOING') {
          setStopFetch(true);
        }
      },
      refetchInterval: stopFetch ? false : 2000,
    }
  );

  const { data: endOfDayData, refetch: refetchEndOfDay } = useGetEndOfDayDateDataQuery();

  const { closingDate, hasEodErrors, isHeadOfficeReady } = useMemo(
    () => ({
      closingDate: endOfDayData?.transaction?.endOfDayDate?.value,
      hasEodErrors: endOfDayData?.transaction?.endOfDayDate?.hasErrors,
      isHeadOfficeReady: endOfDayData?.transaction?.endOfDayDate?.headOfficeReady,
    }),
    [endOfDayData]
  );

  const { mutateAsync: closeDay } = useSetEndOfDayDataMutation();

  const closeDayFxn = () => {
    closeDay({});

    refetchEndOfDay();

    router.push(ROUTES.DAY_CLOSE);
  };

  const handleBranchReadiness = () => {
    router.push(ROUTES.BRANCH_READINESS);
    refetchEndOfDay();
  };

  const reinitiateCloseDay = () => {
    closeDay({ option: EodOption.Reinitiate });

    refetchEndOfDay();

    router.push(ROUTES.DAY_CLOSE);
  };

  const ignoreAndCloseDay = () => {
    closeDay({ option: EodOption.CompleteWithError });

    refetchEndOfDay();

    router.push(ROUTES.DAY_CLOSE);
  };

  return (
    <Popover placement="bottom-end" arrowPadding={0} gutter={3}>
      {({ isOpen }) => (
        <>
          <PopoverTrigger>
            <Box
              as="button"
              bg={isOpen ? 'secondary.900' : 'secondary.700'}
              _hover={{ backgroundColor: 'secondary.900' }}
              px="s12"
              py="s10"
              borderRadius="br1"
            >
              <Text p="s10 s12" fontSize="s3" fontWeight="500" color="gray.0">
                Date: {localizedDate(closingDate)}
              </Text>
            </Box>
          </PopoverTrigger>
          <Box zIndex={15}>
            <PopoverContent
              bg="gray.0"
              w="490px"
              border="none"
              boxShadow="0px 0px 2px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.1)"
              outline="none"
              _focus={{
                boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              <PopoverBody p="0">
                <Box display="flex" gap="s16" p="s8">
                  <Box display="flex" flexDirection="column" gap="s16" w="200px">
                    <Box display="flex" flexDirection="column" gap="s16">
                      <Box display="flex" flexDirection="column">
                        <Text fontSize="s3" fontWeight="500" color="gray.700">
                          Transaction Date
                        </Text>
                        <Text fontSize="s3" fontWeight="500" color="gray.800">
                          {localizedDate(closingDate)}
                        </Text>
                      </Box>

                      <Box display="flex" flexDirection="column">
                        <Text fontSize="s3" fontWeight="500" color="gray.700">
                          Calender Date
                        </Text>
                        <Text fontSize="s3" fontWeight="500" color="gray.800">
                          {getLocalizedTodaysDate()}
                        </Text>
                      </Box>
                    </Box>
                    <Box display="flex" flexDirection="column" gap="s8">
                      {user?.currentBranch?.category === BranchCategory.HeadOffice ? (
                        hasEodErrors ? (
                          <>
                            <Button
                              variant="outline"
                              display="flex"
                              justifyContent="center"
                              w="100%"
                              onClick={reinitiateCloseDay}
                            >
                              Reinitiate
                            </Button>
                            <Button
                              variant="solid"
                              display="flex"
                              justifyContent="center"
                              w="100%"
                              onClick={ignoreAndCloseDay}
                            >
                              Ignore and Close Day
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              variant="outline"
                              display="flex"
                              justifyContent="center"
                              w="100%"
                              onClick={handleBranchReadiness}
                            >
                              Branch Readiness
                            </Button>
                            {isHeadOfficeReady && (
                              <Button
                                variant="solid"
                                display="flex"
                                justifyContent="center"
                                w="100%"
                                // onClick={() => router.push(ROUTES.DAY_CLOSE)}
                                onClick={closeDayFxn}
                              >
                                Close Day
                              </Button>
                            )}
                          </>
                        )
                      ) : (
                        <Button
                          variant="solid"
                          display="flex"
                          justifyContent="center"
                          w="100%"
                          onClick={handleBranchReadiness}
                        >
                          Branch Readiness
                        </Button>
                      )}
                    </Box>
                  </Box>

                  <Box bg="highlight.500" p="s8" w="100%">
                    <Box display="flex" flexDirection="column" gap="s16">
                      <Text fontSize="s3" fontWeight={500} color="gray.500" pl="s12">
                        Day End
                      </Text>

                      <Box display="flex" flexDirection="column">
                        {eodHistoryData?.endOfDay?.history?.slice(0, 2)?.map((eod) => (
                          <Button
                            variant="ghost"
                            shade="neutral"
                            onClick={() => {
                              if (eod?.status === 'ONGOING') {
                                return router.push(ROUTES.DAY_CLOSE);
                              }

                              return router.push(
                                `${ROUTES.SETTINGS_EOD_HISTORY_DETAILS}?id=${eod?.eodDate}`
                              );
                            }}
                          >
                            <Box display="flex" justifyContent="space-between" width="100%">
                              <Box display="flex" alignItems="center" gap="s10">
                                {eodStatusIcon(eod?.status, eod?.errorCount)}
                                <Text fontSize="s3" fontWeight={500} color="gray.800">
                                  {format(new Date(eod?.eodDate ?? ''), 'dd MMMM')}
                                </Text>
                              </Box>

                              {eod?.errorCount ? (
                                <Chips
                                  variant="solid"
                                  theme="danger"
                                  size="sm"
                                  type="status"
                                  label={`${eod.errorCount} Errors`}
                                />
                              ) : null}
                            </Box>
                          </Button>
                        ))}
                      </Box>

                      <Box display="flex" alignItems="flex-end">
                        <Button
                          rightIcon={<Icon as={BiLinkExternal} size="sm" />}
                          variant="ghost"
                          shade="neutral"
                          onClick={() => router?.push(ROUTES.SETTINGS_EOD_HISTORY)}
                        >
                          View All EOD History
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Box>
        </>
      )}
    </Popover>
  );
};
