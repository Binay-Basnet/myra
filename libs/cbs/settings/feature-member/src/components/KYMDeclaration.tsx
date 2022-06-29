import React from 'react';
import { Skeleton } from '@chakra-ui/react';

import { useGetKymDeclarationQuery } from '@coop/shared/data-access';
import { AccordionPanel, Box, TextAreaInput } from '@coop/shared/ui';

export const KYMDeclaration = ({ isExpanded }: any) => {
  const { data, isLoading } = useGetKymDeclarationQuery(
    {},
    { enabled: isExpanded }
  );

  if (isLoading) {
    return (
      <AccordionPanel pb={0} display="flex" flexDirection="column" gap="s16">
        <Skeleton height="110px" borderRadius="br1" />
      </AccordionPanel>
    );
  }
  return (
    <AccordionPanel pb={'0'} display="flex" flexDirection="column" gap="s16">
      <Box>
        <TextAreaInput
          label="English"
          size="lg"
          h="110px"
          defaultValue={data?.settings.kymForm?.declaration.content}
        />
      </Box>

      <Box>
        <TextAreaInput
          label="Nepali"
          size="lg"
          h="110px"
          defaultValue="इ हेरेब्री देक्लरे थत थे इन्फर्मेसन प्रोविदेद ब्य मेउस इन थिस फोर्म एन्ड दोकुमेन्टस प्रोविदेद तो थे को-ओपेरतिवे अरे त्रुए एन्ड कोर्‍एन्त । अल्ल त्रन्सक्सन इन थिस अकाउन्ट अरे फ्रोम लेगितिमते सोउर्के । इफ फोउन्द ओथेर्विसे, इ शल्ल बेअर थे कोन्सेकुएन्केस थेरेओफ । "
        />
      </Box>
    </AccordionPanel>
  );
};
