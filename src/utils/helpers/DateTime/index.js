const dayOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']
const timeCounter = {
  SECOND: 1000,
  MINUTE: 1000 * 60,
  HOUR: 1000 * 60 * 60,
  DAY: 1000 * 60 * 60 * 24,
  WEEK: 1000 * 60 * 60 * 24 * 7,
  YEAR: 1000 * 60 * 60 * 24 * 365
}
const getTimeStamp = (date) => Date.parse(date)

const parseTimestampToMinutes = timestamp => (timestamp / timeCounter.MINUTE)
const parseTimestampToHours = timestamp => (timestamp / timeCounter.HOUR)
const parseTimestampToDays = timestamp => timestamp / timeCounter.DAY

const getDayofWeekFromDate = (date) => {
  const numOfDay = new Date(date).getDay()
  return dayOfWeek[numOfDay]
}
const getDayofWeekFromTimeStamp = (timestamp) => {
  const numOfDay = new Date(timestamp).getDay()
  return dayOfWeek[numOfDay]
}

const getDateFromDate = (date) => new Date(date).getDate()
const getDateFromTimeStamp = (timestamp) => new Date(timestamp).getDate()

const getMonthFromDate = (date) => new Date(date).getMonth() + 1
const getMonthFromTimeStamp = (timestamp) => new Date(timestamp).getMonth() + 1

const getYearFromDate = (date) => new Date(date).getFullYear()
const getYearFromTimeStamp = (timestamp) => new Date(timestamp).getFullYear()

const displayActiveTimeFromDate = (date) => {
  const timestamp = getNowSubDateByDate(date)
  if (timestamp < timeCounter.HOUR) {
    return `Hoạt động ${parseTimeStampToCustomType(timestamp, 'minute').toFixed(0)} phút trước`
  } else if (timestamp < timeCounter.DAY) {
    return `Hoạt động ${parseTimeStampToCustomType(timestamp, 'hour').toFixed(0)} giờ trước`
  } else {
    return 'Hoạt động hơn 1 ngày trước'
  }
}

const displayDayMonthFromDate = (date) =>
  getDateFromDate(date) + ', tháng ' + getMonthFromDate(date)
const displayDayMonthFromTimeStamp = (timestamp) =>
  getDateFromTimeStamp(timestamp) + ', tháng ' + getMonthFromTimeStamp(timestamp)

const displayDayMonthYearFromDate = (date) => {
  return getDateFromDate(date) + ', tháng ' + getMonthFromDate(date) + ', ' + getYearFromDate(date)
}
const displayDayMonthYearFromTimeStamp = (timestamp) => {
  return (
    getDateFromTimeStamp(timestamp) +
    ', tháng ' +
    getMonthFromTimeStamp(timestamp) +
    ', ' +
    getYearFromTimeStamp(timestamp)
  )
}

const displayTimeDescendingFromDate = (date) => {
  const now = Date.now()
  const handleDate = Date.parse(date)
  const nowSubcurrentResult = now - handleDate
  const hour = parseTimestampToHours(nowSubcurrentResult)
  const minute = parseTimestampToMinutes(nowSubcurrentResult)
  if (nowSubcurrentResult < timeCounter.HOUR) {
    return Math.ceil(minute) + ' phút'
  }
  if (nowSubcurrentResult < timeCounter.DAY) {
    return Math.floor(hour) + ' giờ'
  } else if (nowSubcurrentResult < timeCounter.WEEK) {
    return Math.floor(parseTimestampToDays(nowSubcurrentResult)) + ' ngày'
  } else if (nowSubcurrentResult < timeCounter.YEAR) {
    return formatDateWithString(date)
  } else {
    return formatDateWithString(date)
  }
}
const displayTimeDescendingFromTimeStamp = (timestamp) => {
  const nowSubcurrentResult = getNowSubDateByTimeStamp(timestamp)
  if (nowSubcurrentResult < timeCounter.DAY) {
    return getHourFromTimeStamp(timestamp) + ':' + getMinuteFromTimeStamp(timestamp)
  } else if (nowSubcurrentResult < timeCounter.WEEK) {
    return getDayofWeekFromTimeStamp(timestamp)
  } else if (nowSubcurrentResult < timeCounter.YEAR) {
    return displayDayMonthFromTimeStamp(timestamp)
  } else {
    return displayDayMonthYearFromTimeStamp(timestamp)
  }
}


const getDisplayTime = ({ timestamp }) => {
  let date_temp = new Date(timestamp)
  var date_string = ''

  if (Date.now() - timestamp <= 50400000) {
    let numHours = date_temp.getHours()
    let numMinutes = date_temp.getMinutes()

    let hours = numHours < 10 ? '0' + numHours.toString() : numHours.toString()
    let minutes = numMinutes < 10 ? '0' + numMinutes.toString() : numMinutes.toString()
    date_string = hours + ':' + minutes
  } else if (Date.now() - timestamp <= 50400000 * 7) {
    let day = date_temp.getDay() + 1
    date_string = 'Thứ ' + day
  } else if (date_temp.getFullYear() === new Date().getFullYear()) {
    date_string = date_temp.getDate().toString() + '/' + (date_temp.getMonth() + 1).toString()
  } else {
    date_string =
      date_temp.getDate().toString() +
      '/' +
      (date_temp.getMonth() + 1).toString() +
      '/' +
      date_temp.getFullYear().toString()
  }
  return date_string
}

const formatDateWithTimeStamp = (timestamp) => {
  return getDisplayTime({ timestamp: timestamp })
}

const formatDateWithString = (date) => {
  const timestamp = getTimeStamp(date)
  return getDisplayTime({ timestamp: timestamp })
}

// result:timestamp = date - now
const getNowSubDateByDate = (date) => {
  const timestamp = getTimeStamp(date)
  return Date.now() - timestamp
}

// result:timestamp = timestamp - now
const getNowSubDateByTimeStamp = (timestamp) => {
  return Date.now() - timestamp
}

// result:type = timestamp => type, with type = minute || hour || day
const parseTimeStampToCustomType = (timestamp, type) => {
  const customTime = Math.abs(timestamp)
  switch (type) {
    case 'hour':
      return customTime / (60 * 60 * 1000)
    case 'minute':
      return customTime / (60 * 1000)
    case 'day':
      return customTime / (24 * 60 * 60 * 1000)
    case 'week':
      return customTime / (24* 7 * 60*60*1000)
    default:
      return 'error'
  }
}

// result:type = date => type, with type = minute || hour || day
const parseDateToCustomType = (date, type) => {
  const timestamp = getNowSubDateByDate(date)
  parseTimeStampToCustomType(timestamp, type)
}

// result:type = timestamp1 - timestamp2, with type = minute || hour || day
const compareTwoDateByTimeStamp = (timestamp1, timestamp2, type) => {
  return parseTimeStampToCustomType(Math.abs(timestamp1 - timestamp2), type)
}

// result:type = data1 - date2, with type = minute || hour || day
const compareTwoDateByDate = (date1, date2, type) => {
  const timestamp1 = getTimeStamp(date1)
  const timestamp2 = getTimeStamp(date2)
  return parseTimeStampToCustomType(Math.abs(timestamp1 - timestamp2), type)
}
export const DateTimeHelper = {
  formatDateWithString,
  formatDateWithTimeStamp,

  getNowSubDateByDate,
  getNowSubDateByTimeStamp,

  parseDateToCustomType,
  parseTimeStampToCustomType,

  compareTwoDateByDate,
  compareTwoDateByTimeStamp,

  displayDayMonthFromDate,
  displayDayMonthFromTimeStamp,
  displayDayMonthYearFromDate,
  displayDayMonthYearFromTimeStamp,
  displayTimeDescendingFromDate,
  displayTimeDescendingFromTimeStamp,

  displayActiveTimeFromDate,
  timeCounter
}
