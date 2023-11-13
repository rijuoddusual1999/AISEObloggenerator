import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";
import { useState } from "react";

export default function NewPost(props) {
  console.log('NEW POST PROPS: ', props);
  const [postContent,setPostContent] = useState("");

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
    console.log('RESULT: ', json.post.postContent);
    setPostContent(json.post.postContent);
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
      <div className="max-w-screen-sm p-10" dangerouslySetInnerHTML={{__html: postContent}}/>
      
    </div>
  );
};

NewPost.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {}
  };
});


