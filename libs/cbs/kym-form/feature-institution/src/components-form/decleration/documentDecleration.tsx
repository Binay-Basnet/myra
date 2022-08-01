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
  KymIndMemberInput,
  useGetKymDocumentsListQuery,
  useSetKymDocumentDataMutation,
} from '@coop/shared/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { FormFileInput } from '@coop/shared/form';
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

  return (
    <GroupContainer id="Documents Declaration" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        {t['kymInsDocumentsDeclaration']}
      </Text>
      <Grid templateColumns={'repeat(2, 1fr)'} gap="s32">
        <KYMDocumentDeclarationField
          name="cooperativeDocuments"
          label={t['kymInsAGMDecisionDocument']}
          setSection={setSection}
        />
        <KYMDocumentDeclarationField
          name="cooperativeDocuments"
          label={t['kymInsRegisteredCertificate']}
          setSection={setSection}
        />
        <KYMDocumentDeclarationField
          name="cooperativeDocuments0"
          label="MOA/AOA"
          setSection={setSection}
        />
        <KYMDocumentDeclarationField
          name="cooperativeDocuments"
          label={t['kymInsPANCertificate']}
          setSection={setSection}
        />
        <KYMDocumentDeclarationField
          name="cooperativeDocuments"
          label={t['kymInsTaxClearance']}
          setSection={setSection}
        />
        <KYMDocumentDeclarationField
          name="cooperativeDocuments"
          label={t['kymInsLatestAuditReport']}
          setSection={setSection}
        />
      </Grid>
    </GroupContainer>
  );
};
interface IKYMDocumentDeclarationFieldProps {
  setSection: (section?: { section: string; subSection: string }) => void;
  name: string;
  label: string;
}
const KYMDocumentDeclarationField = ({
  setSection,
  name,
  label,
}: IKYMDocumentDeclarationFieldProps) => {
  const router = useRouter();
  const id = router?.query?.['id'];

  const methods = useForm<KymIndMemberInput>();

  const { watch, reset } = methods;

  const { data: editValues, isFetching } = useGetKymDocumentsListQuery(
    {
      memberId: String(id),
    },
    { enabled: !!id }
  );

  useEffect(() => {
    if (editValues) {
      const kymDocumentsList =
        editValues?.members?.document?.listKYMDocuments?.data;

      console.log({ kymDocumentsList });

      const documentData = kymDocumentsList?.find(
        (doc) => doc?.fieldId === name
      );

      // console.log({ documentData });

      if (documentData) {
        reset({
          [name]: documentData.docData.map((file) => ({
            url: file?.url,
            fileName: file?.identifier,
          })),
        });
      }
    }
  }, [isFetching]);

  const { mutate } = useSetKymDocumentDataMutation();

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        if (!data[name]?.[0]?.url) {
          if (id) {
            mutate({
              memberId: id as string,
              fieldId: name,
              identifiers: data[name],
            });
          }
        }
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
        <FormFileInput size="lg" label={label} name={name} />
      </form>
    </FormProvider>
  );
};
