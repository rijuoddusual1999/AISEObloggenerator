import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";
import { useState } from "react";
import { useRouter } from "next/router";
import { getAppProps } from "../../utils/getAppProps";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenFancy } from "@fortawesome/free-solid-svg-icons";


export default function NewPost(props) {
  const router = useRouter();
  const[keywords,setKeywords] = useState("");
  const[topic,setTopic] = useState("");
  const[generate, setGenerate] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setGenerate(true);
    try{
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
  } catch(e){
    setGenerate(false);
  }

  };
  

  return (
    <div className="h-full overflow-hidden bg-slate-400">
      {!!generate &&(
      <div className="text-blue-900 flex h-full animate-pulse w-full flex-col justify-center items-center">
        <FontAwesomeIcon icon={faPenFancy} className="text-8xl"/>
        <h6>Generating.....</h6>
      </div>
      )}

      {!generate && (
      <div className="w-full h-full flex flex-col overflow-auto">
      <form onSubmit={handleClick} className="m-auto w-full max-w-screen-sm bg-slate-100 p-4 rounded-md shadow-xl border border-slate-200">
      <button type = "submit" className="btn" disabled={!topic.trim() || !keywords.trim()}>
        Generate
      </button>

       <div>
        <label>
          <strong>
            Generate a blog post:
          </strong>
        </label>
        <textarea className="resize-none border border-slate-700 w-full block my-2 px-4 py-2 rounded-sm" value={topic} maxLength={100} onChange={(e) => setTopic(e.target.value)}/>
       </div>
       

       <div>
       <label>
          <strong>
            Targeting the following keywords:
          </strong>
        </label>
        <textarea className="resize-none border border-slate-700 w-full block my-2 px-4 py-2 rounded-sm" value={keywords} maxLength={100} onChange={(e) => setKeywords(e.target.value)}/>

       </div>
       </form>
       </div> 
       )}     
    </div>
  );
};

NewPost.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};



export const getServerSideProps = withPageAuthRequired ({
  async getServerSideProps(ctx){
    const props = await getAppProps(ctx);

    if(!props.availableTokens){
      return{
        redirect:{
          destination: "/token-topup",
          permanent: false,

        }
      }
    }

    return{
      props,
    };
  },
});  