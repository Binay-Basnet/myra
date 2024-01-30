import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import omit from 'lodash/omit';

import { asyncToast, Box, FormSection, Grid, Loader, Text } from '@myra-ui';

import {
  Id_Type,
  MyraUserIdentificationInput,
  MyraUserInput,
  RootState,
  useAppSelector,
  useGetNewIdMutation,
  useGetSettingsUserEditDataQuery,
  useGetUserRolesQuery,
  UserGender,
  useSetSettingsUserDataMutation,
} from '@coop/cbs/data-access';
import { GroupContainer, InputGroupContainer } from '@coop/cbs/settings/ui-containers';
import { ROUTES } from '@coop/cbs/utils';
import {
  FormAddress,
  FormBranchSelect,
  FormCheckboxGroup,
  FormDatePicker,
  FormEmailInput,
  FormFileInput,
  FormInput,
  FormLayout,
  FormPhoneNumber,
  FormSelect,
  FormSwitch,
} from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AddUserProps {}

const genderOptions = [
  { label: 'Male', value: UserGender.Male },
  { label: 'Female', value: UserGender.Female },
  { label: 'Other', value: UserGender.Other },
];

const identificationOptions = [
  { value: 'citizenship', label: 'Citizenship' },
  { value: 'drivingLicense', label: 'Driving License' },
  { value: 'passport', label: 'Passport' },
  { value: 'voterCard', label: 'Voter Card' },
  { value: 'nationalId', label: 'National ID' },
];

type UserFormInput = Omit<MyraUserInput, 'branch' | 'role'> & {
  branch: { label: string; value: string }[] | string[];
  role: { label: string; value: string }[] | string[];
  citizenship?: MyraUserIdentificationInput;
  drivingLicense?: MyraUserIdentificationInput;
  passport?: MyraUserIdentificationInput;
  voterCard?: MyraUserIdentificationInput;
  nationalId?: MyraUserIdentificationInput;
};

export const AddUser = () => {
  const router = useRouter();
  const [newId, setNewId] = useState('');
  const { mutateAsync: newIdMutate } = useGetNewIdMutation();

  const { data: userRoles } = useGetUserRolesQuery();

  useEffect(() => {
    if (router?.query?.['id']) {
      newIdMutate({ idType: Id_Type.Myrauser }).then((res) => setNewId(res?.newId));
    }
  }, []);

  const id = router?.query?.['id'] || newId;

  const isEdit = router?.asPath?.includes('edit');

  const { t } = useTranslation();

  const methods = useForm<UserFormInput>();

  const { watch, getValues, reset } = methods;

  const identificationValues = watch('identificationSelection');

  const isPermanentAndTemporaryAddressSame = watch('isTempAsPermanentAddressSame');

  const addUser = useAppSelector((state: RootState) => state?.addUser);

  useEffect(() => {
    reset({
      ...addUser.userData,
    });
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
      onSuccess: () => router.push(ROUTES.SETTINGS_USERS_LIST),
      promise: mutateAsync({
        id: id as string,
        data: {
          ...formValues,
          role: formValues.role.map((role) =>
            role && typeof role !== 'string' ? role.value : role
          ),
          branch: formValues.branch.map((branch) =>
            branch && typeof branch !== 'string' ? branch.value : branch
          ),
        },
      }),
    });
  };

  const {
    data: userQueryData,
    refetch: refetchUserData,
    isLoading: editLoading,
  } = useGetSettingsUserEditDataQuery(
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
        // branch: userData?.branch as unknown as { label: string; value: string }[],
        branch: userData?.branch?.map((b) => ({ value: b })) as unknown as {
          label: string;
          value: string;
        }[],
        role: userData?.role as unknown as { label: string; value: string }[],
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
    <FormLayout methods={methods}>
      <FormLayout.Header
        title={isEdit ? 'Edit User' : 'Add User'}
        closeLink={ROUTES.SETTINGS_USERS_LIST}
      />

      <FormLayout.Content>
        <FormLayout.Form>
          {editLoading ? (
            <Box display="flex" bg="white" h="100vh" justifyContent="center" pt="100px">
              <Loader />
            </Box>
          ) : (
            <>
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
                  isMulti
                  name="role"
                  label="Role"
                  options={userRoles?.settings?.allRoles?.map((option) => ({
                    label: option?.name as string,
                    value: option?.id as string,
                  }))}
                />

                <FormBranchSelect isMulti name="branch" label="Service Center" />
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
                        {t['kymIndCitizenship']}
                      </Text>

                      <InputGroupContainer>
                        <FormInput
                          type="text"
                          name="citizenship.idNo"
                          label={t['kymIndCitizenshipNo']}
                        />

                        <FormInput
                          type="text"
                          name="citizenship.place"
                          label={t['kymIndCitizenshipIssuePlace']}
                        />

                        <FormDatePicker
                          name="citizenship.date"
                          label={t['kymIndCitizenshipIssueDate']}
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
            </>
          )}
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer
        mainButtonLabel={router?.asPath?.includes('edit') ? 'Save' : 'Send Invitation'}
        mainButtonHandler={handleSendInvitation}
      />
    </FormLayout>
  );
};

export default AddUser;
