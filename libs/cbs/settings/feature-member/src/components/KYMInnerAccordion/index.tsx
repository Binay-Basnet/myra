import React from 'react';

import { AccordionItem } from '@coop/shared/ui';

import { KYMDragGroup } from '../KYMDragGroup';
import { KYMSettingsAccordionBtn } from '../KYMSettingsAccordionBtn';

interface IKYMInnerAccordionProps {
  subField: string;
  index: number;
}

export const KYMInnerAccordion = ({
  subField,
  index,
}: IKYMInnerAccordionProps) => {
  return (
    <AccordionItem key={`${subField}${index}`}>
      {({ isExpanded }) => (
        <>
          <KYMSettingsAccordionBtn isExpanded={isExpanded} title={subField} />
          <KYMDragGroup isExpanded={isExpanded} fieldName={subField} />
        </>
      )}
    </AccordionItem>
  );
};
