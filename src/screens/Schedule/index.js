// WeeklyScheduleScreen.js
import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native'
import axios from 'axios'

const ScheduleScreen = () => {
  const [schedule, setSchedule] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch schedule data from API
    const fetchSchedule = async () => {
      try {
        const response = await axios.get('https://api.example.com/schedule')
        const rawData = response.data

        // Transform raw data to a weekly table-like structure
        const transformedData = Array.from({ length: 7 }, (_, index) => ({
          day: `Thứ ${index + 2}`,
          periods: Array.from({ length: 15 }, (_, periodIndex) => {
            const matchedPeriod = rawData.ds_thoi_khoa_bieu.find(
              (item) =>
                new Date(item.ngay_hoc).getDay() === index + 1 &&
                item.tiet_bat_dau <= periodIndex + 1 &&
                item.tiet_bat_dau + item.so_tiet - 1 >= periodIndex + 1
            )

            return matchedPeriod
              ? `${matchedPeriod.ten_mon}\nNhóm: ${matchedPeriod.ma_nhom}\nPhòng: ${matchedPeriod.ma_phong}\nGV: ${matchedPeriod.ten_giang_vien}`
              : ''
          })
        }))

        setSchedule(transformedData)
      } catch (error) {
        console.error('Error fetching schedule:', error)
      } finally {
        setLoading(false)
      }
    }

    // fetchSchedule()
  }, [])

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#007bff" />
//         <Text style={styles.loadingText}>Loading schedule...</Text>
//       </View>
//     )
//   }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Thời khóa biểu tuần</Text>
      </View>

      <ScrollView horizontal style={styles.scheduleTable}>
        {/* Render Table Header */}
        <View style={styles.row}>
          <View style={styles.cellHeader}>
            <Text style={styles.headerText}>Tiết</Text>
          </View>
          {schedule.map((day, index) => (
            <View key={index} style={styles.cellHeader}>
              <Text style={styles.headerText}>{day.day}</Text>
            </View>
          ))}
        </View>

        {/* Render Table Rows */}
        {Array.from({ length: 15 }).map((_, periodIndex) => (
          <View key={periodIndex} style={styles.row}>
            <View style={styles.cellPeriodHeader}>
              <Text style={styles.periodText}>Tiết {periodIndex + 1}</Text>
            </View>
            {schedule.map((day, dayIndex) => (
              <View key={dayIndex} style={styles.cell}>
                <Text style={styles.cellText}>{day.periods[periodIndex]}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  headerContainer: {
    padding: 10,
    backgroundColor: '#007bff'
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center'
  },
  scheduleTable: {
    flex: 1
  },
  row: {
    flexDirection: 'row'
  },
  cellHeader: {
    flex: 1,
    padding: 10,
    backgroundColor: '#007bff',
    borderWidth: 1,
    borderColor: '#ffffff'
  },
  cellPeriodHeader: {
    width: 60,
    padding: 10,
    backgroundColor: '#6c757d',
    borderWidth: 1,
    borderColor: '#ffffff'
  },
  cell: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#dee2e6',
    backgroundColor: '#e9ecef'
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center'
  },
  periodText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center'
  },
  cellText: {
    fontSize: 12,
    color: '#495057',
    textAlign: 'center'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#495057'
  }
})

export default ScheduleScreen
