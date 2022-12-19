import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, GridItem, PathBar } from '@myra-ui/components';
import { Box, Button } from '@myra-ui/foundations';
import { FormSection } from '@myra-ui/templates';

import { InfoCard } from '@coop/ebanking/cards';
import {
  useGetCoopListQuery,
  useGetKymGenderQuery,
  useNewMembershipRequestMutation,
} from '@coop/ebanking/data-access';
import { FormAddress, FormInput, FormSelect } from '@coop/shared/form';

export const CoopKYMPage = () => {
  const router = useRouter();
  const methods = useForm();
  const id = router.query['id'] as string;

  const { data: genderOptionsData } = useGetKymGenderQuery({ id }, { enabled: !!id });
  const { mutateAsync: requestMember } = useNewMembershipRequestMutation();
  const { data: coopListData } = useGetCoopListQuery();

  const selectedCoop = coopListData?.eBanking?.neosysClientsList?.find((coop) => coop?.id === id);

  return (
    <FormProvider {...methods}>
      <Box display="flex" flexDir="column" gap="s16">
        <PathBar
          paths={[
            { label: 'Apply for Coop Membership', link: '/setup/apply' },
            { label: `KYM Form ( ${selectedCoop?.clientName} )`, link: router.pathname },
          ]}
        />

        <InfoCard title="Personal Information">
          <FormSection header="Basic Information" templateColumns={6}>
            <GridItem colSpan={2}>
              <FormInput name="firstName" label="First Name" />
            </GridItem>
            <GridItem colSpan={2}>
              <FormInput name="middleName" label="Middle Name" />
            </GridItem>
            <GridItem colSpan={2}>
              <FormInput name="lastName" label="Last Name" />
            </GridItem>
            <GridItem colSpan={3}>
              <FormSelect
                name="gender"
                label="Gender"
                options={genderOptionsData?.genderOptions?.map((gender) => ({
                  label: gender?.nameEn as string,
                  value: gender?.id as string,
                }))}
              />
            </GridItem>
            <GridItem colSpan={3}>
              <FormInput type="date" name="dateOfBirth" label="Date of Birth" />
            </GridItem>
          </FormSection>
          <FormSection header="Contact Details">
            <FormInput name="mobileNumber" label="Mobile Number" />
            <FormInput name="phoneNumber" label="Phone Number" />
            <FormInput name="email" label="Email" />
          </FormSection>
          <FormSection header="Permanent Address" divider={false}>
            <FormAddress name="permanentAddress" />
          </FormSection>

          <Box px="s16" py="s16">
            <Button
              w="100px"
              onClick={async () => {
                await asyncToast({
                  id: 'request-member',
                  promise: requestMember({
                    data: methods.getValues(),
                    cooperativeId: id,
                  }),
                  msgs: {
                    success: 'Membership Requested !',
                    loading: 'Requesting for membership',
                  },
                  onSuccess: () => router.push('/setup'),
                  onError: (error) => {
                    methods.clearErrors();
                    if (error.__typename === 'ValidationError') {
                      Object.keys(error.validationErrorMsg).map((key) =>
                        methods.setError(key, {
                          message: error.validationErrorMsg[key][0] as string,
                        })
                      );
                    }
                  },
                });
              }}
            >
              Submit
            </Button>
          </Box>
        </InfoCard>
      </Box>
    </FormProvider>
  );
};
