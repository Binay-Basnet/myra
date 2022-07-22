import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import {
  Kym_Field_Custom_Id,
  KymIndMemberInput,
  useGetIndividualKymOptionsQuery,
  useSetMemberDataMutation,
} from '@coop/shared/data-access';
import { FormFileInput } from '@coop/shared/form';
import { Grid, Text } from '@coop/shared/ui';
import { getKymSection, useTranslation } from '@coop/shared/utils';

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

  const router = useRouter();
  const id = String(router?.query?.['id']);

  const methods = useForm<KymIndMemberInput>();

  const { watch } = methods;

  const { data: fileUploadsData, isLoading: fileUploadsLoading } =
    useGetIndividualKymOptionsQuery({
      id,
      filter: {
        customId: Kym_Field_Custom_Id.FileUploads,
      },
    });

  // console.log(
  //   fileUploadsData?.members?.individual?.options?.list?.data?.[0]?.options
  // );

  const { mutate } = useSetMemberDataMutation({
    onSuccess: (res) => {
      // setError('firstName', {
      //   type: 'custom',
      //   message: res?.members?.individual?.add?.error?.error?.['firstName'][0],
      // });
      console.log(res);
    },
    //   onError: () => {
    //     setError('firstName', { type: 'custom', message: 'gg' });
    //   },
  });

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        mutate({ id: router.query['id'] as string, data });
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
        <GroupContainer>
          <Text fontSize="r1" fontWeight="SemiBold">
            {t['kynIndDOCUMENTDECLARATION']}
          </Text>

          <Grid templateColumns="repeat(2, 1fr)" rowGap="s32" columnGap="s20">
            {fileUploadsData?.members?.individual?.options?.list?.data?.[0]?.options?.map(
              (option, index) => (
                <FormFileInput
                  key={index}
                  size="lg"
                  label={option.name?.local}
                  name="documentsTemp"
                />
              )
            )}
          </Grid>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
