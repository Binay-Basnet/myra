import { Meta, Story } from '@storybook/react';

import { Accordion, ChakraAccordion, ChakraAccordionProps } from './Accordion';

export default {
  component: Accordion,
  title: 'Myra Design System / Components / Data Display / Accordion',
} as Meta;

const Template: Story<ChakraAccordionProps> = (args) => <ChakraAccordion {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  id: 'test1',
  title: 'Accordion',
  allowToggle: true,
  allowMultiple: true,
  children: (
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat.
    </p>
  ),
};
