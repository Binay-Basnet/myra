import React, { useState } from 'react';

import {
  Kym_Field_Custom_Id as KYMOptionEnum,
  Kym_Field_Parent,
  KymMemberTypesEnum,
  useGetKymIndItemDetailsQuery,
} from '@coop/shared/data-access';
import { Accordion, AccordionItem, AccordionPanel } from '@coop/shared/ui';

import { KYMBottomPanel } from '../KYMBottomPanel';
import { KYMCustomSection } from '../KYMCustomField/KYMCustomField';
import { KYMInnerAccordion } from '../KYMInnerAccordion';
import { KYMSettingsAccordionBtn } from '../KYMSettingsAccordionBtn';

/* eslint-disable-next-line */
interface FieldType {
  customId?: KYMOptionEnum;
  key?: string;
  label: string;
  hasChildren?: boolean;
  children?: FieldType[];
}

interface IKYMSettingsProps {
  kymType: KymMemberTypesEnum;
  fields: FieldType;
  isSection?: boolean;
}

export const KYMSettings = ({
  fields: kymFields,
  kymType,
  isSection,
}: IKYMSettingsProps) => {
  const [fields, setFields] = useState(kymFields);

  const { data, isLoading } = useGetKymIndItemDetailsQuery(
    { isIdentificationDoc: Kym_Field_Parent.Identification },
    {
      enabled: fields.children?.length === 0,
      onSuccess: (response) => {
        const responseFields = response?.settings?.kymForm?.field?.list?.data;

        if (responseFields && fields.hasChildren) {
          setFields((prev) => ({
            ...prev,
            children: responseFields.map((field) => ({
              id: field?.id ?? '',
              label: field?.name.local ?? '',
            })),
          }));
        }
      },
    }
  );

  return fields.key !== 'custom' ? (
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

            <AccordionPanel p="0">
              <Accordion
                allowMultiple
                allowToggle
                display="flex"
                flexDirection="column"
                p="s12"
                gap="s12"
              >
                {fields?.children?.map((subField, index) =>
                  subField?.children ? (
                    <KYMSettings
                      kymType={kymType}
                      fields={subField}
                      isSection={true}
                    />
                  ) : (
                    <KYMInnerAccordion
                      kymType={kymType}
                      subField={subField}
                      index={index}
                    />
                  )
                )}
              </Accordion>
            </AccordionPanel>

            {isSection ? <KYMBottomPanel setItems={setFields} /> : null}
          </>
        )}
      </AccordionItem>
    </Accordion>
  ) : (
    <KYMCustomSection fields={fields} />
  );
};
