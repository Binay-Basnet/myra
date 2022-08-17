import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import { useSetKymIndividualIdentificationDataMutation } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import { Box, Grid, Text } from '@coop/shared/ui';
import { getKymSection, useTranslation } from '@coop/shared/utils';

interface IPassportProps {
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
}

export const Passport = ({ setKymCurrentSection }: IPassportProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = router?.query?.['id'];

  const methods = useForm();

  const { watch } = methods;

  const { mutate } = useSetKymIndividualIdentificationDataMutation();

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        if (id) {
          mutate({ id: String(id), data: { ...data, idType: 'citizenship' } });
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
        <Box display="flex" flexDirection="column" gap="s16">
          <Text
            fontSize="r1"
            fontWeight="medium"
            color="neutralColorLight.Gray-70"
          >
            {t['kymIndPassport']}
          </Text>
          <Grid templateColumns="repeat(3, 1fr)" gap="s20">
            <FormInput
              type="text"
              name="idNo"
              label={t['kymIndPassportNo']}
              placeholder={t['kymIndPassportNo']}
            />

            <FormInput
              type="text"
              name="place"
              label={t['kymIndPassportIssuePlace']}
              placeholder={t['kymIndPassportIssuePlace']}
            />

            <FormInput
              type="date"
              name="date"
              label={t['kymIndPassportIssueDate']}
              placeholder={t['kymIndPassportIssueDate']}
            />
          </Grid>
        </Box>
      </form>
    </FormProvider>
  );
};
