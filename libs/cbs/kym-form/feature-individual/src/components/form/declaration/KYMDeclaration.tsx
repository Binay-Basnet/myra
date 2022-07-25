import { useEffect } from 'react';
import { Control, FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import {
  ContainerWithDivider,
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  FormFieldSearchTerm,
  KymIndMemberInput,
  useGetIndividualKymEditDataQuery,
  useGetIndividualKymOptionsQuery,
  useSetMemberDataMutation,
} from '@coop/shared/data-access';
import {
  FormInput,
  FormRadioGroup,
  FormSelect,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';
import { Box, Grid, GridItem, TextFields } from '@coop/shared/ui';
import { getKymSection, useTranslation } from '@coop/shared/utils';

import { getFieldOption } from '../../../utils/getFieldOption';

interface IKYMDeclaration {
  control: Control<any>;
}

const details = ['Citizen', 'Permanent Resident', 'Resident'];
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
  const id = String(router?.query?.['id']);

  const { data: familyRelationShipData, isLoading: familyRelationshipLoading } =
    useGetIndividualKymOptionsQuery({
      searchTerm: FormFieldSearchTerm.Relationship,
    });
  const {
    data: foreignEmploymentOptions,
    isLoading: foreignEmploymentOptionsLoading,
  } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.Occupation,
    // filter: { se: Kym_Field_Custom_Id.ForeignEmploymentOptions },
  });

  const hasBeneficialOwner = watch('hasBeneficialOwner');

  const isPoliticallyExposed = watch('isPoliticallyExposed');

  const isConvicted = watch('isConvicted');

  const hasForeignResidentialPermit = watch('hasForeignResidentialPermit');

  const { data: editValues } = useGetIndividualKymEditDataQuery({
    id: id,
  });

  useEffect(() => {
    if (editValues) {
      const editValueData =
        editValues?.members?.individual?.formState?.data?.formData;

      console.log({
        ...editValueData?.declaration,
        beneficialFullName:
          editValueData?.declaration?.beneficialFullName?.local,
      });

      reset({
        ...editValueData?.declaration,
        beneficialFullName:
          editValueData?.declaration?.beneficialFullName?.local,
      });
    }
  }, [editValues]);

  const { mutate } = useSetMemberDataMutation();

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        mutate({ id: router.query['id'] as string, data });
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
        <GroupContainer>
          <Box
            display="flex"
            flexDirection="column"
            gap="s16"
            id="Next to Kin"
            scrollMarginTop={'200px'}
          >
            <TextFields variant="bodyRegular" fontWeight={600}>
              {t['kynIndNominee']}
            </TextFields>
            <ContainerWithDivider>
              <Box
                id="kymAccIndBeneficialOwner"
                scrollMarginTop={'200px'}
                display="flex"
                flexDirection="column"
                gap="s32"
              >
                <FormSwitchTab
                  label={t['kynIndDoyouhavebeneficialowner']}
                  options={booleanList}
                  name="hasBeneficialOwner"
                />
                {hasBeneficialOwner && (
                  <Grid
                    gap={2}
                    templateColumns="repeat(3,1fr)"
                    alignItems="last baseline"
                  >
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
                  </Grid>
                )}
              </Box>

              <Box
                id="kymAccIndFamilymembersinpolitics"
                scrollMarginTop={'200px'}
                display="flex"
                flexDirection="column"
                gap="s32"
              >
                <FormSwitchTab
                  label={t['kynIndPoliticallyexposedperson']}
                  options={booleanList}
                  name="isPoliticallyExposed"
                />

                {isPoliticallyExposed && (
                  <InputGroupContainer>
                    <Box display="flex" flexDirection="column">
                      <FormTextArea
                        name="politicallyExposedDetails"
                        id="politicallyExposedDetails"
                        label={t['kynIndPleasespecify']}
                        placeholder={t['kynIndEnterDetails']}
                      />
                    </Box>
                  </InputGroupContainer>
                )}
              </Box>

              <Box
                id="kymAccIndConvictedNonconvictedStatus"
                scrollMarginTop={'200px'}
                display="flex"
                flexDirection="column"
                gap="s32"
              >
                <FormSwitchTab
                  label={t['kynIndDeclarationofconvicted']}
                  options={booleanList}
                  name="isConvicted"
                />

                {isConvicted && (
                  <InputGroupContainer>
                    <Box display="flex" flexDirection="column">
                      <FormTextArea
                        name="convictedDetails"
                        id="convictedDetails"
                        label={t['kynIndPleasespecify']}
                        placeholder={t['kynIndEnterDetails']}
                      />
                    </Box>
                  </InputGroupContainer>
                )}
              </Box>

              <Box
                id="kymAccIndResidentialpermitofforeigncountry"
                scrollMarginTop={'200px'}
                display="flex"
                flexDirection="column"
                gap="s32"
              >
                <FormSwitchTab
                  label={t['kynIndForeignCountry']}
                  options={booleanList}
                  name="hasForeignResidentialPermit"
                />

                {hasForeignResidentialPermit && (
                  <Box display="flex" flexDirection="column">
                    <FormRadioGroup
                      name="foreignResidentialPermitTypeId"
                      label={t['kynIndSpecifyfollowingdetails']}
                      options={getFieldOption(foreignEmploymentOptions)}
                      labelFontSize="s3"
                    />
                  </Box>
                )}
              </Box>
            </ContainerWithDivider>
          </Box>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
