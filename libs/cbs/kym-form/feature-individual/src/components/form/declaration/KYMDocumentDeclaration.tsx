import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import {
  Kym_Field_Custom_Id,
  KymIndMemberInput,
  useGetIndividualKymOptionsQuery,
  useGetKymDocumentsListQuery,
  useSetKymDocumentDataMutation,
  useSetMemberDataMutation,
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
  const id = String(router?.query?.['id']);

  const methods = useForm<KymIndMemberInput>();

  const { watch, reset } = methods;

  const { data: editValues, refetch } = useGetKymDocumentsListQuery({
    memberId: id,
  });

  useEffect(() => {
    if (editValues) {
      const kymDocumentsList =
        editValues?.members?.document?.listKYMDocuments?.data;

      const documentData = kymDocumentsList?.find(
        (doc) => doc?.fieldId === name
      );

      console.log({ [name]: documentData?.identifier });

      // if (documentData) {
      //   reset({
      //     [name]: documentData.identifier.map((file) => ({
      //       url: '',
      //       fileName: file.fileName,
      //     })),
      //   });
      // }
    }
  }, [editValues]);

  const { mutate } = useSetKymDocumentDataMutation({
    onSuccess: () => refetch(),
  });

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        console.log({ data });
        mutate({ memberId: id, fieldId: name, identifiers: data[name] });
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
