import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import ComicPageSelect from './Select'

export default {
  title: 'Forms/Select',
  component: ComicPageSelect,
  argTypes: {
    defaultValue: {
      control: { type: 'text' }
    },
    type: { 
      control: { type: 'select' }
    }
  }
} as ComponentMeta<typeof ComicPageSelect>

const Template: ComponentStory<typeof ComicPageSelect> = (args) => <ComicPageSelect {...args} />

export const Default = Template.bind({})
Default.args = {
  id: "example-id",
  helperText: "Optional helper text goes here.",
  defaultValue: "Default Value",
  options: [{value: 1, label: 'One'}, {value: 2, label: 'Two'}, {value: 3, label: 'Three'}],
  onClick: function (value) { alert (`Click on ${value}` )}
}