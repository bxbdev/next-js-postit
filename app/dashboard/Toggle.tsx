'use client'

type ToggleProps = {
    deletePost: () => void
    setToggle: (toogle: boolean) => void
}

export default function Toggle({deletePost, setToggle}: ToggleProps) {
    return (
        <div 
            className="fixed top-0 left-0 z-20 w-full h-full bg-black/50"
            onClick={(e) => setToggle(false)}
        >
            <div className="absolute flex flex-col gap-6 p-12 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg top-1/2 left-1/2">
                <h2 className="text-xl">Are you sure you want to delete this post? 🥲</h2>
                <h3 className="text-sm text-red-600">
                    Pressing the delete button will permanently delete your post
                </h3>
                <button 
                    className="px-4 py-2 text-sm text-white bg-red-600 rounded-md"
                    onClick={(e) => deletePost() }
                >
                    Delete post
                </button>
            </div>
        </div>
    )
}