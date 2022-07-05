import React from 'react';

import { Text } from '@coop/shared/ui';

interface OtherFieldTextProps {
  hasOtherField: boolean;
  text?: string;
}

export const OtherFieldText = ({
  hasOtherField,
  text = 'Other',
}: OtherFieldTextProps) => {
  if (!hasOtherField) return null;

  return (
    <Text fontSize="r1" my="s12" ml="82px" fontWeight="400" color={'gray.800'}>
      <em>{text}</em>
    </Text>
  );
};
