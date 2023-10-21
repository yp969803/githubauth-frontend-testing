import logo from './logo.svg';

import {useEffect,useState} from 'react';
// http://localhost:3000/login?code=e3e99c2f8d2680d1c19a
function App() {
  const CLIENT_ID="149d2857118e05e729a8"
  
  const [rerender,setRerender]=useState(false);

  useEffect(()=>{
    const queryString=window.location.search;
    const urlParams= new URLSearchParams(queryString);
    const codeParam= urlParams.get("code")

    console.log(codeParam)
    if(codeParam && (localStorage.getItem("accessToken")===null)){
      async function getAcessToken(){
        await fetch("http://localhost:4000/getAccessToken?code="+codeParam,{
          method: "GET",

        }).then((response)=>{
          return response.json()
        }).then((data)=>{
          console.log(data)
          if(data.access_token){
            localStorage.setItem("acessToken",data.access_token)
            setRerender(!rerender);
          }
        })
        
      }
     getAccessToken()
    }

  },[])

  function loginWithGithub(){
    window.location.assign("https://github.com/login/oauth/authorize?client_id="+CLIENT_ID)

  }
  return (
    <div className="App">
      <header >
        <button onClick={loginWithGithub}>
          LLogin Witth Github
        </button>
      </header>
    </div>
  );
}

export default App;
