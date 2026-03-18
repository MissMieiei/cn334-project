export type OrderStatus = "waiting" | "cooking" | "ready"

export interface Restaurant {
  id: string
  name: string
  menuName: string
}

export interface QueueOrder {
  queueNumber: number
  restaurantId: string
  restaurantName: string
  menuName: string
  status: OrderStatus
  createdAt: string
}

export interface QueueSubmitPayload {
  restaurantId: string
  restaurantName: string
  menuName: string
  queueNumber: number
  status: OrderStatus
  timestamp: string
}

export interface HttpBinResponse {
  json?: {
    status: OrderStatus
    queueNumber: number
  }
  url: string
}
