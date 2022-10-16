import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { IoSyncCircleOutline } from 'react-icons/io5';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { omit } from 'lodash';

import {
  AlternativeChannelPaymentMode,
  AlternativeChannelServiceActivationInput,
  AlternativeChannelServiceType,
  CashValue,
  useActivateServiceMutation,
  useGetActivatedServiceQuery,
  useGetAlternativeFeeAndChargesQuery,
} from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import {
  Alert,
  asyncToast,
  Box,
  Button,
  Container,
  FormFooter,
  FormHeader,
  FormMemberSelect,
  FormSection,
  GridItem,
  Icon,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import Payment from '../components/Payment';

type TServiceActivationInput = Omit<
  AlternativeChannelServiceActivationInput,
  'service' | 'paymentMode' | 'cash'
> & {
  cash?:
    | {
        cashPaid: string;
        disableDenomination: boolean;
        total: string;
        returned_amount: string;
        denominations: { value: CashValue; quantity: number; amount?: string }[];
      }
    | undefined
    | null;
  paymentMode?: AlternativeChannelPaymentMode | undefined;
  service?: {
    label: string;
    value: AlternativeChannelServiceType;
  }[];
};

const ActivationChargeDict = {
  [AlternativeChannelServiceType.MobileBanking]: 'acMobileBankingActivationCharge',
  [AlternativeChannelServiceType.Ebanking]: 'acEBankingActivationCharge',
  [AlternativeChannelServiceType.SmsBanking]: 'acSMSBankingActivationCharge',
};

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

export const ActivationForm = () => {
  const [mode, setMode] = useState<'form' | 'payment'>('form');
  const [pin, setPin] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  const methods = useForm<TServiceActivationInput>({
    defaultValues: {
      pin: null,
      paymentMode: AlternativeChannelPaymentMode.Cash,
      cash: { disableDenomination: false },
    },
  });
  const { watch, getValues } = methods;
  const { t } = useTranslation();

  const memberId = watch('memberId');
  const service = watch('service');
  const isDisableDenomination = watch('cash.disableDenomination');
  const cashPaid = watch('cash.cashPaid');
  const denominations = watch('cash.denominations');
  const denominationTotal = useMemo(
    () =>
      denominations?.reduce(
        (accumulator, current) => accumulator + Number(current.amount),
        0 as number
      ) ?? 0,
    [denominations]
  );

  const selectedService = service?.map((s) => s.value);

  const { data } = useGetActivatedServiceQuery(
    {
      memberId: String(memberId),
    },
    { enabled: !!memberId }
  );

  const isEbankingDisabled = data?.alternativeChannel?.memberActivations?.eBanking;
  const isMobileBankingDisabled = data?.alternativeChannel?.memberActivations?.mobileBanking;
  const isSMSDisabled = data?.alternativeChannel?.memberActivations?.smsBanking;

  const { data: serviceChargeQueryData } = useGetAlternativeFeeAndChargesQuery();

  const serviceChargesData =
    serviceChargeQueryData?.settings?.general?.alternativeChannel?.feesAndCharges?.data;

  const serviceCharges = serviceChargesData?.filter((s) =>
    s?.serviceType ? selectedService?.includes(s.serviceType) : false
  );

  const { mutateAsync: activateService } = useActivateServiceMutation();

  const totalAmount = String(serviceCharges?.reduce((a, b) => a + Number(b?.amount), 0));
  const totalCashPaid = isDisableDenomination ? cashPaid : denominationTotal;
  const returnAmount = Number(totalAmount) - Number(cashPaid);

  const handleSubmit = async () => {
    const values = getValues();

    let filteredValues: TServiceActivationInput = {
      ...values,
    };
    if (values.paymentMode === AlternativeChannelPaymentMode.Cash) {
      filteredValues = omit(
        {
          ...filteredValues,
        },
        ['account', 'bankCheque']
      );
      filteredValues.cash = {
        ...values.cash,
        cashPaid: values.cash?.cashPaid as string,
        disableDenomination: Boolean(values.cash?.disableDenomination),
        total: String(totalCashPaid),
        returned_amount: String(returnAmount),
        denominations:
          values.cash?.denominations?.map(({ value, quantity }) => ({
            value: cashOptions[value as string] as CashValue,
            quantity,
          })) ?? [],
      };
    }
    if (values.paymentMode === AlternativeChannelPaymentMode.BankVoucher) {
      filteredValues = omit({ ...filteredValues }, ['account', 'cash']);
    }

    if (values.paymentMode === AlternativeChannelPaymentMode.Account) {
      filteredValues = omit({ ...filteredValues }, ['bankCheque', 'cash']);
    }

    await asyncToast({
      id: 'activate-service',
      msgs: {
        success: 'Service Activated!!',
        loading: 'Activating Services!!',
      },
      onSuccess: () => {
        router.push(`/alternative-channels/${router.query['type']}/users`);
        queryClient.invalidateQueries('getActivatedService');
        queryClient.invalidateQueries('getAlternativeChannelList');
      },
      promise: activateService({
        data: {
          ...filteredValues,
          paymentMode: values.paymentMode as AlternativeChannelPaymentMode,
          service: selectedService,
          pin,
          totalAmount: String(serviceCharges?.reduce((a, b) => a + Number(b?.amount), 0)),
        },
      }),
    });
  };

  return (
    <Container minW="container.lg" p="0" bg="white">
      <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
        <FormHeader title={t['acNewServiceActivationForm']} />
      </Box>

      <FormProvider {...methods}>
        <Box minH="calc(100vh - 220px)" display={mode === 'form' ? 'block' : 'none'}>
          <FormSection>
            <GridItem colSpan={2}>
              <FormMemberSelect name="memberId" label={t['acMember']} />
            </GridItem>

            <FormSelect
              name="service"
              isMulti
              isDisabled={!memberId}
              label={t['acService']}
              options={[
                {
                  label: t['acMobileBanking'],
                  value: AlternativeChannelServiceType.MobileBanking,
                  disabled: isMobileBankingDisabled ?? false,
                },
                {
                  label: t['acEBanking'],
                  value: AlternativeChannelServiceType.Ebanking,
                  disabled: isEbankingDisabled ?? false,
                },
                {
                  label: t['acSMSBanking'],
                  value: AlternativeChannelServiceType.SmsBanking,
                  disabled: isSMSDisabled ?? false,
                },
              ]}
            />
          </FormSection>

          <FormSection
            templateColumns={2}
            header="acUserInformation"
            subHeader="acUserInformationDetails"
          >
            <FormInput name="phoneNumber" label={t['acPhoneNumber']} />
            <FormInput name="email" label={t['acEmail']} />
          </FormSection>

          {(selectedService?.includes(AlternativeChannelServiceType.Ebanking) ||
            selectedService?.includes(AlternativeChannelServiceType.MobileBanking)) && (
            <GeneratePin pin={pin} setPin={setPin} />
          )}

          <FormSection flexLayout header="acFeeAndCharges" subHeader="acFeeDes">
            <Box
              display="flex"
              flexDirection="column"
              background="background.500"
              borderRadius="br2"
              p="s16"
              gap="s8"
            >
              {serviceCharges?.map((charge) => (
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                  h="s32"
                >
                  <Text fontSize="s3" fontWeight="500" color="gray.600">
                    {charge?.serviceType ? t[ActivationChargeDict[charge?.serviceType]] : 'N/A'}
                  </Text>
                  <Text fontSize="r1" fontWeight="600" color="gray.800">
                    {charge?.amount}
                  </Text>
                </Box>
              ))}

              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                h="s48"
              >
                <Text fontSize="s3" fontWeight="600" color="gray.800">
                  Total
                </Text>
                <Text fontSize="r1" fontWeight="600" color="gray.800">
                  {serviceCharges?.reduce((a, b) => a + Number(b?.amount), 0)}
                </Text>
              </Box>
            </Box>
          </FormSection>
        </Box>

        <Box minH="calc(100vh - 220px)" display={mode === 'payment' ? 'block' : 'none'}>
          <Payment totalDeposit={Number(totalAmount)} />
        </Box>
      </FormProvider>

      <Box position="sticky" bottom={0} zIndex="11">
        <FormFooter
          status={
            mode === 'form' ? (
              <Box display="flex" gap="s32">
                <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-50">
                  {t['acTotalAmount']}
                </Text>
                <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-70">
                  {0 ?? '---'}
                </Text>
              </Box>
            ) : (
              <Button variant="solid" onClick={() => setMode('form')}>
                {t['addDepositPrevious']}
              </Button>
            )
          }
          mainButtonLabel="Proceed To Payment"
          mainButtonHandler={mode === 'form' ? () => setMode('payment') : handleSubmit}

          // mainButtonHandler={sendForApprovalHandler}
          // isMainButtonDisabled={!memberId || !productId || !loanType || !loanSubType}
        />
      </Box>
    </Container>
  );
};

export default ActivationForm;

interface IGeneratePinProps {
  pin: number | null;
  setPin: Dispatch<SetStateAction<number | null>>;
}

export const GeneratePin = ({ pin, setPin }: IGeneratePinProps) => {
  const { t } = useTranslation();
  const [hasClicked, setHasClicked] = useState(false);

  const { watch } = useFormContext();

  const memberId = watch('memberId');
  const { data } = useGetActivatedServiceQuery(
    {
      memberId: String(memberId),
    },
    { enabled: !!memberId }
  );

  const isEbankingDisabled = data?.alternativeChannel?.memberActivations?.eBanking;
  const isMobileBankingDisabled = data?.alternativeChannel?.memberActivations?.mobileBanking;

  const canGeneratePin = !isEbankingDisabled && !isMobileBankingDisabled;

  return (
    <FormSection header="acGeneratePin" subHeader="acDescription" templateColumns={2}>
      <Box display="flex" flexDir="column" alignItems="flex-start" gap="s16">
        <Button
          onClick={() => {
            if (canGeneratePin) {
              setPin(Math.floor(1000 + Math.random() * 9000));
            } else {
              setHasClicked(true);
            }
          }}
          shade="neutral"
          variant="outline"
          leftIcon={<Icon as={IoSyncCircleOutline} />}
        >
          {t['acGeneratePin']}
        </Button>
        {pin && canGeneratePin && (
          <Box
            w="256px"
            background="background.500"
            px="s16"
            display="flex"
            flexDir="column"
            justifyContent="center"
            color="gray.700"
            h="60px"
          >
            <Text fontSize="s3">{t['acGeneratedPin']}</Text>
            <Text fontWeight="600" fontSize="r1" textTransform="capitalize">
              {pin}
            </Text>
          </Box>
        )}
        {!canGeneratePin && hasClicked ? (
          <Alert
            status="info"
            hideCloseIcon
            title={
              // eslint-disable-next-line no-nested-ternary
              isEbankingDisabled
                ? 'Your Mobile Banking pin will be same as Ebanking !!'
                : isMobileBankingDisabled
                ? 'Your Ebanking pin will be same as Mobile Banking !!'
                : ''
            }
          />
        ) : null}
      </Box>
    </FormSection>
  );
};
