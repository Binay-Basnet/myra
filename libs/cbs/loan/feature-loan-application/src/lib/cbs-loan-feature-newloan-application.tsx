import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { omit } from 'lodash';

import { Alert, asyncToast, Box, MemberCard, Text } from '@myra-ui';
import { getNextDate } from '@myra-ui/date-picker';

import {
  InstallmentFrequency,
  InterestAuthority,
  LoanAccountInput,
  NatureOfDepositProduct,
  useGetIndividualMemberDetails,
  useGetLoanApplicationDetailsQuery,
  useGetLoanProductSubTypeQuery,
  useGetLoanProductTypesQuery,
  useGetMemberLinkedAccountsQuery,
  useGetNewIdMutation,
  useSendLoanApplicationForApprovalMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import {
  FormAmountInput,
  FormInput,
  FormLayout,
  FormMemberSelect,
  FormSelect,
  FormTextArea,
} from '@coop/shared/form';
import { amountConverter, featureCode } from '@coop/shared/utils';

import {
  AccordianComponent,
  CriteriaCard,
  InstallmentFrequencyComp,
  Interest,
  LinkedAccounts,
  LoanProcessingCharge,
  LoanProductCard,
  LoanRepaymentSchemeComponent,
  RequiredDocuments,
  Tenure,
} from '../components';
import { CollateralDetails } from '../components/CollateralDetails';
import { GuaranteeDetails } from '../components/GuaranteeDetails';
import { LoanAmountDetails } from '../components/LandAmountDetails';
import { LoanPaymentSchedule } from '../components/LoanPaymentSchedule';
import { LoanProductContext, useLoanProductDetails } from '../hooks/useLoanProduct';
import { useLoanProductErrors } from '../hooks/useLoanProductListErrors';

const instMap = {
  [InstallmentFrequency.Daily]: 'day',
  [InstallmentFrequency.HalfYearly]: 'half-yearly',
  [InstallmentFrequency.Monthly]: 'month',
  [InstallmentFrequency.Quarterly]: 'quarterly',
  [InstallmentFrequency.Weekly]: 'week',
  [InstallmentFrequency.Yearly]: 'year',
} as const;

type CustomLoanAccountInput = Omit<LoanAccountInput, 'interestAuthority'> & {
  // tenure?: FrequencyTenure | null | undefined;

  interestAuthority?: InterestAuthority;
};

export const NewLoanApplication = () => {
  const router = useRouter();
  const loanApplicationId = router.query['id'] as string;
  const { id } = router.query;

  const queryClient = useQueryClient();
  const [showCriteria, setShowCriteria] = useState(false);
  const [triggerAccountlist, setTriggerAccountList] = useState(false);

  const methods = useForm<CustomLoanAccountInput>({
    mode: 'onChange',
    defaultValues: {
      interestAuthority: InterestAuthority?.Default,
    },
  });
  const { watch, resetField, setValue } = methods;

  const memberId = watch('memberId');
  const loanType = watch('productType');
  const loanSubType = watch('productSubType');
  const productId = watch('productId');
  const sanctionedAmount = watch('totalSanctionedAmount');

  const { memberDetailData, memberSignatureUrl, memberCitizenshipUrl } =
    useGetIndividualMemberDetails({
      memberId: memberId as string,
    });

  const { data: loanTypeData } = useGetLoanProductTypesQuery();

  const { data: loanSubTypeData } = useGetLoanProductSubTypeQuery(
    { productTypeId: loanType },
    { enabled: !!loanType }
  );
  const { mutateAsync: getId } = useGetNewIdMutation();
  const { mutateAsync: applyLoan } = useSendLoanApplicationForApprovalMutation();

  const { data: loanData, isFetching: isLoanFetching } = useGetLoanApplicationDetailsQuery(
    { id: id as string },
    {
      enabled: !!id,
      staleTime: 0,
    }
  );

  const sendForApprovalHandler = useCallback(async () => {
    const promise = async () => {
      if (!id) {
        const responseId = await getId({});
        if (responseId?.newId) {
          const response = await applyLoan({
            id: responseId.newId,
            data: {
              ...methods.getValues(),

              gurantee_details: methods
                .getValues()
                ?.gurantee_details?.map((col) => omit(col, 'index')),
              collateralData: methods.getValues()?.collateralData?.map((col) =>
                omit(
                  {
                    ...col,
                    collateralFiles: col?.collateralFiles?.map(
                      (c) => (c as unknown as { identifier: string }).identifier
                    ),
                    valuationFiles: col?.valuationFiles?.map(
                      (c) => (c as unknown as { identifier: string }).identifier
                    ),
                  },
                  'index'
                )
              ),
            },
          });
          return response;
        }
      } else {
        const response = await applyLoan({
          id: id as string,
          data: {
            ...methods.getValues(),

            gurantee_details: methods
              .getValues()
              ?.gurantee_details?.map((col) => omit(col, 'index')),
            collateralData: methods.getValues()?.collateralData?.map((col) =>
              omit(
                {
                  ...col,
                  collateralFiles: col?.collateralFiles?.map(
                    (c) => (c as unknown as { identifier: string }).identifier
                  ),
                  valuationFiles: col?.valuationFiles?.map(
                    (c) => (c as unknown as { identifier: string }).identifier
                  ),
                },
                'index'
              )
            ),
          },
        });
        return response;
      }

      return {};
    };

    await asyncToast({
      id: 'loan-approval',
      msgs: {
        loading: 'Applying for Loan',
        success: 'Loan Applied Successfully',
      },
      promise: promise(),
      onError: (error) => {
        if (error.__typename === 'ValidationError') {
          Object.keys(error.validationErrorMsg).map((key) =>
            methods.setError(key as keyof LoanAccountInput, {
              message: error.validationErrorMsg[key][0] as string,
            })
          );
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getLoanList']);
        router.push(`${ROUTES.CBS_LOAN_APPLICATIONS_LIST}?objState=SUBMITTED`);
      },
    });
  }, [id]);

  // Errors for products
  const { errors, isFetching, loanProductOptions } = useLoanProductErrors({
    memberId: String(memberId),
    loanSubType: String(loanSubType),
    loanType: String(loanType),
    productId: String(productId),
  });

  // Get Currently Selected Loan Product
  const { loanProduct } = useLoanProductDetails({ productId: String(productId) });
  const loanProductDetailsdata = loanProduct?.product;

  useEffect(() => {
    if (loanProductDetailsdata?.loanType === 'LINE_OF_CREDIT') {
      setValue('repaymentScheme', 'LOC');
    } else {
      setValue('repaymentScheme', 'EPI');
    }
  }, [loanProductDetailsdata?.loanType]);

  // Reset Fields
  useEffect(() => {
    resetField('productSubType');
    resetField('productId');
  }, [loanType, resetField]);

  const loanApplication = loanData?.loanAccount?.formState?.data as LoanAccountInput;

  // for loan edit
  useEffect(() => {
    if (loanApplication) {
      methods?.reset({
        ...loanApplication,
        collateralData: loanApplication.collateralData ?? [],
        gurantee_details: loanApplication.gurantee_details ?? [],
        interestAuthority: !loanApplication?.interestAuthority
          ? InterestAuthority?.Default
          : loanApplication?.interestAuthority,
      });
    }
  }, [id, isLoanFetching, loanApplication, methods]);

  const defaultAccount = loanProductOptions.find((d) => d?.value === productId);
  const defaultAccountName = `${memberDetailData?.name} - ${defaultAccount?.label}`;
  useEffect(() => {
    if (!loanApplicationId) {
      setValue('loanAccountName', defaultAccountName);
    }
  }, [defaultAccountName, loanApplicationId]);
  //  get redirect id from url
  const redirectMemberId = router.query['memberId'];
  // redirect from member details
  useEffect(() => {
    if (redirectMemberId) {
      methods.setValue('memberId', String(redirectMemberId));
    }
  }, [redirectMemberId]);

  // saving accounts check list
  const { data: linkedAccountData, isFetching: isLinkAccDataFetching } =
    useGetMemberLinkedAccountsQuery(
      {
        memberId: String(memberId),

        filter: [NatureOfDepositProduct?.Current, NatureOfDepositProduct?.Saving],
        objState: 'ACTIVE',
      },
      {
        enabled: triggerAccountlist,
      }
    );
  const loanLinkedData = linkedAccountData?.members?.getAllAccounts?.data?.depositAccount;
  useEffect(() => {
    if (memberId) {
      setTriggerAccountList(true);
    }
  }, [memberId]);
  useEffect(() => {
    resetField('productType');
    resetField('productSubType');
    resetField('productId');
  }, [loanLinkedData, resetField]);

  const installmentFrequency = watch('installmentFrequency');
  const disbursedDate = watch('disbursementDate');

  useEffect(() => {
    if (disbursedDate && installmentFrequency)
      setValue('installmentBeginDate', {
        local: '',
        np: '',
        en: dayjs(
          getNextDate(instMap[installmentFrequency], 'BS', new Date(disbursedDate?.en || ''))
        ).format('YYYY-MM-DD'),
      });
  }, [disbursedDate, installmentFrequency, setValue]);

  return (
    <FormLayout methods={methods} hasSidebar={!!memberId}>
      <FormLayout.Header title={`New Loan Application - ${featureCode.newLoanApplication} `} />

      <FormLayout.Content>
        <FormLayout.Form>
          <Box display="flex" flexDirection="column" gap="s32" p="s20" w="100%">
            <Box display="flex" flexDir="column" gap="s16">
              <FormMemberSelect
                isRequired
                name="memberId"
                label="Member Id"
                isDisabled={!!id || !!redirectMemberId}
                isCurrentBranchMember
              />
              {memberId && !loanLinkedData && !isLinkAccDataFetching && (
                <Alert status="error"> Member does not have a Saving Account </Alert>
              )}
              {memberId && loanLinkedData && (
                <FormSelect
                  name="productType"
                  label="Loan Type"
                  options={loanTypeData?.settings.general?.loan?.productType?.productTypes?.map(
                    (product) => ({
                      label: product?.productType as string,
                      value: product?.id as string,
                    })
                  )}
                />
              )}
              {loanType && (
                <FormSelect
                  name="productSubType"
                  label="Loan Sub Type"
                  options={loanSubTypeData?.settings?.general?.loan?.productType?.productSubTypes?.map(
                    (product) => ({
                      label: product?.productSubType as string,
                      value: product?.id as string,
                    })
                  )}
                />
              )}
              {loanSubType && (
                <FormSelect
                  name="productId"
                  label="Loan Product"
                  isLoading={isFetching}
                  options={loanProductOptions}
                />
              )}

              {errors && productId && (
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
                          <Text fontWeight="400" fontSize="s2">
                            {item}
                          </Text>
                        </li>
                      ))}
                    </ul>
                  </Box>
                </Alert>
              )}
              {errors && showCriteria && (
                <Box border="1px solid" borderColor="border.layout" borderRadius="br2" p="s16">
                  <CriteriaCard productId={String(productId)} />
                </Box>
              )}
              {productId && !errors && (
                <>
                  <FormInput name="loanAccountName" label="Loan Account Name" />
                  <Box w="50%">
                    <FormAmountInput
                      isRequired
                      type="number"
                      name="appliedLoanAmount"
                      label="Applied Loan Amount"
                      placeholder="0.00"
                      rules={{
                        max: {
                          value: loanProductDetailsdata?.maxLoanAmount as number,
                          message: 'Maximum loan amount exceeded',
                        },
                        min: {
                          value: loanProductDetailsdata?.minimumLoanAmount as number,
                          message: 'Minimum loan amount must be higher',
                        },
                      }}
                    />
                  </Box>
                </>
              )}
            </Box>
            {productId && !errors && (
              <LoanProductContext.Provider value={loanProduct}>
                <CollateralDetails />
                <GuaranteeDetails />
                <LoanAmountDetails />
                <Interest />
                <Tenure />
                <InstallmentFrequencyComp />
                <LinkedAccounts />
                {/* {loanProductDetailsdata?.loanType === TypeOfLoan?.Normal && ( */}
                <LoanRepaymentSchemeComponent />
                {/* )} */}
                <LoanPaymentSchedule />
                {sanctionedAmount && <LoanProcessingCharge />}
                <RequiredDocuments />
                <FormTextArea name="note" label="Notes" />
              </LoanProductContext.Provider>
            )}
          </Box>
        </FormLayout.Form>

        {memberId && (
          <FormLayout.Sidebar>
            <Box display="flex" flexDirection="column" gap="s16">
              <MemberCard
                memberDetails={{
                  name: memberDetailData?.name,
                  code: memberDetailData?.code,
                  avatar: memberDetailData?.profilePicUrl ?? '',
                  memberID: memberDetailData?.id,
                  gender: memberDetailData?.gender,
                  age: memberDetailData?.age,
                  maritalStatus: memberDetailData?.maritalStatus as string,
                  dateJoined: memberDetailData?.dateJoined,
                  phoneNo: memberDetailData?.contact,
                  email: memberDetailData?.email,
                  address: memberDetailData?.address,
                }}
                signaturePath={memberSignatureUrl as string}
                citizenshipPath={memberCitizenshipUrl as string}
              />
            </Box>

            {productId && (
              <Box p="s16" display="flex" flexDirection="column" gap="s16">
                <LoanProductCard productId={productId ?? undefined} />
                <AccordianComponent productId={productId ?? undefined} />
              </Box>
            )}
          </FormLayout.Sidebar>
        )}
      </FormLayout.Content>

      <FormLayout.Footer
        status={
          <>
            Total Sanctioned Amount: <b>{amountConverter(watch('totalSanctionedAmount') || 0)}</b>
          </>
        }
        mainButtonLabel="Send For Approval"
        mainButtonHandler={sendForApprovalHandler}
        isMainButtonDisabled={!!errors || !memberId || !productId || !loanType || !loanSubType}
      />
    </FormLayout>
  );
};
