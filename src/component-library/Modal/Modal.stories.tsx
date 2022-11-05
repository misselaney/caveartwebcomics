import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Modal from './Modal'

export default {
  title: 'Components/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />

export const Default = Template.bind({})
Default.args = {
  id: 'example',
  children: <div>Modal Content!</div>,
  isOpen: true,
  heading: 'Modal Example',
  actionButtonLabel: 'hi',
  onClose: () => { console.log('close')}
}