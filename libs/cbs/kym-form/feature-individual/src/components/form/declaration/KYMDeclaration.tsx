import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import {
  FormFieldSearchTerm,
  KymIndMemberInput,
  useGetIndividualKymEditDataQuery,
  useGetIndividualKymOptionsQuery,
  useSetMemberDataMutation,
} from '@coop/cbs/data-access';
import {
  FormInput,
  FormRadioGroup,
  FormSelect,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';
import { Box, FormSection, GridItem, TextFields } from '@coop/shared/ui';
import { getKymSection, useTranslation } from '@coop/shared/utils';

import { getFieldOption } from '../../../utils/getFieldOption';

// interface IKYMDeclaration {
//   control: Control<any>;
// }

const booleanList = [
  {
    label: 'Yes',
    value: true,
  },
  {
    label: 'No',
    value: false,
  },
];

interface IKYMDeclarationProps {
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
}

export const KYMDeclaration = ({
  setKymCurrentSection,
}: IKYMDeclarationProps) => {
  const { t } = useTranslation();

  const methods = useForm<KymIndMemberInput>();

  const { watch, reset } = methods;

  const router = useRouter();
  const id = router?.query?.['id'];

  const isConvicted = watch('isConvicted');

  const { data: familyRelationShipData, isLoading: familyRelationshipLoading } =
    useGetIndividualKymOptionsQuery({
      searchTerm: FormFieldSearchTerm.Relationship,
    });
  const {
    data: foreignEmploymentOptions,
    // isLoading: foreignEmploymentOptionsLoading,
  } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm?.ForeignEmploymentOptions,
    // filter: { se: Kym_Field_Custom_Id.ForeignEmploymentOptions },
  });

  const hasBeneficialOwner = watch('hasBeneficialOwner');

  const isPoliticallyExposed = watch('isPoliticallyExposed');
  const hasForeignResidentialPermit = watch('hasForeignResidentialPermit');

  const { data: editValues } = useGetIndividualKymEditDataQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  useEffect(() => {
    if (editValues) {
      const editValueData =
        editValues?.members?.individual?.formState?.data?.formData;
      reset({
        // ...editValueData?.declaration,
        ...editValueData?.declaration,
        beneficialFullName:
          editValueData?.declaration?.beneficialFullName?.local,
        foreignResidentialPermitTypeId:
          editValueData?.declaration?.foreignResidentialPermitTypeId ?? '',
      });
      // if (editValueData?.foreignEmployment) {
      //   reset({
      //     // ...editValueData?.declaration,
      //     ...editValueData?.declaration,
      //     beneficialFullName:
      //       editValueData?.declaration?.beneficialFullName?.local,
      //     foreignResidentialPermitTypeId:
      //       editValueData?.declaration?.foreignResidentialPermitTypeId ?? '',
      //     hasForeignResidentialPermit: true,
      //   });
      // }
      //  else {
      //   console.log('false');
      //   reset({
      //     // ...editValueData?.declaration,
      //     ...editValueData?.declaration,
      //     beneficialFullName:
      //       editValueData?.declaration?.beneficialFullName?.local,
      //     foreignResidentialPermitTypeId:
      //       editValueData?.declaration?.foreignResidentialPermitTypeId ?? '',
      //     hasForeignResidentialPermit: false,
      //   });
      // }
    }
  }, [editValues]);

  const { mutate } = useSetMemberDataMutation();

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        if (id) {
          mutate({ id: String(id), data });
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSection(e.target.id);
          setKymCurrentSection(kymSection);
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          id="Next to Kin"
          scrollMarginTop={'200px'}
        >
          <Box p="s20" pb="0">
            <TextFields variant="bodyRegular" fontWeight="SemiBold">
              {t['kynIndNominee']}
            </TextFields>
          </Box>

          <FormSection id="kymAccIndBeneficialOwner">
            <GridItem colSpan={3}>
              <FormSwitchTab
                label={t['kynIndDoyouhavebeneficialowner']}
                options={booleanList}
                name="hasBeneficialOwner"
              />
            </GridItem>
            {hasBeneficialOwner && (
              <>
                <GridItem colSpan={1}>
                  <FormSelect
                    name={'beneficialRelationshipId'}
                    isLoading={familyRelationshipLoading}
                    options={getFieldOption(familyRelationShipData)}
                    placeholder={t['kynIndRelationship']}
                    label={t['kynIndIyespleasewritenameandrelationship']}
                  />
                </GridItem>

                <GridItem mt="20px" colSpan={2}>
                  <FormInput
                    type="text"
                    id="beneficialFullName"
                    name={'beneficialFullName'}
                    label=" "
                    placeholder={t['kynIndFullName']}
                  />
                </GridItem>
              </>
            )}
          </FormSection>

          <FormSection id="kymAccIndFamilymembersinpolitics">
            <GridItem colSpan={3}>
              <FormSwitchTab
                label={t['kynIndPoliticallyexposedperson']}
                options={booleanList}
                name="isPoliticallyExposed"
              />
            </GridItem>
            {isPoliticallyExposed && (
              <GridItem colSpan={3}>
                <Box w="50%">
                  <FormTextArea
                    name="politicallyExposedDetails"
                    id="politicallyExposedDetails"
                    label={t['kynIndPleasespecify']}
                    placeholder={t['kynIndEnterDetails']}
                  />
                </Box>
              </GridItem>
            )}
          </FormSection>

          <FormSection id="kymAccIndConvictedNonconvictedStatus">
            <GridItem colSpan={3}>
              <FormSwitchTab
                label={t['kynIndDeclarationofconvicted']}
                options={booleanList}
                name="isConvicted"
              />
            </GridItem>
            {isConvicted && (
              <GridItem colSpan={3}>
                <Box w="50%">
                  <FormTextArea
                    id="convictedDetails"
                    label={t['kynIndPleasespecify']}
                    placeholder={t['kynIndEnterDetails']}
                    name="politicallyExposedDetails"
                  />
                </Box>
              </GridItem>
            )}
          </FormSection>

          <FormSection id="kymAccIndResidentialpermitofforeigncountry">
            <GridItem colSpan={3}>
              <FormSwitchTab
                label={t['kynIndForeignCountry']}
                options={booleanList}
                name="hasForeignResidentialPermit"
              />
            </GridItem>
            <GridItem colSpan={3}>
              {hasForeignResidentialPermit && (
                <FormRadioGroup
                  name="foreignResidentialPermitTypeId"
                  label={t['kynIndSpecifyfollowingdetails']}
                  options={getFieldOption(foreignEmploymentOptions)}
                  labelFontSize="s3"
                />
              )}
            </GridItem>
          </FormSection>
        </Box>
      </form>
    </FormProvider>
  );
};
