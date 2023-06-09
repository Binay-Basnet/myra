import { useForm } from 'react-hook-form';

import { FormSection, GridItem } from '@myra-ui';

import {
  FormAddress,
  FormEmailInput,
  FormFileInput,
  FormInput,
  FormLayout,
  FormPhoneNumber,
  FormRating,
  FormSelect,
} from '@coop/shared/form';

import { EducationalDetailsAdd } from '../../components/EducationDetailsAdd';
import { ExperienceDetailsAdd } from '../../components/ExperienceDetailsAdd';

export const HrRecruitmentJobApplicationAdd = () => {
  const methods = useForm();
  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="New Job Application" />
      <FormLayout.Content>
        <FormLayout.Form>
          <FormSection templateColumns={3} divider>
            <GridItem colSpan={2}>
              <FormInput name="applicantName" type="text" label="Applicant Name" />
            </GridItem>
            <FormSelect name="jobOpening" label="Job Opening" />
          </FormSection>
          <FormSection templateColumns={3} header="Contact Details" divider>
            <FormEmailInput name="emailAddress" type="email" label="Personal Email Address" />
            <FormPhoneNumber name="contactNumber" type="phone" label="Personal Contact Number" />
          </FormSection>
          <FormSection templateColumns={3} header="Permanent Address" divider>
            <FormAddress name="permanentAddress" />
          </FormSection>
          <FormSection templateColumns={3} header="Temporary Address" divider>
            <FormAddress name="temporaryAddress" />
          </FormSection>
          <FormSection templateColumns={2} header="Document" divider>
            <FormFileInput size="sm" name="resume" label="Resume/CV" />
            <FormFileInput size="sm" name="coverLetter" label="Cover Letter" />
          </FormSection>
          <EducationalDetailsAdd />
          <ExperienceDetailsAdd />
          <FormSection templateColumns={2} header="Impression" divider>
            <FormSelect name="status" label="Status" />
            <FormRating name="Application Rating" label="Application Rating" />
          </FormSection>
        </FormLayout.Form>{' '}
      </FormLayout.Content>
    </FormLayout>
  );
};
export default HrRecruitmentJobApplicationAdd;
