import { Box, DetailsCard, Text } from '@myra-ui';

import { useGetUrlFromFileKeyMutation } from '@coop/cbs/data-access';

import { useLoanAccountDetailHooks } from '../hooks/useLoanAccountDetailHooks';

export const DocumentPage = () => {
  const { documentData } = useLoanAccountDetailHooks();
  const { mutateAsync } = useGetUrlFromFileKeyMutation();
  return (
    <DetailsCard title="Documents" bg="white" rows={1}>
      {documentData?.data?.map?.((item) => (
        <Box>
          <Text fontSize="r3" fontFamily="medium">
            {item?.field}
          </Text>
          {item?.fileKey?.map((i, index) => (
            <Text
              fontSize="r1"
              variant="link"
              onClick={() =>
                mutateAsync({ fileKey: i }).then((res) =>
                  window.open(res?.downloadCentre?.getUrlFromFileKey?.url, '_blank')
                )
              }
            >
              {index + 1}. {i}
            </Text>
          ))}
        </Box>
      ))}
      {/* <DocumentComponent keyText="1" value="https://bit.ly/sage-adebayo" /> */}
    </DetailsCard>
  );
};
