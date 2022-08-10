import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useGetAccountDocumentsListQuery } from '@coop/cbs/data-access';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormFileInput } from '@coop/shared/form';
import { Grid } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { FileListType } from '../../lib/CbsAccountOpen';

interface Iprops {
  setFileList: React.Dispatch<React.SetStateAction<FileListType>>;
  id: string;
}
export const RequiredDocuments = ({ setFileList, id }: Iprops) => {
  const { t } = useTranslation();
  const methods = useForm();
  const { watch, reset } = methods;
  const signatureWatch = watch('signature');
  const nomineeWatch = watch('nominee');
  const photoWatch = watch('photo');
  const fingerPrintPhotoWatch = watch('fingerprintPhoto');
  const { data, isLoading } = useGetAccountDocumentsListQuery({
    subscriptionId: id,
  });

  const docData = data?.document?.listSubscriptionDocuments?.data;

  useEffect(() => {
    setFileList({
      signature: watch('signature'),
      nominee: watch('nominee'),
      photo: watch('photo'),
      fingerPrintPhoto: watch('fingerprintPhoto'),
    });
  }, [signatureWatch, nomineeWatch, photoWatch, fingerPrintPhotoWatch]);

  useEffect(() => {
    reset({
      signature: docData
        ?.find((doc) => doc?.fieldId === 'signature')
        ?.docData.map((doc) => ({ fileName: doc?.identifier, url: doc?.url })),
      nominee: docData
        ?.find((doc) => doc?.fieldId === 'nominee')
        ?.docData?.map((doc) => ({ fileName: doc?.identifier, url: doc?.url })),
      photo: docData
        ?.find((doc) => doc?.fieldId === 'photo')
        ?.docData?.map((doc) => ({ fileName: doc?.identifier, url: doc?.url })),
      fingerprintPhoto: docData
        ?.find((doc) => doc?.fieldId === 'fingerPrintPhoto')
        ?.docData?.map((doc) => ({ fileName: doc?.identifier, url: doc?.url })),
    });
  }, [isLoading]);
  return (
    <FormProvider {...methods}>
      <form>
        <GroupContainer
          scrollMarginTop={'200px'}
          display="flex"
          flexDirection={'column'}
          gap="s16"
        >
          <Grid
            background="neutralColorLight.Gray-0"
            templateColumns="repeat(2, 1fr)"
            rowGap="s32"
            columnGap="s20"
            p="s20"
          >
            <FormFileInput size="lg" label={t['accPhoto']} name="photo" />
            <FormFileInput
              size="lg"
              label={t['accSignature']}
              name="signature"
            />
            <FormFileInput
              size="lg"
              label={t['accNomineeDocument']}
              name="nominee"
            />
            <FormFileInput
              size="lg"
              label={t['accFingerprintPhoto']}
              name="fingerprintPhoto"
            />
          </Grid>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
