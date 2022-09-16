import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import omit from 'lodash/omit';

import {
  MyraUserIdentificationInput,
  MyraUserInput,
  Roles,
  useAllAdministrationQuery,
  useGetSettingsUserEditDataQuery,
  UserGender,
  useSetSettingsUserDataMutation,
} from '@coop/cbs/data-access';
import { GroupContainer, InputGroupContainer } from '@coop/cbs/settings/ui-containers';
import {
  FormCheckboxGroup,
  FormEmailInput,
  FormFileInput,
  FormInput,
  FormMap,
  FormPhoneNumber,
  FormSelect,
  FormSwitch,
} from '@coop/shared/form';
import {
  asyncToast,
  Box,
  Container,
  FormFooter,
  FormHeader,
  FormSection,
  Grid,
  GridItem,
  Text,
} from '@coop/shared/ui';
import { RootState, useAppSelector, useTranslation } from '@coop/shared/utils';

import { BranchSelect } from '../components';

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

  const { t } = useTranslation();

  const methods = useForm<UserFormInput>();

  const { watch, getValues, reset } = methods;

  const role = watch('role');

  const identificationValues = watch('identificationSelection');

  const isPermanentAndTemporaryAddressSame = watch('isTempAsPermanentAddressSame');
  const { data } = useAllAdministrationQuery();

  const province = useMemo(
    () =>
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? [],
    [data?.administration?.all]
  );

  // FOR PERMANENT ADDRESS
  const currentProvinceId = watch('permanentAddress.provinceId');
  const currentDistrictId = watch('permanentAddress.districtId');
  const currentLocalityId = watch('permanentAddress.localGovernmentId');

  const districtList = useMemo(
    () => data?.administration.all.find((d) => d.id === currentProvinceId)?.districts ?? [],
    [currentProvinceId]
  );

  const localityList = useMemo(
    () => districtList.find((d) => d.id === currentDistrictId)?.municipalities ?? [],
    [currentDistrictId]
  );

  const wardList = useMemo(
    () => localityList.find((d) => d.id === currentLocalityId)?.wards ?? [],
    [currentLocalityId]
  );
  // FOR TEMPORARY ADDRESS
  const currentTempProvinceId = watch('temporaryAddress.provinceId');
  const currentTemptDistrictId = watch('temporaryAddress.districtId');
  const currentTempLocalityId = watch('temporaryAddress.localGovernmentId');

  const districtTempList = useMemo(
    () => data?.administration.all.find((d) => d.id === currentTempProvinceId)?.districts ?? [],
    [currentTempProvinceId]
  );

  const localityTempList = useMemo(
    () => districtTempList.find((d) => d.id === currentTemptDistrictId)?.municipalities ?? [],
    [currentTemptDistrictId]
  );

  const wardTempList = useMemo(
    () => localityTempList.find((d) => d.id === currentTempLocalityId)?.wards ?? [],
    [currentTempLocalityId]
  );

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
        success: 'New User Created',
        loading: 'Creating New User',
      },
      onSuccess: () => router.push('/settings/users/super-admin'),
      promise: mutateAsync({ id: id as string, data: formValues }),
    });
  };

  const { data: userQueryData, refetch: refetchUserData } = useGetSettingsUserEditDataQuery(
    {
      id: id as string,
    },
    {
      enabled: !!id,
    }
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
          <FormHeader title="Add User" closeLink="/settings/users/super-admin" />
        </Box>

        <Box bg="white" pb="120px">
          <FormProvider {...methods}>
            <form>
              <FormSection header="settingsUserAddUserBasicInformation">
                <FormInput type="text" name="name" label="Name" __placeholder="Enter Name" />

                <FormSelect
                  name="gender"
                  label="Gender"
                  __placeholder="Select Gender"
                  options={genderOptions}
                />

                <FormInput type="date" name="dob" label="Date of Birth (BS)" />

                {/* <FormDatePicker name="dob" label="Date of Birth" /> */}

                <FormPhoneNumber name="contactNo" label="Mobile No" __placeholder="Mobile No" />

                <FormEmailInput name="email" label="Email" __placeholder="Email" />

                <FormSelect
                  name="role"
                  label="Role"
                  __placeholder="Select Role"
                  options={roleOptions}
                />

                <BranchSelect
                  name="branch"
                  label="Service Center"
                  __placeholder="Select Service Center"
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
                          __placeholder={t['kynIndCitizenshipNo']}
                        />

                        <FormInput
                          type="text"
                          name="citizenship.place"
                          label={t['kynIndCitizenshipIssuePlace']}
                          __placeholder={t['kynIndCitizenshipIssuePlace']}
                        />

                        <FormInput
                          type="date"
                          name="citizenship.date"
                          label={t['kynIndCitizenshipIssueDate']}
                          __placeholder={t['kynIndCitizenshipIssueDate']}
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
                          __placeholder={t['kymIndDrivingLicenseNo']}
                        />

                        <FormInput
                          type="text"
                          name="drivingLicense.place"
                          label={t['kymIndDrivingLicenseIssuePlace']}
                          __placeholder={t['kymIndDrivingLicenseIssuePlace']}
                        />

                        <FormInput
                          type="date"
                          name="drivingLicense.date"
                          label={t['kymIndDrivingLicenseIssueDate']}
                          __placeholder={t['kymIndDrivingLicenseIssueDate']}
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
                        <FormInput
                          type="text"
                          name="passport.idNo"
                          label={t['kymIndPassportNo']}
                          __placeholder={t['kymIndPassportNo']}
                        />

                        <FormInput
                          type="text"
                          name="passport.place"
                          label={t['kymIndPassportIssuePlace']}
                          __placeholder={t['kymIndPassportIssuePlace']}
                        />

                        <FormInput
                          type="date"
                          name="passport.date"
                          label={t['kymIndPassportIssueDate']}
                          __placeholder={t['kymIndPassportIssueDate']}
                        />
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
                          __placeholder={t['kymIndVoterCardNo']}
                        />

                        <FormInput
                          type="text"
                          name="voterCard.place"
                          label={t['kymIndVoterCardPollingStation']}
                          __placeholder={t['kymIndVoterCardPollingStation']}
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
                          __placeholder={t['kymIndNationalIDNo']}
                        />
                      </InputGroupContainer>
                    </Box>
                  )}
                </GroupContainer>
              </Box>

              <FormSection id="kymAccIndPermanentAddress" header="kymIndPermanentAddress">
                <FormSelect
                  name="permanentAddress.provinceId"
                  label={t['kymIndProvince']}
                  __placeholder={t['kymIndSelectProvince']}
                  options={province}
                />
                <FormSelect
                  name="permanentAddress.districtId"
                  label={t['kymIndDistrict']}
                  __placeholder={t['kymIndSelectDistrict']}
                  options={districtList.map((d) => ({
                    label: d.name,
                    value: d.id,
                  }))}
                />
                <FormSelect
                  name="permanentAddress.localGovernmentId"
                  label={t['kymIndLocalGovernment']}
                  __placeholder={t['kymIndSelectLocalGovernment']}
                  options={localityList.map((d) => ({
                    label: d.name,
                    value: d.id,
                  }))}
                />
                <FormSelect
                  name="permanentAddress.wardNo"
                  label={t['kymIndWardNo']}
                  __placeholder={t['kymIndEnterWardNo']}
                  options={wardList?.map((d) => ({
                    label: d,
                    value: d,
                  }))}
                />
                <FormInput
                  type="text"
                  name="permanentAddress.locality"
                  label={t['kymIndLocality']}
                  __placeholder={t['kymIndEnterLocality']}
                />
                <FormInput
                  type="number"
                  name="permanentAddress.houseNo"
                  label={t['kymIndHouseNo']}
                  __placeholder={t['kymIndEnterHouseNo']}
                />

                <GridItem colSpan={2}>
                  <FormMap name="permanentAddress.coordinates" />
                </GridItem>
              </FormSection>

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
                      <FormSelect
                        name="temporaryAddress.provinceId"
                        label={t['kymIndProvince']}
                        __placeholder={t['kymIndSelectProvince']}
                        options={province}
                      />
                      <FormSelect
                        name="temporaryAddress.districtId"
                        label={t['kymIndDistrict']}
                        __placeholder={t['kymIndSelectDistrict']}
                        options={districtTempList.map((d) => ({
                          label: d.name,
                          value: d.id,
                        }))}
                      />
                      <FormSelect
                        name="temporaryAddress.localGovernmentId"
                        label={t['kymIndLocalGovernment']}
                        __placeholder={t['kymIndSelectLocalGovernment']}
                        options={localityTempList.map((d) => ({
                          label: d.name,
                          value: d.id,
                        }))}
                      />
                      <FormSelect
                        name="temporaryAddress.wardNo"
                        label={t['kymIndWardNo']}
                        __placeholder={t['kymIndEnterWardNo']}
                        options={wardTempList.map((d) => ({
                          label: d,
                          value: d,
                        }))}
                      />
                      <FormInput
                        type="text"
                        name="temporaryAddress.locality"
                        label={t['kymIndLocality']}
                        __placeholder={t['kymIndEnterLocality']}
                      />
                      <FormInput
                        type="number"
                        name="temporaryAddress.houseNo"
                        label={t['kymIndHouseNo']}
                        __placeholder={t['kymIndEnterHouseNo']}
                      />

                      <GridItem colSpan={2}>
                        <FormMap name="temporaryAddress.coordinates" />
                      </GridItem>
                    </Grid>
                  </Box>
                )}
              </Box>

              <FormSection
                header="kymIndINCASERESIDINGINRENTEDHOUSE"
                id="kymAccIndIncaseofresidinginRentedHouse"
              >
                <FormInput
                  type="text"
                  name="landlordName"
                  label={t['kymIndLandlordName']}
                  __placeholder={t['kymIndLandlordName']}
                />
                <FormInput
                  type="number"
                  name="landlordContact"
                  label={t['kymIndContactNo']}
                  __placeholder={t['kymIndContactNo']}
                />
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
              mainButtonLabel="Send Invitation"
              mainButtonHandler={handleSendInvitation}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default AddUser;
