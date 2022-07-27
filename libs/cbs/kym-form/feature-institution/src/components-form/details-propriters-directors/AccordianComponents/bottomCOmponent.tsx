import React, { useEffect, useMemo, useState } from 'react';
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { FaMap } from 'react-icons/fa';
import { GrRotateRight } from 'react-icons/gr';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';
import debounce from 'lodash/debounce';

import {
  GroupContainer,
  InputGroupContainer,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  KymInsInput,
  useAllAdministrationQuery,
  useDeleteDirectorInstitutionMutation,
  useGetNewIdMutation,
  useSetAddDirectorInstitutionMutation,
} from '@coop/shared/data-access';
import {
  FormFileInput,
  FormInput,
  FormMap,
  FormSelect,
  FormSwitch,
} from '@coop/shared/form';
import {
  Box,
  Button,
  Collapse,
  Grid,
  Icon,
  IconButton,
  Text,
} from '@coop/shared/ui';
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

  const { watch } = methods;

  const router = useRouter();

  const id = String(router?.query?.['id']);

  const { mutate } = useSetAddDirectorInstitutionMutation();

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        mutate({ id, dir: directorId, data: { ...data } });
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);
  const isAffiliated = watch(`isAffiliatedWithOtherFirms`);
  console.log({ isAffiliated });
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
            name={`isAffiliatedWithOtherFirms`}
            label={t['kymInsIsaffiliatedwithotherfirms']}
          />
          {isAffiliated && (
            <Box>
              <Grid templateColumns={'repeat(2, 1fr)'} gap="s20">
                <FormInput
                  type="text"
                  bg="white"
                  name={`firmDetails.directorName`}
                  label={t['kymInsNameofDirector']}
                  placeholder={t['kymInsEnterNameofDirector']}
                />
                <FormInput
                  type="text"
                  bg="white"
                  name={`firmDetails.institutionName`}
                  label={t['kymInsNameofInstitution']}
                  placeholder={t['kymInsEnterNameofInstitution']}
                />
              </Grid>
              <InputGroupContainer mt="s16">
                <FormInput
                  type="text"
                  bg="white"
                  name={`firmDetails.address`}
                  label={t['kymInsAddressofInstitution']}
                  placeholder={t['kymInsEnterAddressofInstitution']}
                />
                <FormInput
                  type="text"
                  bg="white"
                  name={`firmDetails.designation`}
                  label={t['kymInsDesignation']}
                  placeholder={t['kymInsEnterDesignation']}
                />
                <FormInput
                  type="number"
                  textAlign={'right'}
                  bg="white"
                  name={`firmDetails.yearlyIncome`}
                  label={t['kymInsYearlyIncome']}
                  placeholder="0.00"
                />
              </InputGroupContainer>
            </Box>
          )}
        </Box>
      </form>
    </FormProvider>
  );
};
