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
import { FormFileInput } from '@coop/shared/form';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Box, Grid, GridItem, Text } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';
interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}
export const DocumentDeclarationInstitution = (props: IProps) => {
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
        onFocus={(e) => {
          const kymSection = getKymSectionInstitution(e.target.id);
          setSection(kymSection);
        }}
      >
        <GroupContainer id="Documents Declaration" scrollMarginTop={'200px'}>
          <Text
            fontSize="r1"
            fontWeight="semibold"
            color="neutralColorLight.Gray-80"
          >
            {t['kymInsDocumentsDeclaration']}
          </Text>
          <Grid templateColumns={'repeat(2, 1fr)'} gap="s32">
            <FormFileInput
              name="cooperativeDocuments"
              label={t['kymInsAGMDecisionDocument']}
              size="lg"
            />
            <FormFileInput
              name="cooperativeDocuments"
              label={t['kymInsRegisteredCertificate']}
              size="lg"
            />
            <FormFileInput
              name="cooperativeDocuments0"
              label="MOA/AOA"
              size="lg"
            />
            <FormFileInput
              name="cooperativeDocuments"
              label={t['kymInsPANCertificate']}
              size="lg"
            />
            <FormFileInput
              name="cooperativeDocuments"
              label={t['kymInsTaxClearance']}
              size="lg"
            />
            <FormFileInput
              name="cooperativeDocuments"
              label={t['kymInsLatestAuditReport']}
              size="lg"
            />
          </Grid>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
