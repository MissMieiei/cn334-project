interface Props {
    name: string
    description: string
    queue: number
}

export default function RestaurantCard({
    name,
    description,
    queue
}: Props) {
    const waitTime = queue * 3
    return (
        <div className="bg-white rounded-3xl shadow overflow-hidden">

            {/* รูป */}
            <div className="relative p-2 bg-white">
                <div className="bg-gray-300 h-44 rounded-2xl flex items-center justify-center text-gray-400">
                    RESTAURANT PHOTO
                </div>

                {/* ไอคิว  */}
                <div className="absolute right-4 bottom-0 translate-y-1/2 flex flex-col items-end">
                    <div className="bg-white shadow-md rounded-full px-4 py-2 text-sm">
                        <span className="text-gray-500">คิวก่อนหน้า </span>
                        <span className="font-semibold">{queue}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 mr-2">
                        ประมาณ {waitTime} นาที
                    </p>
                </div>
            </div>

            {/* text */}
            <div className="p-4">
                <h3 className="font-semibold text-gray-700">{name}</h3>
                <p className="text-sm text-gray-400">{description}</p>
            </div>

        </div>
    )
}