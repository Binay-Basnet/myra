import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { omit } from 'lodash';

import {
  asyncToast,
  Box,
  Container,
  FormFooter,
  FormHeader,
  FormSection,
  GridItem,
} from '@myra-ui';

import {
  TypeOfOrganization,
  useGetOrganizationEditDataQuery,
  useSetOrganizationDataMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import {
  FormAddress,
  FormFileInput,
  FormInput,
  FormRadioGroup,
  FormTextArea,
} from '@coop/shared/form';

export const CbsSettingsFeatureOrgEdit = () => {
  const router = useRouter();
  const methods = useForm();
  const { getValues, reset } = methods;
  const { data } = useGetOrganizationEditDataQuery();
  const organizationData = data?.settings?.general?.organization?.formState?.data;

  useEffect(() => {
    const dataToReset = {
      ...omit({ ...organizationData }, ['id']),
      basicDetails: {
        ...organizationData?.basicDetails,
        logo: [organizationData?.basicDetails?.logo],
      },
      address: {
        ...organizationData?.address,
        locality: organizationData?.address?.locality?.local,
      },
    };
    reset(dataToReset);
  }, [JSON.stringify(organizationData)]);

  const { mutateAsync: mutateOrganizationData } = useSetOrganizationDataMutation();
  const submitForm = () => {
    asyncToast({
      id: 'organization-id',
      msgs: {
        success: 'Organization Data updated successfully',
        loading: 'Updating Organization Data',
      },
      onSuccess: () => {
        router.push(ROUTES.SETTINGS_GENERAL_ORGANIZATION_DETAILS);
      },
      promise: mutateOrganizationData({
        data: {
          ...getValues(),
          basicDetails: {
            ...getValues()?.basicDetails,
            logo: getValues()?.basicDetails?.logo[0],
          },
          address: {
            ...omit({ ...getValues()?.address }, ['houseNo', 'coordinates']),
            location: getValues()?.coordinates,
          },
        },
      }),
      onError: (error) => {
        if (error.__typename === 'ValidationError') {
          Object.keys(error.validationErrorMsg).map((key) =>
            methods.setError(key, {
              message: error.validationErrorMsg[key][0] as string,
            })
          );
        }
      },
    });
  };
  return (
    <Container minW="container.lg" height="fit-content" paddingInline="0">
      <Box position="sticky" top="0" bg="gray.100" width="100%" zIndex="10">
        <FormHeader title="Edit Organization Profile" />
      </Box>
      <Box bg="white">
        <FormProvider {...methods}>
          <form>
            <FormSection header="Basic Details">
              <GridItem colSpan={3}>
                <FormInput label="Organization Name" name="basicDetails.name" />
              </GridItem>

              <GridItem colSpan={3}>
                <Box w="-webkit-fit-content">
                  <FormFileInput size="sm" label="Organization Logo" name="basicDetails.logo" />
                </Box>
              </GridItem>
              <GridItem colSpan={3}>
                <FormRadioGroup
                  label="Type of Organization"
                  name="basicDetails.typeOfOrganization"
                  options={[
                    { label: 'Cooperative', value: TypeOfOrganization?.Cooperative },
                    { label: 'Cooperative Union', value: TypeOfOrganization?.CooperativeUnion },
                  ]}
                />
              </GridItem>
              <GridItem colSpan={3}>
                <FormTextArea label="Slogan" name="basicDetails.slogan" />
              </GridItem>
            </FormSection>
            <FormSection header="Contact Details">
              <FormInput label="Phone No" name="contactDetails.phoneNumber" />
              <FormInput label="Email" name="contactDetails.email" />
              <FormInput label="Website" name="contactDetails.website" />
            </FormSection>
            <FormSection header="Main Contact Person">
              <FormInput label="Name" name="mainContactPerson.contactPersonName" />
              <FormInput label="Contact No" name="mainContactPerson.contactPersonContactNumber" />
              <FormInput label="Title/Person" name="mainContactPerson.title" />
            </FormSection>
            <FormSection header="Address">
              <FormAddress name="address" />
            </FormSection>
            <FormSection header="Registration Details">
              <GridItem colSpan={2}>
                <FormInput label="Registered Office" name="registrationDetails.regdOffice" />
              </GridItem>
              <FormInput label="Registered No" name="registrationDetails.regdNo" />
              <GridItem colSpan={3}>
                <FormInput label="Registered Address" name="registrationDetails.regdAddress" />
              </GridItem>
              <FormInput label="PAN / VAT No" name="registrationDetails.panOrVat" />
            </FormSection>
            <FormSection header="Documents">
              <GridItem colSpan={3}>
                <FormFileInput name="documents" />
              </GridItem>
            </FormSection>
          </form>
        </FormProvider>
      </Box>
      <Box position="sticky" bottom={0}>
        <FormFooter mainButtonLabel="Save Changes" mainButtonHandler={submitForm} />
      </Box>
    </Container>
  );
};

export default CbsSettingsFeatureOrgEdit;
