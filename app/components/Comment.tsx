import Image from 'next/image'

type Comment = {
    id: string
    comment: string
    time: string
    name: string
    avatar: string
}

export default function Comment({id, comment, name, avatar, time}: Comment) {
    return (
        <div key={id} className="relative p-8 my-6 bg-white rounded-md">
            <div className="flex items-center gap-2">
                <Image
                    className="rounded-full"
                    width={32}
                    height={32}
                    src={avatar}
                    alt={name}
                />
                <h3 className="font-bold">{name}</h3>
            </div>
            <div className="my-4">
                <p className="text-gray-700 ">{comment}</p>
            </div>
            
            <h2 className="text-sm text-gray-400">{time}</h2>

            <div className="absolute flex gap-6 right-5 top-5">
                <button className="text-blue-500">Edit</button>
                <button className="text-red-500">Delete</button>
            </div>
        </div>
    )
}