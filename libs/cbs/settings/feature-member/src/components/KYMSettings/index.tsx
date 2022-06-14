import React from 'react';

import { Accordion, AccordionItem, AccordionPanel } from '@coop/shared/ui';

import { KYMBottomPanel } from '../KYMBottomPanel';
import { KYMInnerAccordion } from '../KYMInnerAccordion';
import { KYMSettingsAccordionBtn } from '../KYMSettingsAccordionBtn';

interface IKYMSettingsProps {
  fields: Record<string, Array<string | Record<string, string[]>>>;
  isSection?: boolean;
}

export const KYMSettings = ({ fields, isSection }: IKYMSettingsProps) => {
  return (
    <Accordion
      allowMultiple
      allowToggle
      display="flex"
      flexDirection="column"
      gap="s16"
    >
      {Object.keys(fields).map((field, index) => (
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <KYMSettingsAccordionBtn isExpanded={isExpanded} title={field} />

              <AccordionPanel p="0">
                <Accordion
                  allowMultiple
                  allowToggle
                  display="flex"
                  flexDirection="column"
                  p="s12"
                  gap="s12"
                >
                  {fields[field].map((subField, index) =>
                    typeof subField === 'string' ? (
                      <KYMInnerAccordion subField={subField} index={index} />
                    ) : (
                      <KYMSettings fields={subField} isSection={false} />
                    )
                  )}
                </Accordion>
              </AccordionPanel>

              {isSection ? <KYMBottomPanel /> : null}
            </>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
};
