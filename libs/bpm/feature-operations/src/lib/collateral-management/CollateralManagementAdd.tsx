import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, FormSection, GridItem } from '@myra-ui';

import {
  CollateralUpdateType,
  useGetLoanAccountCollateralDetailsQuery,
  useGetLoanAccountListQuery,
  useSetUpdateCollateralMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import {
  FormFileInput,
  FormLayout,
  FormMemberSelect,
  FormSelect,
  FormTextArea,
} from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

import CollateralCard from './components/CollateralCard';

export const CollateralManagementAdd = () => {
  const router = useRouter;
  const [isRelease, setIsRelease] = React.useState(false);
  const methods = useForm();
  const { watch, getValues } = methods;
  const memberIdWatch = watch('memberId');

  const { mutateAsync } = useSetUpdateCollateralMutation();
  const { data } = useGetLoanAccountListQuery(
    {
      paginate: {
        ...getPaginationQuery(),

        order: null,
      },
      filter: {
        query: memberIdWatch as string,
        orConditions: [
          {
            andConditions: [
              {
                column: 'objState',
                comparator: 'EqualTo',
                value: '',
              },
            ],
          },
        ],
      },
    },
    {
      enabled: !!memberIdWatch,
    }
  );
  const loanAccountData = data?.settings?.general?.loanProducts?.getLoanAccountlist?.edges;

  const loanAccountIdWatch = watch('loanAccount');

  const { data: loanAccountCollateralDetailsData } = useGetLoanAccountCollateralDetailsQuery(
    {
      loanAccountId: loanAccountIdWatch as string,
    },
    { enabled: !!loanAccountIdWatch }
  );

  const collateralListData =
    loanAccountCollateralDetailsData?.loanAccount?.loanAccountDetails?.collateral?.collateralList;
  /* eslint-disable no-nested-ternary */
  const collateralListOptions = collateralListData?.map((item) => ({
    label:
      item?.collateralType === 'Vehicle'
        ? item?.vehicleName
        : item?.collateralType === 'Documents'
        ? item?.documentName
        : item?.ownerName,
    value: item?.collateralID,
  }));

  const collateralIdWatch = watch('collateralId');
  const selectedCollateral = collateralListData?.filter(
    (item) => item?.collateralID === collateralIdWatch
  );

  const releaseHandler = (value: boolean) => {
    setIsRelease(value);
  };

  const submitForm = () => {
    const values = getValues();
    if (isRelease) {
      asyncToast({
        id: 'release-collateral',
        msgs: {
          success: 'Collateral released successfully',
          loading: 'releasing collateral',
        },
        onSuccess: () => {
          router.push(ROUTES?.BPM_OPERATIONS_COLLATERAL_MANAGEMENT_LIST);
        },
        promise: mutateAsync({
          loanAccountId: values?.loanAccount,
          updateType: CollateralUpdateType?.Release,
          data: {
            release: {
              loanAccountID: values?.loanAccount,
              collateralID: values?.collateralId,
              files: values?.files,
              note: values?.note,
            },
          },
        }),
      });
    }
  };

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="Collateral Management" />

      <FormLayout.Content>
        <FormLayout.Form>
          <FormSection templateColumns={3} divider>
            <GridItem colSpan={3}>
              <FormMemberSelect name="memberId" label="Member" />
            </GridItem>
            <GridItem colSpan={3}>
              <FormSelect
                name="loanAccount"
                label="Loan Account Name"
                options={loanAccountData?.map((item) => ({
                  label: item?.node?.LoanAccountName,
                  value: item?.node?.id,
                }))}
              />
            </GridItem>
          </FormSection>
          <FormSection templateColumns={3} divider>
            <GridItem colSpan={3}>
              <FormSelect
                name="collateralId"
                label="Select Collateral"
                options={collateralListOptions}
              />
            </GridItem>
            {!!collateralIdWatch && (
              <GridItem colSpan={3}>
                <CollateralCard
                  data={selectedCollateral?.[0]}
                  isRelease={isRelease}
                  releaseHandler={releaseHandler}
                />
              </GridItem>
            )}
          </FormSection>
          <FormSection templateColumns={3} divider>
            <GridItem colSpan={3}>
              <FormFileInput name="files" label="file Upload" size="sm" />
            </GridItem>
            <GridItem colSpan={3}>
              <FormTextArea name="note" label="Notes" />
            </GridItem>
          </FormSection>
        </FormLayout.Form>{' '}
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={submitForm} />
    </FormLayout>
  );
};

export default CollateralManagementAdd;
