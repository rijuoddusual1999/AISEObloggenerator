
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { applayout } from "../../Components";

export default function NewPost() {
    return <div>
      <h1>
       hello world , this is riju 
      </h1>
    </div>
  }
  

NewPost.getLayout = function getLayout(page, pageProps){
    return<applayout{...pageProps}>{page}</applayout>;
}; 

  export const getServerSideProps = withPageAuthRequired (() =>{
    return{
        props:{

        }
    }
  });