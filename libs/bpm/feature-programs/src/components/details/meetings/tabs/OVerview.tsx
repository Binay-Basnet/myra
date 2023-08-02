import { AgendaMeetings } from '../components/Agenda';
import { AttendeesTable } from '../components/EmployeeDettails';
import { GeneralInformationMeetingDetails } from '../components/GeneralInformation';

export const Overview = () => (
  <>
    <GeneralInformationMeetingDetails />
    <AgendaMeetings />
    <AttendeesTable />
    <AgendaMeetings />
  </>
);
