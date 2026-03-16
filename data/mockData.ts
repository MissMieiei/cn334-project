export interface Canteen {
  id: string
  name: string
}

export interface Restaurant {
  id: string
  name: string
  description: string
  queue: number
  canteenId: string
}

export const canteens: Canteen[] = [
  { id: "c1", name: "โรงวิศวะ" },
  { id: "c2", name: "โรง SC" },
  { id: "c3", name: "โรงกรีน" }
]

export const restaurants: Restaurant[] = [
  {
    id: "r1",
    name: "ร้านหิวสหาย",
    description: "ร้านตามสั่ง สั่งได้ทุกอย่าง",
    queue: 5,
    canteenId: "c1"
  },
  {
    id: "r2",
    name: "ร้านข้าวขาหมู",
    description: "ร้านให้ข้าวเยอะ",
    queue: 2,
    canteenId: "c1"
  },
  {
    id: "r3",
    name: "ร้านอะไรอีกเน้อ",
    description: "บลาๆ เทส",
    queue: 10,
    canteenId: "c1"
  }
]