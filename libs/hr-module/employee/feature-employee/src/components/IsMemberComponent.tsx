import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useGetJobApplicantOptions } from '@hr/common';

import { Box, FormSection } from '@myra-ui';

import {
  MemberType,
  useGetJobApplicationQuery,
  useGetKymIndividualFormDataQuery,
} from '@coop/cbs/data-access';
import { FormCheckbox, FormMemberSelect, FormSelect } from '@coop/shared/form';

export const IsMemberComponent = () => {
  const { watch, setValue, reset } = useFormContext();

  const isCoopMemberWatch = watch('isCoopMember');
  const coopMemberIdWatch = watch('coopMemberId');
  const isMyraErpUserWatch = watch('isMyraErpUser');
  const isJobApplicationWatch = watch('isJobApplication');
  const jobApplicantIdWatch = watch('jobApplicationId');

  const { jobApplicationOptions } = useGetJobApplicantOptions();

  useEffect(() => {
    if (isCoopMemberWatch) {
      setValue('isMyraErpUser', false);
      setValue('isJobApplication', false);
      setValue('myraErpUserId', '');
      setValue('jobApplicationId', '');
    }
  }, [isCoopMemberWatch]);

  useEffect(() => {
    if (isMyraErpUserWatch) {
      setValue('isCoopMember', false);
      setValue('isJobApplication', false);
      setValue('coopMemberId', '');
      setValue('jobApplicationId', '');
    }
  }, [isMyraErpUserWatch]);

  useEffect(() => {
    if (isJobApplicationWatch) {
      setValue('isCoopMember', false);
      setValue('isMyraErpUser', false);
      setValue('myraErpUserId', '');
      setValue('coopMemberId', '');
    }
  }, [isJobApplicationWatch]);

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

  const basicInfo = memberData?.members?.individual?.formState?.data;

  const jobApplicantData =
    jobApplicant?.hr?.recruitment?.recruitmentJobApplication?.getJobApplication?.data;

  useEffect(() => {
    if (basicInfo) {
      reset({
        firstName: basicInfo?.firstName?.local,
        middleName: basicInfo?.middleName?.local,
        lastName: basicInfo?.lastName?.local,
        gender: basicInfo?.genderId,
        dateOfBirth: basicInfo?.dateOfBirth,
        personalPhoneNumber: basicInfo?.mobileNumber,
        // personalEmailAddress: basicInfo?.email,
        maritalStatus: basicInfo?.maritalStatusId,
        permanentAddress: {
          ...basicInfo?.permanentAddress,
          locality: basicInfo?.permanentAddress?.locality?.local,
        },
        isTemporarySameAsPermanent: basicInfo?.sameTempAsPermanentAddress,
        temporaryAddress: {
          ...basicInfo?.temporaryAddress,
          locality: basicInfo?.temporaryAddress?.locality?.local,
        },
      });
      setValue('isCoopMember', true);
      setValue('coopMemberId', coopMemberIdWatch);
    }
  }, [JSON.stringify(basicInfo)]);

  useEffect(() => {
    if (jobApplicantData) {
      reset({
        firstName: jobApplicantData?.applicantName,
        permanentAddress: {
          ...jobApplicantData?.permanentAddress,
          locality: jobApplicantData?.permanentAddress?.locality?.local,
        },
        isTemporarySameAsPermanent: jobApplicantData?.tempSameAsPerm,
        temporaryAddress: {
          ...jobApplicantData?.temporaryAddress,
          locality: jobApplicantData?.temporaryAddress?.locality?.local,
        },
        educationDetails: jobApplicantData?.educationalDetails,
        workExperience: jobApplicantData?.experienceDetails,
      });
      setValue('isJobApplication', true);
      setValue('jobApplicationId', jobApplicantIdWatch);
    }
  }, [JSON.stringify(jobApplicantData)]);

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
          />
        )}
      </Box>
      <Box display="flex" flexDirection="column" gap="s16">
        <FormCheckbox label="MyraERP User" name="isMyraErpUser" />
        {isMyraErpUserWatch && (
          <FormMemberSelect
            label="Member"
            name="myraErpUserId"
            memberType={MemberType?.Individual}
            forceEnableAll
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
          />
        )}
      </Box>
    </FormSection>
  );
};

export default IsMemberComponent;
