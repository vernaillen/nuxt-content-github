
import dayjs from 'dayjs'

export const formatDate = (d: string) => {
  const date = dayjs(d)
  return date.format('D MMMM YYYY HH:mm')
}
