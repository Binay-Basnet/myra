import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import { omit } from 'lodash';

import {
  asyncToast,
  Box,
  Container,
  FormHeader,
  FormSection,
  Grid,
  GridItem,
  ShareMemberCard,
} from '@myra-ui';

import {
  CashValue,
  Share_Transaction_Direction,
  SharePaymentMode,
  ShareReturnInput,
  useAddShareReturnMutation,
  useGetIndividualMemberDetails,
  useGetShareChargesQuery,
  useGetShareHistoryQuery,
} from '@coop/cbs/data-access';
import { FormMemberSelect } from '@coop/shared/form';
import { featureCode, useTranslation } from '@coop/shared/utils';

import { ShareInfoFooter } from './ShareInfoFooter';
import { SharePaymentFooter } from './SharePaymentFooter';
import { ShareReturnInfo } from './ShareReturnInfo';
import { ShareReturnPayment } from './ShareReturnPayment';

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
};

type ShareReturnFormType = Omit<ShareReturnInput, 'selectAllShares' | 'fileUpload'> & {
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

export const ShareReturnForm = () => {
  const { t } = useTranslation();
  const methods = useForm<ShareReturnFormType>({
    mode: 'onChange',
    defaultValues: {
      paymentMode: SharePaymentMode.Cash,
      cash: {
        disableDenomination: true,
      },
    },
  });
  const { watch, getValues, reset } = methods;

  const router = useRouter();
  const queryClient = useQueryClient();
  const redirectPath = router.query['redirect'];
  const redirectMemberId = router.query['memberId'];

  const { mutateAsync } = useAddShareReturnMutation();

  const memberId = watch('memberId');
  const noOfShares = watch('noOfReturnedShares');
  const allShares = watch('selectAllShares');
  const denominations = watch('cash.denominations');
  const cashPaid = watch('cash.cashPaid');
  const disableDenomination = watch('cash.disableDenomination');
  const extraFee = watch('extraFee');
  const paymentModes = watch('paymentMode');

  const [totalAmount, setTotalAmount] = useState(0);
  const [mode, setMode] = useState('shareInfo');

  const { data: chargesData, isLoading } = useGetShareChargesQuery(
    {
      transactionType: Share_Transaction_Direction?.Return,
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

  const { data: shareHistoryTableData } = useGetShareHistoryQuery(
    {
      memberId,
    },
    {
      staleTime: 0,
      enabled: !!memberId,
    }
  );

  const balanceData = shareHistoryTableData?.share?.history?.balance;

  const paymentButtonHandler = () => memberId && setMode('sharePayment');

  const previousButtonHandler = () => setMode('shareInfo');

  const handleSubmit = () => {
    const values = getValues();
    let updatedValues: ShareReturnInput = {
      ...omit(values, ['selectAllShares', 'accountAmount']),
      totalAmount: totalAmount.toString(),
      noOfReturnedShares: Number(values['noOfReturnedShares']),
      extraFee: chargeList !== null ? values?.extraFee : null,
      memberId,
    };

    if (values['paymentMode'] === SharePaymentMode.Cash) {
      updatedValues = omit({ ...updatedValues }, ['account', 'bankCheque']);
      updatedValues['cash'] = {
        ...values['cash'],
        cashPaid: values['cash']?.cashPaid as string,
        disableDenomination: Boolean(values['cash']?.disableDenomination),
        total: String(totalCashPaid),
        returned_amount: String(returnAmount),
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
    }

    if (values['paymentMode'] === SharePaymentMode?.Account) {
      updatedValues = omit({ ...updatedValues }, ['bankCheque', 'cash']);
    }

    asyncToast({
      id: 'share-return-id',
      msgs: {
        success: 'Share Returned',
        loading: 'Returning Share',
      },
      onSuccess: () => {
        if (redirectPath) {
          queryClient.invalidateQueries(['getMemberInactiveCheck']);
          router.push(String(redirectPath));
        } else {
          router.push('/share/register');
        }
      },
      promise: mutateAsync({ data: updatedValues }),
    });
  };

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
  }, [allShares, balanceData, getValues, reset]);

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

      setTotalAmount(noOfShares * 100 - temp);
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
            <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
              <FormHeader
                title={`${t['shareLayoutShareReturnAdd']} - ${featureCode?.newShareReturn}`}
              />
            </Box>

            <Grid templateColumns="repeat(6,1fr)">
              {mode === 'shareInfo' && (
                <GridItem colSpan={memberDetailData ? 4 : 6}>
                  <Box
                    mb="50px"
                    width="100%"
                    h="100%"
                    background="gray.0"
                    minH="calc(100vh - 170px)"
                    borderRight="1px solid"
                    borderColor="border.layout"
                  >
                    <Box w="100%">
                      <FormSection>
                        <GridItem colSpan={2}>
                          <FormMemberSelect
                            allMembers={false}
                            name="memberId"
                            label={t['sharePurchaseSelectMember']}
                          />
                        </GridItem>
                      </FormSection>

                      {memberDetailData && <ShareReturnInfo totalAmount={totalAmount} />}
                    </Box>
                  </Box>
                </GridItem>
              )}

              {mode === 'sharePayment' && (
                <GridItem colSpan={memberDetailData ? 4 : 6}>
                  <ShareReturnPayment
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
                    memberId={memberId}
                    totalAmount={totalAmount}
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
                disableButton={noOfShares}
                totalAmount={totalAmount}
                paymentButtonHandler={paymentButtonHandler}
              />
            )}
            {mode === 'sharePayment' && (
              <SharePaymentFooter
                previousButtonHandler={previousButtonHandler}
                handleSubmit={handleSubmit}
                isDisabled={
                  paymentModes === SharePaymentMode.Cash && !disableDenomination
                    ? !(Number(returnAmount) >= 0) || !(Number(cashPaid) >= Number(totalAmount))
                    : false
                }
              />
            )}
          </Container>
        </Box>
      </Box>
    </>
  );
};
