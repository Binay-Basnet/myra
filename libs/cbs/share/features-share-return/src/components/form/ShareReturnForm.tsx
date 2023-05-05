import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import { omit } from 'lodash';

import {
  Box,
  Button,
  FormSection,
  GridItem,
  ResponseDialog,
  ShareMemberCard,
  Text,
} from '@myra-ui';

import {
  CashValue,
  Share_Transaction_Direction,
  SharePaymentMode,
  ShareReturnInput,
  useAddShareReturnMutation,
  useGetIndividualMemberDetails,
  useGetSettingsShareGeneralDataQuery,
  useGetShareChargesQuery,
  useGetShareHistoryQuery,
} from '@coop/cbs/data-access';
import { localizedDate, localizedTime, ROUTES } from '@coop/cbs/utils';
import { FormLayout, FormMemberSelect } from '@coop/shared/form';
import {
  amountConverter,
  featureCode,
  quantityConverter,
  useTranslation,
} from '@coop/shared/utils';

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
  PAISA: CashValue.Paisa,
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
  const bankSelected = watch('bankCheque.bankId');
  const accountSelected = watch('account.accountId');

  const [totalAmount, setTotalAmount] = useState(0);
  const [mode, setMode] = useState('shareInfo');

  const disableSubmitButtonFxn = (paymentMode: SharePaymentMode | undefined | null) => {
    if (paymentMode === SharePaymentMode.Cash && !disableDenomination) {
      return !(Number(returnAmount) >= 0) || !(Number(cashPaid) >= Number(totalAmount));
    }
    if (paymentMode === SharePaymentMode.BankVoucherOrCheque && bankSelected === undefined) {
      return true;
    }
    if (paymentMode === SharePaymentMode.Account && accountSelected === undefined) {
      return true;
    }
    return false;
  };

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

  const { data: shareData } = useGetSettingsShareGeneralDataQuery();
  const multiplicityFactor = shareData?.settings?.general?.share?.general?.multiplicityFactor;

  const isMultiple = Number(noOfShares) % Number(multiplicityFactor) === 0;

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

    // asyncToast({
    //   id: 'share-return-id',
    //   msgs: {
    //     success: 'Share Returned',
    //     loading: 'Returning Share',
    //   },
    //   onSuccess: () => {
    //     if (redirectPath) {
    //       queryClient.invalidateQueries(['getMemberInactiveCheck']);
    //       router.push(String(redirectPath));
    //     } else {
    //       router.push('/share/register');
    //     }
    //   },
    //   promise: mutateAsync({ data: updatedValues }),
    // });
    return updatedValues as ShareReturnInput;
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
    <FormLayout methods={methods} hasSidebar={!!memberDetailData}>
      <FormLayout.Header
        title={`${t['shareLayoutShareReturnAdd']} - ${featureCode?.newShareReturn}`}
      />

      <FormLayout.Content>
        <FormLayout.Form>
          {mode === 'shareInfo' && (
            <Box
              // mb="3.125rem"
              width="100%"
              h="100%"
              background="gray.0"
              borderRight="1px solid"
              borderColor="border.layout"
            >
              <Box w="100%">
                <FormSection>
                  <GridItem colSpan={3}>
                    <FormMemberSelect
                      allMembers={false}
                      name="memberId"
                      label={t['sharePurchaseSelectMember']}
                      isDisabled={!!redirectMemberId}
                    />
                  </GridItem>
                </FormSection>

                {memberDetailData && <ShareReturnInfo totalAmount={totalAmount} />}
              </Box>
            </Box>
          )}

          {mode === 'sharePayment' && (
            <ShareReturnPayment
              totalAmount={totalAmount}
              denominationTotal={denominationTotal}
              totalCashPaid={totalCashPaid}
              returnAmount={returnAmount}
            />
          )}
        </FormLayout.Form>

        {memberDetailData && (
          <FormLayout.Sidebar>
            <ShareMemberCard
              mode={mode}
              memberId={memberId}
              totalAmount={totalAmount}
              memberDetailData={memberDetailData}
            />
          </FormLayout.Sidebar>
        )}
      </FormLayout.Content>

      {mode === 'shareInfo' && (
        <FormLayout.Footer
          status={
            <Box display="flex" gap="s8">
              <Text color="neutralColorLight.Gray-60" fontWeight="Regular" as="i" fontSize="r1">
                {totalAmount ? (
                  <Text>
                    {t['sharePurchaseTotalAmount']}
                    <Text
                      ml="s32"
                      color="neutralColorLight.Gray-70"
                      fontWeight="SemiBold"
                      as="span"
                    >
                      {amountConverter(totalAmount)}
                    </Text>
                  </Text>
                ) : (
                  ''
                )}
              </Text>
            </Box>
          }
          mainButtonLabel={t['proceedToPayment']}
          mainButtonHandler={paymentButtonHandler}
          isMainButtonDisabled={!(noOfShares && isMultiple)}
        />
      )}

      {mode === 'sharePayment' && (
        <FormLayout.Footer
          mainButton={
            <ResponseDialog
              onSuccess={() => {
                if (redirectPath) {
                  queryClient.invalidateQueries(['getMemberInactiveCheck']);
                  router.push(String(redirectPath));
                } else {
                  router.push(ROUTES.CBS_SHARE_REGISTER);
                }
              }}
              promise={() => mutateAsync({ data: handleSubmit() })}
              successCardProps={(response) => {
                const result = response?.share?.return?.record;

                const sum = result?.extraFee?.reduce((a, b) => a + Number(b?.value ?? 0), 0);
                const totalAmountCard = Number(sum ?? 0) + Number(result?.shareAmount ?? 0);

                const temp: Record<string, string> = {};

                result?.extraFee?.forEach((fee) => {
                  if (fee?.name && fee?.value) {
                    temp[String(fee.name)] = String(fee.value);
                  }
                });

                return {
                  type: 'Share-Return',
                  total: String(amountConverter(totalAmountCard ?? '0')),
                  title: 'Share Return Successful',
                  details: {
                    'Transaction Id': (
                      <Text fontSize="s3" color="primary.500" fontWeight="600">
                        {result?.transactionId}
                      </Text>
                    ),

                    Date: localizedDate(result?.transactionDate),
                    'Transaction Time': localizedTime(result?.createdAt),
                    'No of Shares Returned': quantityConverter(result?.noOfShare || 0),
                    'Withdraw Amount': quantityConverter(result?.shareAmount || 0),
                    'Payment Mode': result?.paymentMode,
                    // ...result?.extraFee?.map((fee) => ({
                    //   [String(fee?.name)]: fee?.value,
                    // })),

                    ...temp,
                  },
                  meta: {
                    memberId: result?.member?.code,
                    member: result?.member?.name?.local,
                  },
                  subTitle:
                    'Share returned successfully. Details of the transaction is listed below.',
                };
              }}
              errorCardProps={{
                title: 'Share Return Failed',
              }}
            >
              <Button width="160px">{t['shareConfirmPayment']}</Button>
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
          isMainButtonDisabled={disableSubmitButtonFxn(paymentModes)}
        />
      )}
    </FormLayout>
  );
};
