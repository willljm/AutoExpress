// "use client"    
import Link from "next/link"

function Users({users}) {
  return (

<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2  flex-wrap">
    {users.map((user) => (
        <Link href={` /users/${user.id}`} key={user.id}>
              <li className= "bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
        <h5 className = "text-xl font-bold text-gray-900">{user.id}. {user.first_name} {user.last_name} </h5>
        <p className="text-gray-500">{user.email}</p>
        <img src={user.avatar} className="w-20 h-20 rounded-full mt-4 flex-s"/>
      </li>
      
        </Link>
    
    ))}
  </ul>

  )
}

export default Users;