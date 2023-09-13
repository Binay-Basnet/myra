import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useRouter } from 'next/router';

import { Box, Icon, Text } from '@myra-ui';

import { ApplicantStatus, JobApplicationOverview } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import {
  DetailsAlertBar,
  DetailsKeyValueCard,
  DetailsPageHeaderBox,
} from '@coop/shared/components';

export const Overview = (props: { data: JobApplicationOverview }) => {
  const router = useRouter();
  const { data } = props;
  return (
    <>
      {data?.applicationStatus === ApplicantStatus?.Accepted && (
        <Box mb="-s16">
          <DetailsAlertBar
            title="Application accepted. Send Job Offer Next."
            buttonText="Send Job Offer"
            alertButtonHandler={() => router.push(ROUTES?.HR_RECRUITMENT_JOB_OFFER_ADD)}
          />
        </Box>
      )}
      <DetailsPageHeaderBox title="Overview" />

      <DetailsKeyValueCard
        title="Basic Information"
        keyValueList={[
          { label: 'Name of Applicant', value: data?.nameOfApplicant as string },
          { label: 'Application ID', value: data?.applicationId as string },
          { label: 'Job Posting', value: data?.jobPosting as string },
          { label: 'Designation', value: data?.designation as string },
          { label: 'Department', value: data?.department as string },
        ]}
      />
      <DetailsKeyValueCard
        title="Contact Details"
        keyValueList={[
          { label: 'Phone Number', value: data?.phoneNumber as string },
          { label: 'Email Address', value: data?.emailAddress as string },
        ]}
      />
      <DetailsKeyValueCard
        title="Permanent Address"
        keyValueList={[
          { label: 'Province', value: data?.permanentAddress?.province as string },
          { label: 'District', value: data?.permanentAddress?.district as string },
          { label: 'Local Government', value: data?.permanentAddress?.localGovernment as string },
          { label: 'Ward No', value: data?.permanentAddress?.wardNo as string },
          { label: 'Locality', value: data?.permanentAddress?.locality as string },
          { label: 'House No', value: data?.permanentAddress?.houseNo as string },
        ]}
      />
      <DetailsKeyValueCard
        title="Temporary Address"
        keyValueList={[
          { label: 'Province', value: data?.temporaryAddress?.province as string },
          { label: 'District', value: data?.temporaryAddress?.district as string },
          { label: 'Local Government', value: data?.temporaryAddress?.localGovernment as string },
          { label: 'Ward No', value: data?.temporaryAddress?.wardNo as string },
          { label: 'Locality', value: data?.temporaryAddress?.locality as string },
          { label: 'House No', value: data?.temporaryAddress?.houseNo as string },
        ]}
      />
      <Box mx="s24" p="s16" bg="white" borderRadius={4} boxShadow="xs">
        <Text fontSize="r1" color="gray.600" mb="s24">
          Impression
        </Text>
        <Box display="flex" flexDir="column" gap="s8">
          <Text color="gray.700" fontSize="s3" fontWeight="medium">
            Application Rating
          </Text>
          <Box>
            {[1, 2, 3, 4, 5].map((rating) => (
              <Icon
                color="primary"
                key={rating}
                as={rating <= data?.applicationRating ? AiFillStar : AiOutlineStar}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Overview;
