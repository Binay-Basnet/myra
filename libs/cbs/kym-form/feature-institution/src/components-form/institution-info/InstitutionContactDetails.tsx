import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { KymInsInput } from '@coop/shared/data-access';
import {
  useGetKymFormStatusInstitutionQuery,
  useSetInstitutionDataMutation,
} from '@coop/shared/data-access';
import {
  FormEmailInput,
  FormInput,
  FormPhoneNumber,
  FormSelect,
} from '@coop/shared/form';
import { Box, Grid, GridItem, Text } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

import { useInstitution } from '../hooks/institutionHook';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}
export const ContactDetailsInstitution = (props: IProps) => {
  const { t } = useTranslation();
  const methods = useForm<KymInsInput>({
    defaultValues: {},
  });
  const { setSection } = props;

  const { control, handleSubmit, getValues, watch, setError } = methods;
  useInstitution({ methods });

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionInstitution(e.target.id);
          setSection(kymSection);
        }}
      >
        <GroupContainer id="kymInsContactDetails" scrollMarginTop={'200px'}>
          <Text
            fontSize="r1"
            fontWeight="semibold"
            color="neutralColorLight.Gray-80"
          >
            {t['kymInsContactDetails']}
          </Text>
          <InputGroupContainer>
            <FormPhoneNumber
              name={'phone'}
              label={t['kymInsPhone']}
              placeholder={t['kymInsEnterPhoneNumber']}
            />

            <FormInput
              type="number"
              name="fax"
              label={t['kymInsFax']}
              placeholder={t['kymInsEnterFax']}
            />

            <FormEmailInput
              name="email"
              label={t['kymInsEmail']}
              placeholder={t['kymInsEnterEmailAddress']}
            />

            <FormInput
              type="text"
              name="website"
              label={t['kymInsWebsiteLinkany']}
              placeholder={t['kymInsEnterWebsiteURL']}
            />

            <FormInput
              type="number"
              name="postBoxNo"
              label={t['kymInsPostBoxNo']}
              placeholder={t['kymInsEnterPostBoxNo']}
            />
            <Box></Box>
            <Box mt="44px">
              <FormInput
                type="number"
                name="numberOfEmployee"
                label={t['kymInsNumberofEmployees']}
                placeholder={t['kymInsEnterNumberofEmployees']}
              />
            </Box>
            <Box mt="44px">
              <FormInput
                type="date"
                name="dateOfLastAGM"
                label={t['kymInsAGMDetailsDate']}
                placeholder="DD-MM-YYYY"
              />
            </Box>
          </InputGroupContainer>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
