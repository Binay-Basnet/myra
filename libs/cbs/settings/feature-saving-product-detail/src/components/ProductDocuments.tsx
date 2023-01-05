import { Box, DetailsCard, Text } from '@myra-ui';

import {
  IndividualRequiredDocument,
  InstitutionRequiredDocument,
  Maybe,
} from '@coop/ebanking/data-access';

interface IProductDocuments {
  individualDocuments: Maybe<Maybe<IndividualRequiredDocument>[]> | undefined;
  institutionDocuments: Maybe<Maybe<InstitutionRequiredDocument>[]> | undefined;
}

export const ProductDocuments = ({
  institutionDocuments,
  individualDocuments,
}: IProductDocuments) => (
  <DetailsCard title="Required Documents">
    {individualDocuments?.length !== 0 && (
      <Box display="flex" flexDir="column" gap="s4" fontSize="r1" textTransform="capitalize">
        <Text color="gray.800" fontWeight="Medium">
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
        <Text color="gray.800" fontWeight="Medium">
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
