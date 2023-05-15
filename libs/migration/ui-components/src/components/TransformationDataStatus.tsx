import { useState } from 'react';
import { useRouter } from 'next/router';
import { useGetTransformationDataQuery } from '@migration/data-access';

import { Box, Button, Collapse, Text } from '@myra-ui';

export const TransformationDataStatus = () => {
  const router = useRouter();
  const [transformationCollapse, setTransformationCollapse] = useState(true);

  const { data: tansformationData, refetch: transformationRefetch } = useGetTransformationDataQuery(
    {
      dbName: router?.query?.['name'] as string,
    }
  );

  const transformedData = tansformationData?.protectedQuery?.getTransformationData?.data;

  return (
    <Box
      display="flex"
      flexDir="column"
      p={5}
      gap={5}
      bg="whiteAlpha.900"
      borderRadius={6}
      boxShadow="lg"
      // w="-webkit-fit-content"
    >
      <Box display="flex" justifyContent="space-between">
        <Text
          fontSize="r3"
          fontWeight="medium"
          cursor="pointer"
          onClick={() => setTransformationCollapse(!transformationCollapse)}
        >
          Transformation Data status:{' '}
        </Text>
        <Button onClick={() => transformationRefetch()}>Reload</Button>
      </Box>
      <Collapse in={transformationCollapse}>
        <Box maxH="35vh" overflowY="scroll" w="-webkit-fit-content">
          {transformedData?.map((i) => (
            <Text fontSize="r1" lineHeight={10}>
              -&nbsp;&nbsp;&nbsp;{i}
            </Text>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};

export default TransformationDataStatus;
