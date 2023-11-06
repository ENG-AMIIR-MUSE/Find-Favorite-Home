import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {app} from '../firebase'
export default function Oauth() {

   const  handleOnClick = async()=>{
    try{
        const provider  = new GoogleAuthProvider()
        const auth = getAuth(app)
        const result  = await signInWithPopup(auth,provider)
        console.log("resutl",result)

    }catch(eror){
        console.log(eror)

    }
   }
  return (
   <>
     <button onClick={handleOnClick} type = "button"className="bg-red-900 text-white p-3 rounded-lg uppercase">
            Continue With Google
     </button>
   </>
  )
}
