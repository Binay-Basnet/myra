/* eslint-disable-next-line */
import { featureCode, useTranslation } from '@coop/shared/utils';
import { Box, FormHeader, FormSection, GridItem, Text, asyncToast } from '@myra-ui';
import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { ROUTES } from '@coop/cbs/utils';
import { FormCheckbox, FormLayout, FormMemberSelect } from '@coop/shared/form';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  EmployeeInput,
  MemberType,
  useGetSingleEmployeeDetailsQuery,
  useSetNewEmployeeMutation,
} from '@coop/cbs/data-access';
import { useRouter } from 'next/router';
import { omit } from 'lodash';
import {
  Approvers,
  EmployeeAddress,
  EmployeeContactDetails,
  EmployeeHealthInsurance,
  EmployeeWorkInformation,
  JoiningDetails,
  PersonalInformation,
  SalaryDetails,
  SidebarEmployeeAddForm,
  WorkExperienceTable,
} from '../components';
import { getEmployeeSection } from '../utils/getSectionEmployee';
import { EducationalDetails } from '../components/EducationalDetails';

export const EmployeeAddForm = () => {
  const router = useRouter();
  const [kymCurrentSection, setCurrentSection] = React.useState<{
    section: string;
    subSection: string;
  }>();

  const methods = useForm();
  const { getValues, watch, reset } = methods;
  const { mutateAsync } = useSetNewEmployeeMutation();

  const isCoopMemberWatch = watch('isCoopMember');
  // const memberIdWatch = watch('memberId');

  // const { data: editValues } = useGetKymIndividualFormDataQuery(
  //   {
  //     id: String(memberIdWatch),
  //   },
  //   { enabled: !!memberIdWatch }
  // );

  const { data: employeeEditData } = useGetSingleEmployeeDetailsQuery(
    {
      id: router?.query?.['id'] as string,
    },
    { enabled: !!router?.query?.['id'] }
  );

  const employeeDetailData = employeeEditData?.hr?.employee?.employee?.getEmployee?.record;

  useEffect(() => {
    if (employeeDetailData) {
      reset({
        ...employeeDetailData,
        permanentAddress: {
          ...employeeDetailData?.permanentAddress,
          locality: employeeDetailData?.permanentAddress?.locality?.local,
        },
        temporaryAddress: {
          ...employeeDetailData?.temporaryAddress,
          locality: employeeDetailData?.temporaryAddress?.locality?.local,
        },
      });
    }
  }, [JSON.stringify(employeeDetailData)]);

  // const personalInfo = editValues?.members?.individual?.formState?.data?.formData?.basicInformation;
  // const contactInfo = editValues?.members?.individual?.formState?.data?.formData?.contactDetails;
  // const permanentAddressInfo =
  //   editValues?.members?.individual?.formState?.data?.formData?.permanentAddress;
  // const temporaryAddressInfo =
  //   editValues?.members?.individual?.formState?.data?.formData?.temporaryAddress;

  // useEffect(() => {
  //   if (personalInfo) {
  //     reset({
  //       firstName: personalInfo?.firstName?.local,
  //       middleName: personalInfo?.middleName?.local,
  //       lastName: personalInfo?.lastName?.local,
  //       // gender: personalInfo?.genderId,
  //       dateOfBirth: personalInfo?.dateOfBirth,
  //       personalPhoneNumber: contactInfo?.mobileNumber,
  //       personalEmailAddress: contactInfo?.email,
  //       permanentAddress: {
  //         ...permanentAddressInfo,
  //         locality: permanentAddressInfo?.locality?.local,
  //       },
  //       isTemporarySameAsPermanent: temporaryAddressInfo?.sameTempAsPermanentAddress,
  //       temporaryAddress: {
  //         ...temporaryAddressInfo?.address,
  //         locality: temporaryAddressInfo?.address?.locality?.local,
  //       },
  //     });
  //     setValue('isCoopMember', true);
  //   }
  // }, [JSON.stringify(personalInfo)]);

  const onSave = () => {
    const values = getValues();

    if (router?.query?.['id']) {
      asyncToast({
        id: 'edit-employee',
        msgs: {
          success: 'employee edited succesfully',
          loading: 'editing employee',
        },
        onSuccess: () => {
          router.push(ROUTES?.HRMODULE_EMPLOYEES_LIST);
        },
        promise: mutateAsync({
          id: router?.query?.['id'] as string,
          input: omit({ ...values }, ['isCoopMember', 'memberId', 'id']) as EmployeeInput,
        }),
      });
    } else {
      asyncToast({
        id: 'add-employee',
        msgs: {
          success: 'new employee added succesfully',
          loading: 'adding new employee',
        },
        onSuccess: () => {
          router.push(ROUTES?.HRMODULE_EMPLOYEES_LIST);
        },
        promise: mutateAsync({
          id: null,
          input: omit({ ...values }, ['isCoopMember', 'memberId']) as EmployeeInput,
        }),
      });
    }
  };

  return (
    <FormLayout hasSidebar methods={methods}>
      <FormHeader title="Add Employee" closeLink={ROUTES.HRMODULE_EMPLOYEES_LIST} />

      <FormLayout.Content>
        <FormLayout.Sidebar borderPosition="right">
          <Box p="s16" pr="s20">
            <SidebarEmployeeAddForm currentSection={kymCurrentSection} />
          </Box>
        </FormLayout.Sidebar>

        <FormLayout.Form>
          <Box
            onFocus={(e) => {
              const employeeSection = getEmployeeSection(e.target.id);
              setCurrentSection(employeeSection);
            }}
          >
            <FormSection>
              <GridItem colSpan={3}>
                <FormCheckbox label="Is Member" name="isCoopMember" />
              </GridItem>
              {isCoopMemberWatch && (
                <FormMemberSelect
                  label="Member"
                  name="memberId"
                  memberType={MemberType?.Individual}
                />
              )}
            </FormSection>
            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                Basic Information{' '}
              </Text>
              <PersonalInformation />
              <EducationalDetails />
              <EmployeeContactDetails />
              <EmployeeAddress />
            </SectionContainer>
            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                Professional Information
              </Text>
              <EmployeeWorkInformation />
              <WorkExperienceTable />
              <JoiningDetails />
              <SalaryDetails />
            </SectionContainer>
            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                Configurations
              </Text>
              <Approvers />
              <EmployeeHealthInsurance />
            </SectionContainer>
            {/* <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                Declarations
              </Text>
              <Declerations />
            </SectionContainer> */}
          </Box>
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={onSave} />
    </FormLayout>
  );
};

export default EmployeeAddForm;
