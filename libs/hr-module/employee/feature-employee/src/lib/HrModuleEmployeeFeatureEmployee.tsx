/* eslint-disable-next-line */
import { featureCode, useTranslation } from '@coop/shared/utils';
import { Box, FormHeader, Text, asyncToast } from '@myra-ui';
import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSetNewEmployeeMutation } from '@coop/cbs/data-access';
import { useRouter } from 'next/router';
import {
  Approvers,
  Declerations,
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
  const { getValues } = methods;
  const { mutateAsync } = useSetNewEmployeeMutation();

  const onSave = () => {
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
        input: {
          ...getValues(),
        },
      }),
    });
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
            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                Declarations
              </Text>
              <Declerations />
            </SectionContainer>
          </Box>
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={onSave} />
    </FormLayout>
  );
};

export default EmployeeAddForm;
