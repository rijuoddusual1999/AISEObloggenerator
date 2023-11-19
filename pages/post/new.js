import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";
import { useState } from "react";
import { useRouter } from "next/router";
import { getAppProps } from "../../utils/getAppProps";


export default function NewPost(props) {
  const router = useRouter();
  const[keywords,setKeywords] = useState("");
  const[topic,setTopic] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
  
    const response = await fetch(`/api/generatePost`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({topic, keywords}),
    });
  
    const json = await response.json();
    console.log('RESULT: ', json);

    if(json?.postId){
       router.push(`/post/${json.postId}`);
    }

  };
  

  return (
    <div>
      <form onSubmit={handleClick}>
      <button type = "submit" className="btn">
        Generate
      </button>

       <div>
        <label>
          <strong>
            Generate a blog post:
          </strong>
        </label>
        <textarea className="resize-none border border-slate-700 w-full block my-2 px-4 py-2 rounded-sm" value={topic} onChange={(e) => setTopic(e.target.value)}/>
       </div>
       

       <div>
       <label>
          <strong>
            Targeting the following keywords:
          </strong>
        </label>
        <textarea className="resize-none border border-slate-700 w-full block my-2 px-4 py-2 rounded-sm" value={keywords} onChange={(e) => setKeywords(e.target.value)}/>

       </div>
       </form>      
    </div>
  );
};

NewPost.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};



export const getServerSideProps = withPageAuthRequired ({
  async getServerSideProps(ctx){
    const props = await getAppProps(ctx);
    return{
      props,
    };
  },
});  