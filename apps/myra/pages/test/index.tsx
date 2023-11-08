/* fc chart overlap prob solve */
// .fc .fc-daygrid-event {
//   position: unset;
//   z-index: 0;
// }
// .fc .fc-daygrid-day-number{
//   z-index: 0;
// }

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDisclosure } from '@chakra-ui/react';
import { EventSourceInput } from '@fullcalendar/core';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import * as yup from 'yup';

import { Box, Button, Grid, GridItem, Modal } from '@myra-ui';
import { DatePicker } from '@myra-ui/date-picker';

import { CalendarScheduler, FolderComponent } from '@coop/shared/components';
import { FormInput, FormTextArea } from '@coop/shared/form';

const validationSchema = yup.object({
  title: yup.string().required('No title provided'),
  startDate: yup.date().required('No start date provided'),
  endDate: yup.date().required('No end date provided'),
  description: yup.string().required('No description provided'),
  enrolledMember: yup.number().required('No enrolled member provided'),
  startTime: yup.string(),
  endTime: yup.string(),
  location: yup.string(),
  link: yup.string(),
});

const Test = () => {
  const addEventModal = useDisclosure();
  const [event, setEvent] = useState<EventSourceInput>([
    {
      _id: '2',
      title: 'Anniversary',
      start: '2023-10-25T12:00:00',
      end: '2023-10-28T24:00:00',
      allDay: true,
      meta: {
        title: 'INTRODUCTION TO ANNIVERSARY',
        time: { start: '02:10 AM', end: '03:12 PM' },
        date: {
          year: dayjs('2023-10-15').format('YYYY'),
          start: dayjs('2023-10-15').format('MMM D'),
          end: dayjs('2023-10-16').add(1, 'd').format('MMM D'),
        },
        location: 'Baneshwor, Kathmandu',
        enrolledMember: 12,
        link: 'https://facebook.com',
        description:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae accusantium, autem alias voluptates deleniti quia architecto illum porro earum accusamus rerum corporis sapiente rem quas odit aut, ab, cupiditate nemo?',
        courseObjectives: [
          'Understand the history of cooperatives',
          'Identify the principles of cooperation',
          'Appreciate the benefits of cooperation',
          'Describe the different types of cooperatives',
        ],
      },
    },
  ]);
  const methods = useForm<{
    title: string;
    startDate: Date;
    endDate: Date;
    description: string;
    startTime: string;
    endTime: string;
    location: string;
    link: string;
    enrolledMember: number;
    latLong: {
      latitude: number;
      longitude: number;
    };
  }>({
    defaultValues: {
      endDate: new Date(),
      startDate: new Date(),
    },
    resolver: yupResolver(validationSchema),
  });

  return (
    <>
      <Box>
        <FolderComponent />
      </Box>
      <Box>
        <Button onClick={addEventModal.onOpen}>Add event</Button>
        <CalendarScheduler events={event} />
        {addEventModal.isOpen && (
          <Modal
            width="2xl"
            open={addEventModal.isOpen}
            onClose={addEventModal.onClose}
            title="Add Event"
            primaryButtonLabel="Save"
            primaryButtonHandler={methods.handleSubmit(() => {
              const value = methods.getValues();

              setEvent([
                // ...event,

                {
                  _id: String(Math.random()),
                  title: value.title,
                  start: dayjs(value.startDate).format('YYYY-MM-DDTHH:mm:ss'),
                  end: dayjs(value.endDate).add(1, 'd').format('YYYY-MM-DDTHH:mm:ss'),
                  allDay: true,
                  meta: {
                    description: value?.description,
                    title: value.title,
                    time: { start: value.startTime, end: value.endTime },
                    date: {
                      year: dayjs(value.startDate).format('YYYY'),
                      start: dayjs(value.startDate).format('MMM D'),
                      end: dayjs(value.endDate).add(1, 'd').format('MMM D'),
                    },
                    location: value?.location,
                    link: value.link,
                    enrolledMember: value?.enrolledMember,

                    courseObjectives: [
                      'Understand the history of cooperatives',
                      'Identify the principles of cooperation',
                      'Appreciate the benefits of cooperation',
                      'Describe the different types of cooperatives',
                    ],
                  },
                },
              ]);
              addEventModal.onClose();
            })}
          >
            <Box>
              <FormProvider {...methods}>
                <Box display="flex" flexDirection="column" gap="s24">
                  <FormInput name="title" label="Title" />
                  <Grid templateColumns="repeat(2,1fr)" gap="s20">
                    <GridItem colSpan={1}>
                      <DatePicker
                        value={{ date: methods.watch('startDate') }}
                        onChange={(e) => methods.setValue('startDate', e.date)}
                        name="start"
                        label="Start Date"
                        calendarType="AD"
                        isRequired
                      />
                    </GridItem>
                    <GridItem colSpan={1}>
                      <DatePicker
                        value={{ date: methods.watch('endDate') }}
                        onChange={(e) => methods.setValue('endDate', e.date)}
                        name="end"
                        calendarType="AD"
                        label="End Date"
                        isRequired
                      />
                    </GridItem>
                  </Grid>
                  <Grid templateColumns="repeat(2,1fr)" gap="s20">
                    <GridItem colSpan={1}>
                      <FormInput name="startTime" type="time" label="Start Time" />
                    </GridItem>
                    <GridItem colSpan={1}>
                      <FormInput name="endTime" type="time" label="End Time" />
                    </GridItem>
                  </Grid>
                  <FormTextArea name="description" label="Description" isRequired />
                  <FormInput
                    name="enrolledMember"
                    type="number"
                    label="Total enrolled member"
                    isRequired
                  />
                  <FormInput name="link" label="Link" />

                  {/* 
                <Box display="flex" flexDir="column" gap="s4">
                  <Text variant="formLabel" color="gray.800">
                    Location
                  </Text>
                  <MapComponent
                    currentLoc={methods.watch('latLong') ?? undefined}
                    setCurrentLoc={(e) => {
                      methods.setValue('latLong', e);
                    }}
                    setCurrentAddr={(e) => {
                      methods.setValue('location', e);
                    }}
                  />
                </Box> */}
                </Box>
              </FormProvider>
            </Box>
          </Modal>
        )}
      </Box>
    </>
  );
};

export default Test;
