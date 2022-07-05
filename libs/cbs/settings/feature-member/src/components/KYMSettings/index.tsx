import React, { Fragment, useState } from 'react';

import {
  Kym_Field_Custom_Id as KYMOptionEnum,
  KymMemberTypesEnum,
  useGetKymSettingsFieldsQuery,
} from '@coop/shared/data-access';
import { Accordion, AccordionItem, AccordionPanel } from '@coop/shared/ui';

import { KYMInnerAccordion } from '../common/KYMInnerAccordion';
import { KYMBottomPanel } from '../KYMBottomPanel';
import { KYMCustomSection } from '../KYMCustomField/KYMCustomField';
import { KYMSettingsAccordionBtn } from '../KYMSettingsAccordionBtn';
import { KYMFieldParentEnum } from '../../types';

/* eslint-disable-next-line */
interface FieldType {
  customId?: KYMOptionEnum;
  parentId?: KYMFieldParentEnum;
  key?: string;
  label: string;
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

  const { data, isLoading } = useGetKymSettingsFieldsQuery(
    {
      filter: {
        parent: fields.parentId,
      },
    },
    {
      enabled: fields.children?.length === 0,
      onSuccess: (response) => {
        const responseFields = response?.settings?.kymForm?.field?.list?.data;

        if (responseFields && fields.parentId) {
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
                p={fields?.children?.length === 0 ? 0 : 's12'}
                gap="s12"
              >
                {fields?.children?.map((subField, index) =>
                  subField?.children ? (
                    <Fragment key={subField.label}>
                      <KYMSettings
                        kymType={kymType}
                        fields={subField}
                        isSection={true}
                      />
                    </Fragment>
                  ) : (
                    <Fragment key={subField.label}>
                      <KYMInnerAccordion
                        kymType={kymType}
                        subField={subField}
                        index={index}
                      />
                    </Fragment>
                  )
                )}
              </Accordion>
            </AccordionPanel>

            {isSection && fields.parentId ? (
              <KYMBottomPanel
                parent={fields.parentId}
                kymType={kymType}
                setItems={setFields}
              />
            ) : null}
          </>
        )}
      </AccordionItem>
    </Accordion>
  ) : (
    <KYMCustomSection kymType={kymType} fields={fields} />
  );
};
