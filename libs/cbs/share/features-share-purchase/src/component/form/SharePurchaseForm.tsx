import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { omit } from 'lodash';

import {
  CashValue,
  Share_Transaction_Direction,
  SharePaymentMode,
  SharePurchaseInput,
  ShareVoucherDepositedBy,
  useAddSharePurchaseMutation,
  useGetShareChargesQuery,
} from '@coop/cbs/data-access';
import {
  asyncToast,
  Box,
  Container,
  FormHeader,
  FormMemberSelect,
  FormSection,
  Grid,
  GridItem,
  Navbar,
  ShareMemberCard,
  TabMenu,
} from '@coop/shared/ui';
import { featureCode, useGetIndividualMemberDetails, useTranslation } from '@coop/shared/utils';

import { ShareInfoFooter } from './ShareInfoFooter';
import { SharePaymentFooter } from './SharePaymentFooter';
import { SharePurchaseInfo } from './SharePurchaseInfo';
import { SharePurchasePayment } from './SharePurchasePayment';

const Header = () => (
  <>
    <Navbar />
    <TabMenu />
  </>
);

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

  const [totalAmount, setTotalAmount] = useState(0);
  const [mode, setMode] = useState('shareInfo');

  const methods = useForm<ShareReturnFormType>({
    defaultValues: {
      paymentMode: SharePaymentMode.BankVoucherOrCheque,
      bankVoucher: {
        depositedBy: ShareVoucherDepositedBy.Self,
      },
    },
  });
  const { watch, getValues } = methods;

  const router = useRouter();

  const memberId = watch('memberId');
  const noOfShares = watch('shareCount');
  const denominations = watch('cash.denominations');
  const cashPaid = watch('cash.cashPaid');
  const disableDenomination = watch('cash.disableDenomination');
  const extraFee = watch('extraFee');

  const denominationTotal =
    denominations?.reduce(
      (accumulator: number, curr: { amount?: string }) => accumulator + Number(curr.amount),
      0 as number
    ) ?? 0;

  const totalCashPaid: number = disableDenomination ? Number(cashPaid) : Number(denominationTotal);

  const returnAmount = totalCashPaid - totalAmount;

  const { memberDetailData } = useGetIndividualMemberDetails({ memberId });

  const { mutateAsync } = useAddSharePurchaseMutation();

  const paymentButtonHandler = () => memberId && setMode('sharePayment');

  const previousButtonHandler = () => setMode('shareInfo');

  const handleSubmit = () => {
    const values = getValues();

    let updatedValues: SharePurchaseInput = {
      ...omit(values, ['amount', 'accountAmount', 'accountId']),
      totalAmount: totalAmount.toString(),
      shareCount: Number(values['shareCount']),
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

    asyncToast({
      id: 'share-purchase-id',
      msgs: {
        success: 'Share Purchased',
        loading: 'Purchasing Share',
      },
      onSuccess: () => router.push('/share/register'),
      promise: mutateAsync({ data: updatedValues }),
    });
  };

  const { data: chargesData } = useGetShareChargesQuery(
    {
      transactionType: Share_Transaction_Direction?.Purchase,
      shareCount: noOfShares,
    },
    { enabled: !!noOfShares }
  );

  const chargeList = chargesData?.share?.charges;

  useEffect(() => {
    // const values = getValues();
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

    // reset({
    //   ...values,
    //   cash: {
    //     cashPaid: totalAmount.toString(),
    //   },
    // });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chargeList, extraFee, noOfShares, JSON.stringify(extraFee)]);

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
            <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
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
                        <GridItem colSpan={2}>
                          <FormMemberSelect
                            allMembers
                            name="memberId"
                            label={t['sharePurchaseSelectMember']}
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
                disableButton={noOfShares}
                totalAmount={totalAmount}
                paymentButtonHandler={paymentButtonHandler}
              />
            )}
            {mode === 'sharePayment' && (
              <SharePaymentFooter
                previousButtonHandler={previousButtonHandler}
                handleSubmit={handleSubmit}
              />
            )}
          </Container>
        </Box>
      </Box>
    </>
  );
};
