import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import {
  useGetInsBoardDirectorEditListQuery,
  useSetAddDirectorInstitutionMutation,
} from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSwitch } from '@coop/shared/form';
import { Box, Grid } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

interface IAddDirector {
  removeDirector: (directorId: string) => void;
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
  directorId: string;
}
export const DirectorsWithAffliation = ({
  removeDirector,
  setKymCurrentSection,
  directorId,
}: IAddDirector) => {
  const { t } = useTranslation();
  const methods = useForm();

  const { watch, reset } = methods;

  const router = useRouter();

  const id = String(router?.query?.['id']);

  const { mutate } = useSetAddDirectorInstitutionMutation();
  const { data: editValues } = useGetInsBoardDirectorEditListQuery({
    id: id,
  });
  useEffect(() => {
    if (editValues) {
      const editValueData =
        editValues?.members?.institution?.listDirectors?.data;

      const familyMemberDetail = editValueData?.find(
        (data) => data?.id === directorId
      );

      if (familyMemberDetail) {
        reset({
          isAffiliatedWithOtherFirms:
            familyMemberDetail?.isAffiliatedWithOtherFirms,
          firmDetails: {
            ...familyMemberDetail?.firmDetails,
          },
        });
      }
    }
  }, [editValues]);
  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        mutate({ id, dir: directorId, data: { ...data } });
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);
  const isAffiliated = watch(`isAffiliatedWithOtherFirms`);

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionInstitution(e.target.id);
          setKymCurrentSection(kymSection);
        }}
      >
        <Box display="flex" flexDirection="column" gap="s16">
          <FormSwitch
            id="DirectorInstitutionAffiliationId"
            name={`isAffiliatedWithOtherFirms`}
            label={t['kymInsIsaffiliatedwithotherfirms']}
          />
          {isAffiliated && (
            <Box>
              <Grid templateColumns={'repeat(2, 1fr)'} gap="s20">
                <FormInput
                  id="DirectorInstitutionAffiliationId"
                  type="text"
                  bg="white"
                  name={`firmDetails.directorName`}
                  label={t['kymInsNameofDirector']}
                  __placeholder={t['kymInsEnterNameofDirector']}
                />
                <FormInput
                  id="DirectorInstitutionAffiliationId"
                  type="text"
                  bg="white"
                  name={`firmDetails.institutionName`}
                  label={t['kymInsNameofInstitution']}
                  __placeholder={t['kymInsEnterNameofInstitution']}
                />
              </Grid>
              <InputGroupContainer mt="s16">
                <FormInput
                  id="DirectorInstitutionAffiliationId"
                  type="text"
                  bg="white"
                  name={`firmDetails.address`}
                  label={t['kymInsAddressofInstitution']}
                  __placeholder={t['kymInsEnterAddressofInstitution']}
                />
                <FormInput
                  id="DirectorInstitutionAffiliationId"
                  type="text"
                  bg="white"
                  name={`firmDetails.designation`}
                  label={t['kymInsDesignation']}
                  __placeholder={t['kymInsEnterDesignation']}
                />
                <FormInput
                  id="DirectorInstitutionAffiliationId"
                  type="number"
                  textAlign={'right'}
                  bg="white"
                  name={`firmDetails.yearlyIncome`}
                  label={t['kymInsYearlyIncome']}
                  __placeholder="0.00"
                />
              </InputGroupContainer>
            </Box>
          )}
        </Box>
      </form>
    </FormProvider>
  );
};
