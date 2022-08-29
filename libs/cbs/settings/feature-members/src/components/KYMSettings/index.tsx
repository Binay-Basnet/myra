import React, { Fragment, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { IoIosCheckmark } from 'react-icons/io';
import {
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoClose,
} from 'react-icons/io5';
import { useQueryClient } from 'react-query';
import { debounce } from 'lodash';

import {
  FormCategory,
  FormElement,
  FormField,
  FormFieldType,
  FormSection,
  useDeleteCustomSectionFieldMutation,
  useDeleteCustomSectionMutation,
  useGetCustomFieldsQuery,
  useUpdateCustomSectionFieldMutation,
  useUpdateCustomSectionMutation,
  useUpsertCustomFieldMutation,
  useUpsertCustomSectionMutation,
} from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Icon,
  Select,
  Text,
  TextFields,
} from '@coop/shared/ui';

import { KYMSettingsAccordionBtn } from '../KYMSettingsAccordionBtn';
import { KYMSettingsField } from '../KYMSettingsField';
import { KYMSettingsFormField } from '../KYMSettingsFormField';
import { KYMSettingsFormSection } from '../KYMSettingsFormSection';
import { FieldType } from '../../constants/KYM_FIELDS';
import { KYMCategory } from '../../types';

interface KYMSettingsProps {
  fields: FieldType;
  kymType: KYMCategory;
}

export const KYMSettings = ({ fields, kymType }: KYMSettingsProps) => {
  return (
    <Accordion
      allowMultiple
      allowToggle
      display="flex"
      flexDirection="column"
      gap="s16"
    >
      <AccordionItem>
        {({ isExpanded }) => {
          return (
            <>
              {(fields.type === 'group' || fields.type === 'custom') && (
                <KYMSettingsAccordionBtn
                  isExpanded={isExpanded}
                  title={fields.label}
                />
              )}

              <AccordionPanel p="0">
                <Accordion
                  allowMultiple
                  allowToggle
                  display="flex"
                  flexDirection="column"
                  gap="s12"
                  p="s16"
                >
                  {fields.type === 'custom' ? (
                    <KYMSettingsCustomSection kymType={kymType} />
                  ) : (
                    fields.children?.map((field, index) =>
                      field.type !== 'custom' && field.children ? (
                        <Fragment key={index}>
                          <KYMSettings fields={field} kymType={kymType} />
                        </Fragment>
                      ) : (
                        <Fragment key={index}>
                          <AccordionItem>
                            {({ isExpanded }) => (
                              <KYMSettingsField
                                isExpanded={isExpanded}
                                fields={field}
                                kymType={kymType}
                              />
                            )}
                          </AccordionItem>
                        </Fragment>
                      )
                    )
                  )}
                </Accordion>
              </AccordionPanel>
            </>
          );
        }}
      </AccordionItem>
    </Accordion>
  );
};

interface KYMSettingsCustomSectionProps {
  kymType: KYMCategory;
}

export const KYMSettingsCustomSection = ({
  kymType,
}: KYMSettingsCustomSectionProps) => {
  const { data: customFieldsData } = useGetCustomFieldsQuery({ kymType });
  const customFields = customFieldsData?.settings?.form?.custom?.list?.data;

  return (
    <AccordionPanel p="0">
      {customFields && customFields?.length !== 0 && (
        <Accordion
          allowMultiple
          allowToggle
          display="flex"
          flexDirection="column"
          gap="s12"
          mb="s16"
        >
          {customFields?.map((section, index) => (
            <Fragment key={section?.id}>
              <AccordionItem>
                {({ isExpanded }) => (
                  <>
                    <AccordionButton bg={isExpanded ? '#E0E5EB' : ''} h="60px">
                      <Box
                        display="flex"
                        gap="s12"
                        alignItems="center"
                        flex="1"
                        textAlign="left"
                      >
                        <Text
                          fontSize="r1"
                          fontWeight="500"
                          textTransform="capitalize"
                        >
                          {`Custom #${index + 1}`}
                        </Text>
                      </Box>
                      {isExpanded ? (
                        <IoChevronUpOutline fontSize="18px" />
                      ) : (
                        <IoChevronDownOutline fontSize="18px" />
                      )}
                    </AccordionButton>
                    {section && (
                      <KYMCustomField kymType={kymType} section={section} />
                    )}
                  </>
                )}
              </AccordionItem>
            </Fragment>
          ))}
        </Accordion>
      )}

      <KYMCustomFieldAdd kymType={kymType} />
    </AccordionPanel>
  );
};

interface KYMCustomFieldProps {
  kymType: FormCategory;
  section: Partial<FormElement> & {
    __typename: 'FormField' | 'FormSection';
  };
}

export const KYMCustomField = ({ kymType, section }: KYMCustomFieldProps) => {
  const queryClient = useQueryClient();
  const { mutateAsync: updateCustomSection } = useUpdateCustomSectionMutation();
  const { mutateAsync: updateCustomField } =
    useUpdateCustomSectionFieldMutation();
  const { mutateAsync: deleteCustomSection } = useDeleteCustomSectionMutation({
    onSuccess: () => queryClient.invalidateQueries('getCustomFields'),
  });
  const { mutateAsync: deleteCustomField } =
    useDeleteCustomSectionFieldMutation({
      onSuccess: () => queryClient.invalidateQueries('getCustomFields'),
    });

  const methods = useForm({
    defaultValues: {
      name: section?.name?.local,
    },
  });

  return (
    <>
      <AccordionPanel borderBottom="1px" borderBottomColor="border.layout">
        <FormProvider {...methods}>
          <Box display="flex" flexDirection="column" gap="s16">
            <Box
              as="form"
              onChange={debounce(async () => {
                const name = methods.getValues().name;
                if (name && section.id) {
                  if (section.__typename === 'FormSection') {
                    await updateCustomSection({
                      id: section.id,
                      data: {
                        nameEn: name,
                      },
                    });
                  } else {
                    await updateCustomField({
                      id: section.id,
                      data: { nameEn: name },
                    });
                  }
                }
              }, 800)}
            >
              <FormInput
                name="name"
                __placeholder="Name of Field"
                helperText="This name will appear in the KYM Form"
              />
            </Box>
            <Box w="50%">
              <Select
                value={
                  section.__typename === 'FormSection'
                    ? { label: 'Group Fields', value: 'Group' }
                    : (section as unknown as FormField).fieldType ===
                      'SINGLE_SELECT'
                    ? {
                        label: 'Single Select',
                        value: 'SINGLE_SELECT',
                      }
                    : { label: 'Multi Select', value: 'MULTI_SELECT' }
                }
                options={[
                  { label: 'Single Select', value: 'SINGLE_SELECT' },
                  { label: 'Multi Select', value: 'MULTI_SELECT' },
                  { label: 'Group Fields', value: 'GROUP' },
                ]}
                isDisabled
              />
              <TextFields variant="formHelper" mt="s4" color="gray.800">
                Users can select only one option from the list
              </TextFields>
            </Box>
          </Box>
        </FormProvider>
      </AccordionPanel>

      {section?.__typename === 'FormField' ? (
        <KYMSettingsFormField fields={section as unknown as FormField} />
      ) : (
        <KYMSettingsFormSection
          kymType={kymType}
          section={section as unknown as FormSection}
        />
      )}

      <AccordionPanel
        py="s12"
        borderTop="1px"
        borderColor="border.layout"
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Button
          variant="outline"
          shade="danger"
          leftIcon={<AiOutlineDelete height="11px" />}
          onClick={async () => {
            if (section?.id) {
              if (section.__typename === 'FormSection') {
                await deleteCustomSection({
                  id: section.id,
                });
              } else {
                await deleteCustomField({
                  id: section.id,
                });
              }
            }
          }}
        >
          Delete
        </Button>
      </AccordionPanel>
    </>
  );
};

export const KYMCustomFieldAdd = ({ kymType }: { kymType: KYMCategory }) => {
  const queryClient = useQueryClient();
  const [hasNewField, setHasNewField] = useState(false);
  const methods = useForm<{
    name: string;
    fieldType:
      | FormFieldType.SingleSelect
      | FormFieldType.MultipleSelect
      | 'FormSection';
  }>({});
  const { mutateAsync: addNewCustomSection, isLoading } =
    useUpsertCustomSectionMutation();
  const { mutateAsync: addNewCustomField, isLoading: fieldLoading } =
    useUpsertCustomFieldMutation();

  return (
    <>
      <Box
        as="form"
        display="flex"
        flexDir="column"
        gap="s16"
        onSubmit={methods.handleSubmit(async () => {
          const fieldType = methods.getValues().fieldType;

          if (fieldType === 'FormSection') {
            const response = await addNewCustomSection({
              data: {
                data: {
                  enabled: true,
                  category: kymType,
                  nameEn: methods.getValues().name,
                },
              },
            });

            if (response) {
              methods.reset();
              queryClient.invalidateQueries('getCustomFields');
              setHasNewField(false);
            }
          } else {
            const response = await addNewCustomField({
              data: {
                data: {
                  nameEn: methods.getValues().name,
                  category: kymType,
                  enabled: true,
                  fieldType,
                  hasOtherField: false,
                },
              },
            });
            if (response) {
              methods.reset();
              queryClient.invalidateQueries('getCustomFields');
              setHasNewField(false);
            }
          }
        })}
      >
        {hasNewField && (
          <FormProvider {...methods}>
            <Box display="flex" alignItems="flex-start" gap="s16">
              <Box w="50%">
                <FormInput
                  name="name"
                  rules={{
                    required: 'This field is required!',
                  }}
                  __placeholder="Name of Custom Field"
                />
              </Box>
              <Box w="50%">
                <FormSelect
                  name="fieldType"
                  __placeholder="Select Field Type"
                  rules={{
                    required: 'This field is required!',
                  }}
                  options={[
                    {
                      label: 'Single Select',
                      value: FormFieldType.SingleSelect,
                    },
                    {
                      label: 'Multi Select',
                      value: FormFieldType.MultipleSelect,
                    },
                    { label: 'Group Fields', value: 'FormSection' },
                  ]}
                />
              </Box>

              <Icon
                onClick={async () => {
                  setHasNewField(false);
                }}
                h="44px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                as={IoClose}
                size="md"
                color="gray.500"
                cursor="pointer"
                _hover={{ color: 'gray.800' }}
              />
            </Box>
          </FormProvider>
        )}

        {hasNewField ? (
          <Button
            size="md"
            alignSelf="flex-start"
            display="flex"
            alignItems="center"
            type="submit"
            isLoading={isLoading || fieldLoading}
          >
            <Icon as={IoIosCheckmark} size="lg" />
            <Box lineHeight={0}>Done</Box>
          </Button>
        ) : null}
      </Box>

      {!hasNewField && (
        <Button
          size="md"
          variant="outline"
          alignSelf="flex-start"
          display="flex"
          alignItems="center"
          gap="s8"
          type="button"
          onClick={() => {
            setHasNewField((prev) => !prev);
          }}
        >
          <Icon as={AiOutlinePlus} />
          <Box lineHeight={0}>Add New Field</Box>
        </Button>
      )}
    </>
  );
};
