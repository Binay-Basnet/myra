import React, { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import {
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoClose,
} from 'react-icons/io5';
import { useQueryClient } from 'react-query';
import { Skeleton } from '@chakra-ui/react';
import { debounce } from 'lodash';

import { KYMSettingsDragField } from '@coop/cbs/settings/feature-member';
import {
  Kym_Field_Type,
  KymMemberTypesEnum,
  useAddCustomFieldMutation,
  useDeleteCustomFieldMutation,
  useGetCustomFieldsQuery,
  useUpdateCustomFieldMutation,
} from '@coop/shared/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Icon,
  Switch,
  Text,
  TextFields,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { KYMSettingsAccordionBtn } from '../KYMSettingsAccordionBtn';

interface FieldType {
  id?: string;
  key?: string;
  label: string;
  children?: FieldType[];
}

interface IKYMCustomField {
  fields: FieldType;
  kymType: KymMemberTypesEnum;
}

export const KYMCustomSection = ({ fields, kymType }: IKYMCustomField) => {
  return (
    <Accordion
      allowMultiple
      allowToggle
      display="flex"
      flexDirection="column"
      gap="s16"
    >
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <KYMSettingsAccordionBtn
              isExpanded={isExpanded}
              title={fields.label}
            />

            <KYMCustomFields kymType={kymType} isExpanded={isExpanded} />
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

const FIELD_TYPE = [
  {
    label: 'Single Select',
    value: Kym_Field_Type.SingleSelect,
  },
  {
    label: 'Multi Select',
    value: Kym_Field_Type.MultiSelect,
  },
  {
    label: 'Grouped Fields',
    value: Kym_Field_Type.Group,
  },
];

export const KYMCustomFields = ({
  isExpanded,
  kymType,
}: {
  isExpanded: boolean;
  kymType: KymMemberTypesEnum;
}) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching } = useGetCustomFieldsQuery(
    {},
    { enabled: isExpanded }
  );

  const { mutateAsync: addCustomField, isLoading: addLoading } =
    useAddCustomFieldMutation({
      onSuccess: () => {
        queryClient.invalidateQueries('getCustomFields');
      },
    });

  const fields = useMemo(
    () => data?.settings?.kymForm?.field?.list?.data ?? [],
    [data?.settings?.kymForm?.field?.list?.data]
  );

  if (isLoading) {
    return (
      <AccordionPanel pb={0} display="flex" flexDirection="column" gap="s16">
        <Skeleton height="40px" borderRadius="br1" />
        <Skeleton height="40px" borderRadius="br1" />
      </AccordionPanel>
    );
  }

  return (
    <AccordionPanel p="0">
      <Accordion
        allowMultiple
        allowToggle
        defaultIndex={[
          fields.findIndex((field) => field?.name.en === 'Untitled'),
        ]}
        display="flex"
        flexDirection="column"
        p="s12"
        gap="s12"
      >
        {fields?.map((subField, index) => (
          <AccordionItem>
            {({ isExpanded }) => (
              <KYMCustomField
                kymType={kymType}
                field={subField}
                index={index}
                isExpanded={isExpanded}
              />
            )}
          </AccordionItem>
        ))}
        {(addLoading || isFetching) && (
          <Skeleton height="50px" borderRadius="br1" />
        )}
        <Button
          size="lg"
          variant="outline"
          alignSelf="flex-start"
          display="flex"
          alignItems="center"
          gap="s8"
          onClick={async () => {
            await addCustomField({
              data: {
                name: `Untitled`,
                enabled: true,
                kymType,
                hasOtherField: false,
                fieldType: Kym_Field_Type.SingleSelect,
              },
            });
          }}
        >
          <Icon as={AiOutlinePlus} />
          <Box lineHeight={0}>Add New Field</Box>
        </Button>
      </Accordion>
    </AccordionPanel>
  );
};

export const KYMCustomField = ({
  field,
  isExpanded,
  index,
  kymType,
}: {
  field: any;
  isExpanded: any;
  index: number;
  kymType: KymMemberTypesEnum;
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { mutateAsync: removeCustomField } = useDeleteCustomFieldMutation({
    onSuccess: () => {
      queryClient.invalidateQueries('getCustomFields');
    },
  });

  const [fieldType, setFieldType] = useState(field.fieldType);
  const [enabled, setEnabled] = useState(field.enabled);

  const methods = useForm({
    defaultValues: {
      name: field.name.local,
      fieldType: fieldType,
    },
  });

  const watchFieldType = methods.watch().fieldType;

  const { mutateAsync: kymCustomFieldUpdate } = useUpdateCustomFieldMutation();

  const onSubmit = debounce(async () => {
    await kymCustomFieldUpdate({
      fieldId: field.id,
      fieldName: methods.getValues().name,
      fieldType: methods.getValues().fieldType,
    });
  }, 800);

  useEffect(() => {
    setFieldType(watchFieldType);
  }, [watchFieldType]);

  useEffect(() => {
    // @ts-ignore
    const subscription = methods.watch(methods.handleSubmit(onSubmit));
    // @ts-ignore
    return () => subscription.unsubscribe();
  }, [methods, methods.handleSubmit, methods.watch]);

  return (
    <>
      <AccordionButton bg={isExpanded ? '#E0E5EB' : ''} h="60px">
        <Box
          display="flex"
          gap="s12"
          alignItems="center"
          flex="1"
          textAlign="left"
        >
          <Switch
            isChecked={enabled}
            onChange={async (e) => {
              setEnabled(e.target.checked);
              await kymCustomFieldUpdate({
                fieldId: field.id,
                fieldEnabled: e.target.checked,
              });
            }}
          />
          <Text fontSize="r1" fontWeight="500" textTransform="capitalize">
            {`Custom #${index + 1}`}
          </Text>
        </Box>
        {isExpanded ? (
          <IoChevronUpOutline fontSize="18px" />
        ) : (
          <IoChevronDownOutline fontSize="18px" />
        )}
        {isExpanded ? (
          <Icon
            as={IoClose}
            onClick={async () => {
              await removeCustomField({
                id: field.id,
              });
            }}
          >
            {t['kymInsDelete']}
          </Icon>
        ) : null}
      </AccordionButton>

      <AccordionPanel p="0" display="flex" flexDirection="column">
        <Box display="flex" flexDirection="column" gap="s16">
          <FormProvider {...methods}>
            <Box display="flex" flexDirection="column" gap="s16">
              <Box px="s12" pt="s12">
                <FormInput
                  name="name"
                  placeholder="Name of Field"
                  helperText="This name will appear in the KYM Form"
                />
              </Box>
              <Box px="s12" w="50%">
                <FormSelect name={'fieldType'} options={FIELD_TYPE} />
                <TextFields variant="formHelper" mt="s4" color="gray.800">
                  {methods.getValues().fieldType === Kym_Field_Type.SingleSelect
                    ? 'Users can select only one option from the list'
                    : methods.getValues().fieldType ===
                      Kym_Field_Type.MultiSelect
                    ? 'Users can select one or more options'
                    : 'You can [action] different type fields at once'}
                </TextFields>
              </Box>
            </Box>
          </FormProvider>

          <Box p="0" borderTop={'1px'} borderTopColor={'border.layout'}>
            <KYMSettingsDragField
              id={field.id}
              customField={{
                ...field,
                fieldType: methods.getValues().fieldType,
              }}
              isExpanded={isExpanded}
              kymType={kymType}
            />
          </Box>
        </Box>
      </AccordionPanel>
    </>
  );
};
