import { useEffect } from 'react';
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';
import debounce from 'lodash/debounce';

import { FormInputWithType } from '@coop/cbs/kym-form/formElements';
import {
  DynamicBoxContainer,
  DynamicBoxGroupContainer,
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  Kym_Field_Custom_Id as KYMOptionEnum,
  KymIndMemberInput,
  useGetIndividualKymOptionsQuery,
  useSetMemberDataMutation,
} from '@coop/shared/data-access';
import { FormInput, FormRadioGroup } from '@coop/shared/form';
import { Box, Button, Icon, Text } from '@coop/shared/ui';
import { getKymSection, useTranslation } from '@coop/shared/utils';

import { getFieldOption } from '../../../utils/getFieldOption';

interface IMemberKYMIncomeSourceDetailsProps {
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
}

const IncomeSourceInput = ({ option, fieldIndex, optionIndex }: any) => {
  const { register, unregister } = useFormContext();

  useEffect(() => {
    register(`incomeSourceDetails.${fieldIndex}.options.${optionIndex}.id`, {
      value: option.id,
    });
    register(`incomeSourceDetails.${fieldIndex}.options.${optionIndex}.value`, {
      value: '',
    });
  }, []);

  return (
    <FormInputWithType
      formType={option?.fieldType}
      name={`incomeSourceDetails.${fieldIndex}.options.${optionIndex}.value`}
      label={String(option?.name?.local)}
      placeholder={String(option?.name?.local)}
    />
  );
};

const IncomeSource = ({ index, removeIncomeSource }: any) => {
  const router = useRouter();

  const id = String(router?.query?.['id']);

  const { data: familyIncomeData, isLoading: familyIncomeLoading } =
    useGetIndividualKymOptionsQuery({
      id,
      filter: { customId: KYMOptionEnum.IncomeSourceDetails },
    });

  const { unregister } = useFormContext();

  return (
    <DynamicBoxContainer>
      <CloseIcon
        cursor="pointer"
        onClick={() => {
          removeIncomeSource();
          unregister(`incomeSourceDetails.${index}`);
        }}
        color="gray.500"
        _hover={{
          color: 'gray.900',
        }}
        aria-label="close"
        alignSelf="flex-end"
      />

      <InputGroupContainer>
        {familyIncomeData?.members?.individual?.options?.list?.data?.[0]?.options?.map(
          (option, optionIndex) => (
            <IncomeSourceInput
              key={optionIndex}
              fieldIndex={index}
              option={option}
              optionIndex={optionIndex}
            />
          )
        )}
      </InputGroupContainer>
    </DynamicBoxContainer>
  );
};

export const MemberKYMIncomeSourceDetails = ({
  setKymCurrentSection,
}: IMemberKYMIncomeSourceDetailsProps) => {
  const { t } = useTranslation();

  const router = useRouter();
  const id = String(router?.query?.['id']);

  const methods = useForm<KymIndMemberInput>();

  const { watch, control } = methods;

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

  const { data: familyIncomeData, isLoading: familyIncomeLoading } =
    useGetIndividualKymOptionsQuery({
      id,
      filter: { customId: KYMOptionEnum.FamilyIncomeSource },
    });

  const {
    fields: incomeSourceFields,
    append: incomeSourceAppend,
    remove: incomeSourceRemove,
  } = useFieldArray({ control, name: 'incomeSourceDetails' });

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSection(e.target.id);
          setKymCurrentSection(kymSection);
        }}
      >
        <GroupContainer
          id="kymAccIndIncomeSourceDetails"
          scrollMarginTop={'200px'}
        >
          <Text fontSize="r1" fontWeight="SemiBold">
            {t['kymIndINCOMESOURCEDETAILS']}
          </Text>
          <GroupContainer>
            <Box display="flex" flexDirection="column">
              <FormRadioGroup
                id="annualIncomeSourceId"
                name="annualIncomeSourceId"
                label={t['kynIndAnnualFamilyIncome']}
                options={getFieldOption(familyIncomeData)}
              />
            </Box>
            <div>
              <Text fontSize="s3" mb="s4">
                {t['kynIndIncomegreater']}
              </Text>
              <DynamicBoxGroupContainer>
                {incomeSourceFields.map((item, index) => {
                  return (
                    <Box key={item.id}>
                      <IncomeSource
                        control={control}
                        removeIncomeSource={() => incomeSourceRemove(index)}
                        index={index}
                      />
                    </Box>
                  );
                })}
                <Button
                  id="incomeSourceDetailsButton"
                  alignSelf="start"
                  leftIcon={<Icon size="md" as={AiOutlinePlus} />}
                  variant="outline"
                  onClick={() => incomeSourceAppend({})}
                >
                  {t['kynIndNewEntry']}
                </Button>
              </DynamicBoxGroupContainer>
            </div>
          </GroupContainer>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
