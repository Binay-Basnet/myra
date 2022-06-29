import React from 'react';

import { AccordionItem } from '@coop/shared/ui';

import { KYMDragGroup } from '../KYMDragGroup';
import { KYMSettingsAccordionBtn } from '../KYMSettingsAccordionBtn';

interface IKYMInnerAccordionProps {
  subField: {
    id?: string;
    key?: string;
    label: string;
    component?: (props: any) => JSX.Element;
  };
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
          <KYMSettingsAccordionBtn
            isExpanded={isExpanded}
            title={subField.label}
          />
          {subField.component ? (
            subField.component({ isExpanded })
          ) : subField.key ? (
            <KYMDragGroup isExpanded={isExpanded} fieldName={subField.key} />
          ) : (
            <KYMDragGroup isExpanded={isExpanded} fieldId={subField.id} />
          )}
        </>
      )}
    </AccordionItem>
  );
};
