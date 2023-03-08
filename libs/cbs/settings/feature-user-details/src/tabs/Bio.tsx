import {
  GeneralInformationUsers,
  TabHeader,
  UserIdentificationDetails,
  UserPermanentAddress,
  UserTemporaryAddress,
} from '../components';

export const Bio = () => (
  <>
    <TabHeader heading="Bio" />
    <GeneralInformationUsers />
    <UserPermanentAddress />
    <UserIdentificationDetails />
    <UserTemporaryAddress />
    {/* <UserDocuments /> */}
  </>
);
