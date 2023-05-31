/* eslint-disable-next-line */
import { featureCode, useTranslation } from '@coop/shared/utils';
import { Box, FormHeader, Text } from '@myra-ui';
import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';
import React from 'react';
import { useForm } from 'react-hook-form';
import { EmployeeContactDetails, PersonalInformation, SidebarEmployeeAddForm } from '../components';
import { getEmployeeSection } from '../utils/getSectionEmployee';

export const EmployeeAddForm = () => {
  const [kymCurrentSection, setCurrentSection] = React.useState<{
    section: string;
    subSection: string;
  }>();
  const methods = useForm();
  return (
    <FormLayout hasSidebar methods={methods}>
      <FormHeader title="Add Employee" closeLink={ROUTES.CBS_MEMBER_LIST} />

      <FormLayout.Content>
        <FormLayout.Sidebar borderPosition="right">
          <Box p="s16" pr="s20">
            <SidebarEmployeeAddForm currentSection={kymCurrentSection} />
          </Box>
        </FormLayout.Sidebar>

        <FormLayout.Form>
          <Box
            onFocus={(e) => {
              const kymSection = getEmployeeSection(e.target.id);
              setCurrentSection(kymSection);
            }}
          >
            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                Basic Information{' '}
              </Text>
              <PersonalInformation setCurrentSection={setCurrentSection} />
            </SectionContainer>
            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                Contact Details{' '}
              </Text>
              <EmployeeContactDetails />
            </SectionContainer>
          </Box>
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer mainButtonLabel="Save" />
    </FormLayout>
  );
};

export default EmployeeAddForm;
