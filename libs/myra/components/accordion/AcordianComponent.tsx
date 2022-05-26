import {
  Accordion,
  Grid,
  GridItem,
  Switch,
  Text,
  Divider,
  Checkbox,
  Box,
} from '@saccos/myra/ui';
import { CloseIcon, DragHandleIcon, AddIcon } from '@chakra-ui/icons';

type accordionProps = {
  sectionList: string[];
  accordionList: string[];
  list: string[];
};

export const AcordianComponent = ({
  sectionList,
  accordionList,
  list,
}: accordionProps) => {
  return (
    <>
      {sectionList.map((secList) => (
        <Accordion allowToggle={true} title={secList}>
          {accordionList.map((accList) => (
            <Accordion allowToggle={true} title={accList}>
              <Box>
                <Grid rowGap={4} templateColumns="repeat(2, 1fr)" gap={2}>
                  {list.map((item) => {
                    return (
                      <>
                        <GridItem>
                          <Text>
                            <DragHandleIcon w={4} h={4} mr="4" />
                            <Switch mr="4" />
                            {item}
                          </Text>
                        </GridItem>
                        <GridItem>
                          <CloseIcon w={3} h={3} />
                        </GridItem>
                      </>
                    );
                  })}
                </Grid>
              </Box>
              <Divider m="3" />
              <Grid templateColumns="repeat(4, 1fr)">
                <GridItem>
                  <Text color="primary.500">
                    <AddIcon mr="2" w={2} h={2} />
                    Add New Option
                  </Text>
                </GridItem>

                <GridItem justifySelf="flex-end" colStart={4}>
                  <Checkbox>Show "Other" Option</Checkbox>
                </GridItem>
              </Grid>
            </Accordion>
          ))}
        </Accordion>
      ))}
    </>
  );
};
