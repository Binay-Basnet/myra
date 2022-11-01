import { EditIcon } from '@chakra-ui/icons';

import { NeosysDocumentCard } from '@coop/neosys-admin/ui-components';
import { Box, Button, Grid } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { ClientDetailHeader } from './components';

/* eslint-disable-next-line */
export interface NeosysFeatureClientsDetailsDocumentsProps {}

export const NeosysFeatureClientsDetailsDocuments = () => {
  const { t } = useTranslation();

  const documentsList = [
    {
      title: t['neoClientDetailOverviewRegistrationDoc'],
      img: '/citizenship.jpeg',
    },
    {
      title: t['neoClientDetailOverviewMoa'],
      img: '/fingerprint.jpg',
    },
    {
      title: t['neoClientDetailOverviewAoa'],
      img: '/signature.jpg',
    },
    {
      title: t['neoClientDetailOverviewBODDecision'],
      img: '/citizenship.jpeg',
    },
  ];

  return (
    <Box bg="white" flexBasis="35%" borderRadius="4px">
      <ClientDetailHeader
        title={t['neoClientDetailDocumentsDocuments']}
        button={
          <Button variant="ghost" fontSize="r1" leftIcon={<EditIcon />}>
            {t['neoClientDetailDocumentsAddDocument']}
          </Button>
        }
      />

      <Grid p="s16" gap="s16" templateColumns="repeat(2, 1fr)">
        {documentsList.map(({ title, img }) => (
          <NeosysDocumentCard title={title} img={img} key={title} />
        ))}
        {/* <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p="s8"
          border="1px solid"
          borderColor="border.layout"
          borderRadius="4px"
        >
          <Box display="flex" gap="s8" alignItems="center">
            <Box boxSize="36px">
              <Image src="/registration-doc.png" borderRadius="s4" />
            </Box>
            <Text fontSize="r1">
              {t['neoClientDetailDocumentsRegistrationDoc']}
            </Text>
          </Box>

          <GrView />
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p="s8"
          border="1px solid"
          borderColor="border.layout"
          borderRadius="4px"
        >
          <Box display="flex" gap="s8" alignItems="center">
            <Box
              boxSize="36px"
              borderRadius="4px"
              border="1px solid"
              borderColor="border.layout"
            >
              <Image src="/moa.png" />
            </Box>
            <Text fontSize="r1">{t['neoClientDetailDocumentsMoa']}</Text>
          </Box>

          <GrView />
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p="s8"
          border="1px solid"
          borderColor="border.layout"
          borderRadius="4px"
        >
          <Box display="flex" gap="s8" alignItems="center">
            <Box boxSize="36px">
              <Image src="/aoa.png" borderRadius="s4" />
            </Box>
            <Text fontSize="r1">{t['neoClientDetailDocumentsAoa']}</Text>
          </Box>

          <GrView />
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p="s8"
          border="1px solid"
          borderColor="border.layout"
          borderRadius="4px"
        >
          <Box display="flex" gap="s8" alignItems="center">
            <Box boxSize="36px">
              <Image src="/bod.png" borderRadius="s4" />
            </Box>
            <Text fontSize="r1">
              {t['neoClientDetailDocumentsBODDecision']}
            </Text>
          </Box>

          <GrView />
        </Box> */}
      </Grid>
    </Box>
  );
};

export default NeosysFeatureClientsDetailsDocuments;
