import {
  IndividualRequiredDocument,
  InstitutionRequiredDocument,
  Maybe,
} from '@coop/ebanking/data-access';
import { Box, DetailsCard, Text } from '@coop/shared/ui';

interface IProductDocuments {
  individualDocuments: Maybe<Maybe<IndividualRequiredDocument>[]> | undefined;
  institutionDocuments: Maybe<Maybe<InstitutionRequiredDocument>[]> | undefined;
}

export const ProductDocuments = ({
  institutionDocuments,
  individualDocuments,
}: IProductDocuments) => {
  if (!individualDocuments && !institutionDocuments) return null;
  if (individualDocuments?.length === 0 && institutionDocuments?.length === 0) return null;

  return (
    <DetailsCard title="Required Documents">
      {individualDocuments?.length !== 0 && (
        <Box display="flex" flexDir="column" gap="s4" fontSize="r1" textTransform="capitalize">
          <Text color="gray.800" fontWeight="500">
            Individual
          </Text>
          <Box ml="s20" as="ul">
            {individualDocuments?.map((document) => (
              <li>{document?.toLowerCase()}</li>
            ))}
          </Box>
        </Box>
      )}

      {institutionDocuments?.length !== 0 && (
        <Box display="flex" flexDir="column" gap="s4" fontSize="r1" textTransform="capitalize">
          <Text color="gray.800" fontWeight="500">
            Institutional
          </Text>
          <Box ml="s20" as="ul">
            {institutionDocuments?.map((document) => (
              <li>{document?.toLowerCase()}</li>
            ))}
          </Box>
        </Box>
      )}
    </DetailsCard>
  );
};
