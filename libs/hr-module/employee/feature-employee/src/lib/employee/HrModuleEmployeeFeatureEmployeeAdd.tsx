/* eslint-disable-next-line */
import { featureCode, useTranslation } from '@coop/shared/utils';
import { Box, FormHeader, Text, asyncToast } from '@myra-ui';
import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  DocumentInsertInput,
  EmployeeInput,
  useGetSingleEmployeeDetailsQuery,
  useSetNewEmployeeMutation,
} from '@coop/cbs/data-access';
import { useRouter } from 'next/router';
import { omit } from 'lodash';
import {
  Declarations,
  EmployeeAddress,
  EmployeeContactDetails,
  EmployeeWorkInformation,
  OtherDetails,
  PersonalInformation,
  SidebarEmployeeAddForm,
  WorkExperienceTable,
} from '../../components';
import { EducationalDetails } from '../../components/EducationalDetails';
import { getEmployeeSection } from '../../utils/getSectionEmployee';
import FamilyDetails from '../../components/FamilyDetails';
import IdentificationDetails from '../../components/IdentificationDetails';
import PayrollSetup from '../../components/setups/PayrollSetup';
import OtherSchemes from '../../components/setups/OtherSchemes';
import IsMemberComponent from '../../components/IsMemberComponent';

const documentMap = ['passport', 'signature', 'citizenship', 'fingerprint'];

export const EmployeeAddForm = () => {
  const router = useRouter();
  const [kymCurrentSection, setCurrentSection] = React.useState<{
    section: string;
    subSection: string;
  }>();

  const methods = useForm();

  const { getValues, reset } = methods;
  const { mutateAsync } = useSetNewEmployeeMutation();

  const { data: employeeEditData } = useGetSingleEmployeeDetailsQuery(
    {
      id: router?.query?.['id'] as string,
    },
    { enabled: !!router?.query?.['id'] }
  );

  const employeeDetailData = employeeEditData?.hr?.employee?.employee?.getEmployee?.record;

  useEffect(() => {
    if (employeeDetailData) {
      const identificationSelection: string[] = [];
      const otherSchemes: string[] = [];
      const otherDetails: string[] = [];

      employeeDetailData?.citizenshipGiven && identificationSelection?.push('citizenship');
      employeeDetailData?.drivingLicenseGiven && identificationSelection?.push('drivingLicense');

      employeeDetailData?.pf && otherSchemes?.push('pf');
      employeeDetailData?.ssf && otherSchemes?.push('ssf');
      employeeDetailData?.cit && otherSchemes?.push('cit');

      employeeDetailData?.trainingDetailsGiven && otherDetails?.push('trainingDetails');
      employeeDetailData?.awardsCashCertificatesGiven &&
        otherDetails?.push('awardsCashCertificates');
      employeeDetailData?.researchAndPublicationsGiven &&
        otherDetails?.push('researchAndPublications');
      employeeDetailData?.internationalTourGiven && otherDetails?.push('internationalTour');

      reset({
        ...employeeDetailData,
        identificationSelection,
        otherSchemes,
        otherDetails,
        permanentAddress: {
          ...employeeDetailData?.permanentAddress,
          locality: employeeDetailData?.permanentAddress?.locality?.local,
        },
        temporaryAddress: {
          ...employeeDetailData?.temporaryAddress,
          locality: employeeDetailData?.temporaryAddress?.locality?.local,
        },
        documents:
          documentMap?.map((document) => ({
            fieldId: document,
            identifiers:
              employeeDetailData?.documents?.find((d) => d?.fieldId === document)?.identifiers ||
              [],
          })) || [],
      });
    }
  }, [JSON.stringify(employeeDetailData)]);

  const onSave = () => {
    const values = getValues();
    const otherSchemes = values?.otherSchemes;
    const identificationSelection = values?.identificationSelection;
    const otherDetails = values?.otherDetails;

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
          input: omit(
            {
              ...values,
              pf: otherSchemes?.includes('pf'),
              ssf: otherSchemes?.includes('ssf'),
              cit: otherSchemes?.includes('cit'),
              citizenshipGiven: identificationSelection?.includes('citizenship'),
              drivingLicenseGiven: identificationSelection?.includes('drivingLicense'),
              trainingDetailsGiven: otherDetails?.includes('trainingDetails'),
              researchAndPublicationsGiven: otherDetails?.includes('researchAndPublications'),
              awardsCashCertificatesGiven: otherDetails?.includes('awardsCashCertificates'),
              internationalTourGiven: otherDetails?.includes('internationalTour'),
              documents: values?.documents?.map((item: DocumentInsertInput, index: number) => ({
                fieldId: documentMap[index],
                identifiers: item?.identifiers || [],
              })),
            },
            ['id', 'otherSchemes', 'identificationSelection', 'otherDetails']
          ) as EmployeeInput,
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
          input: omit(
            {
              ...values,
              pf: otherSchemes?.includes('pf'),
              ssf: otherSchemes?.includes('ssf'),
              cit: otherSchemes?.includes('cit'),
              citizenshipGiven: identificationSelection?.includes('citizenship'),
              drivingLicenseGiven: identificationSelection?.includes('drivingLicense'),
              trainingDetailsGiven: otherDetails?.includes('trainingDetails'),
              researchAndPublicationsGiven: otherDetails?.includes('researchAndPublications'),
              awardsCashCertificatesGiven: otherDetails?.includes('awardsCashCertificates'),
              internationalTourGiven: otherDetails?.includes('internationalTour'),
              documents: values?.documents?.map((item: DocumentInsertInput, index: number) => ({
                fieldId: documentMap[index],
                identifiers: item?.identifiers || [],
              })),
            },
            ['id', 'otherSchemes', 'identificationSelection', 'otherDetails']
          ) as EmployeeInput,
        }),
        onError: (error) => {
          if (error.__typename === 'ValidationError') {
            Object.keys(error.validationErrorMsg).map((key) =>
              methods.setError(key as keyof EmployeeInput, {
                message: error.validationErrorMsg[key][0] as string,
              })
            );
          }
        },
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
            <IsMemberComponent />
            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                1. Basic Information{' '}
              </Text>
              <PersonalInformation />
              <EmployeeContactDetails />
              <EmployeeAddress />
              <FamilyDetails />
              <EducationalDetails />
              <IdentificationDetails />
            </SectionContainer>
            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                2. Professional Information
              </Text>
              <EmployeeWorkInformation />
              <WorkExperienceTable />
              <OtherDetails />
              {/* <JoiningDetails /> */}
              {/* <SalaryDetails /> */}
            </SectionContainer>
            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                3. Setups
              </Text>
              <PayrollSetup />
              <OtherSchemes />
              {/* <Approvers />
              <EmployeeHealthInsurance /> */}
            </SectionContainer>
            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                Declarations
              </Text>
              <Declarations />
            </SectionContainer>
          </Box>
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={onSave} />
    </FormLayout>
  );
};

export default EmployeeAddForm;
