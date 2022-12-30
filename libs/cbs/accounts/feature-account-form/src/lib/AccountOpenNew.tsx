import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import omit from 'lodash/omit';

import {
  Alert,
  asyncToast,
  Box,
  Button,
  Container,
  Divider,
  FormFooter,
  FormHeader,
  Grid,
  MemberCard,
  Text,
} from '@myra-ui';

import {
  CashValue,
  DepositedBy,
  DepositInput,
  DepositLoanAccountInput,
  DepositPaymentType,
  Id_Type,
  NatureOfDepositProduct,
  useGetAccountOpenEditDataQuery,
  useGetAccountOpenMinorListQuery,
  useGetAccountOpenProductDetailsQuery,
  useGetDefaultAccountListQuery,
  useGetIndividualMemberDetails,
  useGetNewIdMutation,
  useGetProductListQuery,
  useSetAccountDocumentDataMutation,
  useSetAccountOpenDataMutation,
} from '@coop/cbs/data-access';
import {
  FormAgentSelect,
  FormAmountInput,
  FormCheckbox,
  FormInput,
  FormMemberSelect,
  FormSelect,
} from '@coop/shared/form';
import { featureCode, useTranslation } from '@coop/shared/utils';

import {
  DepositFrequency,
  FeesAndCharge,
  Interest,
  RequiredDocuments,
  Tenure,
} from '../component/form';
import { AccordianComponent } from '../component/form/NewAccountOpen/AccordianComponent';
import { CriteriaCard } from '../component/form/NewAccountOpen/CriteriaCard';
import { Payment } from '../component/form/NewAccountOpen/Payment';
import { ProductCard } from '../component/form/NewAccountOpen/ProductDetailsCard';

type OptionType = { label: string; value: string };

type FileList =
  | 'signature'
  | 'nominee'
  | 'photo'
  | 'fingerPrintPhoto'
  | 'decisionDocuments'
  | 'registeredPhotos'
  | 'InsSignature'
  | 'taxClearance';

type FileListType = {
  signature: string[];
  nominee: string[];
  photo: string[];
  fingerPrintPhoto: string[];
  decisionDocuments: string[];
  registeredPhotos: string[];
  InsSignature: string[];
  taxClearance: string[];
};

type CustomDepositInput = Omit<DepositInput, 'cash'> & {
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

type CustomDepositLoanAccountInput = Omit<DepositLoanAccountInput, 'openingPayment'> & {
  // tenure?: FrequencyTenure | null | undefined;
  openingPayment: CustomDepositInput;
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

export const AccountOpenNew = () => {
  const queryClient = useQueryClient();

  const [mode, setMode] = useState('0');

  const [totalCharge, setTotalCharge] = useState<number>(0);

  const [fileList, setFileList] = useState<FileListType>({
    signature: [],
    fingerPrintPhoto: [],
    photo: [],
    nominee: [],
    decisionDocuments: [],
    registeredPhotos: [],
    InsSignature: [],
    taxClearance: [],
  });
  const { t } = useTranslation();
  const [triggerQuery, setTriggerQuery] = useState(false);
  const [showCriteria, setShowCriteria] = useState(false);
  const [triggerProductQuery, setTriggerProductQuery] = useState(false);
  const getNewId = useGetNewIdMutation({});
  const [newId, setNewId] = useState('');

  useEffect(() => {
    getNewId?.mutateAsync({ idType: Id_Type?.Account }).then((res) => setNewId(res?.newId));
  }, []);

  // const [mode, setMode] = useState<number>(0); // 0: form, 1: payment

  const methods = useForm<CustomDepositLoanAccountInput>({
    mode: 'onChange',

    defaultValues: {
      openingPayment: {
        payment_type: DepositPaymentType.Cash,
        cash: { disableDenomination: true },
        depositedBy: DepositedBy.Self,
      },
    },
  });
  const { getValues, watch, reset, setValue } = methods;
  const memberId = watch('memberId');
  const router = useRouter();
  const routerAction = router.query['action'];
  const redirectPath = router.query['redirect'];

  const id = (router?.query?.['id'] as string) || newId;

  const { mutateAsync } = useSetAccountOpenDataMutation();
  const { mutate: mutateDocs } = useSetAccountDocumentDataMutation();

  const { memberDetailData, memberSignatureUrl, memberCitizenshipUrl } =
    useGetIndividualMemberDetails({ memberId });
  const { data, isFetching } = useGetProductListQuery(
    {
      memberId,
    },
    { enabled: triggerQuery }
  );
  useEffect(() => {
    if (memberId) {
      setTriggerQuery(true);
    }
  }, [memberId]);
  const productOptions = [
    ...(data?.settings?.general?.depositProduct?.getProductList?.allowed?.reduce(
      (previousValue, currentValue) => [
        ...previousValue,
        {
          label: currentValue?.productName as string,
          value: currentValue?.id as string,
        },
      ],
      [] as OptionType[]
    ) ?? []),
    ...(data?.settings?.general?.depositProduct?.getProductList?.notAllowed?.reduce(
      (previousValue, currentValue) => [
        ...previousValue,
        {
          label: currentValue?.data?.productName as string,
          value: currentValue?.data?.id as string,
        },
      ],
      [] as OptionType[]
    ) ?? []),
  ];
  const newLog = data?.settings?.general?.depositProduct?.getProductList?.notAllowed;

  const productID = watch('productId');
  const defaultAccount = productOptions.find((d) => d?.value === productID);
  const defaultAccountName = `${memberDetailData?.name} - ${defaultAccount?.label}`;

  const errors = newLog?.find((d) => d?.data?.id === productID);

  const poductDetails = useGetAccountOpenProductDetailsQuery(
    { id: productID },
    {
      enabled: triggerProductQuery,
    }
  );

  const ProductData = poductDetails?.data?.settings?.general?.depositProduct?.formState?.data;
  const productType = ProductData?.nature;
  const isMandatoryFlag = ProductData?.isMandatorySaving;

  useEffect(() => {
    if (productID) {
      setTriggerProductQuery(true);
    }
  }, [productID]);

  const previousButtonHandler = () => {
    setMode('0');
  };
  const { data: minorData } = useGetAccountOpenMinorListQuery(
    {
      memberId: memberId as string,
    },
    { enabled: triggerQuery }
  );

  const { data: defaultAccountData } = useGetDefaultAccountListQuery(
    { memberId, productId: productID },
    {
      enabled: triggerQuery || triggerProductQuery,
    }
  );
  const defaulDataAcc = defaultAccountData?.account?.listDefaultAccounts?.data;
  const defaultDataOptions = defaulDataAcc?.map((item) => ({
    label: item?.accountName as string,
    value: item?.id as string,
  }));
  const minorDetails = minorData?.account?.listMinors?.data;
  const minorOptions = minorDetails?.map((item) => ({
    label: item?.fullName?.local as string,
    value: item?.id as string,
  }));

  const proceedToPaymentHandler = () => {
    setMode('1');
  };

  const initialDepositAmount = watch('initialDepositAmount');

  const totalDeposit = totalCharge + Number(initialDepositAmount ?? 0);

  const disableDenomination = watch('openingPayment.cash.disableDenomination');

  const cashPaid = watch('openingPayment.cash.cashPaid');

  const denominations = watch('openingPayment.cash.denominations');

  const denominationTotal = useMemo(
    () =>
      denominations?.reduce(
        (accumulator, current) => accumulator + Number(current.amount),
        0 as number
      ) ?? 0,
    [denominations]
  );

  const totalCashPaid = disableDenomination ? cashPaid : denominationTotal;

  const returnAmount = Number(totalCashPaid) - totalDeposit;

  const withdrawSlipAmount = watch('openingPayment.withdrawSlip.amount');

  const bankVoucherAmount = watch('openingPayment.bankVoucher.amount');

  const selectedPaymentMode = watch('openingPayment.payment_type');
  const accountName = watch('accountName');

  const checkIsSubmitButtonDisabled = () => {
    if (mode === '0') {
      return false;
    }

    if (
      selectedPaymentMode === DepositPaymentType.Cash &&
      Number(totalCashPaid ?? 0) < Number(totalDeposit)
    ) {
      if (Number(totalCashPaid ?? 0) < Number(totalDeposit)) {
        return true;
      }
    }

    if (
      selectedPaymentMode === DepositPaymentType.BankVoucher &&
      Number(bankVoucherAmount ?? 0) < Number(totalDeposit)
    ) {
      return true;
    }

    if (
      selectedPaymentMode === DepositPaymentType.WithdrawSlip &&
      Number(withdrawSlipAmount ?? 0) < Number(totalDeposit)
    ) {
      return true;
    }

    return false;
  };

  const submitForm = () => {
    const values = getValues();

    let updatedData;

    if (totalDeposit !== 0) {
      if (values.openingPayment?.payment_type === DepositPaymentType.Cash) {
        updatedData = {
          ...values,
          openingPayment: {
            ...omit({ ...values?.openingPayment }, ['withdrawSlip', 'bankVoucher']),
            cash: {
              ...values.openingPayment.cash,
              cashPaid: values.openingPayment.cash?.cashPaid as string,
              disableDenomination: Boolean(values.openingPayment.cash?.disableDenomination),
              total: String(totalCashPaid),
              returned_amount: String(returnAmount),
              denominations:
                values.openingPayment.cash?.denominations?.map(({ value, quantity }) => ({
                  value: cashOptions[value as string],
                  quantity,
                })) ?? [],
            },
          },
        };
      }

      if (values.openingPayment?.payment_type === DepositPaymentType.BankVoucher) {
        updatedData = {
          ...values,
          openingPayment: {
            ...omit(values?.openingPayment, ['withdrawSlip', 'cash']),
            bankVoucher: { ...values.openingPayment.bankVoucher },
          },
        };
      }

      if (values.openingPayment?.payment_type === DepositPaymentType.WithdrawSlip) {
        updatedData = {
          ...values,
          openingPayment: {
            ...omit(values?.openingPayment, ['cash', 'bankVoucher']),
            withdrawSlip: { ...values.openingPayment.withdrawSlip },
          },
        };
      }
    } else {
      updatedData = { ...omit({ ...values }, ['openingPayment']) };
    }

    updatedData = {
      ...updatedData,
      tenure: values?.tenure ? values?.tenure : null,
      depositFrequencyMonthly: values?.depositFrequencyMonthly
        ? values?.depositFrequencyMonthly
        : null,
      depositFrequencyFrequencyDay: values?.depositFrequencyFrequencyDay
        ? values?.depositFrequencyFrequencyDay
        : null,
      depositFrequencyDayOfWeek: values?.depositFrequencyDayOfWeek
        ? values?.depositFrequencyDayOfWeek
        : null,
      depositFrequencyYearlyMonth: values?.depositFrequencyYearlyMonth
        ? values?.depositFrequencyYearlyMonth
        : null,
      depositFrequencyYearlyDay: values?.depositFrequencyYearlyDay
        ? values?.depositFrequencyYearlyDay
        : null,
      depositFrequencyWeekly: values?.depositFrequencyWeekly
        ? values?.depositFrequencyWeekly
        : null,
    };

    asyncToast({
      id: 'account-open-id',
      msgs: {
        success: 'New Account Opened',
        loading: 'Opening new Account',
      },
      onSuccess: () => {
        if (values.openingPayment?.payment_type === DepositPaymentType.WithdrawSlip) {
          queryClient.invalidateQueries(['getAvailableSlipsList']);
          queryClient.invalidateQueries(['getPastSlipsList']);
        }
        if (redirectPath) {
          router.push(String(redirectPath));
          queryClient.invalidateQueries(['getAccountCheck']);
        } else {
          router.push('/savings/list');
        }
      },
      promise: mutateAsync({ id, data: updatedData as DepositLoanAccountInput }),
      onError: (error) => {
        if (error.__typename === 'ValidationError') {
          Object.keys(error.validationErrorMsg).map((key) =>
            methods.setError(key as keyof DepositLoanAccountInput, {
              message: error.validationErrorMsg[key][0] as string,
            })
          );
        }
      },
    });

    Object.keys(fileList).forEach((fieldName) => {
      if (fileList[fieldName as FileList]) {
        mutateDocs({
          subscriptionId: id,
          fieldId: fieldName,
          identifiers: fileList[fieldName as FileList],
        });
      }
    });
  };
  const { data: editValues, refetch } = useGetAccountOpenEditDataQuery({
    id,
  });
  useEffect(() => {
    if (editValues) {
      const editValueData = editValues?.account?.formState?.data;
      if (editValueData) {
        reset({
          ...(editValueData as CustomDepositLoanAccountInput),
        });
      }
    }
  }, [editValues, id]);

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [refetch]);

  useEffect(() => {
    if (routerAction === 'add' || routerAction === 'edit') {
      setValue('accountName', defaultAccountName);
    }
  }, [defaultAccountName]);
  //  get redirect id from url
  const redirectMemberId = router.query['memberId'];
  // redirect from member details
  useEffect(() => {
    if (redirectMemberId) {
      methods.setValue('memberId', String(redirectMemberId));
    }
  }, [redirectMemberId]);

  return (
    <Container minW="container.xl" p="0" bg="white">
      <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
        <FormHeader title={`${t['newAccountOpen']} - ${featureCode?.newAccountOpen}`} />
      </Box>
      <Box display="flex" flexDirection="row" minH="calc(100vh - 230px)">
        <Box
          display="flex"
          flexDirection="column"
          w="100%"
          borderRight="1px solid"
          borderColor="border.layout"
        >
          <FormProvider {...methods}>
            <form>
              <Box
                display={mode === '0' ? 'flex' : 'none'}
                flexDirection="column"
                gap="s32"
                p="s20"
                w="100%"
              >
                <FormMemberSelect isRequired name="memberId" label="Member" />
                <FormSelect
                  name="productId"
                  label={t['accProductName']}
                  isLoading={isFetching}
                  options={productOptions}
                />
                {errors && (
                  <Alert
                    status="error"
                    title="Error"
                    bottomButtonlabel="View All Criteria"
                    bottomButtonHandler={() => setShowCriteria((prev) => !prev)}
                    hideCloseIcon
                  >
                    <Box pt="s8">
                      <ul>
                        {errors?.error?.map((item) => (
                          <li key={item}>
                            {' '}
                            <Text fontWeight="400" fontSize="s2">
                              {item}
                            </Text>
                          </li>
                        ))}
                      </ul>
                    </Box>
                  </Alert>
                )}
                {showCriteria && (
                  <Box border="1px solid" borderColor="border.layout" borderRadius="br2" p="s16">
                    <CriteriaCard productId={productID} />
                  </Box>
                )}
                {memberId && productID && !errors && (
                  <Box display="flex" flexDirection="column" gap="s32" w="100%">
                    <FormInput name="accountName" label="Account Name" />
                    {ProductData?.isForMinors && (
                      <FormSelect name="minor" label="Minor" options={minorOptions} />
                    )}
                    {productType !== NatureOfDepositProduct?.Current &&
                      productType !== NatureOfDepositProduct?.Saving && <Tenure />}
                    <Divider />
                    {productType !== NatureOfDepositProduct?.Current && <Interest />}
                    {(productType === NatureOfDepositProduct?.RecurringSaving ||
                      (productType === NatureOfDepositProduct.Saving && isMandatoryFlag)) && (
                      <DepositFrequency />
                    )}
                    {(productType === NatureOfDepositProduct?.TermSavingOrFd ||
                      productType === NatureOfDepositProduct?.RecurringSaving) && (
                      <Box display="flex" flexDirection="column" gap="s16">
                        <Box display="flex" flexDirection="column" gap="s4">
                          <Text fontWeight="500" fontSize="r1">
                            Nominee Account
                          </Text>
                          <Text fontWeight="400" fontSize="s2">
                            If the member does not specify particular account for deposit, this
                            mapped account will be set globally. Normally this is a compulsory
                            account type.
                          </Text>
                        </Box>

                        <FormSelect
                          name="defaultAmountDepositAccountName"
                          options={defaultDataOptions}
                        />
                      </Box>
                    )}

                    {(ProductData?.alternativeChannels ||
                      ProductData?.atmFacility ||
                      ProductData?.chequeIssue) && (
                      <Box display="flex" flexDirection="column" gap="s16">
                        <Text fontWeight="600" fontSize="r1">
                          Other Services
                        </Text>
                        <Box display="flex" flexDirection="column" gap="s8">
                          {ProductData?.atmFacility && (
                            <FormCheckbox name="atmFacility" label="ATM Facility" />
                          )}
                          {ProductData?.chequeIssue && (
                            <FormCheckbox name="chequeFacility" label="Cheque Facility" />
                          )}
                        </Box>
                      </Box>
                    )}
                    <Grid templateColumns="repeat(3, 1fr)" rowGap="s16" columnGap="s20">
                      <FormAmountInput
                        type="number"
                        name="initialDepositAmount"
                        label="Initial Deposit Amount"
                      />
                    </Grid>
                    {/* <Agent /> */}
                    <Grid templateColumns="repeat(2, 1fr)" rowGap="s16" columnGap="s20">
                      <FormAgentSelect name="agentId" label="Market Representative" />
                    </Grid>
                    <FeesAndCharge setTotalCharge={setTotalCharge} />
                  </Box>
                )}
              </Box>
              <Box
                display={mode === '1' ? 'flex' : 'none'}
                flexDirection="column"
                gap="s32"
                p="s20"
                w="100%"
              >
                <Payment mode={Number(mode)} totalAmount={totalDeposit} />
              </Box>
            </form>
          </FormProvider>
          {memberId && productID && !errors && (
            <Box display={mode === '0' ? 'flex' : 'none'} flexDirection="column">
              <RequiredDocuments
                setFileList={setFileList}
                id={id}
                productId={productID}
                memberId={memberId}
              />
            </Box>
          )}
        </Box>

        {memberId && (
          <Box position="sticky" top="170px" right="0" w="320px">
            <Box display="flex" flexDirection="column" gap="s16">
              <MemberCard
                memberDetails={{
                  name: memberDetailData?.name,
                  avatar: memberDetailData?.profilePicUrl ?? '',
                  memberID: memberDetailData?.id,
                  code: memberDetailData?.code,
                  gender: memberDetailData?.gender,
                  age: memberDetailData?.age,
                  maritalStatus: memberDetailData?.maritalStatus,
                  dateJoined: memberDetailData?.dateJoined?.en,
                  phoneNo: memberDetailData?.contact,
                  email: memberDetailData?.email,
                  address: memberDetailData?.address,
                }}
                signaturePath={memberSignatureUrl}
                citizenshipPath={memberCitizenshipUrl}
              />
            </Box>
            <Box p="s16">{productID && <ProductCard productId={productID} />}</Box>
            {productID && (
              <Box p="s16">
                <AccordianComponent productId={productID} />
              </Box>
            )}
          </Box>
        )}
      </Box>
      <Box position="sticky" bottom={0}>
        <Box>
          {mode === '0' && (
            <FormFooter
              status={
                <Box display="flex" gap="s32">
                  <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-50">
                    Total Deposit Amount
                  </Text>
                  <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-70">
                    {totalDeposit ?? '---'}
                  </Text>
                </Box>
              }
              isMainButtonDisabled={!!errors || !memberId || !productID || !accountName}
              mainButtonLabel={totalDeposit === 0 ? 'Open Account' : 'Proceed to Payment'}
              mainButtonHandler={totalDeposit === 0 ? submitForm : proceedToPaymentHandler}
            />
          )}
          {mode === '1' && (
            <FormFooter
              status={<Button onClick={previousButtonHandler}> Previous</Button>}
              mainButtonLabel="Confirm Payment"
              mainButtonHandler={submitForm}
              isMainButtonDisabled={checkIsSubmitButtonDisabled()}
            />
          )}
        </Box>
      </Box>
    </Container>
  );
};
