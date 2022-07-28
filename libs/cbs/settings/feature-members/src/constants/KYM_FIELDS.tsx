import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Skeleton } from '@chakra-ui/react';
import { debounce } from 'lodash';

import {
  DeclarationFor,
  FormCategory,
  FormSearchTerm,
  FormSection,
  useGetDeclarationQuery,
  useUpdateDeclarationMutation,
} from '@coop/shared/data-access';
import { FormTextArea } from '@coop/shared/form';
import { AccordionPanel, Box } from '@coop/shared/ui';

import { IncomeSourceDetailsComponent } from '../components/KYMIncomeSource';
import { KYMCategory, KYMSearchTerm } from '../types';

enum FieldTypeEnum {
  Group = 'group',

  CustomComponent = 'CustomComponent',
  FormField = 'FormField',
  FormSection = 'FormSection',
  Custom = 'custom',
}

export type FieldType =
  | {
      type:
        | FieldTypeEnum.FormField
        | FieldTypeEnum.FormSection
        | FieldTypeEnum.Custom
        | FieldTypeEnum.CustomComponent;

      search_term: KYMSearchTerm;
      label: string;
      children?: FieldType[];
      component?: (props: {
        isExpanded: boolean;
        kymType: KYMCategory;
        section: FormSection;
      }) => JSX.Element;
    }
  | {
      type: FieldTypeEnum.Group;
      children: FieldType[];
      label: string;
    }
  | {
      type: FieldTypeEnum.Custom;
      label: string;
      children: FieldType[];
      search_term: KYMSearchTerm;
    };

export const KYM_FIELDS: FieldType[] = [
  {
    type: FieldTypeEnum.Group,
    label: 'settingsMemberSection1PersonalInformation',
    children: [
      {
        type: FieldTypeEnum.FormField,
        search_term: KYMSearchTerm.Gender,
        label: 'settingsMemberGender',
      },
      {
        type: FieldTypeEnum.FormField,
        search_term: KYMSearchTerm.Nationality,
        label: 'settingsMemberNationality',
      },
      {
        type: FieldTypeEnum.FormField,
        search_term: KYMSearchTerm.EducationQualification,
        label: 'settingsMemberEducationQualification',
      },
      {
        type: FieldTypeEnum.FormField,
        search_term: KYMSearchTerm.Religion,
        label: 'settingsMemberReligion',
      },
      {
        type: FieldTypeEnum.FormField,
        search_term: KYMSearchTerm.Ethnicity,
        label: 'settingsMemberEthnicity',
      },
      {
        type: FieldTypeEnum.FormSection,
        search_term: KYMSearchTerm.ContactDetails,
        label: 'settingsMemberContactDetails',
      },
      {
        type: FieldTypeEnum.Group,
        // search_term: KYMSearchTerm.Identification,
        label: 'settingsMemberIdentificationDocuments',

        children: [
          {
            type: FieldTypeEnum.FormField,
            search_term: FormSearchTerm.Citizenship,
            label: 'settingsMemberCitizenship',
          },
          {
            type: FieldTypeEnum.FormField,
            search_term: FormSearchTerm.DrivingLicense,
            label: 'settingsMemberDrivingLicense',
          },
          {
            type: FieldTypeEnum.FormField,
            search_term: KYMSearchTerm.VoterId,
            label: 'settingsMemberVoterId',
          },
          {
            type: FieldTypeEnum.FormField,
            search_term: FormSearchTerm.Passport,
            label: 'settingsMemberPassport',
          },
        ],
      },
      {
        type: FieldTypeEnum.FormField,
        search_term: KYMSearchTerm.MaritalStatus,
        label: 'settingsMemberMaritalStatus',
      },
      {
        type: FieldTypeEnum.FormField,
        search_term: KYMSearchTerm.Relationship,
        label: 'settingsMemberFamilyRelationship',
      },
      {
        type: FieldTypeEnum.FormField,
        search_term: FormSearchTerm.FamilyInformation,
        label: 'settingsMemberFamilyInformation',
      },
    ],
  },
  {
    type: FieldTypeEnum.Group,
    label: 'settingsMemberSection2ProfessionalInformation',
    children: [
      {
        type: FieldTypeEnum.FormField,
        search_term: KYMSearchTerm.Occupation,
        label: 'settingsMemberOccupation',
      },
      {
        type: FieldTypeEnum.FormField,
        search_term: KYMSearchTerm.OccupationDetails,
        label: 'settingsMemberOccupationDetails',
      },
      {
        type: FieldTypeEnum.FormField,
        search_term: KYMSearchTerm.FamilyIncomeSource,
        label: 'settingsMemberFamilyIncome',
      },
      {
        type: FieldTypeEnum.CustomComponent,
        search_term: KYMSearchTerm.IncomeSourceDetails,
        label: 'settingsMemberIncomeSourceDetails',

        component: (props) => <IncomeSourceDetailsComponent {...props} />,
      },
      {
        type: FieldTypeEnum.FormField,
        search_term: FormSearchTerm.EstimatedAnnualTransaction,
        label: 'settingsMemberEstimatedAnnualTransaction',
      },
    ],
  },
  {
    type: FieldTypeEnum.Group,
    label: 'settingsMemberSection3CooperativeMember',
    children: [
      {
        type: FieldTypeEnum.FormField,
        search_term: KYMSearchTerm.Purpose,
        label: 'settingsMemberPurposeOfBecomingAMemberOfThisCooperative',
      },
      {
        type: FieldTypeEnum.FormField,
        search_term: KYMSearchTerm.OtherCooperativeDetails,
        label: 'settingsMemberOtherCooperativeDetails',
      },
      {
        type: FieldTypeEnum.FormField,
        search_term: KYMSearchTerm.FinancialTransactionDetails,
        label: 'settingsMemberFinancialTransactionDetails',
      },
    ],
  },
  {
    type: FieldTypeEnum.Group,
    label: 'settingsMemberSection4Declaration',
    children: [
      {
        type: FieldTypeEnum.FormField,
        search_term: KYMSearchTerm.NextToKinInformation,
        label: 'settingsMemberNominee',
      },
      {
        type: FieldTypeEnum.FormField,
        search_term: FormSearchTerm.ForeignEmploymentOptions,
        label: 'settingsMemberForeignEmploymentOptions',
      },
      {
        type: FieldTypeEnum.FormField,
        search_term: FormSearchTerm.FileUploads,
        label: 'settingsMemberFileUploads',
      },
      {
        type: FieldTypeEnum.CustomComponent,
        label: 'settingsMemberDeclaration',
        search_term: FormSearchTerm.Gender,

        component: ({ kymType, isExpanded }) => (
          <Declaration kymType={kymType} isExpanded={isExpanded} />
        ),
      },
    ],
  },
  {
    type: FieldTypeEnum.Custom,
    label: 'settingsMemberSection5CustomFields',
    children: [],
    search_term: FormSearchTerm.Citizenship,
  },
];

export const INSTITUTION_KYM_FIELDS: FieldType[] = [
  {
    type: FieldTypeEnum.Group,
    label: 'settingsMemberInstitutionSection1',
    children: [
      {
        type: FieldTypeEnum.FormField,
        search_term: KYMSearchTerm.OrganizationType,
        label: 'settingInstitutionOrgType',
      },
      {
        type: FieldTypeEnum.FormField,
        search_term: KYMSearchTerm.RegisteredDetails,
        label: 'settingInstitutionRegisteredDetails',
      },
      {
        type: FieldTypeEnum.FormField,
        search_term: KYMSearchTerm.ContactDetails,
        label: 'settingContactDetails',
      },
      {
        type: FieldTypeEnum.FormField,
        search_term: KYMSearchTerm.BankAccountDetails,
        label: 'settingBankAccountDetails',
      },
      {
        type: FieldTypeEnum.FormField,
        search_term: KYMSearchTerm.SisterConcernDetails,
        label: 'settingDetailsOfSisterConcern',
      },
      {
        type: FieldTypeEnum.FormSection,
        search_term: KYMSearchTerm.ContactDetails,
        label: 'settingsMemberContactDetails',
      },
    ],
  },
  {
    type: FieldTypeEnum.Group,
    label: 'settingsMemberInstitutionSection2',
    children: [
      {
        type: FieldTypeEnum.FormField,
        search_term: KYMSearchTerm.TransactionDetails,
        label: 'settingsInstitutionTransactionDetails',
      },
      {
        type: FieldTypeEnum.FormField,
        search_term: KYMSearchTerm.ExpectedMonthlyTurnover,
        label: 'settingsExpectedMonthlyTurnover',
      },
      {
        type: FieldTypeEnum.FormField,
        search_term: KYMSearchTerm.ExpectedMonthlyTransaction,
        label: 'settingsExpectedMonthlyTransaction',
      },
    ],
  },
  {
    type: FieldTypeEnum.Group,
    label: 'settingsMemberInstitutionSection3',
    children: [
      {
        type: FieldTypeEnum.Group,
        label: 'settingsDirector',
        children: [
          {
            type: FieldTypeEnum.FormField,
            search_term: KYMSearchTerm.DirectorDetails,
            label: 'settingsDirectorDetails',
          },
          {
            type: FieldTypeEnum.FormField,
            search_term: KYMSearchTerm.DirectorDocument,
            label: 'settingsDocumentDeclaration',
          },
        ],
      },
      {
        type: FieldTypeEnum.FormField,
        search_term: KYMSearchTerm.DirectorsAffiliationDetails,
        label: 'settingsDeclarationOfDirectionAffiliated',
      },
    ],
  },
  {
    type: FieldTypeEnum.Group,
    label: 'settingsMemberInstitutionSection4',
    children: [
      {
        type: FieldTypeEnum.Group,
        label: 'settingsAccountOperator',
        children: [
          {
            type: FieldTypeEnum.FormField,
            label: 'settingsAccountDetailsOfAccountOperator',
            search_term: KYMSearchTerm.AccountOperatorDetails,
          },
          {
            type: FieldTypeEnum.FormField,
            label: 'settingsDocumentDeclaration',
            search_term: KYMSearchTerm.AccountOperatorDocument,
          },
        ],
      },
    ],
  },
  {
    type: FieldTypeEnum.Group,
    label: 'settingsMemberInstitutionSection5',
    children: [
      {
        type: FieldTypeEnum.FormField,
        search_term: KYMSearchTerm.FileUploads,
        label: 'settingsMemberFileUploads',
      },
      {
        type: FieldTypeEnum.Group,
        label: 'settingsAccountHolderDeclaration',
        children: [
          {
            type: FieldTypeEnum.FormField,
            search_term: KYMSearchTerm.AccountHolderDetails,
            label: 'settingsAccountHolderDetails',
          },
          {
            type: FieldTypeEnum.FormField,
            search_term: KYMSearchTerm.AccountHolderDocuments,
            label: 'settingsAccountHolderDeclarationDocuments',
          },
        ],
      },
      {
        type: FieldTypeEnum.CustomComponent,
        label: 'settingsMemberDeclaration',
        search_term: FormSearchTerm.AccountOperator,

        component: ({ kymType, isExpanded }) => (
          <Declaration kymType={kymType} isExpanded={isExpanded} />
        ),
      },
    ],
  },
  {
    type: FieldTypeEnum.Custom,
    label: 'settingsMemberInstitutionSection6',
    children: [],
    search_term: FormSearchTerm.AccountOperatorDetails,
  },
];

export const Declaration = ({
  kymType,
  isExpanded,
}: {
  kymType: FormCategory;
  isExpanded: boolean;
}) => {
  const methods = useForm();
  const { data, isLoading } = useGetDeclarationQuery(
    { kymType: kymType as unknown as DeclarationFor },
    { enabled: isExpanded }
  );

  const { mutate: updateDeclaration } = useUpdateDeclarationMutation();

  if (isLoading) {
    return (
      <AccordionPanel pb={0} display="flex" flexDirection="column" gap="s16">
        <Skeleton height="110px" borderRadius="br1" />
      </AccordionPanel>
    );
  }

  return (
    <FormProvider {...methods}>
      <form
        onChange={debounce(() => {
          updateDeclaration({
            data: {
              dataEn: methods.getValues()['dataEn'],
              dataNp: methods.getValues()['dataNp'],
              for: kymType as unknown as DeclarationFor,
            },
          });
        }, 800)}
      >
        <AccordionPanel
          pb={'0'}
          display="flex"
          flexDirection="column"
          gap="s16"
        >
          <Box>
            <FormTextArea
              label="English"
              size="lg"
              h="130px"
              name="dataEn"
              defaultValue={data?.settings.declaration.get?.data?.content.en}
            />
          </Box>

          <Box>
            <FormTextArea
              label="Nepali"
              size="lg"
              h="130px"
              name="dataNp"
              defaultValue={data?.settings.declaration.get?.data?.content.np}
            />
          </Box>
        </AccordionPanel>
      </form>
    </FormProvider>
  );
};
