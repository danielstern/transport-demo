import { useState } from 'react'
import './App.css'
import { Box, Button, Typography } from "@mui/material"
import { useSchedules, useOrders } from './services'
import { Routes, Route, BrowserRouter, Link } from "react-router-dom"
import { groupBy } from 'lodash'

const OrderList = () => {

  const orders = useOrders()
  let  orderArray = Object.entries(orders)
    .map(([order_id, order]) => ({ order_id, ...order }))

  console.info(orderArray)
  const params = new URLSearchParams(window.location.search)
  const flight_number = params.get('flight_number')
  if (flight_number) {
    orderArray = orderArray.filter(order => order.flight_number == flight_number)
  }
  return (
    <Box>
      <Box>
        <Typography variant="h5" style={{
          textAlign : "left"
        }}>
          {/* Orders */}
          { flight_number ? `Orders for Flight ${flight_number}` : 'Orders'}
        </Typography>
      </Box>
      <Box style={{
        display: 'flex',
        flexDirection: 'row',
        borderBottom: '1px solid lightgray',
        marginBottom: '10px',
      }}>
        <Box width={200} style={{
          textAlign: 'left'
        }}>
          Order ID
        </Box>
        <Box width={100} style={{
          textAlign: 'left'
        }}>
          Departure
        </Box>
        <Box width={100} style={{
          textAlign: 'left'
        }}>
          Arrival
        </Box>
        <Box width={100} style={{
          textAlign: 'left'
        }}>
          Flight #
        </Box>
        <Box width={100} style={{
          textAlign: 'left'
        }}>
          Day
        </Box>
      </Box>
      {orderArray.map((order) => (
        <Box style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: '10px',
          textAlign : "left"
        }}>
          <Box width={200} style={{
            textAlign: 'left'
          }}>
            {order.order_id}
          </Box>
          <Box width={100}>
            {order.departure_city}
          </Box>
          <Box width={100}>
            {order.destination}
          </Box>
          <Box width={100}>
            {order.flight_number}
          </Box>
          <Box width={100}>
            {order.day}
          </Box>
        </Box>
      ))}
    </Box>
  )
}

const ScheduleDisplay = ({ scheduleGroup }) => {
  console.table(scheduleGroup)
  return (
    <Box>
      <Box style={{
        display: 'flex',
        // marginBottom : 10,
        // textAlign : "left"
      }}>
        <Box width={300}>
          Flight Number
        </Box>
        <Box width={100}>
          Departure
        </Box>
        <Box width={100}>
          Arrival
        </Box>
        <Box width={100}>
          View Orders
        </Box>
      </Box>
      {/* {schedule.flight_number} */}
      {scheduleGroup.map((schedule) => (
        <Box style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
          <Box width={300}>
            {schedule.flight_number}
          </Box>
          <Box width={100}>
            {schedule.departure_city}
          </Box>
          <Box width={100}>
            {schedule.arrival_city}
          </Box>
          <Box width={100}>
            {/* <Button>View</Button> */}
            {/* <Link to={`/flight/${schedule.flight_number}`} component={Button}> View</Link> */}
            <Link to={`/orders?flight_number=${schedule.flight_number}`} component={Button} variant="outlined">View</Link>
          </Box>
        </Box>


      ))}
      {/* </Box> */}
    </Box>
  )
}

const FlightList = ({ schedules }) => {

  const byDay = groupBy(schedules, 'day')
  console.info(byDay)


  return (
    <>
      {Object.keys(byDay).map((day) => (
        <Box>
          <Box style={{
            borderBottom: '1px solid lightgray',
            marginBottom: '20px',
            // marginTop: '10px',
            textAlign: "left"
          }}>
            Day {day}
          <ScheduleDisplay scheduleGroup={byDay[day]} />
          </Box>
          {/* {byDay[day].map((schedule) => (
          <Box>
            {schedule.flight_number}
          </Box>
        ))} */}
          {/* { byDay[day].map(scheduleGroup => <ScheduleDisplay scheduleGroup={scheduleGroup}/>)} */}
        </Box>
      ))}
    </>
  )
  // return (
  //   <Box>
  //     {schedules.map({

  //     }) => (
  //       <Box>

  //       </Box>
  //     )}
  //   </Box>
  // )
}

function App() {

  const schedules = useSchedules()

  console.info(schedules)

  return (
    <BrowserRouter>
      <Box style={{
        width : 600,
        minHeight : 480
      }}>
        <Box style={{
          display: 'flex',
          width : "100%",
          justifyContent: 'space-between',
        }}>
          <Box>
            <Typography variant="h4">
            Transport.ly
            </Typography>
            <Typography variant="caption">
              A Daniel Stern Tech Demo
            </Typography>
          </Box>
          {/* <Button>Orders</Button> */}
          <Link to="/" component={Button}>All Flights</Link>
          <Link to="/orders" component={Button}>Orders</Link>
        </Box>  
        <Routes>
          <Route path="/" element={<FlightList schedules={schedules} />} />
          <Route path="/orders" element={<OrderList />} />
        </Routes>
      </Box>
    </BrowserRouter>
  )
}

export default App
