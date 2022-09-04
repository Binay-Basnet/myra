import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IoChevronBackOutline } from 'react-icons/io5';

import { Member, useGetMemberIndividualDataQuery } from '@coop/cbs/data-access';
import { FieldCardComponents } from '@coop/shared/components';
import { FormInput } from '@coop/shared/form';
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

import SharePurchasePayment from './SharePurchasePayment';

const Header = () => {
  return (
    <>
      <Navbar />
      <TabMenu />
    </>
  );
};

const SharePurchaseForm = () => {
  const { t } = useTranslation();
  const methods = useForm();
  const { watch } = methods;

  const memberId = watch('memberId');
  const noOfShares = watch('shareCount');
  const printingFee = watch('printingFee');
  const adminFee = watch('adminFee');

  const [totalAmount, setTotalAmount] = useState(0);
  const [mode, setMode] = useState('0');

  const { data } = useGetMemberIndividualDataQuery(
    {
      id: memberId,
    },
    {
      staleTime: 0,
    }
  );

  const memberDetail = data && data?.members?.details?.data;

  useEffect(() => {
    setTotalAmount(
      noOfShares * 100 + Number(adminFee ?? 0) + Number(printingFee ?? 0)
    );
  }, [noOfShares, adminFee, printingFee]);

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
  //     ...omit(values, ['printingFee', 'adminFee']),
  //     extraFee: [
  //       {
  //         name: 'adminFee',
  //         value: adminFee,
  //       },
  //       {
  //         name: 'printFee',
  //         value: printingFee,
  //       },
  //     ],
  //     totalAmount: totalAmount.toString(),
  //     shareCount: Number(values['shareCount']),
  //     memberId,
  //   };

  //   asyncToast({
  //     id: 'share-purchase-id',
  //     msgs: {
  //       success: 'Share Purchased',
  //       loading: 'Purchasing Share',
  //     },
  //     onSuccess: () => router.push('/share/register'),
  //     promise: mutateAsync({ data: updatedValues }),
  //   });
  // };

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
              <FormHeader title={t['sharePurchaseNewShareIssue']} />
            </Box>
            <Grid templateColumns="repeat(6,1fr)">
              <GridItem
                display={mode === '0' ? null : 'none'}
                colSpan={data ? 4 : 6}
              >
                <Box
                  mb="50px"
                  display="flex"
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

                    {data && (
                      <Box
                        display="flex"
                        flexDirection="column"
                        pb="s24"
                        background="white"
                        borderTopRadius={5}
                      >
                        <FormSection header="sharePurchaseShareInformation">
                          <GridItem colSpan={3}>
                            <FormInput
                              type={'number'}
                              textAlign="right"
                              id="noOfShares"
                              name="shareCount"
                              max={10}
                              label={t['sharePurchaseNoOfShares']}
                              __placeholder="0"
                            />
                          </GridItem>

                          <GridItem colSpan={3}>
                            {noOfShares ? (
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
                                    {t['sharePurchaseShareAmount']}
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
                                >
                                  <Text
                                    color="neutralLightColor.Gray-60"
                                    fontWeight="Medium"
                                    fontSize="s3"
                                    display="flex"
                                    alignItems="center"
                                  >
                                    {t['sharePurchaseAdministrationFees']}
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
                                    {t['sharePurchasePrintingFees']}
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
                                    fontWeight="SemiBold"
                                    fontSize="s3"
                                  >
                                    {t['sharePurchaseTotalAmount']}
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
                            ) : null}
                          </GridItem>
                        </FormSection>
                      </Box>
                    )}
                  </Box>
                </Box>
              </GridItem>

              <GridItem
                display={mode === '1' ? null : 'none'}
                colSpan={data ? 4 : 6}
              >
                <SharePurchasePayment />
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

export default SharePurchaseForm;
