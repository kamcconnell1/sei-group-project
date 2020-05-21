import { notify } from 'react-notify-toast'

const styles = {
  background: '#000', text: '#fff'
}

export const toast = (message) => {
  notify.show(message, 'custom', 2000, styles)
}