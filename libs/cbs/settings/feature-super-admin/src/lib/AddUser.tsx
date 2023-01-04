import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import omit from 'lodash/omit';

import {
  asyncToast,
  Box,
  Container,
  FormFooter,
  FormHeader,
  FormSection,
  Grid,
  Text,
} from '@myra-ui';

import {
  MyraUserIdentificationInput,
  MyraUserInput,
  Roles,
  RootState,
  useAppSelector,
  useGetSettingsUserEditDataQuery,
  UserGender,
  useSetSettingsUserDataMutation,
} from '@coop/cbs/data-access';
import { GroupContainer, InputGroupContainer } from '@coop/cbs/settings/ui-containers';
import {
  FormAddress,
  FormBranchSelect,
  FormCheckboxGroup,
  FormDatePicker,
  FormEmailInput,
  FormFileInput,
  FormInput,
  FormPhoneNumber,
  FormSelect,
  FormSwitch,
} from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';
import { ROUTES } from '@coop/cbs/utils';

/* eslint-disable-next-line */
export interface AddUserProps {}

const genderOptions = [
  { label: 'Male', value: UserGender.Male },
  { label: 'Female', value: UserGender.Female },
  { label: 'Other', value: UserGender.Other },
];

const roleOptions = [
  { label: 'Market Representative', value: Roles.Agent },
  { label: 'Service Center Manager', value: Roles.BranchManager },
  { label: 'Head Teller', value: Roles.HeadTeller },
  { label: 'Teller', value: Roles.Teller },
  { label: 'Super Admin', value: Roles.Superadmin },
];

const identificationOptions = [
  { value: 'citizenship', label: 'Citizenship' },
  { value: 'drivingLicense', label: 'Driving License' },
  { value: 'passport', label: 'Passport' },
  { value: 'voterCard', label: 'Voter Card' },
  { value: 'nationalId', label: 'National ID' },
];

type UserFormInput = MyraUserInput & {
  citizenship?: MyraUserIdentificationInput;
  drivingLicense?: MyraUserIdentificationInput;
  passport?: MyraUserIdentificationInput;
  voterCard?: MyraUserIdentificationInput;
  nationalId?: MyraUserIdentificationInput;
};

export const AddUser = () => {
  const router = useRouter();

  const id = router?.query?.['id'];

  const isEdit = router?.asPath?.includes('edit');

  const { t } = useTranslation();

  const methods = useForm<UserFormInput>();

  const { watch, getValues, reset } = methods;

  const role = watch('role');

  const identificationValues = watch('identificationSelection');

  const isPermanentAndTemporaryAddressSame = watch('isTempAsPermanentAddressSame');

  const addUser = useAppSelector((state: RootState) => state?.addUser);

  useEffect(() => {
    reset({ ...addUser.userData });
  }, [addUser]);

  const { mutateAsync } = useSetSettingsUserDataMutation();

  const handleSendInvitation = () => {
    let formValues = getValues();

    formValues['identificationDetails'] = [];

    if (formValues?.citizenship) {
      formValues['identificationDetails'].push({
        ...formValues.citizenship,
        idType: 'citizenship',
      });
    }

    if (formValues?.drivingLicense) {
      formValues['identificationDetails'].push({
        ...formValues.drivingLicense,
        idType: 'drivingLicense',
      });
    }

    if (formValues?.passport) {
      formValues['identificationDetails'].push({
        ...formValues.passport,
        idType: 'passport',
      });
    }

    if (formValues?.voterCard) {
      formValues['identificationDetails'].push({
        ...formValues.voterCard,
        idType: 'voterCard',
      });
    }

    if (formValues?.nationalId) {
      formValues['identificationDetails'].push({
        ...formValues.nationalId,
        idType: 'nationalId',
      });
    }

    formValues = omit({ ...formValues }, [
      'citizenship',
      'drivingLicense',
      'passport',
      'voterCard',
      'nationalId',
    ]);

    asyncToast({
      id: 'create-new-user',
      msgs: {
        success: router.asPath.includes('edit') ? 'User Updated' : 'New User Created',
        loading: router.asPath.includes('edit') ? 'Updating User' : 'Creating New User',
      },
      onSuccess: () => router.push('/settings/users/super-admin'),
      promise: mutateAsync({ id: id as string, data: formValues }),
    });
  };

  const { data: userQueryData, refetch: refetchUserData } = useGetSettingsUserEditDataQuery(
    {
      id: id as string,
    },
    { enabled: Boolean(id && router?.asPath?.includes('edit')), staleTime: 0 }
  );

  useEffect(() => {
    const userData = userQueryData?.settings?.myraUser?.formState?.data;

    if (userData) {
      const formData = omit(userData, [
        'permanentAddress',
        'temporaryAddress',
        'identificationDetails',
      ]) as MyraUserInput;

      userData?.identificationDetails?.forEach((identification) => {
        if (identification?.idType) {
          formData[identification?.idType] = omit(identification, 'idType', 'id');
        }
      });

      reset({
        ...formData,
        permanentAddress: {
          ...userData?.permanentAddress,
          locality: userData?.permanentAddress?.locality?.local,
        },
        temporaryAddress: {
          ...userData?.temporaryAddress,
          locality: userData?.temporaryAddress?.locality?.local,
        },
      });
    }
  }, [userQueryData]);

  useEffect(() => {
    if (id) {
      refetchUserData();
    }
  }, [id]);

  return (
    <>
      <Container minW="container.xl" height="fit-content">
        <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
          <FormHeader
            title={isEdit ? 'Edit User' : 'Add User'}
            closeLink={ROUTES.SETTINGS_USERS_LIST}
          />
        </Box>

        <Box bg="white" pb="120px">
          <FormProvider {...methods}>
            <form>
              <Box p="s20">
                <FormSwitch name="isCoreEmployee" label="This user is a core employee" />
              </Box>
              <FormSection header="settingsUserAddUserBasicInformation" templateColumns={2}>
                <FormInput isRequired type="text" name="name" label="Name" />
                <FormInput type="text" name="empCode" label="Employee Code" />

                <FormSelect isRequired name="gender" label="Gender" options={genderOptions} />

                {/* <FormInput type="date" name="dob" label="Date of Birth (BS)" /> */}

                <FormDatePicker isRequired name="dob" label="Date of Birth" maxToday />

                <FormPhoneNumber isRequired name="contactNo" label="Mobile No" />

                <FormEmailInput isRequired name="email" label="Email" />

                <FormSelect
                  isRequired
                  name="role"
                  label="Role"
                  options={roleOptions}
                  isDisabled={isEdit}
                />

                <FormBranchSelect
                  name="branch"
                  label="Service Center"
                  isDisabled={role === Roles.Superadmin}
                />
              </FormSection>

              <Box borderBottom="1px solid" borderBottomColor="border.layout">
                <GroupContainer>
                  <Text fontSize="r1" fontWeight="semibold" color="neutralColorLight.Gray-80">
                    {t['kymIndIDENTIFICATIONDETAILS']}
                  </Text>
                  <Text fontSize="r1" fontWeight="medium">
                    {t['kymIndChooseidentificationdetails']}
                  </Text>
                  <FormCheckboxGroup
                    name="identificationSelection"
                    showOther={false}
                    list={identificationOptions}
                  />
                </GroupContainer>

                <GroupContainer>
                  {identificationValues?.includes('citizenship') && (
                    <Box display="flex" flexDirection="column" gap="s16">
                      <Text fontSize="r1" fontWeight="medium" color="neutralColorLight.Gray-70">
                        {t['kynIndCitizenship']}
                      </Text>

                      <InputGroupContainer>
                        <FormInput
                          type="text"
                          name="citizenship.idNo"
                          label={t['kynIndCitizenshipNo']}
                        />

                        <FormInput
                          type="text"
                          name="citizenship.place"
                          label={t['kynIndCitizenshipIssuePlace']}
                        />

                        <FormDatePicker
                          name="citizenship.date"
                          label={t['kynIndCitizenshipIssueDate']}
                        />
                      </InputGroupContainer>
                    </Box>
                  )}

                  {identificationValues?.includes('drivingLicense') && (
                    <Box display="flex" flexDirection="column" gap="s16">
                      <Text fontSize="r1" fontWeight="medium" color="neutralColorLight.Gray-70">
                        {t['kymIndDrivingLicense']}
                      </Text>

                      <InputGroupContainer>
                        <FormInput
                          type="text"
                          name="drivingLicense.idNo"
                          label={t['kymIndDrivingLicenseNo']}
                        />

                        <FormInput
                          type="text"
                          name="drivingLicense.place"
                          label={t['kymIndDrivingLicenseIssuePlace']}
                        />

                        <FormDatePicker
                          name="drivingLicense.date"
                          label={t['kymIndDrivingLicenseIssueDate']}
                        />
                      </InputGroupContainer>
                    </Box>
                  )}

                  {identificationValues?.includes('passport') && (
                    <Box display="flex" flexDirection="column" gap="s16">
                      <Text fontSize="r1" fontWeight="medium" color="neutralColorLight.Gray-70">
                        {t['kymIndPassport']}
                      </Text>

                      <InputGroupContainer>
                        <FormInput type="text" name="passport.idNo" label={t['kymIndPassportNo']} />

                        <FormInput
                          type="text"
                          name="passport.place"
                          label={t['kymIndPassportIssuePlace']}
                        />

                        <FormDatePicker name="passport.date" label={t['kymIndPassportIssueDate']} />
                      </InputGroupContainer>
                    </Box>
                  )}

                  {identificationValues?.includes('voterCard') && (
                    <Box display="flex" flexDirection="column" gap="s16">
                      <Text fontSize="r1" fontWeight="medium" color="neutralColorLight.Gray-70">
                        {t['kymIndVoterCard']}
                      </Text>

                      <InputGroupContainer>
                        <FormInput
                          type="text"
                          name="voterCard.idNo"
                          label={t['kymIndVoterCardNo']}
                        />

                        <FormInput
                          type="text"
                          name="voterCard.place"
                          label={t['kymIndVoterCardPollingStation']}
                        />
                      </InputGroupContainer>
                    </Box>
                  )}

                  {identificationValues?.includes('nationalId') && (
                    <Box display="flex" flexDirection="column" gap="s16">
                      <Text fontSize="r1" fontWeight="medium" color="neutralColorLight.Gray-70">
                        {t['kymIndNationalID']}
                      </Text>

                      <InputGroupContainer>
                        <FormInput
                          type="text"
                          name="nationalId.idNo"
                          label={t['kymIndNationalIDNo']}
                        />
                      </InputGroupContainer>
                    </Box>
                  )}
                </GroupContainer>
              </Box>

              <FormAddress
                sectionId="kymAccIndPermanentAddress"
                sectionHeader="kymIndPermanentAddress"
                name="permanentAddress"
              />

              <Box
                id="kymAccIndTemporaryAddress"
                gap="s16"
                display="flex"
                flexDirection="column"
                scrollMarginTop="200px"
              >
                <Box p="s20" pb="0" display="flex" flexDirection="column" gap="s16">
                  <Text fontSize="r1" fontWeight="semibold" color="neutralColorLight.Gray-80">
                    {t['kymIndTemporaryAddress']}
                  </Text>
                  <FormSwitch
                    name="isTempAsPermanentAddressSame"
                    label={t['kymIndTemporaryAddressPermanent']}
                  />
                </Box>

                {!isPermanentAndTemporaryAddressSame && (
                  <Box borderBottom="1px solid" borderBottomColor="border.layout" p="s20" pt="0">
                    <Grid templateColumns="repeat(3,1fr)" gap="s20" rowGap="s16">
                      <FormAddress name="temporaryAddress" />
                    </Grid>
                  </Box>
                )}
              </Box>

              <FormSection
                header="kymIndINCASERESIDINGINRENTEDHOUSE"
                id="kymAccIndIncaseofresidinginRentedHouse"
              >
                <FormInput type="text" name="landlordName" label={t['kymIndLandlordName']} />
                <FormInput type="number" name="landlordContact" label={t['kymIndContactNo']} />
              </FormSection>

              <GroupContainer>
                <FormFileInput size="lg" label="Profile Picture" name="profilePicture" />
              </GroupContainer>
            </form>
          </FormProvider>
        </Box>
      </Container>
      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.xl" height="fit-content">
            <FormFooter
              mainButtonLabel={router?.asPath?.includes('edit') ? 'Save' : 'Send Invitation'}
              mainButtonHandler={handleSendInvitation}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default AddUser;
