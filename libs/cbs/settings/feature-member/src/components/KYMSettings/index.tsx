import React from 'react';

import { Accordion, AccordionItem, AccordionPanel } from '@coop/shared/ui';

import { KYMBottomPanel } from '../KYMBottomPanel';
import { KYMCustomSection } from '../KYMCustomField/KYMCustomField';
import { KYMInnerAccordion } from '../KYMInnerAccordion';
import { KYMSettingsAccordionBtn } from '../KYMSettingsAccordionBtn';

/* eslint-disable-next-line */
interface FieldType {
  key: string;
  label: string;
  children?: FieldType[];
}

interface IKYMSettingsProps {
  fields: FieldType;
  isSection?: boolean;
}

export const KYMSettings = ({ fields, isSection }: IKYMSettingsProps) => {
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
                    <KYMSettings fields={subField} isSection={true} />
                  ) : (
                    <KYMInnerAccordion subField={subField} index={index} />
                  )
                )}
              </Accordion>
            </AccordionPanel>

            {isSection ? <KYMBottomPanel /> : null}
          </>
        )}
      </AccordionItem>
    </Accordion>
  ) : (
    <KYMCustomSection fields={fields} />
  );
};
