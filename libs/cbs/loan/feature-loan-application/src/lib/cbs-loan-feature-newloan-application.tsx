import { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { omit } from 'lodash';

import {
  LoanAccountInput,
  useGetLoanApplicationDetailsQuery,
  useGetLoanProductSubTypeQuery,
  useGetLoanProductTypesQuery,
  useGetNewIdMutation,
  useSendLoanApplicationForApprovalMutation,
} from '@coop/cbs/data-access';
import { FormInput, FormNumberInput, FormSelect, FormTextArea } from '@coop/shared/form';
import {
  Alert,
  asyncToast,
  Box,
  Container,
  FormFooter,
  FormHeader,
  FormMemberSelect,
  MemberCard,
  Text,
} from '@coop/shared/ui';
import { useGetIndividualMemberDetails } from '@coop/shared/utils';

import {
  AccordianComponent,
  CriteriaCard,
  Interest,
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

export const NewLoanApplication = () => {
  const router = useRouter();
  const { id } = router.query;

  const queryClient = useQueryClient();
  const [showCriteria, setShowCriteria] = useState(false);

  const methods = useForm<LoanAccountInput>();
  const { watch, resetField } = methods;

  const memberId = watch('memberId');
  const loanType = watch('productType');
  const loanSubType = watch('productSubType');
  const productId = watch('productId');

  const { memberDetailData, memberSignatureUrl, memberCitizenshipUrl } =
    useGetIndividualMemberDetails({ memberId });

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
      onSuccess: () => {
        queryClient.invalidateQueries('getLoanList');
        router.push('/loan/applications?objState=SUBMITTED');
      },
    });
  }, [id]);

  // Errors for products
  const { errors, isFetching, loanProductOptions } = useLoanProductErrors({
    memberId,
    loanSubType,
    loanType,
    productId,
  });

  // Get Currently Selected Loan Product
  const { loanProduct } = useLoanProductDetails({ productId });

  // Reset Fields
  useEffect(() => {
    resetField('productSubType');
    resetField('productId');
  }, [loanType, resetField]);

  const loanApplication = loanData?.loanAccount?.formState?.data as LoanAccountInput;

  // for loan edit
  useEffect(() => {
    if (loanApplication) {
      methods?.reset(loanApplication);
    }
  }, [id, isLoanFetching, loanApplication, methods]);

  return (
    <Container minW="container.xl" p="0" bg="white">
      <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
        <FormHeader title="New Loan Application" />
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
              <Box display="flex" flexDirection="column" gap="s32" p="s20" w="100%">
                <Box display="flex" flexDir="column" gap="s16">
                  <FormMemberSelect name="memberId" label="Member Id" isDisabled={!!id} />
                  {memberId && (
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
                      <CriteriaCard productId={productId} />
                    </Box>
                  )}
                  {productId && !errors && (
                    <>
                      <FormInput name="LoanAccountName" label="Loan Account Name" />
                      <Box w="50%">
                        <FormNumberInput
                          name="appliedLoanAmount"
                          label="Applied Loan Amount"
                          placeholder="0.00"
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
                    <LoanRepaymentSchemeComponent />
                    <LoanPaymentSchedule />
                    <LoanProcessingCharge />
                    <RequiredDocuments />
                    <FormTextArea name="note" label="Notes" />
                  </LoanProductContext.Provider>
                )}
              </Box>
            </form>
          </FormProvider>
        </Box>

        {memberId && (
          <Box position="sticky" top="170px" right="0" w="320px">
            <Box display="flex" flexDirection="column" gap="s16">
              <MemberCard
                memberDetails={{
                  name: memberDetailData?.name,
                  avatar: memberDetailData?.profilePicUrl ?? '',
                  memberID: memberDetailData?.id,
                  gender: memberDetailData?.gender,
                  age: memberDetailData?.age,
                  maritalStatus: memberDetailData?.maritalStatus,
                  dateJoined: memberDetailData?.dateJoined,
                  phoneNo: memberDetailData?.contact,
                  email: memberDetailData?.email,
                  address: memberDetailData?.address,
                }}
                signaturePath={memberSignatureUrl}
                showSignaturePreview={false}
                citizenshipPath={memberCitizenshipUrl}
                viewProfileHandler={() => null}
                viewAccountTransactionsHandler={() => null}
              />
            </Box>

            {productId && (
              <Box p="s16" display="flex" flexDirection="column" gap="s16">
                <LoanProductCard productId={productId} />
                <AccordianComponent productId={productId} />
              </Box>
            )}
          </Box>
        )}
      </Box>
      <Box position="sticky" bottom={0} zIndex="11">
        <FormFooter
          status={
            <>
              Total Sanctioned Amount: <b>{watch('totalSanctionedAmount')}</b>
            </>
          }
          mainButtonLabel="Send For Approval"
          mainButtonHandler={sendForApprovalHandler}
        />
      </Box>
    </Container>
  );
};
