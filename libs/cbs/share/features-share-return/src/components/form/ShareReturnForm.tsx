import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IoChevronBackOutline } from 'react-icons/io5';

import {
  Member,
  useGetMemberIndividualDataQuery,
  useGetShareHistoryQuery,
} from '@coop/cbs/data-access';
import { FieldCardComponents } from '@coop/shared/components';
import { FormCheckbox, FormInput } from '@coop/shared/form';
import {
  Box,
  Button,
  Container,
  FormFooter,
  FormHeader,
  FormMemberSelect,
  FormSection,
  Grid,
  GridItem,
  Navbar,
  ShareMemberCard,
  TabMenu,
  Text,
} from '@coop/shared/ui';
import { amountConverter, useTranslation } from '@coop/shared/utils';

import ShareReturnPayment from './ShareReturnPayment';

// TODO! use Layout
const Header = () => {
  return (
    <>
      <Navbar />
      <TabMenu />
    </>
  );
};

const ShareReturnForm = () => {
  const { t } = useTranslation();
  const methods = useForm();
  const { watch, getValues, reset } = methods;

  // const { mutateAsync } = useAddShareReturnMutation();

  const memberId = watch('memberId');
  const noOfShares = watch('noOfReturnedShares');
  const allShares = watch('selectAllShares');
  const printingFees = watch('printingFee');
  const adminFees = watch('adminFee');

  const [totalAmount, setTotalAmount] = useState(0);
  const [mode, setMode] = useState('0');

  const { data } = useGetMemberIndividualDataQuery({ id: memberId });

  const memberDetail = data && data?.members?.details?.data;
  // const memberProfile = memberDetail?.profile as KymIndFormStateQuery;

  useEffect(() => {
    setTotalAmount(
      noOfShares * 100 - (Number(adminFees ?? 0) + Number(printingFees ?? 0))
    );
  }, [noOfShares, adminFees, printingFees]);

  const { data: shareHistoryTableData } = useGetShareHistoryQuery({
    memberId,
  });

  const balanceData = shareHistoryTableData?.share?.history?.balance;

  const mainButtonHandlermode0 = () => {
    if (memberId) {
      setMode('1');
    }
  };
  const previousButtonHandler = () => {
    setMode('0');
  };

  // const onSubmit = () => {
  //   const values = getValues();
  //   const updatedValues = {
  //     ...omit(values, ['printingFee', 'adminFee', 'selectAllShares']),
  //     extraFee: [
  //       {
  //         name: 'adminFee',
  //         value: adminFees,
  //       },
  //       {
  //         name: 'printFee',
  //         value: printingFees,
  //       },
  //     ],
  //     totalAmount: totalAmount.toString(),
  //     noOfReturnedShares: Number(values['noOfReturnedShares']),
  //     memberId,
  //   };

  //   asyncToast({
  //     id: 'share-return-id',
  //     msgs: {
  //       success: 'Share Returned',
  //       loading: 'Returning Share',
  //     },
  //     onSuccess: () => router.push('/share/register'),
  //     promise: mutateAsync({ data: updatedValues }),
  //   });
  // };

  useEffect(() => {
    if (balanceData) {
      if (allShares) {
        reset({
          ...getValues(),
          noOfReturnedShares: balanceData?.count ?? 0,
        });
      } else {
        reset({
          ...getValues(),
          noOfReturnedShares: 0,
        });
      }
    }
  }, [allShares, balanceData, getValues, memberDetail, methods, reset]);

  return (
    <>
      <FormProvider {...methods}>
        <form>
          <Box
            position="fixed"
            width="100%"
            top={0}
            zIndex={2}
            backdropFilter="saturate(180%) blur(5px)"
          >
            <Header />
          </Box>
          <Container minW="container.xl" p="0" mb="60px">
            <Box
              position="sticky"
              top="110px"
              bg="gray.100"
              width="100%"
              zIndex="10"
            >
              <FormHeader title={t['shareReturnNewShareReturn']} />
            </Box>

            <Grid templateColumns="repeat(6,1fr)">
              <GridItem
                display={mode === '0' ? 'flex' : 'none'}
                colSpan={data ? 4 : 6}
              >
                <Box
                  mb="50px"
                  width="100%"
                  h="100%"
                  background="gray.0"
                  minH="calc(100vh - 170px)"
                  border="1px solid"
                  borderColor="border.layout"
                >
                  <Box w="100%">
                    <FormSection>
                      <GridItem colSpan={2}>
                        <FormMemberSelect
                          name="memberId"
                          label={t['sharePurchaseSelectMember']}
                        />
                      </GridItem>
                    </FormSection>

                    {memberDetail && (
                      <Box
                        display="flex"
                        flexDirection="column"
                        pb="28px"
                        background="gray.0"
                      >
                        <FormSection header="shareReturnShareInformation">
                          <GridItem colSpan={3}>
                            <FormInput
                              type="text"
                              id="noOfShares"
                              name="noOfReturnedShares"
                              label={t['shareReturnNoOfShares']}
                              isDisabled={allShares}
                            />
                          </GridItem>
                          <GridItem colSpan={3}>
                            <FormCheckbox
                              name="selectAllShares"
                              label={t['shareReturnSelectAllShares']}
                            />
                          </GridItem>

                          {noOfShares ? (
                            <GridItem colSpan={3}>
                              <Box
                                display="flex"
                                borderRadius="br2"
                                gap="s60"
                                p="s16"
                                bg="background.500"
                              >
                                <Box>
                                  <Text fontWeight="400" fontSize="s2">
                                    {t['shareReturnRemainingShare']}
                                  </Text>
                                  <Text fontWeight="600" fontSize="r1">
                                    {balanceData
                                      ? allShares
                                        ? 0
                                        : Number(balanceData?.count) -
                                          Number(noOfShares)
                                      : 0}
                                  </Text>
                                </Box>

                                <Box>
                                  <Text fontWeight="400" fontSize="s2">
                                    {t['shareReturnRemainingShareValue']}
                                  </Text>
                                  <Text fontWeight="600" fontSize="r1">
                                    {balanceData
                                      ? allShares
                                        ? 0
                                        : (Number(balanceData?.count) -
                                            Number(noOfShares)) *
                                          100
                                      : 0}
                                  </Text>
                                </Box>
                              </Box>
                            </GridItem>
                          ) : null}

                          {noOfShares ? (
                            <GridItem colSpan={3}>
                              <FieldCardComponents rows={'repeat(4,1fr)'}>
                                <GridItem
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems="center"
                                >
                                  <Text
                                    color="neutralLightColor.Gray-60"
                                    fontWeight="Medium"
                                    fontSize="s3"
                                  >
                                    {t['shareReturnWithdrawAmount']}
                                  </Text>

                                  <Box p="s12">
                                    <Text
                                      color="neutralLightColor.Gray-80"
                                      fontWeight="SemiBold"
                                      fontSize="r1"
                                    >
                                      {amountConverter(noOfShares * 100)}
                                    </Text>
                                  </Box>
                                </GridItem>

                                <GridItem
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems="center"
                                >
                                  <Text
                                    color="neutralLightColor.Gray-60"
                                    fontWeight="Medium"
                                    fontSize="s3"
                                  >
                                    {t['shareReturnAdministrationFees']}
                                  </Text>
                                  <Box width="300px">
                                    <FormInput
                                      name="adminFee"
                                      type="number"
                                      textAlign={'right'}
                                      __placeholder="0.00"
                                    />
                                  </Box>
                                </GridItem>

                                {/* todo */}
                                <GridItem
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems="center"
                                >
                                  <Text
                                    color="neutralLightColor.Gray-60"
                                    fontWeight="Medium"
                                    fontSize="s3"
                                  >
                                    {t['shareReturnPrintingFees']}
                                  </Text>
                                  <Box width="300px">
                                    <FormInput
                                      name="printingFee"
                                      type="number"
                                      textAlign={'right'}
                                      __placeholder="0.00"
                                    />
                                  </Box>
                                </GridItem>

                                <GridItem
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems="center"
                                >
                                  <Text
                                    color="neutralLightColor.Gray-80"
                                    fontWeight="600"
                                    fontSize="s3"
                                  >
                                    {t['shareReturnTotalAmount']}
                                  </Text>

                                  <Box p="s12">
                                    <Text
                                      color="neutralLightColor.Gray-80"
                                      fontWeight="SemiBold"
                                      fontSize="r1"
                                    >
                                      {t['rs']} {amountConverter(totalAmount)}
                                    </Text>
                                  </Box>
                                </GridItem>
                              </FieldCardComponents>
                            </GridItem>
                          ) : null}
                        </FormSection>
                      </Box>
                    )}
                  </Box>
                </Box>
              </GridItem>

              <GridItem
                display={mode === '1' ? 'flex' : 'none'}
                colSpan={data ? 4 : 6}
              >
                <ShareReturnPayment />
              </GridItem>
              <GridItem colSpan={data ? 2 : 0}>
                {data && (
                  <ShareMemberCard
                    totalAmount={totalAmount}
                    memberDetails={memberDetail as Member}
                  />
                )}
              </GridItem>
            </Grid>
          </Container>
        </form>
      </FormProvider>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.xl" height="fit-content" p="0">
            {mode === '0' && (
              <FormFooter
                status={
                  <Box display="flex" gap="s8">
                    <Text
                      color="neutralColorLight.Gray-60"
                      fontWeight="Regular"
                      as="i"
                      fontSize="r1"
                    >
                      Form details saved to draft 09:41 AM
                    </Text>
                  </Box>
                }
                mainButtonLabel={t['proceedToPayment']}
                mainButtonHandler={mainButtonHandlermode0}
              />
            )}
            {mode === '1' && (
              <FormFooter
                status={
                  <Button
                    variant="outline"
                    leftIcon={<IoChevronBackOutline />}
                    onClick={previousButtonHandler}
                  >
                    {t['previous']}
                  </Button>
                }
                mainButtonLabel={t['proceedToPayment']}
                // mainButtonHandler={handleSubmit}
              />
            )}
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default ShareReturnForm;
