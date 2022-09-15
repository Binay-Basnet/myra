import { useEffect, useState } from 'react';

import { useGetProductCriteriaQuery } from '@coop/cbs/data-access';
import { Box, Text } from '@coop/shared/ui';

interface CriteriaProps {
  productId: string;
}

export const CriteriaCard = ({ productId }: CriteriaProps) => {
  const [triggerQuery, setTriggerQuery] = useState(false);
  const poductDetails = useGetProductCriteriaQuery(
    { productId },
    {
      enabled: triggerQuery,
    }
  );
  const criteriaData = poductDetails?.data?.loanAccount?.getProductCriteria?.data;
  useEffect(() => {
    if (productId) {
      setTriggerQuery(true);
    }
  }, [productId]);
  return (
    <Box px="s24">
      <ul>
        {' '}
        <li>
          <Box display="flex" flexDirection="row" gap="s4">
            <Text fontWeight="400" fontSize="s3">
              Age:{' '}
            </Text>
            <Text fontWeight="600" fontSize="s3">
              {criteriaData?.minAge} - {criteriaData?.maxAge}
            </Text>
          </Box>
        </li>
        <li>
          <Box display="flex" flexDirection="row" gap="s4" flexWrap="wrap">
            <Text fontWeight="400" fontSize="s3">
              Gender:
            </Text>
            {criteriaData?.gender?.map((item) => (
              <Text fontWeight="600" fontSize="s3" key={`${item}`}>
                {item},
              </Text>
            ))}
          </Box>
        </li>
        <li>
          <Box display="flex" flexDirection="row" gap="s4" flexWrap="wrap">
            <Text fontWeight="400" fontSize="s3">
              Marital Status:{' '}
            </Text>
            {criteriaData?.maritalStatus?.map((item) => (
              <Text fontWeight="600" fontSize="s3" key={`${item}`}>
                {item},
              </Text>
            ))}
          </Box>
        </li>
        <li>
          <Box display="flex" flexDirection="row" gap="s4" flexWrap="wrap">
            <Text fontWeight="400" fontSize="s3">
              Occupational Details:
            </Text>
            {criteriaData?.occupation?.map((item) => (
              <Text fontWeight="600" fontSize="s3" key={`${item}`}>
                {item},
              </Text>
            ))}
          </Box>
        </li>
        <li>
          <Box display="flex" flexDirection="row" gap="s4" flexWrap="wrap">
            <Text fontWeight="400" fontSize="s3">
              Educational Qualifications:
            </Text>
            {criteriaData?.educationQualification?.map((item) => (
              <Text fontWeight="600" fontSize="s3" key={`${item}`}>
                {item},
              </Text>
            ))}
          </Box>
        </li>
        <li>
          <Box display="flex" flexDirection="row" gap="s4" flexWrap="wrap">
            <Text fontWeight="400" fontSize="s3">
              Ethnicity:
            </Text>
            {criteriaData?.ethnicity?.map((item) => (
              <Text fontWeight="600" fontSize="s3" key={`${item}`}>
                {item},
              </Text>
            ))}
          </Box>
        </li>
        <li>
          <Box display="flex" flexDirection="row" gap="s4" flexWrap="wrap">
            <Text fontWeight="400" fontSize="s3">
              Foreign Employment:
            </Text>
            <Text fontWeight="600" fontSize="s3">
              {criteriaData?.foreignEmployment ? 'Yes' : 'No'}
            </Text>
          </Box>
        </li>
        <li>
          <Box
            display="flex"
            flexDirection="row"
            gap="s4"
            flexWrap="wrap"
            // overflowWrap={'normal'}
            // overflow={'auto'}
          >
            <Text fontWeight="400" fontSize="s3">
              {' '}
              Nature of Business (Institutions):{' '}
            </Text>

            {criteriaData?.institutionType?.map((item) => (
              <Text fontWeight="600" fontSize="s3" key={`${item}`}>
                {item},
              </Text>
            ))}
          </Box>
        </li>
        <li>
          <Box display="flex" flexDirection="row" gap="s4" flexWrap="wrap">
            <Text fontWeight="400" fontSize="s3">
              Nature of Business(COOP Union):
            </Text>
            {criteriaData?.cooperativeUnion?.map((item) => (
              <Text fontWeight="600" fontSize="s3" key={`${item}`}>
                {item},
              </Text>
            ))}
          </Box>
        </li>
        <li>
          <Box display="flex" flexDirection="row" gap="s4" flexWrap="wrap">
            <Text fontWeight="400" fontSize="s3">
              Cooperative Type:
            </Text>
            {criteriaData?.cooperativeType?.map((item) => (
              <Text fontWeight="600" fontSize="s3" key={`${item}`}>
                {item},
              </Text>
            ))}
          </Box>
        </li>
      </ul>
    </Box>
  );
};
