import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, Box, Container, FormFooter, FormHeader } from '@myra-ui';

import {
  useGetLoanAccountDetailsQuery,
  useSetLoanCollateralMutation,
  useSwitchCollateralMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

import { CollateralType } from '../components';
import { DocumentCollateral } from '../components/collateral/DocumentCollateral';
import { LandBuildingCollateral } from '../components/collateral/LandBuildingCollateral';
import { LandCollateral } from '../components/collateral/LandCollateral';
import { OtherCollateral } from '../components/collateral/OtherCollateral';
import { VehicleCollateral } from '../components/collateral/VehicleCollateral';
import { LoanProductContext, useLoanProductDetails } from '../hooks/useLoanProduct';

/* eslint-disable-next-line */
export interface CbsLoanFeatureLoanSwitchProps {}

export const CbsLoanFeatureLoanSwitch = () => {
  const router = useRouter();
  const { id, collatId } = router.query;
  const methods = useForm();
  const { watch, getValues } = methods;

  const { data: loanAccountDetailsQueryData } = useGetLoanAccountDetailsQuery({
    loanAccountId: id as string,
    paginate: getPaginationQuery(),
  });

  const productId =
    loanAccountDetailsQueryData?.loanAccount?.loanAccountDetails?.overView?.generalInformation
      ?.productId;
  const { loanProduct } = useLoanProductDetails({ productId: String(productId) });

  const collateralType = watch('collateralType');

  const filteredCollateral = loanProduct?.product?.collateralValue?.filter(
    (item) => item?.type === collateralType
  );

  const { mutateAsync } = useSwitchCollateralMutation();
  const { mutateAsync: addCollateralMutate } = useSetLoanCollateralMutation();

  const handleSubmit = () => {
    const values = getValues();

    if (router?.pathname.includes('collateral/add')) {
      asyncToast({
        id: 'collat-switch',
        msgs: {
          success: 'Collateral switched succesfully',
          loading: 'Switching Collateral',
        },
        onSuccess: () => router.push(`${ROUTES.CBS_LOAN_ACCOUNT_DETAILS}?id=${id}&tab=collateral`),
        promise: addCollateralMutate({
          loanAccountID: id as string,
          data: {
            ...values,
            collateralFiles: values?.collateralFiles?.map(
              (c) => (c as unknown as { identifier: string }).identifier
            ),
            valuationFiles: values?.valuationFiles?.map(
              (c) => (c as unknown as { identifier: string }).identifier
            ),
          },
        }),
      });
    } else {
      asyncToast({
        id: 'collat-switch',
        msgs: {
          success: 'Collateral switched succesfully',
          loading: 'Switching Collateral',
        },
        onSuccess: () => router.push(`${ROUTES.CBS_LOAN_ACCOUNT_DETAILS}?id=${id}&tab=collateral`),
        promise: mutateAsync({
          data: {
            loanAccountID: id as string,
            confirmSwitch: true,
            collateralID: collatId as string,
          },
          input: {
            ...values,
            collateralFiles: values?.collateralFiles?.map(
              (c) => (c as unknown as { identifier: string }).identifier
            ),
            valuationFiles: values?.valuationFiles?.map(
              (c) => (c as unknown as { identifier: string }).identifier
            ),
          },
        }),
      });
    }
  };

  return (
    <Container minW="container.xl" p="0" bg="white">
      <Box position="sticky" top="0" bg="gray.100" width="100%" zIndex="10">
        <FormHeader title="Switch Collateral" />
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
              <LoanProductContext.Provider value={loanProduct}>
                <CollateralType loanProduct={loanProduct?.product} />
                {filteredCollateral?.map((item) => item?.name === 'Land' && <LandCollateral />)}
                {filteredCollateral?.map(
                  (item) => item?.name === 'Land and Building' && <LandBuildingCollateral />
                )}
                {filteredCollateral?.map((item) => item?.name === 'Others' && <OtherCollateral />)}
                {filteredCollateral?.map(
                  (item) => item?.name === 'Vehicle' && <VehicleCollateral />
                )}
                {filteredCollateral?.map(
                  (item) => item?.name === 'Documents' && <DocumentCollateral />
                )}
              </LoanProductContext.Provider>
            </form>
          </FormProvider>
        </Box>
      </Box>
      <Box position="sticky" bottom={0} zIndex="11">
        <FormFooter mainButtonLabel="Send For Approval" mainButtonHandler={handleSubmit} />
      </Box>
    </Container>
  );
};

export default CbsLoanFeatureLoanSwitch;
