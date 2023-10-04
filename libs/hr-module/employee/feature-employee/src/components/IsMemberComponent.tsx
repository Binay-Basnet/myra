import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useGetJobApplicantOptions } from '@hr/common';

import { Box, FormSection } from '@myra-ui';

import {
  MemberType,
  useGetJobApplicationQuery,
  useGetKymIndividualFormDataQuery,
  useGetSettingsUserEditDataQuery,
  useGetSettingsUserListDataQuery,
} from '@coop/cbs/data-access';
import { FormCheckbox, FormMemberSelect, FormSelect } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

export const IsMemberComponent = () => {
  const router = useRouter();
  const { watch, setValue, reset } = useFormContext();

  const isCoopMemberWatch = watch('isCoopMember');
  const coopMemberIdWatch = watch('coopMemberId');
  const isMyraErpUserWatch = watch('isMyraErpUser');
  const myraErpUserIdWatch = watch('myraErpUserId');
  const isJobApplicationWatch = watch('isJobApplication');
  const jobApplicantIdWatch = watch('jobApplicationId');

  const { jobApplicationOptions } = useGetJobApplicantOptions();
  const { data: settingsUserListData } = useGetSettingsUserListDataQuery({
    paginate: {
      ...getPaginationQuery(),
      first: -1,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
  });

  const userListOptions = settingsUserListData?.settings?.myraUser?.list?.edges?.map((item) => ({
    label: item?.node?.name,
    value: item?.node?.id,
  }));

  const { data: userDetailsData } = useGetSettingsUserEditDataQuery(
    { id: myraErpUserIdWatch },
    { enabled: !!myraErpUserIdWatch }
  );

  const { data: memberData } = useGetKymIndividualFormDataQuery(
    {
      id: String(coopMemberIdWatch),
    },
    { enabled: !!coopMemberIdWatch }
  );

  const { data: jobApplicant } = useGetJobApplicationQuery(
    {
      id: jobApplicantIdWatch,
    },
    { enabled: !!jobApplicantIdWatch }
  );

  const memberInfo = memberData?.members?.individual?.formState?.data;
  const userInfo = userDetailsData?.settings?.myraUser?.formState?.data;
  const jobApplicantInfo =
    jobApplicant?.hr?.recruitment?.recruitmentJobApplication?.getJobApplication?.data;

  const info = {
    firstName: memberInfo?.firstName?.local || userInfo?.name || jobApplicantInfo?.applicantName,
    middleName: memberInfo?.middleName?.local,
    lastName: memberInfo?.lastName?.local,
    dateOfBirth: memberInfo?.dateOfBirth || userInfo?.dob,
    gender: memberInfo?.genderId || userInfo?.gender,
    maritalStatus: memberInfo?.maritalStatusId,
    ethnicity: memberInfo?.ethnicityId,
    workEmailAddress:
      memberInfo?.email || userInfo?.email || jobApplicantInfo?.personalEmailAddress,
    personalPhoneNumber:
      memberInfo?.phoneNumber || userInfo?.contactNo || jobApplicantInfo?.personalPhoneNumber,
    permanentAddress: {
      provinceId:
        memberInfo?.permanentAddress?.provinceId ||
        userInfo?.permanentAddress?.provinceId ||
        jobApplicantInfo?.permanentAddress?.provinceId,
      districtId:
        memberInfo?.permanentAddress?.districtId ||
        userInfo?.permanentAddress?.districtId ||
        jobApplicantInfo?.permanentAddress?.districtId,
      localGovernmentId:
        memberInfo?.permanentAddress?.localGovernmentId ||
        userInfo?.permanentAddress?.localGovernmentId ||
        jobApplicantInfo?.permanentAddress?.localGovernmentId,
      wardNo:
        memberInfo?.permanentAddress?.wardNo ||
        userInfo?.permanentAddress?.wardNo ||
        jobApplicantInfo?.permanentAddress?.wardNo,
      locality:
        memberInfo?.permanentAddress?.locality?.local ||
        userInfo?.permanentAddress?.locality?.local ||
        jobApplicantInfo?.permanentAddress?.locality?.local,
      houseNo:
        memberInfo?.permanentAddress?.houseNo ||
        userInfo?.permanentAddress?.houseNo ||
        jobApplicantInfo?.permanentAddress?.houseNo,
    },
    isTemporarySameAsPermanent:
      memberInfo?.sameTempAsPermanentAddress ||
      userInfo?.isTempAsPermanentAddressSame ||
      jobApplicantInfo?.tempSameAsPerm,
    temporaryAddress: {
      provinceId:
        memberInfo?.temporaryAddress?.provinceId ||
        userInfo?.temporaryAddress?.provinceId ||
        jobApplicantInfo?.temporaryAddress?.provinceId,
      districtId:
        memberInfo?.temporaryAddress?.districtId ||
        userInfo?.temporaryAddress?.districtId ||
        jobApplicantInfo?.temporaryAddress?.districtId,
      localGovernmentId:
        memberInfo?.temporaryAddress?.localGovernmentId ||
        userInfo?.temporaryAddress?.localGovernmentId ||
        jobApplicantInfo?.temporaryAddress?.localGovernmentId,
      wardNo:
        memberInfo?.temporaryAddress?.wardNo ||
        userInfo?.temporaryAddress?.wardNo ||
        jobApplicantInfo?.temporaryAddress?.wardNo,
      locality:
        memberInfo?.temporaryAddress?.locality?.local ||
        userInfo?.temporaryAddress?.locality?.local ||
        jobApplicantInfo?.temporaryAddress?.locality?.local,
      houseNo:
        memberInfo?.temporaryAddress?.houseNo ||
        userInfo?.temporaryAddress?.houseNo ||
        jobApplicantInfo?.temporaryAddress?.houseNo,
    },
    familyDetails: memberInfo?.familyMembers?.map((item) => ({
      fullName: item?.fullName,
      relation: item?.relationshipId,
    })),
    educationDetails: jobApplicantInfo?.educationalDetails,
    workExperience: jobApplicantInfo?.experienceDetails,
  };

  useEffect(() => {
    if (info && !router?.query?.['id']) {
      reset(info);
      setValue('isCoopMember', isCoopMemberWatch);
      setValue('isMyraErpUser', isMyraErpUserWatch);
      setValue('isJobApplication', isJobApplicationWatch);
      setValue('coopMemberId', coopMemberIdWatch);
      setValue('jobApplicationId', jobApplicantIdWatch);
      setValue('myraErpUserId', myraErpUserIdWatch);
    }
  }, [JSON.stringify(info)]);

  return (
    <FormSection>
      <Box display="flex" flexDirection="column" gap="s16">
        <FormCheckbox label="Coop Member" name="isCoopMember" />
        {isCoopMemberWatch && (
          <FormMemberSelect
            label="Member"
            name="coopMemberId"
            memberType={MemberType?.Individual}
            forceEnableAll
            isDisabled={!!router?.query?.['id']}
          />
        )}
      </Box>
      <Box display="flex" flexDirection="column" gap="s16">
        <FormCheckbox label="MyraERP User" name="isMyraErpUser" />
        {isMyraErpUserWatch && (
          <FormSelect
            label="User"
            name="myraErpUserId"
            options={userListOptions}
            isDisabled={!!router?.query?.['id']}
          />
        )}
      </Box>
      <Box display="flex" flexDirection="column" gap="s16">
        <FormCheckbox label="Job Application" name="isJobApplication" />
        {isJobApplicationWatch && (
          <FormSelect
            label="Job Applicants"
            name="jobApplicationId"
            options={jobApplicationOptions}
            isDisabled={!!router?.query?.['id']}
          />
        )}
      </Box>
    </FormSection>
  );
};

export default IsMemberComponent;
