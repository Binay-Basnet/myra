import { useFieldArray, useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CloseButton } from '@chakra-ui/react';

import { Box, Button, FormSection, Grid, GridItem, Icon, IconButton } from '@myra-ui';

import { KymInsInput } from '@coop/cbs/data-access';
import { DynamicBoxContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

interface IAddSisterConcern {
  removeSister: () => void;
  index: number;
}

// export const useSisterConcernInstitution = ({
//   methods,
//   sisterId,
// }: {
//   sisterId: string;
//   methods: UseFormReturn<KymInsSisterConcernInput>;
// }) => {
//   const router = useRouter();
//   const id = router.query['id'] as string;
//   const dispatch = useAppDispatch();

//   const sisterErrors = useAppSelector((state) => state.institution.sister);
//   const { watch, reset, setError, clearErrors } = methods;

//   const hasPressedNext = useAppSelector((state) => state.institution.hasPressedNext);

//   const {
//     data: editValues,
//     refetch: refetchEdit,
//     isLoading: editLoading,
//   } = useGetInstitutionSisterDetailsEditListQuery(
//     {
//       id,
//       includeRequiredErrors: hasPressedNext,
//     },
//     {
//       enabled: !!id,
//       onSuccess: (response) => {
//         const errorArr = response.members?.institution?.listSisterConcerns?.sectionStatus;

//         // Add Error If New Error Is Detected
//         if (errorArr) {
//           const errors = errorArr.map((errorObj, index) => ({
//             sisterId: String(index),
//             errors: errorObj?.errors ?? {},
//           }));

//           dispatch(addSisterError(errors));
//         } else {
//           dispatch(addInstitutionError({}));
//         }
//       },
//     }
//   );

//   const sisterDetail = editValues?.members?.institution?.listSisterConcerns?.data?.find(
//     (sister) => sister?.id === sisterId
//   );

//   // Mutation To Set Data
//   const { mutateAsync: setData } = useSetSisterConcernsMutation({
//     onSuccess: async () => {
//       await refetchEdit();
//     },
//   });

//   // Get Back The Initial Data when page reloads or user edits
//   useEffect(() => {
//     if (sisterDetail) {
//       reset(omit(sisterDetail, ['id']));
//     }
//   }, [editLoading, editValues]);

//   // Call The Mutation To Add Data on Each Form Change
//   useEffect(() => {
//     const subscription = watch(
//       debounce(async (data) => {
//         if (id) {
//           await setData({
//             id,
//             sis: sisterId,
//             data: { institutionId: id, ...data },
//           });
//         }
//       }, 800)
//     );

//     return () => subscription.unsubscribe();
//   }, [watch, sisterDetail]);

//   // Trigger Validations When Change In Redux Error Object is Detected
//   useDeepCompareEffect(() => {
//     // Cleanup Previous Errors
//     clearErrors();

//     sisterErrors.forEach((error) => {
//       const foundIndex = editValues?.members?.institution?.listSisterConcerns?.data?.findIndex(
//         (sister) => sister?.id === sisterId
//       );

//       if (error.sisterId === String(foundIndex)) {
//         Object.entries(error?.errors ?? {}).forEach((value) => {
//           setError(value[0] as keyof KymInsSisterConcernInput, {
//             type: value[1][0].includes('required') ? 'required' : 'value',
//             message: value[1][0],
//           });
//         });
//       }
//     });
//   }, [sisterErrors]);
// };

const AddSister = ({ removeSister, index }: IAddSisterConcern) => {
  const { t } = useTranslation();

  return (
    <DynamicBoxContainer>
      <Box display="flex" justifyContent="space-between">
        <Box />
        <Box pb="s12">
          <IconButton
            aria-label="close"
            variant="ghost"
            size="sm"
            icon={<CloseButton />}
            onClick={() => {
              removeSister();
            }}
            id="removeSpouseOccupationButton"
          />
        </Box>
      </Box>
      <Grid templateColumns="repeat(2, 1fr)" gap="s20">
        <FormInput
          id="sisterConcernsDetails"
          type="text"
          bg="white"
          name={`sisterConcern.${index}.name`}
          label={t['kymInsNameofSisterConcern']}
        />
        <FormInput
          id="sisterConcernsDetails"
          type="text"
          bg="white"
          name={`sisterConcern.${index}.natureOfBusiness`}
          label={t['kymInsNatureofBusiness']}
        />
        <FormInput
          id="sisterConcernsDetails"
          type="text"
          bg="white"
          name={`sisterConcern.${index}.address`}
          label={t['kymInsAddress']}
        />
        <FormInput
          id="sisterConcernsDetails"
          type="text"
          bg="white"
          name={`sisterConcern.${index}.phone`}
          label={t['kymInsPhoneNo']}
        />
      </Grid>
    </DynamicBoxContainer>
  );
};

export const InstitutionKYMSisterConcernDetails = () => {
  const { t } = useTranslation();

  const { control } = useFormContext<KymInsInput>();

  const { append, fields, remove } = useFieldArray({
    control,
    name: 'sisterConcern',
  });

  return (
    <FormSection id="kymInsDetailsofsisterconcern" header="kymInsDetailsofsisterconcern">
      <GridItem colSpan={3}>
        <Grid gap="s16">
          {fields.map((field, index) => (
            <Box key={field.id}>
              <AddSister removeSister={() => remove(index)} index={index} />
            </Box>
          ))}
        </Grid>
        <Button
          mt="s16"
          id="sisterConcernButton"
          alignSelf="start"
          leftIcon={<Icon size="md" as={AiOutlinePlus} />}
          variant="outline"
          onClick={() => append({})}
        >
          {t['kymInsNewDetail']}
        </Button>
      </GridItem>
    </FormSection>
  );
};
