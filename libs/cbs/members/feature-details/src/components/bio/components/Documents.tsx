import { AiOutlineFilePdf } from 'react-icons/ai';

import { Avatar, Box, Icon, Text } from '@myra-ui';

interface IDocumentCard {
  keyText?: string;
  value?: string;
}

export const DocumentComponent = ({ keyText, value }: IDocumentCard) => (
  // const router = useRouter();
  // const memberDetails = useGetMemberDetailsOverviewQuery({
  //   id: router.query['id'] as string,
  // });

  // const memberBasicInfo =
  //   memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
  <Box
    border="1px"
    borderRadius="br2"
    borderColor="border.layout"
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    p="s16"
  >
    <Box display="flex" justifyContent="flex-start" gap="s16">
      <Avatar name={keyText as string} size="sm" src={value ?? ''} />
      <Text fontSize="s3" fontWeight="500">
        {keyText}
      </Text>
    </Box>
    <a href={value as string}>
      <Icon as={AiOutlineFilePdf} />
    </a>
  </Box>
);
