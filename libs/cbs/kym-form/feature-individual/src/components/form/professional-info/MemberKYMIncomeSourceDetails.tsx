import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';
import debounce from 'lodash/debounce';

import { Box, Button, FormSection, GridItem, Icon, Text } from '@myra-ui';

import {
  FormFieldSearchTerm,
  KymIndMemberInput,
  useDeleteMemberIncomeSourceMutation,
  useGetIndividualKymIncomeSourceListQuery,
  useGetIndividualKymOptionsQuery,
  useGetNewIdMutation,
  useSetMemberIncomeSourceMutation,
} from '@coop/cbs/data-access';
import {
  DynamicBoxContainer,
  DynamicBoxGroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormAmountInput, FormInput, FormRadioGroup } from '@coop/shared/form';
import { getKymSection, useTranslation } from '@coop/shared/utils';

import { useIndividual } from '../../hooks/useIndividual';
import { getFieldOption } from '../../../utils/getFieldOption';

// const IncomeSourceInput = ({ option, fieldIndex, optionIndex }: any) => {
//   const { register, unregister } = useFormContext();

//   useEffect(() => {
//     register(`incomeSourceDetails.${fieldIndex}.options.${optionIndex}.id`, {
//       value: option.id,
//     });
//     register(`incomeSourceDetails.${fieldIndex}.options.${optionIndex}.value`, {
//       value: '',
//     });
//   }, []);

//   return (
//     <FormInputWithType
//       formType={option?.fieldType}
//       name={`incomeSourceDetails.${fieldIndex}.options.${optionIndex}.value`}
//       label={String(option?.name?.local)}
//       __placeholder={String(option?.name?.local)}
//     />
//   );
// };

interface IIncomeSourceProps {
  incomeSourceId: string;
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
  removeIncomeSource: (incomeSourceId: string) => void;
}

const IncomeSource = ({
  incomeSourceId,
  setKymCurrentSection,
  removeIncomeSource,
}: IIncomeSourceProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = String(router?.query?.['id']);

  const methods = useForm();

  const { watch, reset } = methods;

  // const { data: familyIncomeData, isLoading: familyIncomeLoading } =
  //   useGetIndividualKymOptionsQuery({
  //     id,
  //     filter: { customId: KYMOptionEnum.IncomeSourceDetails },
  //   });

  const { data: editValues } = useGetIndividualKymIncomeSourceListQuery({
    id,
  });

  useEffect(() => {
    if (editValues) {
      const editValueData = editValues?.members?.individual?.listIncomeSource?.data;

      const incomeSourceDetail = editValueData?.find((data) => data?.id === incomeSourceId);

      if (incomeSourceDetail) {
        reset({
          incomeSource: incomeSourceDetail?.incomeSource?.local,
          amount: incomeSourceDetail?.amount,
        });
      }
    }
  }, [editValues]);

  const { mutate } = useSetMemberIncomeSourceMutation();

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        mutate({ id, data: { id: incomeSourceId, ...data } });
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
        <DynamicBoxContainer>
          <CloseIcon
            cursor="pointer"
            onClick={() => {
              removeIncomeSource(incomeSourceId);
            }}
            id="removeIncomeSourceButton"
            color="gray.500"
            _hover={{
              color: 'gray.900',
            }}
            aria-label="close"
            alignSelf="flex-end"
          />

          <InputGroupContainer>
            <GridItem colSpan={2}>
              <FormInput
                type="text"
                bg="white"
                name="incomeSource"
                label={t['kymIndIncomeSource']}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <FormAmountInput bg="white" name="amount" label={t['kymIndAmount']} />
            </GridItem>

            {/* {familyIncomeData?.members?.individual?.options?.list?.data?.[0]?.options?.map(
          (option, optionIndex) => (
            <IncomeSourceInput
              key={optionIndex}
              fieldIndex={index}
              option={option}
              optionIndex={optionIndex}
            />
          )
        )} */}
          </InputGroupContainer>
        </DynamicBoxContainer>
      </form>
    </FormProvider>
  );
};

interface IMemberKYMIncomeSourceDetailsProps {
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
}

export const MemberKYMIncomeSourceDetails = ({
  setKymCurrentSection,
}: IMemberKYMIncomeSourceDetailsProps) => {
  const { t } = useTranslation();

  const router = useRouter();
  const id = router?.query?.['id'];

  const methods = useForm<KymIndMemberInput>();

  useIndividual({ methods });

  // const { mutate } = useSetMemberDataMutation();

  // useEffect(() => {
  //   const subscription = watch(
  //     debounce((data) => {
  //       if (id) {
  //         mutate({ id: String(id), data });
  //       }
  //     }, 800)
  //   );

  //   return () => subscription.unsubscribe();
  // }, [watch, router.isReady]);

  const { data: familyIncomeData } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.FamilyIncomeSource,
  });

  const [incomeSourceIds, setIncomeSourceIds] = useState<string[]>([]);

  // const { data: editValues } = useGetIndividualKymEditDataQuery(
  //   {
  //     id: String(id),
  //   },
  //   { enabled: !!id }
  // );

  // useEffect(() => {
  //   if (editValues) {
  //     reset({
  //       annualIncomeSourceId:
  //         editValues?.members?.individual?.formState?.data?.formData?.annualIncomeSourceId ?? '',
  //     });
  //   }
  // }, [editValues]);

  const { data: incomeSourceListEditValues } = useGetIndividualKymIncomeSourceListQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  useEffect(() => {
    if (incomeSourceListEditValues) {
      const editValueData = incomeSourceListEditValues?.members?.individual?.listIncomeSource?.data;

      setIncomeSourceIds(
        editValueData?.reduce(
          (prevVal, curVal) => (curVal ? [...prevVal, curVal.id] : prevVal),
          [] as string[]
        ) ?? []
      );
    }
  }, [incomeSourceListEditValues]);

  const { mutate: newIDMutate } = useGetNewIdMutation({
    onSuccess: (res) => {
      setIncomeSourceIds([...incomeSourceIds, res.newId]);
    },
  });

  const { mutate: deleteMutate } = useDeleteMemberIncomeSourceMutation({
    onSuccess: (res) => {
      const deletedId = String(res?.members?.individual?.incomeSource?.delete?.recordId);

      const tempOccupationIds = [...incomeSourceIds];

      tempOccupationIds.splice(tempOccupationIds.indexOf(deletedId), 1);

      setIncomeSourceIds([...tempOccupationIds]);
    },
  });

  const appendIncomeSource = () => {
    newIDMutate({});
  };

  const removeIncomeSource = (incomeSourceId: string) => {
    deleteMutate({ memberId: String(id), id: incomeSourceId });
  };

  return (
    <Box>
      <FormProvider {...methods}>
        <form
          onFocus={(e) => {
            const kymSection = getKymSection(e.target.id);
            setKymCurrentSection(kymSection);
          }}
        >
          <FormSection
            templateColumns={1}
            header="kymIndINCOMESOURCEDETAILS"
            id="kymAccIndIncomeSourceDetails"
          >
            <FormRadioGroup
              isRequired
              id="annualIncomeSourceId"
              name="annualIncomeSourceId"
              label={t['kynIndAnnualFamilyIncome']}
              options={getFieldOption(familyIncomeData)}
            />

            <Box display="flex" gap="s16" flexDirection="column">
              <Text fontSize="s3" fontWeight="Medium" color="neutralColorLight.Gray-70" mb="s4">
                {t['kynIndIncomegreater']}
              </Text>
              <DynamicBoxGroupContainer>
                {incomeSourceIds.map((key) => (
                  <Box key={key}>
                    <IncomeSource
                      incomeSourceId={key}
                      setKymCurrentSection={setKymCurrentSection}
                      removeIncomeSource={removeIncomeSource}
                    />
                  </Box>
                ))}
                <Button
                  id="incomeSourceDetailsButton"
                  alignSelf="start"
                  leftIcon={<Icon size="md" as={AiOutlinePlus} />}
                  variant="outline"
                  onClick={() => appendIncomeSource()}
                >
                  {t['kynIndNewEntry']}
                </Button>
              </DynamicBoxGroupContainer>
            </Box>
          </FormSection>
        </form>
      </FormProvider>
    </Box>
  );
};
