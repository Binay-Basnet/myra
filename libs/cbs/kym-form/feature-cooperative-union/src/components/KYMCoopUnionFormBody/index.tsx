import { useCallback, useState } from 'react';

import { AccorrdianAddCOOPUnion } from '@coop/myra/components';
import { Box, Container } from '@coop/shared/ui';

import { KYMCoopUnionForm } from '../KYMCoopUnionForm';

type KYMSection = {
  section: string;
  subSection: string;
};

export const KymCoopUnionFormBody = () => {
  const [kymCurrentSection, setKymCurrentSection] = useState<KYMSection>();

  const setSection = useCallback((section: KYMSection) => setKymCurrentSection(section), []);
  return (
    <Container minW="container.xl" height="fit-content">
      <Box>
        <Box
          w={320}
          p="s16"
          pr="s20"
          position="fixed"
          borderRight="1px solid "
          borderColor="border.layout"
          minHeight="100%"
          bg="gray.0"
          zIndex={2}
        >
          <AccorrdianAddCOOPUnion kymCurrentSection={kymCurrentSection} />
        </Box>

        <KYMCoopUnionForm setKymCurrentSection={setSection} />
      </Box>
    </Container>
  );
};
