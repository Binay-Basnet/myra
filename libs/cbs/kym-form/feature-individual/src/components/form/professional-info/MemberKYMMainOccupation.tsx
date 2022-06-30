import React, { Fragment, useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CloseIcon } from '@chakra-ui/icons';

import {
  DynamicBoxGroupContainer,
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  Kym_Field_Custom_Id,
  useGetIndividualKymOptionsQuery,
} from '@coop/shared/data-access';
import {
  FormCheckbox,
  FormInput,
  FormSelect,
  FormSwitch,
} from '@coop/shared/form';
import {
  Box,
  Button,
  Grid,
  GridItem,
  Icon,
  Text,
  TextFields,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const MainOccupationInput = ({ option, index, fieldIndex }: any) => {
  const { register, unregister } = useFormContext();

  useEffect(() => {
    register(`mainOccupation.${fieldIndex}.fields.${index}.id`, {
      value: option.id,
    });
    register(`mainOccupation.${fieldIndex}.fields.${index}.value`, {
      value: '',
    });

    return () => {
      unregister(`mainOccupation.${fieldIndex}.fields.${index}.id`);
      unregister(`mainOccupation.${fieldIndex}.fields.${index}.value`);
    };
  }, []);

  return (
    <FormInput
      type="text"
      name={`mainOccupation.0.fields.${index}.value`}
      label={option.name.local}
      placeholder={option.name.local}
    />
  );
};

const MainOccupation = ({
  control,
  removeMainOccupation,
  index: fieldIndex,
}: any) => {
  const { t } = useTranslation();

  const { watch } = useFormContext();

  // const profession = watch('profession');

  const isOwner = watch(`mainOccupation.${fieldIndex}.isOwner`);


  const { data: occupationDetailsDefaultFields } = useGetIndividualKymOptionsQuery({
    filter: {
      customId: Kym_Field_Custom_Id.Occupation,
    },
  });

  const occupationFieldNames =
    occupationDetailsDefaultFields?.members.individual?.options.list?.data?.[0]
      ?.options ?? [];

  return (
    <Box
      display="flex"
      borderRadius="br2"
      flexDirection="column"
      gap="s16"
      p="s20"
      bg="background.500"
    >
      <Box display="flex" flexDirection="column">
        <CloseIcon
          cursor="pointer"
          onClick={removeMainOccupation}
          color="gray.500"
          _hover={{
            color: 'gray.900',
          }}
          aria-label="close"
          alignSelf="flex-end"
        />

        <InputGroupContainer>
          {occupationFieldNames.map((option, index) => {
            return (
              <Fragment key={option.id}>
                <MainOccupationInput
                  fieldIndex={fieldIndex}
                  option={option}
                  index={index}
                />
              </Fragment>
            );
          })}
        </InputGroupContainer>
      </Box>

      <Box display="flex" gap="9px" alignItems="center">
        <FormCheckbox name={`mainOccupation.${fieldIndex}.isOwner`} />
        <TextFields variant="formLabel">{t['kymIndAreyouowner']}</TextFields>
      </Box>

      {isOwner && (
        <InputGroupContainer>
          <FormInput
            bg="white"
            control={control}
            type="date"
            name={`mainOccupation.${fieldIndex}.establishedDate`}
            label={t['kymIndEstablishedDate']}
            placeholder={t['kymIndEstablishedDate']}
          />
          <FormInput
            bg="white"
            control={control}
            type="number"
            name={`mainOccupation.${fieldIndex}.registrationNo`}
            label={t['kymIndRegistrationNo']}
            placeholder={t['kymIndRegistrationNo']}
          />
          <FormInput
            bg="white"
            control={control}
            type="number"
            name={`mainOccupation.${fieldIndex}.contactNo`}
            label={t['kymIndContactNo']}
            placeholder={t['kymIndContactNo']}
          />
        </InputGroupContainer>
      )}
    </Box>
  );
};

export const MemberKYMMainOccupation = () => {
  const { t } = useTranslation();
  const { control, watch } = useFormContext();

  const isForeignEmployee = watch('isForeignEmployee');

  const {
    fields: mainOccupationFields,
    append: mainOccupationAppend,
    remove: mainOccupationRemove,
  } = useFieldArray({ control, name: 'mainOccupation' });

  return (
    <GroupContainer id="kymAccIndMainProfession" scrollMarginTop={'200px'}>
      <Text fontSize="r1" fontWeight="SemiBold">
        {t['kymIndMAINOCCUPATION']}
      </Text>
      <DynamicBoxGroupContainer>
        {mainOccupationFields.map((item, index) => {
          return (
            <Box key={item.id}>
              <MainOccupation
                watch={watch}
                control={control}
                index={index}
                removeMainOccupation={() => mainOccupationRemove(index)}
              />
            </Box>
          );
        })}

        <Button
          id="mainOccupationButton"
          alignSelf="start"
          leftIcon={<Icon size="md" as={AiOutlinePlus} />}
          variant="outline"
          onClick={() => {
            mainOccupationAppend({});
          }}
        >
          {t['kymIndAddOccupation']}
        </Button>
      </DynamicBoxGroupContainer>
      <Box display="flex" flexDirection="row">
        <FormSwitch
          control={control}
          id="isForeignEmployee"
          name="isForeignEmployee"
          label={t['kymIndEnableforForeignEmployment']}
        />
      </Box>

      {isForeignEmployee && (
        <Grid mb="s16" templateColumns="repeat(3, 1fr)" gap="s16">
          <GridItem>
            <FormSelect
              id="nameOfCountry"
              control={control}
              name="nameOfCountry"
              label={t['kymIndNameofCountry']}
              placeholder={t['kymIndSelectCountry']}
              options={[
                {
                  label: 'Nepal',
                  value: 'Nepal',
                },
                {
                  label: 'India',
                  value: 'India',
                },
                {
                  label: 'China',
                  value: 'China',
                },
              ]}
            />
          </GridItem>
          <GridItem>
            {/* <FormInput
            bg="white"
            control={control}
            type="text"
            name={`orgName`}
            label="Type of Visa"
            placeholder="Enter Type of Visa"
          /> */}
            <FormSelect
              control={control}
              id="typeOfVisa"
              name="typeOfVisa"
              label={t['kymIndTypeofVisa']}
              placeholder={t['kymIndEnterTypeofVisa']}
              options={[
                {
                  label: 'Nepal',
                  value: 'Nepal',
                },
                {
                  label: 'India',
                  value: 'India',
                },
                {
                  label: 'China',
                  value: 'China',
                },
              ]}
            />
          </GridItem>
          <GridItem>
            <FormInput
              bg="white"
              control={control}
              type="number"
              textAlign={'right'}
              name={`orgName`}
              id="estimatedAnnualIncome"
              label={t['kymIndEstimatedAnnualIncome']}
              placeholder="0.00"
            />
          </GridItem>
        </Grid>
      )}
    </GroupContainer>
  );
};
