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
interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}
export const ContactDetailsInstitution = (props: IProps) => {
  const { t } = useTranslation();
  const methods = useForm<KymInsInput>({
    defaultValues: {},
  });
  const { setSection } = props;

  const router = useRouter();

  const { control, handleSubmit, getValues, watch, setError } = methods;
  const { mutate } = useSetInstitutionDataMutation({
    onSuccess: (res) => {
      setError('institutionName', {
        type: 'custom',
        message:
          res?.members?.institution?.add?.error?.error?.['institutionName'][0],
      });
    },
    onError: () => {
      setError('institutionName', {
        type: 'custom',
        message: 'it is what it is',
      });
    },
  });
  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        // console.log(editValues);
        // if (editValues && data) {
        mutate({ id: router.query['id'] as string, data });
        //   refetch();
        // }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  return (
    <FormProvider {...methods}>
      <form
        // onChange={debounce(() => {
        //   console.log('hello', getValues());
        //   mutate({ id, data: getValues() });
        // }, 800)}
        // onSubmit={handleSubmit((data) => {
        //   console.log('data', data);
        // })}
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
              // control={control}

              name={'phone'}
              label={t['kymInsPhone']}
              placeholder={t['kymInsEnterPhoneNumber']}
            />

            {/* <FormInput
          type="text"
          name="Nature of Business"
          label="Nature of Business"
          placeholder="Enter Middle name"
        /> */}

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
