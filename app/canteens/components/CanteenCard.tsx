"use client"

interface Props {
  name: string
  onClick: () => void
}

export default function CanteenCard({ name, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="bg-gray-100 rounded-full px-8 py-5 flex justify-between items-center cursor-pointer shadow hover:bg-gray-200 transition"
    >
      <span className="text-sm text-black">{name}</span>
      <span className="text-xs text-gray-400">PHOTO</span>
    </div>
  )
}