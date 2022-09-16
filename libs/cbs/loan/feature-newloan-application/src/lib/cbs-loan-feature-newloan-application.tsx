import { useEffect, useState } from 'react';
import { FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';

import {
  LoanAccountInput,
  useGetCollateralListQuery,
  useGetLoanProductDetailsDataQuery,
  useGetLoanProductsListQuery,
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
  Button,
  ChakraModal,
  Container,
  Divider,
  FormAccountSelect,
  FormFooter,
  FormHeader,
  FormMemberSelect,
  GridItem,
  Icon,
  MemberCard,
  Text,
  TextFields,
  VStack,
} from '@coop/shared/ui';
import { useGetIndividualMemberDetails } from '@coop/shared/utils';

import {
  AccordianComponent,
  CriteriaCard,
  Interest,
  LoanProcessingCharge,
  LoanProductCard,
  LoanRepaymentSchemeComponent,
  Tenure,
} from '../components';
import { COLLATERAL_COMPS } from '../components/collateral';

type OptionType = { label: string; value: string };

export const NewLoanApplication = () => {
  const router = useRouter();
  const [showCriteria, setShowCriteria] = useState(false);

  const methods = useForm<LoanAccountInput>();
  const { watch } = methods;
  const memberId = watch('memberId');

  const { memberDetailData, memberSignatureUrl, memberCitizenshipUrl } =
    useGetIndividualMemberDetails({ memberId });

  const loanType = watch('productType');
  const loanSubType = watch('productSubType');
  const productId = watch('productId');

  const { data: loanTypeData } = useGetLoanProductTypesQuery();
  const { data: loanSubTypeData } = useGetLoanProductSubTypeQuery(
    { productTypeId: loanType },
    { enabled: !!loanType }
  );
  const { data: loanProductData, isFetching } = useGetLoanProductsListQuery(
    {
      memberId,
      productTypeId: loanType,
      productSubTypeId: loanSubType,
    },
    { enabled: !!loanSubType }
  );

  const queryClient = useQueryClient();
  const { mutateAsync: getId } = useGetNewIdMutation();
  const { mutateAsync: applyLoan } = useSendLoanApplicationForApprovalMutation();

  const sendForApprovalHandler = async () => {
    const promise = async () => {
      const responseId = await getId({});

      if (responseId?.newId) {
        const response = await applyLoan({
          id: responseId.newId,
          data: methods.getValues(),
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
        router.push('/loan');
      },
    });
  };

  useEffect(() => {
    methods.resetField('productSubType');
  }, [loanType]);

  const loanProductOptions = [
    ...(loanProductData?.loanAccount?.getProductList?.allowed?.reduce(
      (previousValue, currentValue) => [
        ...previousValue,
        {
          label: currentValue?.productName as string,
          value: currentValue?.id as string,
        },
      ],
      [] as OptionType[]
    ) ?? []),
    ...(loanProductData?.loanAccount?.getProductList?.notAllowed?.reduce(
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

  const arrayForErrors = loanProductData?.loanAccount?.getProductList?.notAllowed;

  const errors = arrayForErrors?.find((d) => d?.data?.id === productId);
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
                  <FormMemberSelect name="memberId" label="Member Id" />
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
                  {showCriteria && (
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
                  <>
                    <CollateralDetails />
                    <GuaranteeDetails />
                    <LoanAmountDetails />
                    <Interest />
                    <Tenure />
                    <LoanRepaymentSchemeComponent />
                    <LoanProcessingCharge />
                    {/* <RequiredDocuments /> */}
                  </>
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
                  avatar: 'https://bit.ly/dan-abramov',
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
      <Box position="sticky" bottom={0}>
        <FormFooter
          mainButtonLabel="Send For Approval"
          mainButtonHandler={sendForApprovalHandler}
        />
      </Box>
    </Container>
  );
};

export const LoanAmountDetails = () => (
  <Box display="flex" flexDir="column" gap="s16">
    <Box display="flex" flexDir="column" gap="s4">
      <Text fontSize="r1" fontWeight="600" color="gray.800">
        Loan Amount Details
      </Text>
      <Text fontSize="s3" fontWeight="500" color="gray.600">
        Details of collateral valuation and disbursement amount
      </Text>
    </Box>
    <Box p="s16" border="1px" borderColor="border.layout" borderRadius="br2">
      <Box display="flex" flexDir="column" p="s16" gap="s16" borderRadius="br2" bg="background.500">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <TextFields variant="formLabel">Total Loan Applied</TextFields>
          <Text fontSize="r1" color="gray.800" fontWeight="600">
            1,00,000
          </Text>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <TextFields variant="formLabel">Total Valuation</TextFields>
          <Button variant="link" px={0}>
            80,000
          </Button>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <TextFields variant="formLabel">Total Sanctioned Loan Applied</TextFields>
          <Box>
            <FormNumberInput name="totalSanctionedAmount" size="sm" />
          </Box>
        </Box>
      </Box>
    </Box>
    <Divider />
    <Box>
      <FormTextArea
        name="justifySanction"
        h="200px"
        label="If the sanctioned amount is greater than or equal to valuation amount. Please provide
        justification for it"
      />
    </Box>
  </Box>
);

type GuaranteeDetailForm = {
  index?: number;
  memberId: string;
  accountId: string;
  maxGuaranteeAmount: number;
  guaranteeAmount: number;
};

export const GuaranteeDetails = () => {
  const methods = useForm<GuaranteeDetailForm>();

  const { control } = useFormContext<{
    memberId: string;
    gurantee_details: GuaranteeDetailForm[];
  }>();

  const [isModal, setIsModal] = useState(false);

  const { append, fields, update } = useFieldArray({
    control,
    name: 'gurantee_details',
  });

  const memberId = methods.watch('memberId');

  return (
    <>
      <Box display="flex" flexDir="column" gap="s16">
        <TextFields variant="formLabel" color="gray.700">
          Guarantee Details
        </TextFields>
        <Box>
          <Button
            variant="outline"
            gap="s4"
            onClick={() => {
              methods.reset({});
              setIsModal(true);
            }}
          >
            <Icon as={AiOutlinePlus} />
            Add New
          </Button>
        </Box>
      </Box>

      <ChakraModal
        width="3xl"
        open={isModal}
        onClose={() => setIsModal(false)}
        primaryButtonHandler={() => {
          const index = methods.getValues()?.index;
          if (index !== undefined) {
            update(index, methods.getValues());
          } else {
            append(methods.getValues());
          }
          setIsModal(false);
        }}
        isCentered
        title="Add Guarantee"
        primaryButtonLabel="save"
        preserveScrollBarGap
      >
        <FormProvider {...methods}>
          <Box display="flex" flexDir="column" gap="s16">
            <FormMemberSelect name="memberId" label="Select Member" />
            {/** TODO! SHOW BALANCE INSIDE THE COMPONENT * */}
            <FormAccountSelect memberId={memberId} name="accountId" label="Select Account" />
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap="s16">
              <FormNumberInput
                name="maxGuranteeAmountLimit"
                label="Maximum Guarantee Amount Available"
              />
              <FormNumberInput name="guranteeAmount" label="Maximum Guarantee Amount Available" />
            </Box>
            <GridItem
              colSpan={4}
              h="s40"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              px="s10"
              bg="background.500"
              borderRadius="br2"
            >
              <TextFields variant="formLabel" color="gray.600">
                Total Guaranteed Amount
              </TextFields>

              <Text color="gray.700" fontSize="r1" fontWeight="600">
                1500
              </Text>
            </GridItem>
          </Box>
        </FormProvider>
      </ChakraModal>

      {fields.length !== 0 && (
        <Box mt="-s16" border="1px" borderColor="border.layout" borderRadius="br2">
          <Box
            h="s60"
            borderBottom="1px"
            borderBottomColor="border.layout"
            display="flex"
            flexDir="column"
            justifyContent="center"
            px="s12"
          >
            <Text fontSize="r1" fontWeight="600" color="gray.800">
              Guarantee Details
            </Text>
            <Text fontSize="s3" fontWeight="500" color="gray.600">
              Details about the guarantee for loan amount
            </Text>
          </Box>
          <Box
            borderBottom="1px"
            borderBottomColor="border.layout"
            h="50px"
            display="flex"
            alignItems="center"
            px="s12"
          >
            <Text fontSize="r1" fontWeight="600" color="gray.900" w="20%">
              S.N.
            </Text>
            <Text fontSize="r1" fontWeight="600" color="gray.900" w="40%">
              Name
            </Text>
            <Text fontSize="r1" fontWeight="600" color="gray.900" w="40%">
              Guarantee
            </Text>
          </Box>

          <VStack spacing={0} divider={<Divider />}>
            {fields.map((field, index) => (
              <Box key={field.id} px="s16" display="flex" alignItems="center" w="100%" h="60px">
                <Text fontSize="r1" color="gray.900" w="20%">
                  {index + 1}
                </Text>
                <Text fontSize="r1" color="gray.900" w="40%" textTransform="capitalize">
                  {field.memberId}
                </Text>

                <Text fontSize="r1" color="gray.900" w="20%">
                  {Number(field.guaranteeAmount) * Number(field.maxGuaranteeAmount)}
                </Text>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsModal(true);
                    methods.reset({ ...field, index });
                  }}
                >
                  Edit
                </Button>
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </>
  );
};

type CollateralDetailsType = {
  index?: number;
  collateralType: 'Land' | 'Land and Building' | 'Vehicle' | 'Documents' | 'Others' | '';
  ownerName: string;
  relation: string;
  sheetNo: string;
  plotNo: string;
  kittaNo: string;
  area: string;
  valuatorId: string;
  fmvMaxAmount: string;
  dvMinAmount: string;
  valuationMethod: string;
  validationPercent: string;
  collateralDescription: string;
  collateralFiles: string[];
  valuationFiles: string[];
};

export const CollateralDetails = () => {
  const [isModal, setIsModal] = useState(false);

  const methods = useForm<CollateralDetailsType>();
  const collateralTypeWatch = methods.watch('collateralType');

  const { control, watch } = useFormContext<{
    productId?: string;
    collateralData: CollateralDetailsType[];
  }>();
  const { append, fields, update, remove } = useFieldArray({
    control,
    name: 'collateralData',
  });

  const productId = watch('productId');
  const { data: loanProductData } = useGetLoanProductDetailsDataQuery(
    { id: String(productId) },
    {
      enabled: !!productId,
    }
  );

  const { data: collateralListData } = useGetCollateralListQuery();
  const loanProduct = loanProductData?.settings?.general?.loanProducts?.formState?.data;
  const collateralList = collateralListData?.settings?.general?.loan?.general?.collateralList;

  return (
    <>
      <Box display="flex" flexDir="column" gap="s16">
        <TextFields variant="formLabel" color="gray.700">
          Collateral Details
        </TextFields>
        <Box>
          <Button
            variant="outline"
            gap="s4"
            onClick={() => {
              methods.reset({ collateralType: '' });
              setIsModal(true);
            }}
          >
            <Icon as={AiOutlinePlus} />
            Add New
          </Button>
        </Box>
      </Box>

      <ChakraModal
        width="3xl"
        open={isModal}
        onClose={() => setIsModal(false)}
        primaryButtonHandler={() => {
          const index = methods.getValues()?.index;
          if (index !== undefined) {
            update(index, methods.getValues());
          } else {
            append(methods.getValues());
          }
          setIsModal(false);
        }}
        title="Add Collateral"
        primaryButtonLabel="save"
        scrollBehavior={collateralTypeWatch ? 'inside' : 'outside'}
        preserveScrollBarGap
      >
        <FormProvider {...methods}>
          <Box display="flex" flexDir="column" gap="s32">
            <Box width="50%" pr="s10">
              <FormSelect
                name="collateralType"
                isDisabled={!!collateralTypeWatch}
                label="Collateral Type"
                options={loanProduct?.collateralValue?.map((collateralData) => ({
                  label: collateralList?.find(
                    (collateral) => collateral?.id === collateralData?.type
                  )?.name as string,
                  value: collateralData?.type as string,
                }))}
                // options={[
                //   { label: 'Documents', value: 'Documents' },
                //   { label: 'Others', value: 'Others' },
                // ]}
              />
            </Box>
            {collateralTypeWatch && (
              <Box>
                {
                  COLLATERAL_COMPS[
                    collateralList?.find((collateral) => collateral?.id === collateralTypeWatch)
                      ?.name as
                      | 'Land'
                      | 'Land and Building'
                      | 'Vehicle'
                      | 'Documents'
                      | 'Others'
                      | ''
                  ]
                }
              </Box>
            )}
          </Box>
        </FormProvider>
      </ChakraModal>

      {fields.length !== 0 && (
        <Box mt="-s16" border="1px" borderColor="border.layout" borderRadius="br2">
          <Box
            h="s60"
            borderBottom="1px"
            borderBottomColor="border.layout"
            display="flex"
            flexDir="column"
            justifyContent="center"
            px="s12"
          >
            <Text fontSize="r1" fontWeight="600" color="gray.800">
              Collateral Details
            </Text>
            <Text fontSize="s3" fontWeight="500" color="gray.600">
              Details about the valuation for loan amount
            </Text>
          </Box>
          <Box
            borderBottom="1px"
            borderBottomColor="border.layout"
            h="50px"
            display="flex"
            alignItems="center"
            px="s12"
          >
            <Text fontSize="r1" fontWeight="600" color="gray.900" w="20%">
              S.N.
            </Text>
            <Text fontSize="r1" fontWeight="600" color="gray.900" w="40%">
              Name
            </Text>
            <Text fontSize="r1" fontWeight="600" color="gray.900" w="40%">
              Valuation
            </Text>
          </Box>

          <VStack spacing={0} divider={<Divider />}>
            {fields.map((field, index) => (
              <Box key={field.id} px="s16" display="flex" alignItems="center" w="100%" h="60px">
                <Text fontSize="r1" color="gray.900" w="20%">
                  {index + 1}
                </Text>
                <Text fontSize="r1" color="gray.900" w="40%" textTransform="capitalize">
                  {field.collateralType}
                </Text>

                <Text fontSize="r1" color="gray.900" w="20%">
                  {Number(field.validationPercent) * Number(field.fmvMaxAmount)}
                </Text>
                <Box display="flex" gap="s8">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsModal(true);
                      methods.reset({ ...field, index });
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    shade="danger"
                    variant="ghost"
                    onClick={() => {
                      remove(index);
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </>
  );
};
