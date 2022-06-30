import React from 'react';

import { Kym_Field_Custom_Id as KYMOptionEnum } from '@coop/shared/data-access';
import { AccordionItem } from '@coop/shared/ui';

import { KYMDragGroup } from '../KYMDragGroup';
import { KYMSettingsAccordionBtn } from '../KYMSettingsAccordionBtn';

interface IKYMInnerAccordionProps {
  subField: {
    id?: string;
    customId?: KYMOptionEnum;
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
          ) : subField.customId ? (
            <KYMDragGroup
              isExpanded={isExpanded}
              customId={subField.customId}
            />
          ) : subField.id ? (
            <KYMDragGroup isExpanded={isExpanded} fieldId={subField.id} />
          ) : (
            <KYMDragGroup isExpanded={isExpanded} fieldName={subField.key} />
          )}
        </>
      )}
    </AccordionItem>
  );
};
