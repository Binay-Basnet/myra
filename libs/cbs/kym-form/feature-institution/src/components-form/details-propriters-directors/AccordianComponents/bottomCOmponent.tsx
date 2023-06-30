import { useFormContext } from 'react-hook-form';

import { Box, FormSection, Grid } from '@myra-ui';

import { KymInsInput } from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormAmountInput, FormInput, FormSwitch } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

interface IAddDirector {
  index: number;
}

export const DirectorsWithAffliation = ({ index }: IAddDirector) => {
  const { t } = useTranslation();
  const methods = useFormContext<KymInsInput>();

  const isAffiliated = methods.watch(`director.${index}.isAffiliatedWithOtherFirms`);

  return (
    <FormSection flexLayout>
      <FormSwitch
        id="DirectorInstitutionAffiliationId"
        name={`director.${index}.isAffiliatedWithOtherFirms`}
        label={t['kymInsIsaffiliatedwithotherfirms']}
      />
      {isAffiliated && (
        <Box pt="s20">
          <Grid templateColumns="repeat(2, 1fr)" gap="s20">
            <FormInput
              id="DirectorInstitutionAffiliationId"
              type="text"
              bg="white"
              name={`director.${index}.firmDetails.directorName`}
              label={t['kymInsNameofDirector']}
              __placeholder={t['kymInsEnterNameofDirector']}
            />
            <FormInput
              id="DirectorInstitutionAffiliationId"
              type="text"
              bg="white"
              name={`director.${index}.firmDetails.institutionName`}
              label={t['kymInsNameofInstitution']}
              __placeholder={t['kymInsEnterNameofInstitution']}
            />
          </Grid>
          <InputGroupContainer mt="s16">
            <FormInput
              id="DirectorInstitutionAffiliationId"
              type="text"
              bg="white"
              name={`director.${index}.firmDetails.address`}
              label={t['kymInsAddressofInstitution']}
              __placeholder={t['kymInsEnterAddressofInstitution']}
            />
            <FormInput
              id="DirectorInstitutionAffiliationId"
              type="text"
              bg="white"
              name={`director.${index}.firmDetails.designation`}
              label={t['kymInsDesignation']}
              __placeholder={t['kymInsEnterDesignation']}
            />
            <FormAmountInput
              id="DirectorInstitutionAffiliationId"
              bg="white"
              name={`director.${index}.firmDetails.yearlyIncome`}
              label={t['kymInsYearlyIncome']}
              __placeholder="0.00"
            />
          </InputGroupContainer>
        </Box>
      )}
    </FormSection>
  );
};
