import { Meta, Story } from '@storybook/react';

import { PDFViewer, PDFViewerProps } from './PDFViewer';

export default {
  component: PDFViewer,
  title: 'PDFViewer',
} as Meta;

const Template: Story<PDFViewerProps> = (args) => <PDFViewer {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
