import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import omit from 'lodash/omit';

import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  Loader,
  MemberCard,
  ResponseDialog,
  Text,
} from '@myra-ui';

import {
  DepositedBy,
  DepositInput,
  DepositLoanAccountInput,
  DepositPaymentType,
  Id_Type,
  InterestAuthority,
  NatureOfDepositProduct,
  useGetAccountOpenEditDataQuery,
  useGetAccountOpenMinorListQuery,
  useGetAccountOpenProductDetailsQuery,
  useGetDefaultAccountListQuery,
  useGetIndividualMemberDetails,
  useGetNewIdMutation,
  useGetProductListQuery,
  useSetAccountOpenDataMutation,
} from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { CashOptions } from '@coop/shared/components';
import {
  FormAgentSelect,
  FormAmountInput,
  FormCheckbox,
  FormInput,
  FormLayout,
  FormMemberSelect,
  FormMFGroupSelect,
  FormSelect,
  FormSwitchTab,
} from '@coop/shared/form';
import {
  amountConverter,
  amountToWordsConverter,
  featureCode,
  useTranslation,
} from '@coop/shared/utils';

import {
  AddMinorModal,
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

type CustomDepositLoanAccountInput = Omit<
  DepositLoanAccountInput,
  'openingPayment' | 'interestAuthority'
> & {
  // tenure?: FrequencyTenure | null | undefined;
  memberOrGroup: 'member' | 'group';
  groupId: string;
  openingPayment: CustomDepositInput;
  interestAuthority?: InterestAuthority;
};

const accountTypes = {
  [NatureOfDepositProduct.Saving]: 'Saving Account',
  [NatureOfDepositProduct.RecurringSaving]: 'Recurring Saving Account',
  [NatureOfDepositProduct.TermSavingOrFd]: 'Term Saving Account',
  [NatureOfDepositProduct.Current]: 'Current Account',
};

export const AccountOpenNew = () => {
  const queryClient = useQueryClient();

  const [mode, setMode] = useState('0');
  const [showAccountName, setShowAccountName] = useState(true);

  const {
    isOpen: isMinorModalOpen,
    onToggle: onToggleMinorModal,
    onClose: onCloseMinorModal,
  } = useDisclosure();

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

  const router = useRouter();

  const [triggerQuery, setTriggerQuery] = useState(false);
  const [showCriteria, setShowCriteria] = useState(false);
  const [triggerProductQuery, setTriggerProductQuery] = useState(false);
  const getNewId = useGetNewIdMutation({});
  const [newId, setNewId] = useState('');

  useEffect(() => {
    if (router?.asPath?.includes('/add') && !newId) {
      getNewId?.mutateAsync({ idType: Id_Type?.Account }).then((res) => setNewId(res?.newId));
    }
  }, [router?.asPath]);

  // const [mode, setMode] = useState<number>(0); // 0: form, 1: payment

  const methods = useForm<CustomDepositLoanAccountInput>({
    mode: 'onChange',
    defaultValues: {
      memberOrGroup: 'member',
      interestAuthority: InterestAuthority?.Default,
      openingPayment: {
        payment_type: DepositPaymentType.Cash,
        cash: { disableDenomination: true },
        depositedBy: DepositedBy.Self,
      },
    },
  });

  const { getValues, watch, reset, setValue } = methods;

  const memberId = watch('memberId');
  const redirectPath = router.query['redirect'];

  const routeId = router?.query?.['id'] as string;
  const id = routeId || newId;

  const { mutateAsync } = useSetAccountOpenDataMutation();

  const { memberDetailData, memberSignatureUrl, memberCitizenshipUrl, memberLoading } =
    useGetIndividualMemberDetails({ memberId });
  const {
    data,
    isFetching,
    isLoading: productLoading,
  } = useGetProductListQuery(
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
          label: `${currentValue?.productName} [${
            accountTypes[currentValue?.nature as NatureOfDepositProduct]
          }]`,
          value: currentValue?.id as string,
        },
      ],
      [] as OptionType[]
    ) ?? []),
    ...(data?.settings?.general?.depositProduct?.getProductList?.notAllowed?.reduce(
      (previousValue, currentValue) => [
        ...previousValue,
        {
          label: `${currentValue?.data?.productName} [${
            accountTypes[currentValue?.data?.nature as NatureOfDepositProduct]
          }]`,
          value: currentValue?.data?.id as string,
        },
      ],
      [] as OptionType[]
    ) ?? []),
  ];
  const newLog = data?.settings?.general?.depositProduct?.getProductList?.notAllowed;

  const productID = watch('productId');
  const defaultAccount = productOptions.find((d) => d?.value === productID);
  const defaultAccountLabel =
    data?.settings?.general?.depositProduct?.getProductList?.allowed?.find(
      (d) => d?.id === productID
    )?.productName;

  const fourDigitRandomNo = useMemo(() => Math.floor(1000 + Math.random() * 9000), []);
  const defaultAccountName = `${memberDetailData?.name} - ${defaultAccountLabel} - ${fourDigitRandomNo}`;

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
  const { data: minorData, isLoading: minorListLoading } = useGetAccountOpenMinorListQuery(
    {
      memberId: memberId as string,
    },
    { enabled: triggerQuery }
  );

  const groupId = watch('groupId');

  const { data: defaultAccountData, isLoading: defaultAccountLoading } =
    useGetDefaultAccountListQuery(
      { memberId, productId: productID, groupId: groupId || undefined },
      {
        enabled: (triggerQuery || triggerProductQuery) && !!productID,
      }
    );
  const defaulDataAcc = defaultAccountData?.account?.listDefaultAccounts?.data;
  const defaultDataOptions = defaulDataAcc?.map((item) => ({
    label: item?.accountName as string,
    value: item?.id as string,
  }));
  const minorDetails = minorData?.account?.listMinors?.data;
  const minorOptions = minorDetails?.map((item) => ({
    label: item?.fullName as string,
    value: item?.id as string,
  }));
  const minorselectedValue = watch('minor');

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
  const isForMinors = ProductData?.isForMinors as boolean;

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
                  value: CashOptions[value as string],
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
      `${memberDetailData?.name} - ${defaultAccount?.label}`;

      if (values.openingPayment?.payment_type === DepositPaymentType.WithdrawSlip) {
        updatedData = {
          ...values,
          openingPayment: {
            ...omit(values?.openingPayment, ['cash', 'bankVoucher']),
            withdrawSlip: { ...values.openingPayment.withdrawSlip, withdrawType: 'WITHDRAW_SLIP' },
          },
        };
      }
    } else {
      updatedData = { ...omit({ ...values }, ['openingPayment']) };
    }

    const tempDocuments: { fieldId: string; identifiers: string[] }[] = [];

    Object.keys(fileList).forEach((fieldName) => {
      if (fileList[fieldName as FileList]) {
        tempDocuments.push({
          fieldId: fieldName,
          identifiers: fileList[fieldName as FileList],
        });
      }
    });

    updatedData = {
      ...omit(updatedData, ['groupId', 'memberOrGroup']),
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
      accountDocuments: tempDocuments,
    };

    return updatedData;

    // Object.keys(fileList).forEach((fieldName) => {
    //   if (fileList[fieldName as FileList]) {
    //     mutateDocs({
    //       subscriptionId: id,
    //       fieldId: fieldName,
    //       identifiers: fileList[fieldName as FileList],
    //     });
    //   }
    // });
  };
  const {
    data: editValues,
    refetch,
    isLoading: editLoading,
  } = useGetAccountOpenEditDataQuery(
    {
      id: routeId,
    },
    { enabled: !!routeId }
  );

  useEffect(() => {
    if (editValues && routeId) {
      const editValueData = editValues?.account?.formState?.data;
      if (editValueData) {
        reset({
          ...(editValueData as CustomDepositLoanAccountInput),
        });
      }
    }
  }, [editValues, id]);

  useEffect(() => {
    if (routeId) {
      refetch();
    }
  }, [refetch]);

  useEffect(() => {
    const minorName = minorOptions?.find((r) => r?.value === minorselectedValue)?.label;

    const defaultMinorAccountName = `${minorName} - ${defaultAccountLabel} -${fourDigitRandomNo}`;

    if (router?.pathname?.includes('add')) {
      // if (routerAction === 'add' || routerAction === 'edit') {
      setValue('accountName', defaultAccountName);
    }
    if (router?.pathname?.includes('add') && ProductData?.isForMinors) {
      // if (routerAction === 'add' || routerAction === 'edit') {
      setValue('accountName', defaultMinorAccountName);
    }
  }, [defaultAccountName, ProductData, minorselectedValue]);
  // get redirect id from url
  const redirectMemberId = router.query['memberId'];
  // redirect from member details
  useEffect(() => {
    if (redirectMemberId) {
      methods.setValue('memberId', String(redirectMemberId));
    }
  }, [redirectMemberId]);

  // show account name only after a minor account is selected in case of minor account

  useEffect(() => {
    if (ProductData?.isForMinors && !minorselectedValue) {
      setShowAccountName(false);
    }
    if (ProductData?.isForMinors && minorselectedValue) {
      setShowAccountName(true);
    }
  }, [ProductData, minorselectedValue]);

  const memberOrGroup = watch('memberOrGroup');

  useEffect(() => {
    if (memberOrGroup === 'member') {
      methods.setValue('groupId', '');
    } else {
      methods.setValue('memberId', '');
    }
  }, [memberOrGroup]);

  return (
    <>
      <FormLayout methods={methods} hasSidebar={!!memberId}>
        <FormLayout.Header
          title={`${t['newAccountOpen']} - ${featureCode?.newSavingAccountOpen}`}
        />

        <FormLayout.Content>
          <FormLayout.Form>
            {editLoading &&
            minorListLoading &&
            defaultAccountLoading &&
            productLoading &&
            !memberLoading &&
            router.pathname.includes('edit') ? (
              <Box display="flex" justifyContent="center" pt="100px">
                <Loader />
              </Box>
            ) : (
              <>
                <Box
                  display={mode === '0' ? 'flex' : 'none'}
                  flexDirection="column"
                  gap="s32"
                  p="s16"
                  w="100%"
                >
                  <FormSwitchTab
                    name="memberOrGroup"
                    options={[
                      { label: 'Member', value: 'member' },
                      { label: 'MF Group', value: 'group', isDisabled: !!redirectMemberId },
                    ]}
                  />

                  {memberOrGroup === 'group' && (
                    <>
                      <FormMFGroupSelect name="groupId" label="MF Group" isRequired />

                      <FormMemberSelect
                        isRequired
                        name="memberId"
                        label="Member"
                        groupId={groupId}
                      />
                    </>
                  )}

                  {memberOrGroup === 'member' && (
                    <FormMemberSelect
                      isRequired
                      name="memberId"
                      label="Member"
                      isDisabled={!!redirectMemberId || !!routeId}
                      isCurrentBranchMember
                    />
                  )}
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
                  {memberId && productID && !errors && ProductData?.isForMinors && (
                    <FormSelect
                      name="minor"
                      label="Minor"
                      options={minorOptions}
                      addItemLabel="Add Minor"
                      addItemHandler={onToggleMinorModal}
                      isRequired
                    />
                  )}
                  {memberId && productID && !errors && showAccountName && (
                    <FormInput name="accountName" label="Account Name" />
                  )}

                  {memberId && productID && !errors && (
                    <Box display="flex" flexDirection="column" gap="s32" w="100%">
                      {/* {showAccountName && <FormInput name="accountName" label="Account Name" />} */}

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
                            {ProductData?.alternativeChannels && (
                              <>
                                <FormCheckbox name="mobileBanking" label="Mobile Banking" />

                                <FormCheckbox name="eBanking" label="EBanking" />

                                <FormCheckbox name="smsBanking" label="SMS Banking" />
                              </>
                            )}
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
                        <FormAgentSelect
                          name="agentId"
                          label="Market Representative"
                          currentBranchOnly
                          state="APPROVED"
                        />
                      </Grid>
                      <FeesAndCharge setTotalCharge={setTotalCharge} />
                    </Box>
                  )}
                </Box>
                <Box
                  display={mode === '1' ? 'flex' : 'none'}
                  flexDirection="column"
                  gap="s32"
                  p="s16"
                  w="100%"
                >
                  <Payment mode={Number(mode)} totalAmount={totalDeposit} />
                </Box>

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
              </>
            )}
          </FormLayout.Form>

          {memberId && (
            <FormLayout.Sidebar borderPosition="left">
              <Box display="flex" flexDirection="column" gap="s16">
                <MemberCard
                  memberDetails={{
                    name: memberDetailData?.name,
                    avatar: memberDetailData?.profilePicUrl ?? '',
                    memberID: memberDetailData?.id,
                    code: memberDetailData?.code,
                    gender: memberDetailData?.gender,
                    age: memberDetailData?.age,
                    maritalStatus: memberDetailData?.maritalStatus as string,
                    dateJoined: memberDetailData?.dateJoined?.en,
                    phoneNo: memberDetailData?.contact,
                    email: memberDetailData?.email,
                    address: memberDetailData?.address,
                  }}
                  signaturePath={memberSignatureUrl as string}
                  citizenshipPath={memberCitizenshipUrl as string}
                />
              </Box>
              {productID && (
                <Box p="s16">
                  <ProductCard productId={productID} />
                </Box>
              )}
              {productID && (
                <Box p="s16">
                  <AccordianComponent productId={productID} />
                </Box>
              )}
            </FormLayout.Sidebar>
          )}
        </FormLayout.Content>

        <FormLayout.Footer
          status={
            mode === '0' ? (
              <Box display="flex" gap="s32">
                <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-50">
                  Total Deposit Amount
                </Text>
                <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-70">
                  {totalDeposit ?? '---'}
                </Text>
              </Box>
            ) : (
              <Button onClick={previousButtonHandler}>Previous</Button>
            )
          }
          isMainButtonDisabled={
            mode === '0'
              ? !!errors ||
                !memberId ||
                !productID ||
                !accountName ||
                (isForMinors && !minorselectedValue)
              : checkIsSubmitButtonDisabled()
          }
          mainButtonLabel={totalDeposit === 0 ? 'Open Account' : 'Proceed Transaction'}
          mainButtonHandler={totalDeposit === 0 ? submitForm : proceedToPaymentHandler}
          mainButton={
            (mode === '0' && totalDeposit === 0) || mode !== '0' ? (
              <ResponseDialog
                onSuccess={() => {
                  if (
                    getValues().openingPayment?.payment_type === DepositPaymentType.WithdrawSlip
                  ) {
                    queryClient.invalidateQueries(['getAvailableSlipsList']);
                    queryClient.invalidateQueries(['getPastSlipsList']);
                  }
                  if (redirectPath) {
                    router.push(String(redirectPath));
                    queryClient.invalidateQueries(['getAccountCheck']);
                    queryClient.invalidateQueries(['getOperationsAutoOpenDetails']);
                  } else {
                    router.push(ROUTES.CBS_ACCOUNT_LIST);
                  }
                }}
                promise={() =>
                  getValues()?.['groupId']
                    ? mutateAsync({
                        id,
                        data: submitForm() as DepositLoanAccountInput,
                        groupId: getValues()?.['groupId'],
                      })
                    : mutateAsync({ id, data: submitForm() as DepositLoanAccountInput })
                }
                successCardProps={(response) => {
                  const result = response?.account?.add?.record;

                  const totalPayment =
                    Number(result?.initialDepositAmount || 0) + Number(result?.charges || 0);

                  return {
                    type: 'Saving Account Open',
                    total: amountConverter(totalPayment) as string,
                    totalWords: amountToWordsConverter(totalPayment),
                    title: 'Account Open Successful',
                    details: {
                      'Account Id': (
                        <Text fontSize="s3" color="primary.500" fontWeight="600">
                          {result?.accountId}
                        </Text>
                      ),
                      'Account Name': result?.accountName,
                      'Account Type': result?.accountType,
                      'Account Opened Date': localizedDate(result?.accOpenedDate),
                      'Linked Account': result?.linkedAccountId
                        ? `${result?.linkedAccountName} [${result?.linkedAccountId}]`
                        : '-',
                      'Initial Deposit Amount': amountConverter(result?.initialDepositAmount || 0),
                      Charges: amountConverter(result?.charges || 0),
                      'Payment Mode': result?.paymentMode,
                    },
                    subTitle:
                      'Account opened successfully. Details of the account is listed below.',
                    dublicate: true,
                    showSignatures: true,
                  };
                }}
                errorCardProps={{
                  title: 'Saving Account Open Failed',
                }}
                onError={(error) => {
                  if (error.__typename === 'ValidationError') {
                    Object.keys(error.validationErrorMsg).map((key) =>
                      methods.setError(key as keyof DepositLoanAccountInput, {
                        message: error.validationErrorMsg[key][0] as string,
                      })
                    );
                  }
                }}
              >
                <Button width="160px">{mode === '0' ? 'Account Open' : 'Confirm Payment'}</Button>
              </ResponseDialog>
            ) : null
          }
        />
      </FormLayout>
      <AddMinorModal isOpen={isMinorModalOpen} onClose={onCloseMinorModal} memberId={memberId} />
    </>
  );
};
