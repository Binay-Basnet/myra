/* fc chart overlap prob solve */
// .fc .fc-daygrid-event {
//   position: unset;
//   z-index: 0;
// }
// .fc .fc-daygrid-day-number{
//   z-index: 0;
// }

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Popover, Portal, useDisclosure } from '@chakra-ui/react';
import { EventSourceInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { DateRange } from 'libs/@myra/date-picker/src/types/date';
import { en, rm } from 'libs/@myra/date-picker/src/utils/constants';

import { Box, Icon, Text } from '@myra-ui';
import { PopoverContent, PopoverTrigger } from '@myra-ui/components';
import { ad2bs, RangedDatePicker } from '@myra-ui/date-picker';

import { EventDetails } from './EventDetails';
import { UpCommingEvent } from './UpCommingEvent';

export interface EventProps {
  _id: string;
  title: string;
  end: string;
  start: string;
}

export const CalendarScheduler = ({
  calendarType = 'AD',
  events = [
    {
      _id: '12',
      title: 'test',
      end: '2023-10-19',
      start: '2023-10-13',
    },
  ],
  width = '1400px',
}: {
  calendarType?: 'AD' | 'BS';
  events: EventSourceInput;
  width?: string;
}) => {
  const DAY_NAMES_NEPALI = rm.dayName.full;
  const DAY_NAMES_ENG = en.dayName.full;
  const MONTHS = en.monthName.full;
  const eventListStatus = useDisclosure();
  const [date, setDate] = useState<DateRange>({
    from: { date: new Date() },
    to: { date: new Date() },
  });
  const [eventDetails, setEventDetails] = useState<Record<string, string>>();
  const [moreLinkEvents, setMoreLinkEvents] = useState<{
    date: Date;
    events: [];
  }>();
  const modalInfosEvent = useDisclosure();
  const selectMonth = useDisclosure();
  const eventDetailModal = useDisclosure();
  const handleAddEventSelectAndOpenModal = () => {
    modalInfosEvent.onOpen();
  };

  return (
    <Box display="flex" w="100%" justifyContent="center" bg="white">
      <Box>
        <Box
          w={width}
          border="1px"
          borderBottom="none"
          borderColor="border.layout"
          borderTopRadius="br3"
        >
          <Box p="s16" h="70px" borderBottom="1px" borderColor="border.layout">
            <Box display="flex" gap="s20" alignItems="center">
              <Text>
                {`${
                  MONTHS[date?.from?.date?.getMonth() as keyof typeof MONTHS]
                } ${date?.from?.date?.getFullYear()}`}
              </Text>
              <Box display="flex" gap="s16">
                <Box
                  as="button"
                  display="flex"
                  px="s16"
                  border="1px"
                  borderColor="border.layout"
                  borderRadius="br2"
                  justifyContent="center"
                  alignItems="center"
                  cursor="pointer"
                  onClick={() =>
                    setDate({
                      from: { date: new Date() },
                      to: { date: new Date() },
                    })
                  }
                >
                  <Text fontSize="r1" fontWeight="500" color="gray.700">
                    Today
                  </Text>
                </Box>
                <Box
                  display="flex"
                  border="1px"
                  borderColor="border.layout"
                  borderRadius="br2"
                  justifyContent="center"
                  alignItems="center"
                  cursor="pointer"
                >
                  <Box>
                    <Popover
                      closeOnBlur
                      closeOnEsc
                      onClose={selectMonth.onClose}
                      onOpen={() => selectMonth.onOpen()}
                      isLazy
                      isOpen={selectMonth.isOpen}
                    >
                      <PopoverTrigger>
                        <Box
                          as="button"
                          h="40px"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          gap="s8"
                          borderRight="1px"
                          borderColor="border.layout"
                          px="s16"
                        >
                          <Text fontSize="r1" fontWeight="500" color="gray.700" cursor="pointer">
                            {`${MONTHS[date?.from?.date?.getMonth() as keyof typeof MONTHS]}`}
                          </Text>
                          {selectMonth.isOpen ? (
                            <Icon as={ChevronUpIcon} size="lg" />
                          ) : (
                            <Icon as={ChevronDownIcon} size="lg" />
                          )}
                        </Box>
                      </PopoverTrigger>
                      <Portal>
                        <PopoverContent w="200px">
                          <Box display="flex" p="s16" flexDir="column" gap="s4">
                            {MONTHS.map((m, i) => (
                              <Box
                                onClick={() => {
                                  const y = new Date().getFullYear();
                                  const d = new Date().getDate();
                                  setDate({
                                    from: { date: new Date(y, i, d) },
                                    to: { date: new Date(y, i, d) },
                                  });

                                  selectMonth.onClose();
                                }}
                                _hover={{ bg: 'gray.100' }}
                                borderRadius="br1"
                                p="s4"
                                cursor="pointer"
                                bg={
                                  m === MONTHS[date?.from?.date?.getMonth() as keyof typeof MONTHS]
                                    ? 'gray.100'
                                    : ''
                                }
                              >
                                {m}
                              </Box>
                            ))}
                          </Box>
                        </PopoverContent>
                      </Portal>
                    </Popover>
                  </Box>
                  <Box>
                    <RangedDatePicker
                      trigger={() => (
                        <Box
                          px="s16"
                          h="40px"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          gap="s8"
                        >
                          <Text fontSize="r1" fontWeight="500" color="gray.700" cursor="pointer">
                            Select Date
                          </Text>
                        </Box>
                      )}
                      showFiscalPeriod={false}
                      showFiscalYearOnly={false}
                      showTillDatePeriod={false}
                      value={date}
                      onChange={(newDate) => setDate(newDate as DateRange)}
                      calendarType="AD"
                      baseDate={new Date()}
                      tillDateStart={new Date('2014-07-14')}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <UpCommingEvent
            upcommingEvents={events as EventSourceInput[]}
            isOpen={eventListStatus.isOpen}
            onToggle={eventListStatus.onToggle}
          />
        </Box>

        <FullCalendar
          key={String(
            new Date(
              date?.from?.date.getFullYear() ?? new Date().getFullYear(),
              date?.from?.date.getMonth() ?? 0,
              16
            )
          )}
          headerToolbar={false}
          initialDate={
            new Date(
              date?.from?.date.getFullYear() ?? new Date().getFullYear(),
              date?.from?.date.getMonth() ?? 0,
              date?.from?.date.getDate()
            )
          }
          dayHeaderContent={(arg) => {
            if (calendarType === 'BS') {
              return DAY_NAMES_NEPALI[arg.date.getDay()];
            }
            return DAY_NAMES_ENG[arg.date.getDay()];
          }}
          dayCellContent={(arg) => {
            if (calendarType === 'BS') {
              const y = arg.date.getFullYear();
              const m = arg.date.getMonth() + 1;
              const d = arg.date.getDate();
              return ad2bs(y, m, d)?.day;
            }

            const day = arg.date.getDate();
            return day;
          }}
          // eventClick={handleEditEventSelectAndOpenModal}
          plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          select={handleAddEventSelectAndOpenModal}
          events={events as EventSourceInput}
          // headerToolbar={false}

          eventContent={({ event }) => (
            <Text
              onClick={() => {
                eventDetailModal.onOpen();
                setEventDetails(event?._def?.extendedProps?.['meta']);
              }}
              color="#006837"
              cursor="pointer"
              paddingX="12px"
            >
              {event?._def?.title}
            </Text>
          )}
          longPressDelay={1000}
          eventLongPressDelay={1000}
          selectLongPressDelay={1000}
          selectable={false}
          dayMaxEvents
          editable={false}
          // dateAlignment="left"
          dayHeaderFormat={{ weekday: 'long' }} // This changes the day name format to long
          moreLinkClick={(e: any) => {
            setMoreLinkEvents({
              date: e?.date,
              events: e?.allSegs?.map((item: any) => item?.event?._def),
            });
            return e.hiddenSegs;
          }}
          moreLinkContent={({ text }) => (
            <Popover isLazy>
              <PopoverTrigger>
                <Text cursor="pointer" paddingX="12px">
                  {text}
                </Text>
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <Box p="s16" display="flex" gap="s20" flexDir="column">
                    <Text fontSize="r3" fontWeight="600" color="gray.800">
                      {`${
                        MONTHS[moreLinkEvents?.date?.getMonth() as keyof typeof MONTHS]
                      } ${moreLinkEvents?.date?.getDate()}`}
                    </Text>
                    <Box>
                      <Box display="flex" flexDir="column" gap="s2">
                        {moreLinkEvents?.events?.map((e: any) => (
                          <Text
                            _hover={{ bg: 'gray.100' }}
                            borderRadius="br1"
                            px="s4"
                            py="s2"
                            cursor="pointer"
                            onClick={() => {
                              eventDetailModal.onOpen();
                              setEventDetails(e?.extendedProps?.meta);
                            }}
                          >
                            {e?.title}
                          </Text>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </PopoverContent>
              </Portal>
            </Popover>
          )}
        />
      </Box>
      {eventDetailModal && (
        <EventDetails
          isOpen={eventDetailModal.isOpen}
          onClose={eventDetailModal.onClose}
          event={eventDetails}
        />
      )}
    </Box>
  );
};
