import { FormProvider, useForm } from 'react-hook-form';
import { Skeleton } from '@chakra-ui/react';
import { debounce } from 'lodash';

import { AccordionPanel, Box } from '@myra-ui';

import {
  DeclarationFor,
  FormCategory,
  FormSearchTerm,
  FormSection,
  useGetDeclarationQuery,
  useUpdateDeclarationMutation,
} from '@coop/cbs/data-access';
import { FormTextArea } from '@coop/shared/form';

import { IncomeSourceDetailsComponent } from '../components/KYMIncomeSource';
import { KYMCategory, KYMSearchTerm } from '../types';

enum FieldTypeEnum {
  Group = 'group',

  CustomComponent = 'CustomComponent',
  FormField = 'FormField',
  // FormSection = 'FormSection',
  Custom = 'custom',
}

export type FieldType =
  | {
      type:
        | FieldTypeEnum.FormField
        // | FieldTypeEnum.FormSection
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
  // {
  //   type: FieldTypeEnum.Custom,
  //   label: 'settingsMemberSection5CustomFields',
  //   children: [],
  //   search_term: FormSearchTerm.Citizenship,
  // },
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
  // {
  //   type: FieldTypeEnum.Custom,
  //   label: 'settingsMemberInstitutionSection6',
  //   children: [],
  //   search_term: FormSearchTerm.AccountOperatorDetails,
  // },
];

export const COOP_KYM_FIELDS: FieldType[] = [
  {
    type: FieldTypeEnum.Group,
    label: 'settingsMemberCooperativeSection1',
    children: [
      {
        type: FieldTypeEnum.FormField,
        label: 'settingsCooperativeContactDetails',
        search_term: FormSearchTerm.ContactDetails,
      },
      {
        type: FieldTypeEnum.FormField,
        label: 'settingsCooperativeCurrentMembers',
        search_term: FormSearchTerm.CurrentMembers,
      },
      {
        type: FieldTypeEnum.FormField,
        label: 'settingsCooperativeRepresentative',
        search_term: FormSearchTerm.Representative,
      },
      {
        type: FieldTypeEnum.FormField,
        label: 'settingsCooperativeType',
        search_term: FormSearchTerm.CooperativeType,
      },
      {
        type: FieldTypeEnum.FormField,
        label: 'settingsNumberOfEmployee',
        search_term: FormSearchTerm.NumberOfEmployee,
      },
    ],
  },
  {
    type: FieldTypeEnum.Group,
    label: 'settingsMemberCooperativeSection2',
    children: [],
  },
  {
    type: FieldTypeEnum.Group,
    label: 'settingsMemberCooperativeSection3',
    children: [
      {
        type: FieldTypeEnum.Group,
        label: 'settingsCooperativeDirectors',
        children: [
          {
            type: FieldTypeEnum.FormField,
            label: 'settingsCooperativeDirectorDetails',
            search_term: FormSearchTerm.DirectorDetails,
          },
          {
            type: FieldTypeEnum.FormField,
            label: 'settingsCooperativeDocumentDeclaration',
            search_term: FormSearchTerm.DirectorDocument,
          },
        ],
      },
    ],
  },
  {
    type: FieldTypeEnum.Group,
    label: 'settingsMemberCooperativeSection4',
    children: [
      {
        type: FieldTypeEnum.Group,
        label: 'settingsCooperativeAccountOperators',
        children: [
          {
            type: FieldTypeEnum.FormField,
            label: 'settingsCooperativeAccountOperatorDetails',
            search_term: FormSearchTerm.AccountOperatorDetails,
          },
          {
            type: FieldTypeEnum.FormField,
            label: 'settingsCooperativeDocumentDeclaration',
            search_term: FormSearchTerm.AccountOperatorDocument,
          },
        ],
      },
    ],
  },
  {
    type: FieldTypeEnum.Group,
    label: 'settingsMemberCooperativeSection5',
    children: [
      {
        type: FieldTypeEnum.Group,
        label: 'settingsCooperativeAccountHolderDeclaration',
        children: [
          {
            type: FieldTypeEnum.FormField,
            label: 'settingsCooperativeAccountHolderDeclarationDetails',
            search_term: FormSearchTerm.AccountHolderDetails,
          },
          {
            type: FieldTypeEnum.FormField,
            label: 'settingsCooperativeAccountHolderDeclarationDocuments',
            search_term: FormSearchTerm.AccountHolderDocuments,
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
  // {
  //   type: FieldTypeEnum.Custom,
  //   label: 'settingsMemberInstitutionSection6',
  //   children: [],
  //   search_term: FormSearchTerm.AccountOperatorDetails,
  // },
];

export const COOP_UNION_FIELDS: FieldType[] = [
  {
    type: FieldTypeEnum.Group,
    label: 'settingsCoopUnionSection1',
    children: [
      {
        type: FieldTypeEnum.FormField,
        label: 'settingsCoopUnionOrganizationType',
        search_term: FormSearchTerm.OrganizationType,
      },
      {
        type: FieldTypeEnum.FormField,
        label: 'settingsCoopUnionRegisteredDetails',
        search_term: FormSearchTerm.RegisteredDetails,
      },
      {
        type: FieldTypeEnum.FormField,
        label: 'settingsCoopUnionContactDetails',
        search_term: FormSearchTerm.ContactDetails,
      },
      {
        type: FieldTypeEnum.FormField,
        label: 'settingsCoopUnionCurrentMembers',
        search_term: FormSearchTerm.CurrentMembers,
      },
      {
        type: FieldTypeEnum.FormField,
        label: 'settingsCoopUnionBankAccountDetails',
        search_term: FormSearchTerm.BankAccountDetails,
      },
      {
        type: FieldTypeEnum.Group,
        label: 'settingsCoopUnionApplicant',
        children: [
          {
            type: FieldTypeEnum.FormField,
            label: 'settingsCoopUnionApplicantDetails',
            search_term: FormSearchTerm.ApplicantDetails,
          },
          {
            type: FieldTypeEnum.FormField,
            label: 'settingsCoopUnionApplicantDocumentDeclaration',
            search_term: FormSearchTerm.ApplicantDocument,
          },
        ],
      },
    ],
  },
  {
    type: FieldTypeEnum.Group,
    label: 'settingsCoopUnionSection2',
    children: [
      {
        type: FieldTypeEnum.Group,
        label: 'settingsCoopDirectors',
        children: [
          {
            type: FieldTypeEnum.FormField,
            label: 'settingsCoopDirectorDetails',
            search_term: FormSearchTerm.DirectorDetails,
          },
          {
            type: FieldTypeEnum.FormField,
            label: 'settingsCoopTrainingRelatedToCoop',
            search_term: FormSearchTerm.DirectorCoopTraining,
          },
          {
            type: FieldTypeEnum.FormField,
            label: 'settingsCoopDocumentDeclaration',
            search_term: FormSearchTerm.DirectorDocument,
          },
        ],
      },
    ],
  },
  {
    type: FieldTypeEnum.Group,
    label: 'settingsCoopUnionSection3',
    children: [
      {
        type: FieldTypeEnum.Group,
        label: 'settingsCoopUnionAccountOperators',
        children: [
          {
            type: FieldTypeEnum.FormField,
            label: 'settingsCoopUnionAccountOperatorDetails',
            search_term: FormSearchTerm.AccountOperatorDetails,
          },
          {
            type: FieldTypeEnum.FormField,
            label: 'settingsCoopTrainingRelatedToCoop',
            search_term: FormSearchTerm.AccountCoopTraining,
          },
          {
            type: FieldTypeEnum.FormField,
            label: 'settingsCoopDocumentDeclaration',
            search_term: FormSearchTerm.AccountOperatorDocument,
          },
        ],
      },
    ],
  },
  {
    type: FieldTypeEnum.Group,
    label: 'settingsCoopUnionSection4',
    children: [
      {
        type: FieldTypeEnum.Group,
        label: 'settingsCoopCentralRepresentative',
        children: [
          {
            type: FieldTypeEnum.FormField,
            label: 'settingsCoopCentralRepresentativeDetails',
            search_term: FormSearchTerm.CentralRepresentativeDetails,
          },
          {
            type: FieldTypeEnum.FormField,
            label: 'settingsCoopTrainingRelatedToCoop',
            search_term: FormSearchTerm.CentralRepresentativeCoopTraining,
          },
          {
            type: FieldTypeEnum.FormField,
            label: 'settingsCoopDocumentDeclaration',
            search_term: FormSearchTerm.CentralRepresentativeDocument,
          },
        ],
      },
    ],
  },
  {
    type: FieldTypeEnum.Group,
    label: 'settingsCoopUnionSection5',
    children: [],
  },
  {
    type: FieldTypeEnum.Group,
    label: 'settingsCoopUnionSection6',
    children: [
      {
        type: FieldTypeEnum.FormField,
        label: 'settingsCooperativeAccountHolderDeclarationDocuments',
        search_term: FormSearchTerm.FileUploads,
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
  // {
  //   type: FieldTypeEnum.Custom,
  //   label: 'settingsCoopUnionSection7',
  //   children: [],
  //   search_term: FormSearchTerm.AccountOperatorDetails,
  // },
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
        <AccordionPanel pb="0" display="flex" flexDirection="column" gap="s16">
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
