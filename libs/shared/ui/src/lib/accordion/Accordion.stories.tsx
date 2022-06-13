import { Meta, Story } from '@storybook/react';

import { Accordion, AccordionProps } from './Accordion';

export default {
  component: Accordion,
  title: 'Accordion',
} as Meta;

const Template: Story<AccordionProps> = (args) => <Accordion {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  id: 'test1',
  title: 'test',
  allowToggle: true,
  allowMultiple: true,
  children: (
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
  ),
};
