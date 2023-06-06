import { AiOutlineFilePdf } from 'react-icons/ai';

import { Avatar, Box, Icon, Text } from '@myra-ui';

interface IDocumentCard {
  label: string;
  data:
    | ({
        identifier?: string;
        url?: string;
      } | null)[]
    | null
    | undefined;
}

export const DocumentComponent = ({ data, label }: IDocumentCard) => (
  // const router = useRouter();
  // const memberDetails = useGetMemberDetailsOverviewQuery({
  //   id: router.query['id'] as string,
  // });

  // const memberBasicInfo =
  //   memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
  <Box display="flex" flexDirection="column" gap="s8">
    <Text fontSize="r1" fontWeight="500">
      {label}
    </Text>
    {data?.map((item) => (
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
          <Avatar name={item?.identifier as string} size="sm" src={item?.url ?? ''} />
          <Text fontSize="s3" fontWeight="500">
            {item?.identifier}
          </Text>
        </Box>
        <a href={item?.url as string} target="_blank" rel="noreferrer">
          <Icon as={AiOutlineFilePdf} />
        </a>
      </Box>
    ))}
  </Box>
);
