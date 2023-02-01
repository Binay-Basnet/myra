import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import { omit } from 'lodash';

import {
  Box,
  Button,
  Container,
  FormFooter,
  FormHeader,
  FormSection,
  Grid,
  GridItem,
  ResponseDialog,
  ShareMemberCard,
  Text,
} from '@myra-ui';

import {
  CashValue,
  Share_Transaction_Direction,
  SharePaymentMode,
  SharePurchaseInput,
  ShareVoucherDepositedBy,
  useAddSharePurchaseMutation,
  useGetIndividualMemberDetails,
  useGetSettingsShareGeneralDataQuery,
  useGetShareChargesQuery,
} from '@coop/cbs/data-access';
import { localizedDate, localizedTime, ROUTES } from '@coop/cbs/utils';
import { FormMemberSelect } from '@coop/shared/form';
import {
  amountConverter,
  featureCode,
  quantityConverter,
  useTranslation,
} from '@coop/shared/utils';

import { ShareInfoFooter } from './ShareInfoFooter';
import { SharePurchaseInfo } from './SharePurchaseInfo';
import { SharePurchasePayment } from './SharePurchasePayment';

const cashOptions: Record<string, string> = {
  '1000': CashValue.Cash_1000,
  '500': CashValue.Cash_500,
  '100': CashValue.Cash_100,
  '50': CashValue.Cash_50,
  '25': CashValue.Cash_25,
  '20': CashValue.Cash_20,
  '10': CashValue.Cash_10,
  '5': CashValue.Cash_5,
  '2': CashValue.Cash_2,
  '1': CashValue.Cash_1,
  PAISA: CashValue.Paisa,
};

type ShareReturnFormType = Omit<SharePurchaseInput, 'selectAllShares'> & {
  selectAllShares: boolean;
  cash?:
    | {
        cashPaid: string;
        disableDenomination: boolean;
        total: string;
        returned_amount: string;
        denominations: { value?: string; quantity?: number; amount?: string }[];
      }
    | undefined
    | null;
};

export const SharePurchaseForm = () => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const [totalAmount, setTotalAmount] = useState(0);
  const [mode, setMode] = useState('shareInfo');

  const methods = useForm<ShareReturnFormType>({
    mode: 'onChange',
    defaultValues: {
      paymentMode: SharePaymentMode.Cash,
      bankVoucher: {
        depositedBy: ShareVoucherDepositedBy.Self,
      },
      cash: {
        disableDenomination: true,
      },
    },
  });
  const { watch, getValues } = methods;

  const router = useRouter();
  const redirectPath = router.query['redirect'];
  const redirectMemberId = router.query['memberId'];

  const memberId = watch('memberId');
  const noOfShares = watch('shareCount');
  const denominations = watch('cash.denominations');
  const cashPaid = watch('cash.cashPaid');
  const extraFee = watch('extraFee');
  const paymentModes = watch('paymentMode');
  const disableDenomination = watch('cash.disableDenomination');
  const bankSelected = watch('bankVoucher.bankId');
  const accountSelected = watch('account.accountId');
  const bankVoucherDateSelected = watch('bankVoucher.depositedDate');

  const { data: chargesData, isLoading } = useGetShareChargesQuery(
    {
      transactionType: Share_Transaction_Direction?.Purchase,
      shareCount: noOfShares,
    },
    { enabled: !!noOfShares }
  );

  const chargeList = chargesData?.share?.charges;

  const denominationTotal =
    denominations?.reduce(
      (accumulator: number, curr: { amount?: string }) => accumulator + Number(curr.amount),
      0 as number
    ) ?? 0;

  const totalCashPaid: number = disableDenomination ? Number(cashPaid) : Number(denominationTotal);

  const returnAmount = totalCashPaid - totalAmount;

  const { memberDetailData } = useGetIndividualMemberDetails({ memberId });
  const { data: shareData } = useGetSettingsShareGeneralDataQuery();
  const multiplicityFactor = shareData?.settings?.general?.share?.general?.multiplicityFactor;

  const isMultiple = Number(noOfShares) % Number(multiplicityFactor) === 0;

  const { mutateAsync } = useAddSharePurchaseMutation();

  const paymentButtonHandler = () => memberId && setMode('sharePayment');

  const previousButtonHandler = () => setMode('shareInfo');

  const disableSubmitButtonFxn = (paymentMode: SharePaymentMode) => {
    if (paymentMode === SharePaymentMode.Cash && !disableDenomination) {
      return !(Number(returnAmount) >= 0) || !(Number(cashPaid) >= Number(totalAmount));
    }
    if (
      (paymentModes === SharePaymentMode.BankVoucherOrCheque && bankSelected === undefined) ||
      (paymentModes === SharePaymentMode.BankVoucherOrCheque &&
        bankVoucherDateSelected === undefined)
    ) {
      return true;
    }
    if (paymentMode === SharePaymentMode.Account && accountSelected === undefined) {
      return true;
    }
    return false;
  };

  const handleSubmit = () => {
    const values = getValues();

    let updatedValues: SharePurchaseInput = {
      ...omit(values, ['amount', 'accountAmount', 'accountId']),
      totalAmount: totalAmount.toString(),
      shareCount: Number(values['shareCount']),
      extraFee: chargeList !== null ? values?.extraFee : null,
      memberId,
    };

    if (values['paymentMode'] === SharePaymentMode.Cash) {
      updatedValues = omit({ ...updatedValues }, ['account', 'bankVoucher']);
      updatedValues['cash'] = {
        ...values['cash'],
        cashPaid: values['cash']?.cashPaid as string,
        disableDenomination: Boolean(values['cash']?.disableDenomination),
        total: String(totalCashPaid),
        returned_amount: String(returnAmount),
        fileUpload: values['cash']?.fileUpload?.length > 0 ? values['cash']?.fileUpload[0] : null,
        denominations:
          values['cash']?.denominations?.map(
            ({ value, quantity }: { value: string; quantity: number }) => ({
              value: cashOptions[value as string] as CashValue,
              quantity,
            })
          ) ?? [],
      };
    }

    if (values['paymentMode'] === SharePaymentMode?.BankVoucherOrCheque) {
      updatedValues = omit({ ...updatedValues }, ['account', 'cash']);
      updatedValues['bankVoucher'] = {
        ...values['bankVoucher'],
        citizenshipDocument:
          values['bankVoucher']?.citizenshipDocument?.length > 0
            ? values['bankVoucher']?.citizenshipDocument[0]
            : null,
        fileUpload:
          values['bankVoucher']?.fileUpload?.length > 0
            ? values['bankVoucher']?.fileUpload[0]
            : null,
      };
    }

    if (values['paymentMode'] === SharePaymentMode?.Account) {
      updatedValues = omit({ ...updatedValues }, ['bankVoucher', 'cash']);
    }

    // asyncToast({
    //   id: 'share-purchase-id',
    //   msgs: {
    //     success: 'Share Purchased',
    //     loading: 'Purchasing Share',
    //   },
    //   onSuccess: () => {
    //     if (redirectPath) {
    //       queryClient.invalidateQueries(['getMemberCheck']);
    //       router.push(String(redirectPath));
    //     } else {
    //       router.push('/share/register');
    //     }
    //   },
    //   promise: mutateAsync({ data: updatedValues }),
    // });

    return updatedValues as SharePurchaseInput;
  };

  useEffect(() => {
    let temp = 0;
    if (chargeList) {
      if (extraFee) {
        extraFee?.forEach((charge) => {
          temp += Number(charge?.value);
        });
      } else {
        chargeList?.forEach((charge) => {
          temp += Number(charge?.charge);
        });
      }
      setTotalAmount(temp + noOfShares * 100);
    } else {
      setTotalAmount(noOfShares * 100);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, extraFee, noOfShares, JSON.stringify(chargeList), JSON.stringify(extraFee)]);

  useEffect(() => {
    if (redirectMemberId) {
      methods.setValue('memberId', String(redirectMemberId));
    }
  }, [redirectMemberId]);

  return (
    <>
      <FormProvider {...methods}>
        <form>
          <Container minW="container.xl" p="0" mb="60px">
            <Box position="sticky" top="0" bg="gray.100" width="100%" zIndex="10">
              <FormHeader
                title={`${t['sharePurchaseNewShareIssue']} - ${featureCode?.newShareIssue}`}
              />
            </Box>
            <Grid templateColumns="repeat(6,1fr)">
              {mode === 'shareInfo' && (
                <GridItem colSpan={memberDetailData ? 4 : 6}>
                  <Box
                    mb="50px"
                    display="flex"
                    width="100%"
                    h="100%"
                    background="gray.0"
                    minH="calc(100vh - 170px)"
                    borderRight="1px solid"
                    borderColor="border.layout"
                  >
                    <Box w="100%">
                      <FormSection>
                        <GridItem colSpan={3}>
                          <FormMemberSelect
                            allMembers={
                              redirectPath && redirectPath.includes('/members/activation/')
                            }
                            name="memberId"
                            label={t['sharePurchaseSelectMember']}
                            isDisabled={!!redirectMemberId}
                          />
                        </GridItem>
                      </FormSection>

                      {memberDetailData && <SharePurchaseInfo totalAmount={totalAmount} />}
                    </Box>
                  </Box>
                </GridItem>
              )}

              {mode === 'sharePayment' && (
                <GridItem colSpan={memberDetailData ? 4 : 6}>
                  <SharePurchasePayment
                    totalAmount={totalAmount}
                    denominationTotal={denominationTotal}
                    totalCashPaid={totalCashPaid}
                    returnAmount={returnAmount}
                  />
                </GridItem>
              )}

              <GridItem colSpan={memberDetailData ? 2 : 0}>
                {memberDetailData && (
                  <ShareMemberCard
                    mode={mode}
                    totalAmount={totalAmount}
                    memberId={memberId}
                    memberDetailData={memberDetailData}
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
            {mode === 'shareInfo' && (
              <ShareInfoFooter
                disableButton={noOfShares && isMultiple}
                totalAmount={totalAmount}
                paymentButtonHandler={paymentButtonHandler}
              />
            )}
            {mode === 'sharePayment' && (
              // <SharePaymentFooter
              //   previousButtonHandler={previousButtonHandler}
              //   handleSubmit={handleSubmit}
              //   isDisabled={disableSubmitButtonFxn(paymentModes)}
              // />
              <FormFooter
                mainButton={
                  <ResponseDialog
                    onSuccess={() => {
                      if (redirectPath) {
                        queryClient.invalidateQueries(['getMemberCheck']);
                        router.push(String(redirectPath));
                      } else {
                        router.push(ROUTES.CBS_SHARE_REGISTER);
                      }
                    }}
                    promise={() => mutateAsync({ data: handleSubmit() })}
                    successCardProps={(response) => {
                      const result = response?.share?.purchase?.record;
                      const sum = result?.extraFee?.reduce((a, b) => a + Number(b?.value ?? 0), 0);
                      const totalAmountShare = Number(sum ?? 0) + Number(result?.shareAmount ?? 0);
                      const temp: Record<string, string> = {};

                      result?.extraFee?.forEach((fee) => {
                        if (fee?.name && fee?.value) {
                          temp[String(fee.name)] = String(fee.value);
                        }
                      });
                      return {
                        type: 'Share Issue',
                        total: amountConverter(totalAmountShare || 0) as string,
                        title: 'Share Issue Successful',
                        details: {
                          'Transaction Id': (
                            <Text fontSize="s3" color="primary.500" fontWeight="600">
                              {result?.transactionId}
                            </Text>
                          ),
                          Date: localizedDate(result?.transactionDate),
                          'Transaction Time': localizedTime(result?.createdAt),
                          'No of Shares ': quantityConverter(result?.noOfShare || 0),
                          'Share Amount': amountConverter(result?.shareAmount || 0) as string,

                          'Payment Mode': result?.paymentMode,
                          ...temp,
                        },
                        subTitle:
                          'Share issued successfully. Details of the transaction is listed below.',
                        meta: {
                          memberId: result?.member?.code,
                          member: result?.member?.name?.local,
                        },
                      };
                    }}
                    errorCardProps={{
                      title: 'Share Issue Failed',
                    }}
                  >
                    <Button width="160px" isDisabled={disableSubmitButtonFxn(paymentModes)}>
                      {t['shareConfirmPayment']}
                    </Button>
                  </ResponseDialog>
                }
                status={
                  <Button
                    variant="outline"
                    leftIcon={<IoChevronBackOutline />}
                    onClick={previousButtonHandler}
                  >
                    {t['previous']}
                  </Button>
                }
                mainButtonHandler={handleSubmit}
                // isMainButtonDisabled={disableSubmitButtonFxn(paymentModes)}
              />
            )}
          </Container>
        </Box>
      </Box>
    </>
  );
};
