import _ from 'lodash';

import { Box, DetailCardContent, DetailsCard } from '@myra-ui';

import { formatAddress, localizedDate } from '@coop/cbs/utils';
import { useGetProfileQuery } from '@coop/employee-portal/data-access';

export const Overview = () => {
  const { data } = useGetProfileQuery();
  const profileData = data?.employee?.home?.profile?.data?.overview;

  return (
    <Box display="flex" flexDir="column" gap="s24">
      <DetailsCard title="Personal Information" rows={3} hasElevation={false}>
        <DetailCardContent
          title="Full Name"
          subtitle={`${profileData?.firstName?.local} ${profileData?.middleName?.local} ${profileData?.lastName?.local}`}
        />
        <DetailCardContent
          title="Date of Birth"
          subtitle={localizedDate(profileData?.dateOfBirth)}
        />
        <DetailCardContent
          title="Gender"
          subtitle={_.startCase(profileData?.gender?.toLowerCase())}
        />
        <DetailCardContent title="Email" subtitle={profileData?.email} />
        <DetailCardContent title="Address" subtitle={formatAddress(profileData?.address)} />
        <DetailCardContent title="Father's Name" subtitle={profileData?.fatherName?.local} />
        <DetailCardContent title="Mother's Name" subtitle={profileData?.motherName?.local} />
        <DetailCardContent
          title="Grandfather's Name"
          subtitle={profileData?.grandFatherName?.local}
        />
      </DetailsCard>
      <DetailsCard title="Contact Details" rows={4} hasElevation={false}>
        <DetailCardContent title="Work Phone Number" subtitle={profileData?.workPhoneNumber} />
        <DetailCardContent title="Work Email Address" subtitle={profileData?.workEmailAddress} />
        <DetailCardContent
          title="Personal Phone Number"
          subtitle={profileData?.personalPhoneNumber}
        />
        <DetailCardContent
          title="Personal Email Address"
          subtitle={profileData?.personalEmailAddress}
        />
      </DetailsCard>
      <DetailsCard title="Education Details" rows={4} hasElevation={false}>
        <DetailCardContent title="Work Phone Number" subtitle="Krishna Thapa" />
        <DetailCardContent title="Work Email Address" subtitle="2040-02-02" />
        <DetailCardContent title="Personal Phone Number" subtitle="Male" />
        <DetailCardContent title="Personal Email Address" subtitle="Male" />
      </DetailsCard>
    </Box>
  );
};
