import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";
import clientPromise from "../../lib/mongodb.js";
import { ObjectId } from "mongodb";
import { redirect } from "next/dist/server/api-utils";
import { getAppProps } from "../../utils/getAppProps";


export default function Post(props) {
    console.log('PROPS: ',props);
    

    return <div className="overflow-auto h-full bg-slate-300">
      <div className="max-w-screen-sm mx-auto">
      <div className="text-5xl font-bold mt-6 p-2 bg-gray-500 rounded-sm">
        Keywords
       </div>
       <div className="flex flex-wrap pt-2 gap-1">
        {props.keywords.split(",").map((keyword, i) => (
          <div key={i} className="p-2 rounded-full bg-slate-800 text-white">
            {keyword}
          </div>
        ))}
      </div>

       <div className="text-5xl font-bold mt-6 p-2 bg-gray-500 rounded-sm">
        Blog
       </div>
       <div dangerouslySetInnerHTML={{__html: props.postContent || ''}}/>
      </div>
    </div>
  }
  

  Post.getLayout = function getLayout(page, pageProps) {
    return <AppLayout {...pageProps}>{page}</AppLayout>;
  };
  

  export const getServerSideProps = withPageAuthRequired ({
    async getServerSideProps(ctx){
      const props = await getAppProps(ctx);
      const userSession = await getSession(ctx.req, ctx.res);
      const client = await clientPromise;
      const db = client.db("BlogBraniac");
      const user = await db.collection("users").findOne({
        auth0Id : userSession.user.sub,
      });
      const post = await db.collection("posts").findOne({
        _id : new ObjectId(ctx.params.postId[0]),
        userId: user._id,
      });


      if(!post){
        return{
        redirect:{
         destination: "/post/new",
         permanent: false
      
      } 
         }
      }
      


          

      return{
        props: {
          postContent: post.postContent,
          title: post.title,
          metaDescription: post.metaDescription,
          keywords: post.keywords,
          ...props,
      },
      };

    },
  });