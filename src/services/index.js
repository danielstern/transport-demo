import { useState } from "react"
import schedulesSpec from "../spec/schedule.json"
import ordersSpec from "../spec/orders.json"

for (const schedule of schedulesSpec) {
  schedule.usedCapacity = 0
}
for (const orderId in ordersSpec) {
  const order = ordersSpec[orderId]
  const { destination } = order
  console.table(schedulesSpec)
  const flight = schedulesSpec.find(schedule => schedule.arrival_city === destination && schedule.usedCapacity < 20)
  console.info(flight, order)
  if (flight) {
    flight.usedCapacity++
    order.flight_number = flight.flight_number
    order.departure_city = flight.departure_city
    order.day = flight.day
  }
}

export const useSchedules = () => {
  const [schedules, setSchedules] = useState(schedulesSpec)
  return schedules
}

export const useOrders = () => {
  const [orders, setOrders] = useState(ordersSpec)
  return orders
}