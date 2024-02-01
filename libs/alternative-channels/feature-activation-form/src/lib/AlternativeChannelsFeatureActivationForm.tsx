import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { IoSyncCircleOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import omit from 'lodash/omit';

import {
  Alert,
  asyncToast,
  Box,
  Button,
  FormSection,
  GridItem,
  Icon,
  IMemberInfo,
  Text,
} from '@myra-ui';

import {
  AlternativeChannelPaymentMode,
  AlternativeChannelServiceActivationInput,
  AlternativeChannelServiceType,
  CashValue,
  useActivateServiceMutation,
  useGetActivatedServiceQuery,
  useGetAlternativeFeeAndChargesQuery,
} from '@coop/cbs/data-access';
import { CashOptions } from '@coop/shared/components';
import { FormInput, FormLayout, FormMemberSelect, FormSelect } from '@coop/shared/form';
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

export const ActivationForm = () => {
  const [selectedMember, setSelectedMember] = useState<IMemberInfo>();

  const [mode, setMode] = useState<'form' | 'payment'>('form');
  // const [pin, setPin] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  const methods = useForm<TServiceActivationInput>({
    defaultValues: {
      pin: null,
      paymentMode: AlternativeChannelPaymentMode.Cash,
      cash: { disableDenomination: true },
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
        ['accountTransfer', 'bankCheque']
      );
      filteredValues.cash = {
        ...values.cash,
        cashPaid: values.cash?.cashPaid as string,
        disableDenomination: Boolean(values.cash?.disableDenomination),
        total: String(totalCashPaid),
        returned_amount: String(returnAmount),
        denominations:
          values.cash?.denominations?.map(({ value, quantity }) => ({
            value: CashOptions[value as string] as CashValue,
            quantity,
          })) ?? [],
      };
    }
    if (values.paymentMode === AlternativeChannelPaymentMode.BankVoucher) {
      filteredValues = omit({ ...filteredValues }, ['accountTransfer', 'cash']);
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
        router.push(`/alternative-channels/users/${router.query['type']}`);
        queryClient.invalidateQueries(['getActivatedService']);
        queryClient.invalidateQueries(['getAlternativeChannelList']);
      },
      promise: activateService({
        data: {
          ...filteredValues,
          paymentMode: values.paymentMode as AlternativeChannelPaymentMode,
          service: selectedService as AlternativeChannelServiceType[],
          pin: null,
          totalAmount: String(serviceCharges?.reduce((a, b) => a + Number(b?.amount), 0)),
        },
      }),
    });
  };

  const handleActivate = () => {
    const values = getValues();
    asyncToast({
      id: 'activate-service',
      msgs: {
        success: 'Service Activated!!',
        loading: 'Activating Services!!',
      },

      onSuccess: () => {
        router.push(`/alternative-channels/users/${router.query['type']}`);
        queryClient.invalidateQueries(['getActivatedService']);
        queryClient.invalidateQueries(['getAlternativeChannelList']);
      },
      promise: activateService({
        data: {
          ...omit(values, ['bankCheque', 'cash', 'bankCheque']),
          service: selectedService,
          pin: null,
          totalAmount: String(serviceCharges?.reduce((a, b) => a + Number(b?.amount), 0)),
        } as AlternativeChannelServiceActivationInput,
      }),
    });
  };

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title={t['acNewServiceActivationForm']} />

      <FormLayout.Content>
        <FormLayout.Form>
          <Box display={mode === 'form' ? 'block' : 'none'}>
            <FormSection>
              <GridItem colSpan={2}>
                <FormMemberSelect
                  name="memberId"
                  label={t['acMember']}
                  onChangeAction={(newVal) => {
                    setSelectedMember((newVal as { memberInfo: IMemberInfo })?.memberInfo);
                    if ((newVal as { memberInfo: IMemberInfo })?.memberInfo?.contact) {
                      methods.setValue(
                        'phoneNumber',
                        (newVal as unknown as { memberInfo: IMemberInfo }).memberInfo
                          .contact as string
                      );
                    } else {
                      methods.setValue('phoneNumber', '');
                    }
                  }}
                />
              </GridItem>

              <FormSelect
                name="service"
                isMulti
                isDisabled={!memberId}
                label={t['acService']}
                options={[
                  {
                    label: t['acMBanking'],
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
              <FormInput
                name="phoneNumber"
                label={t['acPhoneNumber']}
                isRequired
                rules={{ required: 'Phone number is required' }}
                onChangeAction={(val) => {
                  if (selectedMember?.contact) {
                    if (val !== selectedMember?.contact) {
                      methods.setError('phoneNumber', {
                        type: 'custom',
                        message: `Phone number not matching with KYM phone number (${selectedMember?.contact})`,
                      });
                    } else {
                      methods.clearErrors('phoneNumber');
                    }
                  }
                }}
              />
              <FormInput name="email" label={t['acEmail']} />
            </FormSection>

            {/* {(selectedService?.includes(AlternativeChannelServiceType.Ebanking) || */}
            {/*   selectedService?.includes(AlternativeChannelServiceType.MobileBanking)) && ( */}
            {/*   <GeneratePin pin={pin} setPin={setPin} /> */}
            {/* )} */}

            <FormSection flexLayout header="acFeeAndCharges" subHeader="acFeeDes" divider={false}>
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

          <Box display={mode === 'payment' ? 'block' : 'none'}>
            <Payment totalDeposit={Number(totalAmount)} />
          </Box>
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer
        status={
          mode === 'form' ? (
            <Box display="flex" gap="s32">
              <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-50">
                {t['acTotalAmount']}
              </Text>
              <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-70">
                {totalAmount ?? '---'}
              </Text>
            </Box>
          ) : (
            <Button variant="solid" onClick={() => setMode('form')}>
              {t['addDepositPrevious']}
            </Button>
          )
        }
        mainButtonLabel={
          mode === 'form' ? (totalAmount === '0' ? 'Activate' : 'Proceed Transaction') : 'Submit'
        }
        mainButtonHandler={
          mode === 'form'
            ? totalAmount === '0'
              ? methods.handleSubmit(handleActivate)
              : methods.handleSubmit(() => setMode('payment'))
            : handleSubmit
        }

        // mainButtonHandler={sendForApprovalHandler}
        // isMainButtonDisabled={!memberId || !productId || !loanType || !loanSubType}
      />
    </FormLayout>
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
            h="s60"
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
