type FindByEmailDTO = {
  email: string
  sequence: number
  maxSequence: number
  totalRead: number
}

type DayOfWeek =
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'

type WeekDays = {
  [key in DayOfWeek]: boolean
}

export { FindByEmailDTO, WeekDays }
