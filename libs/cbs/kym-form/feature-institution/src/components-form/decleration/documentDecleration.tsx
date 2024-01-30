import { FormSection } from '@myra-ui';

import { FormFileInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const DocumentDeclarationInstitution = () => {
  const { t } = useTranslation();

  return (
    <FormSection templateColumns={2} id="Documents Declaration" header="kymInsDocumentsDeclaration">
      <FormFileInput name="documents.0.identifiers" label={t['kymInsAGMDecisionDocument']} />
      <FormFileInput name="documents.1.identifiers" label={t['kymInsRegisteredCertificate']} />
      <FormFileInput name="documents.2.identifiers" label={t['kymInsMoaAoa']} />
      <FormFileInput name="documents.3.identifiers" label={t['kymInsPANCertificate']} />
      <FormFileInput name="documents.4.identifiers" label={t['kymInsTaxClearance']} />
      <FormFileInput name="documents.5.identifiers" label={t['kymInsLatestAuditReport']} />
    </FormSection>
  );
};

// interface IKYMDocumentDeclarationFieldProps {
//   setSection: (section?: { section: string; subSection: string }) => void;
//   name: string;
//   label: string;
// }

// const KYMDocumentDeclarationField = ({
//   setSection,
//   name,
//   label,
// }: IKYMDocumentDeclarationFieldProps) => {
//   const router = useRouter();
//   const id = String(router?.query?.['id']);

//   const methods = useForm<KymIndMemberInput>();

//   const { watch, reset } = methods;

//   const { data: editValues, isFetching } = useGetKymDocumentsListQuery(
//     {
//       memberId: String(id),
//     },
//     { enabled: !!id }
//   );

//   useEffect(() => {
//     if (editValues) {
//       const kymDocumentsList = editValues?.document?.listKYMDocuments?.data;

//       const documentData = kymDocumentsList?.find((doc) => doc?.fieldId === name);

//       //

//       if (documentData) {
//         reset({
//           [name]: documentData.docData.map((file) => ({
//             url: file?.url,
//             identifier: file?.identifier,
//           })),
//         });
//       }
//     }
//   }, [isFetching]);

//   // const { mutate } = useSetKymDocumentDataMutation();

//   // useEffect(() => {
//   //   const subscription = watch(
//   //     debounce((data) => {
//   //       if (!data[name]?.[0]?.url) {
//   //         if (id) {
//   //           mutate({
//   //             memberId: id as string,
//   //             fieldId: name,
//   //             identifiers: data[name],
//   //           });
//   //         }
//   //       }
//   //     }, 800)
//   //   );

//   //   return () => subscription.unsubscribe();
//   // }, [watch, router.isReady]);

//   return (
//     <FormProvider {...methods}>
//       <form
//         onFocus={(e) => {
//           const kymSection = getKymSectionInstitution(e.target.id);
//           setSection(kymSection);
//         }}
//       >
//         <FormFileInput size="lg" label={label} name={name} />
//       </form>
//     </FormProvider>
//   );
// };
