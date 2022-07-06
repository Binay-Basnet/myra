import React from 'react';

import { KYMSettingsDragField } from '@coop/cbs/settings/feature-member';
import {
  Kym_Field_Custom_Id as KYMOptionEnum,
  KymMemberTypesEnum,
} from '@coop/shared/data-access';
import { AccordionItem } from '@coop/shared/ui';

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
  kymType: KymMemberTypesEnum;
}

export const KYMInnerAccordion = ({
  subField,
  index,
  kymType,
}: IKYMInnerAccordionProps) => {
  return (
    <AccordionItem key={`${subField.key}${index}`}>
      {({ isExpanded }) => (
        <>
          <KYMSettingsAccordionBtn
            isExpanded={isExpanded}
            title={subField.label}
          />
          {subField.component ? (
            subField.component({ isExpanded })
          ) : subField.customId ? (
            <KYMSettingsDragField
              kymType={kymType}
              customId={subField.customId}
              isExpanded={isExpanded}
            />
          ) : (
            <KYMSettingsDragField
              kymType={kymType}
              id={subField.id}
              isExpanded={isExpanded}
            />
          )}
        </>
      )}
    </AccordionItem>
  );
};

// subField.id ? (
//   <KYMDragGroup isExpanded={isExpanded} fieldId={subField.id} />
// ) : (
//   <KYMDragGroup isExpanded={isExpanded} fieldName={subField.key} />
// )
