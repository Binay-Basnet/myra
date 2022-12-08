import { GrPhone } from 'react-icons/gr';
import { IoLocationOutline } from 'react-icons/io5';

import { Box, Divider, Icon, Text } from '@myra-ui';

interface IAddressDetailsCOmponentCard {
  name?: string;
  type?: string;
  address?: string;
  phoneNo?: string;
}

export const SisterConcernComponent = ({
  name,
  type,
  address,
  phoneNo,
}: IAddressDetailsCOmponentCard) => (
  // const router = useRouter();
  // const memberDetails = useGetMemberDetailsOverviewQuery({
  //   id: router.query['id'] as string,
  // });

  // const memberBasicInfo =
  //   memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
  <Box display="flex" flexDirection="column" p="s16" bg="white" borderRadius="br2">
    <Box>
      <Text fontSize="r1" fontWeight="600">
        {name}
      </Text>
      <Text fontSize="s3" fontWeight="400">
        {type}
      </Text>
    </Box>
    <Divider pt="s16" />
    <Box display="flex" justifyContent="space-between" pt="s16">
      <Box display="flex" gap="s10">
        <Icon as={IoLocationOutline} />
        <Text fontSize="s3" fontWeight="400">
          {address}
        </Text>
      </Box>
      <Box display="flex" gap="s10">
        <Icon as={GrPhone} />
        <Text fontSize="s3" fontWeight="400">
          {phoneNo}
        </Text>
      </Box>
    </Box>
  </Box>
);
