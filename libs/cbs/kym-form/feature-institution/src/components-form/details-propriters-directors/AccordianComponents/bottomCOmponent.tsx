import { FormProvider, useForm } from 'react-hook-form';

import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSwitch } from '@coop/shared/form';
import { Box, FormSection, Grid } from '@myra-ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

import { useDirector } from '../../hooks/useDirector';

interface IAddDirector {
  removeDirector: (directorId: string) => void;
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
  directorId: string;
}

export const DirectorsWithAffliation = ({ setKymCurrentSection, directorId }: IAddDirector) => {
  const { t } = useTranslation();
  const methods = useForm();

  useDirector({ directorId, methods });

  const isAffiliated = methods.watch(`isAffiliatedWithOtherFirms`);

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionInstitution(e.target.id);
          setKymCurrentSection(kymSection);
        }}
      >
        <FormSection flexLayout>
          <FormSwitch
            id="DirectorInstitutionAffiliationId"
            name="isAffiliatedWithOtherFirms"
            label={t['kymInsIsaffiliatedwithotherfirms']}
          />
          {isAffiliated && (
            <Box pt="s20">
              <Grid templateColumns="repeat(2, 1fr)" gap="s20">
                <FormInput
                  id="DirectorInstitutionAffiliationId"
                  type="text"
                  bg="white"
                  name="firmDetails.directorName"
                  label={t['kymInsNameofDirector']}
                  __placeholder={t['kymInsEnterNameofDirector']}
                />
                <FormInput
                  id="DirectorInstitutionAffiliationId"
                  type="text"
                  bg="white"
                  name="firmDetails.institutionName"
                  label={t['kymInsNameofInstitution']}
                  __placeholder={t['kymInsEnterNameofInstitution']}
                />
              </Grid>
              <InputGroupContainer mt="s16">
                <FormInput
                  id="DirectorInstitutionAffiliationId"
                  type="text"
                  bg="white"
                  name="firmDetails.address"
                  label={t['kymInsAddressofInstitution']}
                  __placeholder={t['kymInsEnterAddressofInstitution']}
                />
                <FormInput
                  id="DirectorInstitutionAffiliationId"
                  type="text"
                  bg="white"
                  name="firmDetails.designation"
                  label={t['kymInsDesignation']}
                  __placeholder={t['kymInsEnterDesignation']}
                />
                <FormInput
                  id="DirectorInstitutionAffiliationId"
                  type="number"
                  textAlign="right"
                  bg="white"
                  name="firmDetails.yearlyIncome"
                  label={t['kymInsYearlyIncome']}
                  __placeholder="0.00"
                />
              </InputGroupContainer>
            </Box>
          )}
        </FormSection>
      </form>
    </FormProvider>
  );
};
