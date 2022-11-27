import { EditIcon } from '@chakra-ui/icons';

import { NeosysDocumentCard } from '@coop/neosys-admin/ui-components';
import { Box, Button, Text } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

import { ClientDetailHeader } from './components';

/* eslint-disable-next-line */
export interface NeosysFeatureClientsDetailsOverviewProps {}

export const NeosysFeatureClientsDetailsOverview = () => {
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
    <Box display="flex" gap="s16">
      <Box bg="white" flexBasis="65%" borderRadius="4px">
        <ClientDetailHeader
          title={t['neoClientDetailOverviewClientInformation']}
          button={
            <Button variant="ghost" fontSize="r1" leftIcon={<EditIcon />}>
              {t['neoClientDetailOverviewEdit']}
            </Button>
          }
        />

        <Box p="s16" display="flex" flexDirection="column" gap="s8">
          <Box display="flex">
            <Text flexBasis="35%">{t['neoClientDetailOverviewType']}</Text>
            <Text flexGrow={1}>SACCOS</Text>
          </Box>

          <Box display="flex">
            <Text flexBasis="35%">{t['neoClientDetailOverviewCode']}</Text>
            <Text flexGrow={1}>2345623465453</Text>
          </Box>

          <Box display="flex">
            <Text flexBasis="35%">{t['neoClientDetailOverviewPanVat']}</Text>
            <Text flexGrow={1}>1234572q567456</Text>
          </Box>

          <Box display="flex">
            <Text flexBasis="35%">{t['neoClientDetailOverviewRegdNo']}</Text>
            <Text flexGrow={1}>3453ASFDFSF12343</Text>
          </Box>

          <Box display="flex">
            <Text flexBasis="35%">{t['neoClientDetailOverviewContactNumber']}</Text>
            <Text flexGrow={1}>Ram Nepal</Text>
          </Box>

          <Box display="flex">
            <Text flexBasis="35%">{t['neoClientDetailOverviewEmail']}</Text>
            <Text flexGrow={1}>ram@saccos.com</Text>
          </Box>

          <Box display="flex">
            <Text flexBasis="35%">{t['neoClientDetailOverviewAddress']}</Text>
            <Text flexGrow={1}>Kathmandu, Tokha Municipality-10</Text>
          </Box>
        </Box>
      </Box>

      <Box bg="white" flexBasis="35%" borderRadius="4px">
        <ClientDetailHeader
          title={t['neoClientDetailOverviewDocuments']}
          button={
            <Button variant="ghost" fontSize="r1" leftIcon={<EditIcon />}>
              {t['neoClientDetailOverviewEdit']}
            </Button>
          }
        />

        <Box p="s16" display="flex" flexDirection="column" gap="s16">
          {documentsList.map(({ title, img }) => (
            <NeosysDocumentCard title={title} img={img} key={title} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default NeosysFeatureClientsDetailsOverview;
