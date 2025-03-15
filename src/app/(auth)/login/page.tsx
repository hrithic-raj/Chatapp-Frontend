import GoogleAuthButton from "@/components/googleAuthButton"

const login = ()=>{
    return(
        <div className="flex justify-center items-center h-screen">
            <GoogleAuthButton/>
        </div>
    )
}

export default login;