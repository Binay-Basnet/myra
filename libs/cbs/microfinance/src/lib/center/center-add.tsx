import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, FormSection, GridItem } from '@myra-ui';

import {
  DocumentInsertInput,
  MfCenterInput,
  useAddMfCenterMutation,
  useGetSettingsUserListDataQuery,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import {
  FormAddress,
  FormBranchSelect,
  FormFileInput,
  FormInput,
  FormLayout,
  FormSelect,
  FormTextArea,
} from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

const documentMap = [
  'agm/bod-decision-document',
  'registered-certificate',
  'moa/aoa',
  'pan-certificate',
];

export const CenterAdd = () => {
  const methods = useForm();
  const router = useRouter();
  const { getValues, watch } = methods;

  const allowedServiceCenterWatch = watch('serviceCenterIds');
  const coordinatorServiceCenterWatch = watch('coordinatorServiceCenter');

  const { data: userListQueryData } = useGetSettingsUserListDataQuery(
    {
      paginate: {
        ...getPaginationQuery(),
        first: -1,
        order: {
          arrange: 'ASC',
          column: 'ID',
        },
      },
      filter: {
        orConditions: [
          {
            andConditions: [
              { column: 'branchId', comparator: 'EqualTo', value: coordinatorServiceCenterWatch },
            ],
          },
        ],
      },
    },
    { enabled: !!coordinatorServiceCenterWatch }
  );

  const { mutateAsync } = useAddMfCenterMutation();

  const submitForm = () => {
    const values = getValues();

    const serviceCenterIds = values?.serviceCenterIds?.map(
      (item: { value: string }) => item?.value
    );

    asyncToast({
      id: 'add-center',
      msgs: {
        success: 'new center added succesfully',
        loading: 'adding new center',
      },
      onSuccess: () => {
        router.push(ROUTES?.CBS_MICRO_FINANCE_CENTER_LIST);
      },
      promise: mutateAsync({
        input: {
          ...values,
          serviceCenterIds,
          documents: values?.documents?.map((item: DocumentInsertInput, index: number) => ({
            fieldId: documentMap[index],
            identifiers: item?.identifiers || [],
          })),
        } as MfCenterInput,
      }),
    });
  };

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="New Microfinance Center" />
      <FormLayout.Content>
        <FormLayout.Form>
          <FormSection templateColumns={3} divider>
            <GridItem colSpan={2}>
              <FormInput label="MF Center Name" name="centerName" />
            </GridItem>
            <FormInput label="MF Center ID" name="centerCode" />

            <FormBranchSelect label="Allowed Service Center" name="serviceCenterIds" isMulti />
            <FormSelect
              label="Coordinator Service Center"
              name="coordinatorServiceCenter"
              options={allowedServiceCenterWatch}
            />
            <FormSelect
              label="User"
              name="coordinatorId"
              options={
                userListQueryData?.settings?.myraUser?.list?.edges?.map((item) => ({
                  label: item?.node?.name,
                  value: item?.node?.id,
                })) as { value: string; label: string }[]
              }
            />
            <GridItem colSpan={3}>
              <FormTextArea label="Description" name="description" />
            </GridItem>
          </FormSection>
          <FormSection header="Address">
            <FormAddress name="address" />
          </FormSection>
          <FormSection templateColumns={2} header="Document Declarations">
            <FormFileInput name="documents.0.identifiers" label="AGM/BOD Decision Document" />
            <FormFileInput name="documents.1.identifiers" label="Registered Certificate" />
            <FormFileInput name="documents.2.identifiers" label="MOA/AOA" />
            <FormFileInput name="documents.3.identifiers" label="PAN Certificate" />
          </FormSection>
        </FormLayout.Form>{' '}
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={submitForm} />
    </FormLayout>
  );
};

export default CenterAdd;
