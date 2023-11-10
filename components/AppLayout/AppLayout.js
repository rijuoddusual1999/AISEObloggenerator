import Image from "next/image";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";


export const AppLayout = ({children}) =>{
    const {user} = useUser();
    return(
        <div className='grid grid-cols-[300px_1fr] h-screen max-h-screen'>
            <div className="flex flex-col text-white overflow-hidden">
            <div className="bg-gray-800">
            <div>logo</div>
            <div>cta button</div>
            <div>tokens</div>
            </div>
            <div className="flex-1 overflow-auto bg-gradient-to-b from-gray-800 to-gray-600">list of post</div>
            <div className="bg-gray-600"><div>
                {!!user ? (<>
                    <div><Image src={user.picture} alt={user.name} height={50} width={50}/><div>{user.email}</div></div>
                    <Link href="/api/auth/logout">Logout</Link> 
                </>):<Link href="/api/auth/login">Login</Link>}
                </div></div>
            <div>{children}</div>
            </div>
        </div>
    )
}