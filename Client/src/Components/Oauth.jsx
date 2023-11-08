import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {app} from '../firebase'
import {signSuccess} from '../redux/userSlice'
import {useDispatch} from 'react-redux'
export default function Oauth() {
const dispatch =  useDispatch()
   const  handleOnClick = async()=>{
    try{
        const provider  = new GoogleAuthProvider()
        const auth = getAuth(app)
        const result  = await signInWithPopup(auth,provider)
        console.log("reuslt,",result)
        // send the data 

        const res  = await fetch('/api/auth/google',{
          method:'POST',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
              userName:result.user.displayName,
            email:result.user.email,
          photo:result.user.photoURL})
        })
        const data  = await  res.json()
        console.log("data..",data)
        dispatch(signSuccess(data))

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
