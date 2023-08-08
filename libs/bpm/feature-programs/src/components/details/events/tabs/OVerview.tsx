import { IoAddOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { DetailPageQuickLinks } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';

import { AddAnnouncemnetModal } from '../components/AddAnnouncementsModal';
import { AddAttendeesModal } from '../components/AddAttendeesModal';
import { AttendeesTable } from '../components/EmployeeDettails';
import { GeneralInformationEventDetails } from '../components/GeneralInformation';
import { NotesEvents } from '../components/Notes';

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
      title: 'New Events',
      onClick: () => router.push(ROUTES?.BPM_PROGRAMS_EVENTS_ADD),

      icon: IoAddOutline,
    },

    {
      title: 'Add Attendees',
      onClick: onAddAttendeesOpen,
      icon: IoAddOutline,
    },
    {
      title: 'Add Announcement',
      onClick: onAddMinuteOpen,
      icon: IoAddOutline,
    },
  ];

  return (
    <>
      <DetailPageQuickLinks links={updateLinks} />

      <GeneralInformationEventDetails />
      <NotesEvents />
      <AttendeesTable />
      <AddAnnouncemnetModal isOpen={isAddMinuteOpen} onClose={onAddMinuteClose} />
      <AddAttendeesModal isOpen={isAddAttendeesOpen} onClose={onAddAttendessClose} />
    </>
  );
};
