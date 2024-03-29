import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Grid } from '@myra-ui';

import {
  IndividualRequiredDocument,
  InstitutionRequiredDocument,
  KymMemberTypesEnum,
  useGetAccountDocumentsListQuery,
  useGetAccountOpenProductDetailsQuery,
  useGetIndividualMemberDetails,
} from '@coop/cbs/data-access';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormFileInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

interface Iprops {
  setFileList: React.Dispatch<React.SetStateAction<FileListType>>;
  id: string;
  productId: string;
  memberId: string;
}

type FileListType = {
  signature: string[];
  nominee: string[];
  photo: string[];
  fingerPrintPhoto: string[];
  decisionDocuments: string[];
  registeredPhotos: string[];
  InsSignature: string[];
  taxClearance: string[];
};

export const RequiredDocuments = ({ setFileList, id, productId, memberId }: Iprops) => {
  const [triggerQuery, setTriggerQuery] = useState(false);

  const { memberDetailData } = useGetIndividualMemberDetails({ memberId });

  const { t } = useTranslation();
  const methods = useForm();
  const { watch, reset } = methods;
  const signatureWatch = watch('signature');
  const nomineeWatch = watch('nominee');
  const photoWatch = watch('photo');
  const fingerPrintPhotoWatch = watch('fingerprintPhoto');
  const decisionwatch = watch('decisionDocumentIns');
  const registeredwatch = watch('registeredPhotoIns');
  const signatureInsWatch = watch('signatureIns');
  const taxClearwatch = watch('taxClearance');
  const {
    data,
    isLoading,
    refetch: refetchDocumentList,
  } = useGetAccountDocumentsListQuery({
    subscriptionId: id,
  });

  const docData = data?.document?.listSubscriptionDocuments?.data;

  const poductDetails = useGetAccountOpenProductDetailsQuery(
    { id: productId },
    {
      enabled: triggerQuery,
    }
  );
  const ProductData = poductDetails?.data?.settings?.general?.depositProduct?.formState?.data;

  const photoinc = IndividualRequiredDocument?.Photo;
  const signinc = IndividualRequiredDocument?.Signature;
  const nomineeinc = IndividualRequiredDocument?.NomineeDocument;
  const fingerPrintinc = IndividualRequiredDocument?.Fingerprint;
  const decIns = InstitutionRequiredDocument?.Decision;

  useEffect(() => {
    setFileList({
      signature: watch('signature'),
      nominee: watch('nominee'),
      photo: watch('photo'),
      fingerPrintPhoto: watch('fingerprintPhoto'),
      decisionDocuments: watch('decisionDocumentIns'),
      registeredPhotos: watch('registeredPhotoIns'),
      InsSignature: watch('signatureIns'),
      taxClearance: watch('taxClearance'),
    });
  }, [
    signatureWatch,
    nomineeWatch,
    photoWatch,
    fingerPrintPhotoWatch,
    registeredwatch,
    decisionwatch,
    signatureInsWatch,
    taxClearwatch,
  ]);

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
      decisionDocuments: docData
        ?.find((doc) => doc?.fieldId === 'decisionDocuments')
        ?.docData?.map((doc) => ({ fileName: doc?.identifier, url: doc?.url })),
      registeredPhotos: docData
        ?.find((doc) => doc?.fieldId === 'registeredPhotos')
        ?.docData?.map((doc) => ({ fileName: doc?.identifier, url: doc?.url })),
      InsSignature: docData
        ?.find((doc) => doc?.fieldId === 'InsSignature')
        ?.docData?.map((doc) => ({ fileName: doc?.identifier, url: doc?.url })),
      taxClearance: docData
        ?.find((doc) => doc?.fieldId === 'taxClearance')
        ?.docData?.map((doc) => ({ fileName: doc?.identifier, url: doc?.url })),
    });
  }, [isLoading, docData]);

  useEffect(() => {
    if (productId) {
      setTriggerQuery(true);
    }
  }, [productId]);

  useEffect(() => {
    if (id) {
      refetchDocumentList();
    }
  }, [id]);

  return (
    <FormProvider {...methods}>
      <form>
        <GroupContainer scrollMarginTop="200px" display="flex" flexDirection="column" gap="s16">
          <Grid
            background="neutralColorLight.Gray-0"
            templateColumns="repeat(2, 1fr)"
            rowGap="s32"
            columnGap="s20"
            p="s20"
          >
            {memberDetailData?.type === KymMemberTypesEnum?.Individual &&
              ProductData?.individualDocuments?.includes(photoinc) && (
                <FormFileInput size="lg" label={t['accPhoto']} name="photo" />
              )}
            {memberDetailData?.type === KymMemberTypesEnum?.Individual &&
              ProductData?.individualDocuments?.includes(signinc) && (
                <FormFileInput size="lg" label={t['accSignature']} name="signature" />
              )}
            {memberDetailData?.type === KymMemberTypesEnum?.Individual &&
              ProductData?.individualDocuments?.includes(nomineeinc) && (
                <FormFileInput size="lg" label={t['accNomineeDocument']} name="nominee" />
              )}
            {memberDetailData?.type === KymMemberTypesEnum?.Individual &&
              ProductData?.individualDocuments?.includes(fingerPrintinc) && (
                <FormFileInput size="lg" label={t['accFingerprintPhoto']} name="fingerprintPhoto" />
              )}
            {memberDetailData?.type !== KymMemberTypesEnum?.Individual &&
              ProductData?.institutionDocuments?.includes(decIns) && (
                <FormFileInput size="lg" label="Decision Document" name="decisionDocumentIns" />
              )}
            {memberDetailData?.type !== KymMemberTypesEnum?.Individual &&
              ProductData?.institutionDocuments?.includes(
                InstitutionRequiredDocument?.Registered
              ) && <FormFileInput size="lg" label="Registered" name="registeredPhotoIns" />}
            {memberDetailData?.type !== KymMemberTypesEnum?.Individual &&
              ProductData?.institutionDocuments?.includes(
                InstitutionRequiredDocument?.Signature
              ) && <FormFileInput size="lg" label="Signature" name="signatureIns" />}
            {memberDetailData?.type !== KymMemberTypesEnum?.Individual &&
              ProductData?.institutionDocuments?.includes(
                InstitutionRequiredDocument?.TaxClearance
              ) && <FormFileInput size="lg" label="Tax Clearance" name="taxClearance" />}
          </Grid>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
