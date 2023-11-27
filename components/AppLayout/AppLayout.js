import Image from "next/image";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { Logo } from "../Logo";
import { faPenFancy } from "@fortawesome/free-solid-svg-icons";

export const AppLayout = ({children, availableTokens, posts, postId}) =>{
    const {user} = useUser();


    return(
        <div className='grid grid-cols-[300px_1fr] h-screen max-h-screen'>
            <div className="flex flex-col text-white overflow-hidden">
            <div className="bg-gray-800 px-2">
            <div className="text-3xl text-center py-4">
            <div className="text-3xl text-center py-4">
            <a href="https://blogbraniac.netlify.app/post/new" rel="noopener noreferrer">
                BlogBrainiac<FontAwesomeIcon icon={faPenFancy} className="text-2xl text-lime-400 pl-2"/>
            </a>
            </div>

            </div>
            <Link href="/post/new" className="bg-indigo-600 hover:no-underline tracking-wider text-center text-white font-bold cursor-pointer uppercase px-4 py-2 rounded-md hover:bg-indigo-800 transition-colors block">cta button</Link>
            <Link href="/token-topup" className="block mt-2 text-center">
            <FontAwesomeIcon icon={faWallet} className="text-yellow-500" />
            <span className="pl-1"> {availableTokens} tokens available</span>
            </Link>
            </div>
            <div className="px-4 flex-1 overflow-auto bg-gradient-to-b from-gray-800 to-gray-600">{posts.map(post => (<Link key = {post._id} href={`/post/${post._id}`} className={`py-1 border border-white/0 block text-ellipsis overflow-hidden whitespace-nowrap my-1 px-2 bg-indigo-300/10 cursor-pointer rounded-sm ${postId === post._id? "bg-indigo-300/20 border-white": ""}`}>{post.topic}</Link>))}</div>
            <div className="bg-gray-600 flex items-center p-4">
                <div className="flex items-center border-t border-black/50 h-20 px-2">
                    {!!user ? (
                    <>
                        <div className="mr-3">
                        <Image src={user.picture} alt={user.name} height={50} width={50} className="rounded-full" />
                        </div>
                        <div className="flex-1">
                        <div className="font-bold">{user.email}</div>
                        <Link href="/api/auth/logout" className="text-sm">
                            Logout
                        </Link>
                        </div>
                    </>
                    ) : (
                    <Link href="/api/auth/login">Login</Link>
                    )}
                </div>
                </div>      
            </div>
            {children}
        </div>
    )
}


/* fixed home url */

