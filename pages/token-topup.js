
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../components/AppLayout";
import { getAppProps } from "../utils/getAppProps";

export default function TokenTopup() {
  
  const handleClick = async () =>{

    const result = await fetch(`/api/addTokens`,{
      method:'POST',
    });
     
    const json = await result.json();
    console.log('RESULT: ', json);
    window.location.href = json.sessions.url;

  };
  
  return (
    <div className="bg-gray-400 h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold text-gray-800 mx-auto mb-4">
        Pls topup your token
      </h1>
      <button className="btn" onClick={handleClick}>
        Add Tokens
      </button>
    </div>
  );


  }
TokenTopup.getLayout = function getLayout(page, pageProps){
    return<AppLayout{...pageProps}>{page}</AppLayout>;
}; 

 
  
  export const getServerSideProps = withPageAuthRequired ({
      async getServerSideProps(ctx){
        const props = await getAppProps(ctx);
        return{
          props,
        };
      },
  });  