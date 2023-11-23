
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../components/AppLayout";
import { getAppProps } from "../utils/getAppProps";

export default function Success() {

    return <div className="bg-gray-400 h-screen flex items-center justify-center">
      <h1 className="text-2xl font-semibold text-gray-800 mx-auto">
       Thank you for your purchase! 
      </h1>
    </div>
  }
Success.getLayout = function getLayout(page, pageProps){
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