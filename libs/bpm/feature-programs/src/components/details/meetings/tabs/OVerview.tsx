import { IoAddOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { DetailPageQuickLinks } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';

import { AddAttendeesModal } from '../components/AddAttendeesModal';
import { AddMinutesModal } from '../components/AddMinutesModal';
import { AgendaMeetings } from '../components/Agenda';
import { AttendeesTable } from '../components/EmployeeDettails';
import { GeneralInformationMeetingDetails } from '../components/GeneralInformation';

export const Overview = () => {
  const router = useRouter();
  const {
    isOpen: isAddMinuteOpen,
    onOpen: onAddMinuteOpen,
    onClose: onAddMinuteClose,
  } = useDisclosure();
  const {
    isOpen: isAddAttendeesOpen,
    onOpen: onAddAttendeesOpen,
    onClose: onAddAttendessClose,
  } = useDisclosure();

  const updateLinks = [
    {
      title: 'New Meeting',
      onClick: () => router.push(ROUTES?.BPM_PROGRAMS_MEETINGS_ADD),

      icon: IoAddOutline,
    },
    {
      title: 'Add Minutes',
      onClick: onAddMinuteOpen,
      icon: IoAddOutline,
    },
    {
      title: 'Add Attendees',
      onClick: onAddAttendeesOpen,
      icon: IoAddOutline,
    },
  ];

  return (
    <>
      <DetailPageQuickLinks links={updateLinks} />

      <GeneralInformationMeetingDetails />
      <AgendaMeetings />
      <AttendeesTable />
      <AgendaMeetings />
      <AddMinutesModal isOpen={isAddMinuteOpen} onClose={onAddMinuteClose} />
      <AddAttendeesModal isOpen={isAddAttendeesOpen} onClose={onAddAttendessClose} />
    </>
  );
};
