import { Box, DetailCardContent, DetailsCard } from '@myra-ui';

export const Overview = () => (
  <Box display="flex" flexDir="column" gap="s24">
    <DetailsCard title="Personal Information" rows={3} hasElevation={false}>
      <DetailCardContent title="Full Name" subtitle="Krishna Thapa" />
      <DetailCardContent title="Date of Birth" subtitle="2040-02-02" />
      <DetailCardContent title="Gender" subtitle="Male" />
      <DetailCardContent title="Email" subtitle="krish.90@gmail.com" />
      <DetailCardContent title="Address" subtitle="3-Jitpur Simara Sub-Metropolitan City" />
      <DetailCardContent title="Father's Name" subtitle="Vasudev Thapa" />
      <DetailCardContent title="Mother's Name" subtitle="Bikash Thapa" />
      <DetailCardContent title="Grandfather's Name" subtitle="Bikash Thapa" />
    </DetailsCard>
    <DetailsCard title="Contact Details" rows={4} hasElevation={false}>
      <DetailCardContent title="Work Phone Number" subtitle="Krishna Thapa" />
      <DetailCardContent title="Work Email Address" subtitle="2040-02-02" />
      <DetailCardContent title="Personal Phone Number" subtitle="Male" />
      <DetailCardContent title="Personal Email Address" subtitle="Male" />
    </DetailsCard>
    <DetailsCard title="Education Details" rows={4} hasElevation={false}>
      <DetailCardContent title="Work Phone Number" subtitle="Krishna Thapa" />
      <DetailCardContent title="Work Email Address" subtitle="2040-02-02" />
      <DetailCardContent title="Personal Phone Number" subtitle="Male" />
      <DetailCardContent title="Personal Email Address" subtitle="Male" />
    </DetailsCard>
  </Box>
);
