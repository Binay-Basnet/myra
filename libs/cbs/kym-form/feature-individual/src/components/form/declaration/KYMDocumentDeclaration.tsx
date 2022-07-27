import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import {
  KymIndMemberInput,
  useGetKymDocumentsListQuery,
  useSetKymDocumentDataMutation,
} from '@coop/shared/data-access';
import { FormFileInput } from '@coop/shared/form';
import { Grid, Text } from '@coop/shared/ui';
import { getKymSection, useTranslation } from '@coop/shared/utils';

interface IKYMDocumentDeclarationFieldProps {
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
  name: string;
  label: string;
}

const KYMDocumentDeclarationField = ({
  setKymCurrentSection,
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
          const kymSection = getKymSection(e.target.id);
          setKymCurrentSection(kymSection);
        }}
      >
        <FormFileInput size="lg" label={label} name={name} />
      </form>
    </FormProvider>
  );
};

interface IKYMDocumentDeclarationProps {
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
}

export const KYMDocumentDeclaration = ({
  setKymCurrentSection,
}: IKYMDocumentDeclarationProps) => {
  const { t } = useTranslation();

  return (
    <GroupContainer>
      <Text fontSize="r1" fontWeight="SemiBold">
        {t['kynIndDOCUMENTDECLARATION']}
      </Text>

      <Grid templateColumns="repeat(2, 1fr)" rowGap="s32" columnGap="s20">
        <KYMDocumentDeclarationField
          label="Passport Size Photo"
          name="passportSizePhoto"
          setKymCurrentSection={setKymCurrentSection}
        />

        <KYMDocumentDeclarationField
          label="Signature"
          name="signaturePhoto"
          setKymCurrentSection={setKymCurrentSection}
        />

        <KYMDocumentDeclarationField
          label="Citizenship Photo"
          name="citizenshipPhoto"
          setKymCurrentSection={setKymCurrentSection}
        />

        <KYMDocumentDeclarationField
          label="Fingerprint Photo"
          name="fingerprintPhoto"
          setKymCurrentSection={setKymCurrentSection}
        />
        {/* {fileUploadsData?.members?.individual?.options?.list?.data?.[0]?.options?.map(
              (option, index) => (
                <FormFileInput
                  key={index}
                  size="lg"
                  label={option.name?.local}
                  name="documentsTemp"
                />
              )
            )} */}
      </Grid>
    </GroupContainer>
  );
};
