import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";
import clientPromise from "../../lib/mongodb.js";
import { ObjectId } from "mongodb";

export default function Post(props) {
    console.log('PROPS: ',props)

    return <div>
      <h1>
       this is post  
      </h1>
    </div>
  }
  

  Post.getLayout = function getLayout(page, pageProps) {
    return <AppLayout {...pageProps}>{page}</AppLayout>;
  };
  

  export const getServerSideProps = withPageAuthRequired ({
    async getServerSideProps(ctx){
      const userSession = await getSession(ctx.req, ctx.res);
      const client = await clientPromise;
      const db = client.db("BlogBraniac");
      const user = await db.collection("users").findOne({
        auth0Id : userSession.user.sub,
      });
      const post = await db.collection("posts").findOne({
        _id: new ObjectId(ctx.params.postId),
        userId: user._id,
      });


      if (!post) {
        return {
          notFound: true,
        };
      }

    

      return{
        props:{
          postContent: post.postContent,
          title: post.title,
          metaDescription: post.metaDescription,
          keywords: post.keywords
        },
      };

    },
  });

