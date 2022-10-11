import { useFieldArray, useFormContext } from 'react-hook-form';
import { AddIcon } from '@chakra-ui/icons';

import {
  AllModules,
  NatureOfCooperative,
  OrganizationClientInput,
  OrganizationInstallmentLicense,
  OrganizationSecuritySetup,
  OrganizationType,
} from '@coop/neosys-admin/data-access';
import {
  FormAddress,
  FormCheckboxGroup,
  FormFileInput,
  FormInput,
  FormSelect,
  FormSwitchTab,
} from '@coop/shared/form';
import { Box, Button, FormSection, GridItem, Icon, SlugInput } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const NeosysClientForm = () => {
  const methods = useFormContext<
    Omit<OrganizationClientInput, 'organizationLogo'> & {
      organizationLogo: string[];
    }
  >();
  const { t } = useTranslation();

  return (
    <form>
      <FormSection>
        <GridItem colSpan={2}>
          <FormInput name="organizationName" label="Organization Name" />
        </GridItem>
        <FormInput type="text" name="organizationCode" label={t['neoClientOrganizationCode']} />
      </FormSection>

      <FormSection templateColumns={2}>
        <FormSelect
          name="organizationType"
          label={t['neoClientOrganizationType']}
          options={[
            { label: 'Province Union', value: OrganizationType.ProvinceUnion },
            { label: 'District Union', value: OrganizationType.DistrictUnion },
            { label: 'Preliminary', value: OrganizationType.Preliminary },
            { label: 'Cooperative Union', value: OrganizationType.CooperativeUnion },
          ]}
        />
        <FormSelect
          name="natureOfCoop"
          label={t['neoClientOrganizationType']}
          options={[
            {
              label: 'Agriculture Cooperative',
              value: NatureOfCooperative.AgricultureCooperative,
            },
            {
              label: 'Health Cooperative',
              value: NatureOfCooperative.HealthCooperative,
            },
            {
              label: 'MultiPurpose Cooperative',
              value: NatureOfCooperative.MultipurposeCooperative,
            },
            {
              label: 'Saving And Credit Cooperative',
              value: NatureOfCooperative.SavingAndCredit,
            },
            {
              label: 'Others',
              value: NatureOfCooperative.Others,
            },
          ]}
        />
      </FormSection>

      <FormSection flexLayout>
        <Box w="110px">
          <FormFileInput
            maxFiles="one"
            size="md"
            label={t['neoClientOrganizationLogo']}
            name="organizationLogo"
          />
        </Box>
      </FormSection>

      {/** TODO! */}
      <FormSection flexLayout>
        <SlugInput
          type="text"
          rightAddon=".myraerp.com"
          label={t['neoClientURL']}
          {...methods.register('urlSlug')}
        />
      </FormSection>

      <RegistrationDetails />

      <FormSection header="neoClientContactDetails">
        <FormInput name="contactDetails.officePhone" label={t['neoClientOfficePhone']} />
        <FormInput name="contactDetails.email" label={t['neoClientEmailAddress']} />
        <FormInput name="contactDetails.website" label={t['neoClientWebsite']} />
      </FormSection>

      <FormSection header="neoClientAddress">
        <FormAddress name="addressDetails" />
      </FormSection>

      <FormSection header="neoClientMainContactPerson">
        <FormInput name="mainContactPerson.name" label={t['neoClientName']} />
        <FormInput name="mainContactPerson.phoneNo" label={t['neoClientPhoneNumber']} />
        <FormInput name="mainContactPerson.email" label={t['neoClientEmailAddress']} />
      </FormSection>

      <FormSection header="neoClientTechnicalContactPerson">
        <FormInput name="technicalContactPerson.name" label={t['neoClientName']} />
        <FormInput name="technicalContactPerson.phoneNo" label={t['neoClientPhoneNumber']} />
        <FormInput name="technicalContactPerson.email" label={t['neoClientEmailAddress']} />
      </FormSection>

      <WorkingArea />

      <FormSection flexLayout header="neoClientLicense" subHeader="neoClientLicenseDetails">
        <FormSwitchTab
          name="license"
          options={[
            { label: t['neoClientLicenseBasic'], value: OrganizationInstallmentLicense.Basic },
            {
              label: t['neoClientLicenseStandard'],
              value: OrganizationInstallmentLicense.Standard,
            },
            {
              label: t['neoClientLicenseProfessional'],
              value: OrganizationInstallmentLicense.Professional,
            },
          ]}
        />
      </FormSection>

      <FormSection flexLayout header="neoClientModules" subHeader="neoClientModulesDes">
        <FormCheckboxGroup
          name="modules"
          orientation="grid"
          list={[
            { label: t['corebankingSystems'], value: AllModules.CoreBankingSystem },
            { label: t['memberAndShareManagement'], value: AllModules.MemberAndShareManagement },

            { label: t['accountingSystem'], value: AllModules.AccountingSystem },
            { label: t['inventoryManagement'], value: AllModules.InventoryManagement },
            {
              label: t['alternativeChannels'],
              value: AllModules.AlternativeChannels,
            },
            {
              label: t['hrManagement'],
              value: AllModules.HrManagement,
            },
            {
              label: t['complainceManagement'],
              value: AllModules.ComplianceManagement,
            },

            {
              label: t['fixedAssetManagement'],
              value: AllModules.FixedAssetManagement,
            },

            {
              label: t['documentManagement'],
              value: AllModules.DocumentManagement,
            },

            {
              label: t['businessProcessManagement'],
              value: AllModules.BusinessProcessManagement,
            },

            {
              label: t['capacityAndTrainingManagement'],
              value: AllModules.CapacityAndTrainingManagement,
            },

            {
              label: t['businessIntelligenceAndReporting'],
              value: AllModules.BusinessIntelligenceAndReporting,
            },
          ]}
        />
      </FormSection>

      <FormSection flexLayout header="neoClientSecuritySetup" subHeader="neoClientSecuritySetupDes">
        <FormSwitchTab
          name="securitySetup"
          options={[
            { label: t['neoClientSecurityVPN'], value: OrganizationSecuritySetup.Vpn },
            {
              label: t['neoClientSecurityPureSASS'],
              value: OrganizationSecuritySetup.PureSass,
            },
          ]}
        />
      </FormSection>

      <FormSection templateColumns={2} header="neoClientDocumentDeclaration">
        <FormFileInput name="documents.agmOrBodDocument" size="lg" label={t['neoClientAGMBOD']} />
        <FormFileInput
          name="documents.registeredCertificate"
          size="lg"
          label={t['neoClientRegisteredCertificate']}
        />
        <FormFileInput name="documents.moaOrAoa" size="lg" label={t['neoClientMOA']} />
        <FormFileInput
          name="documents.panCertificate"
          size="lg"
          label={t['neoClientPANCertificate']}
        />
        <FormFileInput name="documents.taxClearance" size="lg" label={t['neoClientTaxClearance']} />
        <FormFileInput
          name="documents.latestAuditReport"
          size="lg"
          label={t['neoClientLatestAuditReport']}
        />
        <FormFileInput name="documents.logo" size="lg" label={t['neoClientLogo']} />
        <FormFileInput
          name="documents.minuteOfCentralRep"
          size="lg"
          label={t['neoClientMinuteOfCentralRep']}
        />
      </FormSection>
    </form>
  );
};

export const RegistrationDetails = () => {
  const { t } = useTranslation();

  const { control } = useFormContext<OrganizationClientInput>();

  const { fields, append } = useFieldArray({
    control,
    name: 'registrationDetails',
  });

  return (
    <FormSection
      header="neoClientRegistrationDetails"
      subHeader="neoClientRegisteredAddressDetails"
      flexLayout
    >
      <Box display="flex" flexDir="column" gap="s16">
        {fields.map((field, index) => (
          <Box bg="highlight.500" key={field.id}>
            <FormSection divider={false}>
              <GridItem colSpan={3}>
                <FormInput
                  label={t['neoClientRegisteredOffice']}
                  name={`registrationDetails.${index}.registeredOffice`}
                />
              </GridItem>
              <GridItem colSpan={3}>
                <FormInput
                  label={t['neoClientRegisteredAddress']}
                  name={`registrationDetails.${index}.registeredAddress`}
                />
              </GridItem>
              <FormInput
                label={t['neoClientRegisteredNo']}
                name={`registrationDetails.${index}.registeredNo`}
              />
              <FormInput
                type="date"
                label={t['neoClientRegistrationDate']}
                name={`registrationDetails.${index}.registeredDate`}
              />

              <FormInput
                label={t['neoClientPANVATNo']}
                name={`registrationDetails.${index}.panOrVatNo`}
              />
            </FormSection>
          </Box>
        ))}
      </Box>

      <Button variant="outline" gap="s4" mt="s16" onClick={() => append({})}>
        <Icon as={AddIcon} h="s12" w="s12" />
        New Detail
      </Button>
    </FormSection>
  );
};

export const WorkingArea = () => {
  const { control } = useFormContext<OrganizationClientInput>();

  const { fields, append } = useFieldArray({
    control,
    name: 'workingArea',
  });

  return (
    <FormSection header="neoClientWorkingArea" flexLayout>
      <Box display="flex" flexDir="column" gap="s16">
        {fields.map((field, index) => (
          <Box bg="highlight.500" key={field.id}>
            <FormSection divider={false}>
              <FormAddress name={`workingArea.${index}`} />
            </FormSection>
          </Box>
        ))}
      </Box>

      <Button variant="outline" gap="s4" mt="s16" onClick={() => append({})}>
        <Icon as={AddIcon} h="s12" w="s12" />
        New Detail
      </Button>
    </FormSection>
  );
};
