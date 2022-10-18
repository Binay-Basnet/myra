// import debounce from 'lodash/debounce';
import React, { useState } from 'react';
import {
  DragDropContext,
  Draggable,
  DraggableProvidedDragHandleProps,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { FormProvider, useForm } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { AddIcon } from '@chakra-ui/icons';

import { useGetNewIdMutation } from '@coop/cbs/data-access';
import { FormInput, FormSwitch } from '@coop/shared/form';
import { Box, Button, Collapse, Icon, Text } from '@coop/shared/ui';
import { GRID2X3, useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface CbsSettingsFeatureLoanProductsProps {}

interface ICollateralProps {
  list: { name: string; enabled: boolean; id: string }[];
  setList: React.Dispatch<React.SetStateAction<{ name: string; enabled: boolean; id: string }[]>>;
}

export const AcceptedCollateral = (props: ICollateralProps) => {
  const [hasNewField, setHasNewField] = useState(false);

  const { mutateAsync: getNewId } = useGetNewIdMutation({});

  const { list, setList } = props;
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(true);

  const methods = useForm();

  const handleOnDragEnd = async (result: DropResult) => {
    const items = Array.from(list ?? []);
    const [reorderedItem] = items.splice(result.source.index, 1);

    if (result.destination) {
      items.splice(result.destination.index, 0, reorderedItem);
      setList(items);
    }
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      margin="s4"
      border="1px"
      borderColor="gray.200"
      borderRadius={5}
      mb="s48"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap="s4"
        py="s16"
        px="s12"
        borderBottom="1px"
        borderColor="gray.200"
      >
        <Text fontSize="r1" fontWeight="500">
          {t['settingsLoanAccepted']}
        </Text>
        {isOpen ? (
          <Icon as={RiArrowUpSLine} color="gray.600" onClick={() => setIsOpen(false)} />
        ) : (
          <Icon as={RiArrowDownSLine} color="gray.600" onClick={() => setIsOpen(true)} />
        )}
      </Box>
      <Collapse in={isOpen} style={{ marginTop: '0px' }}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="collateral-list">
            {(provided) => (
              <Box
                display="flex"
                flexDir="column"
                py="s12"
                px="s12"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {list?.map((item, index) => (
                  <Draggable key={item?.id} draggableId={item?.id || ''} index={index}>
                    {(provide) => (
                      <Box
                        display="flex"
                        gap="s20"
                        alignItems="center"
                        justifyContent="space-between"
                        ref={provide.innerRef}
                        {...provide.draggableProps}
                      >
                        <AcceptedCollateralOption
                          // setList={setList}
                          dragHandleProps={provide.dragHandleProps}
                          option={item}
                        />
                      </Box>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>

        {hasNewField && (
          <FormProvider {...methods}>
            <form
              onSubmit={async (e) => {
                e.preventDefault();

                const response = await getNewId({});
                setList((prev) => [
                  ...prev,
                  {
                    enabled: true,
                    name: methods.getValues()['name'],
                    id: response.newId,
                  },
                ]);
                setHasNewField(false);
                methods.reset();
              }}
            >
              <Box display="flex" alignItems="center" gap="s16" p="s16">
                <Box
                  width="100%"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  gap="s8"
                >
                  <Box w="100%">
                    <FormInput type="text" name="name" />
                  </Box>
                  <Button
                    onClick={async () => {
                      const response = await getNewId({});

                      setList((prev) => [
                        ...prev,
                        {
                          enabled: true,
                          name: methods.getValues()['name'],
                          id: response.newId,
                        },
                      ]);
                      setHasNewField(false);
                      methods.reset();
                    }}
                  >
                    Add New
                  </Button>
                </Box>
                <Icon
                  onClick={() => {
                    setHasNewField(false);
                    methods.reset();
                  }}
                  as={IoClose}
                  size="md"
                  color="gray.500"
                  cursor="pointer"
                  _hover={{ color: 'gray.800' }}
                />
              </Box>
            </form>
          </FormProvider>
        )}
        <Box borderTop="1px" borderColor="gray.200" p="s8">
          <Button
            variant="ghost"
            size="md"
            isDisabled={hasNewField}
            shade="primary"
            leftIcon={<AddIcon />}
            onClick={() => {
              setHasNewField(true);
            }}
            _hover={{ bg: 'transparent' }}
          >
            Add New Option
          </Button>
        </Box>
      </Collapse>
    </Box>
  );
};

interface IAcceptedCollateralOptionProps {
  // setList: React.Dispatch<React.SetStateAction<{ name: string; enabled: boolean; id: string }[]>>;
  dragHandleProps: DraggableProvidedDragHandleProps | undefined;
  option: { name: string; enabled: boolean; id: string };
}

export const AcceptedCollateralOption = ({
  dragHandleProps,
  option,
}: IAcceptedCollateralOptionProps) => {
  const methods = useForm<{ name: string; enabled: boolean; id: string }>({
    defaultValues: {
      enabled: option.enabled,
      name: option.name,
    },
  });

  // const { watch } = methods;

  // const [isEditable, setIsEditable] = useState(!option.name);

  // useEffect(() => {
  //   const subscription = watch(() => {
  //     setList((prev) =>
  //       prev.map((d) =>
  //         d.name === option.name
  //           ? {
  //               name: methods.getValues()['name'],
  //               enabled: methods.getValues()['enabled'],
  //               id: d.id,
  //             }
  //           : d
  //       )
  //     );
  //   });

  //   return () => subscription.unsubscribe();
  // }, [watch]);

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" gap="s8" w="100%">
      <FormProvider {...methods}>
        <Box
          as="form"
          width="100%"
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          gap="s20"
          // onSubmit={(e) => {
          //   setIsEditable(false);
          //   setList((prev) =>
          //     prev.map((d) =>
          //       d.name === option.name
          //         ? {
          //             name: methods.getValues()['name'],
          //             enabled: methods.getValues()['enabled'],
          //             id: d.id,
          //           }
          //         : d
          //     )
          //   );

          //   e.preventDefault();
          // }}
        >
          <Box {...dragHandleProps}>
            <Icon size="md" as={GRID2X3} />
          </Box>
          <FormSwitch name="enabled" size="md" />
          <Box
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap="s8"
          >
            {/* {isEditable ? (
              <FormInput type="text" name="name" />
            ) : ( */}
            <Text
              // onClick={() => setIsEditable(true)}
              fontSize="r1"
              fontWeight="400"
              color="gray.800"
              my="7.5px"
            >
              {methods.getValues().name}
            </Text>
            {/* )} */}
          </Box>
        </Box>
      </FormProvider>

      {/* <Button variant="ghost">
        <Icon
          onClick={() => {
            setList((prev) => prev.filter((d) => d.id !== option.id));
          }}
          as={IoClose}
          size="md"
          color="gray.500"
          cursor="pointer"
          _hover={{ color: 'gray.800' }}
        />
      </Button> */}
    </Box>
  );
};
