import { Skeleton } from '@chakra-ui/react';

import { Avatar, Box, Grid, Text } from '@myra-ui';

export const SkeletonDetails = () => (
  <Box display="flex" flexDirection="column" gap="s32">
    <Box display="flex" flexDirection="column" gap="s8">
      <Skeleton w="fit-content">
        <Text fontSize="r3" fontWeight="600">
          Overview
        </Text>
      </Skeleton>

      <Grid templateColumns="repeat(3,1fr)" gap="s16">
        <Skeleton>
          <Box h="58px">
            <Text fontSize="s2" fontWeight="400">
              Contat Number:
            </Text>
          </Box>
        </Skeleton>
        <Skeleton>
          <Box h="58px">
            <Text fontSize="s2" fontWeight="400">
              Contat Number:
            </Text>
          </Box>
        </Skeleton>
        <Skeleton>
          <Box h="58px">
            <Text fontSize="s2" fontWeight="400">
              Contat Number:
            </Text>
          </Box>
        </Skeleton>
        <Skeleton>
          <Box h="58px">
            <Text fontSize="s2" fontWeight="400">
              Contat Number:
            </Text>
          </Box>
        </Skeleton>
        <Skeleton>
          <Box h="58px">
            <Text fontSize="s2" fontWeight="400">
              Contat Number:
            </Text>
          </Box>
        </Skeleton>
        <Skeleton>
          <Box h="58px">
            <Text fontSize="s2" fontWeight="400">
              Contat Number:
            </Text>
          </Box>
        </Skeleton>
        <Skeleton>
          <Box h="58px">
            <Text fontSize="s2" fontWeight="400">
              Contat Number:
            </Text>
          </Box>
        </Skeleton>
      </Grid>
    </Box>
    <Skeleton>
      <Box h="100px">mkdmskdm</Box>
    </Skeleton>
    <Grid templateColumns="repeat(2,1fr)" gap="s16">
      <Skeleton borderRadius="br2">
        {' '}
        <Box boxShadow="E0" borderRadius="br2" gap="s16" h="400px" p="s16">
          hello
        </Box>
      </Skeleton>
      <Skeleton borderRadius="br2">
        <Box boxShadow="E0" borderRadius="br2" gap="s16" p="s16" h="400px">
          hello
        </Box>
      </Skeleton>
    </Grid>
    <Skeleton>
      <Box h="100px">mkdmskdm</Box>
    </Skeleton>
  </Box>
);

export const DetailsSidebarSkeleton = () => (
  <Box p="s16" display="flex" gap="s12">
    <Skeleton w="fit-content" h="fit-content">
      <Avatar />
    </Skeleton>
    <Box flex="1" display="flex" flexDirection="column" gap="s8">
      <Skeleton>
        <Box>mkdmskdm</Box>
      </Skeleton>
      <Skeleton>
        <Box>mkdmskdm</Box>
      </Skeleton>
      <Skeleton>
        <Box>mkdmskdm</Box>
      </Skeleton>
    </Box>
  </Box>
);
