
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../Components/AppLayout";


export default function NewPost() {
    return <div>
      <h1>
       hello world , this is riju 
      </h1>
    </div>
  }
  

NewPost.getLayout = function getLayout(page, pageProps){
    return<AppLayout{...pageProps}>{page}</AppLayout>;
}; 

  export const getServerSideProps = withPageAuthRequired (() =>{
    return{
        props:{

        }
    }
  });