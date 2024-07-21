import Background from "@/assets/login2.png";
import Victory from "@/assets/victory.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store";
import { LOGIN_ROUTES, SIGNUP_ROUTES } from "@/utils/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const Auth = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateSignup = () => {
    if(!email){
      toast.error("Email is required" );
      return false;
    }
    if(!password || password.length < 6){
      toast.error("Password must be at least 6 characters long" );
      return false;
    }
    if(password!== confirmPassword){
      toast.error("Passwords do not match" );
      return false;
    }
    return true;
  }

  const validateLogin = async ()=>{
    if(!email){
      toast.error("Email is required" );
      return false;
    }
    if(!password || password.length < 6){
      toast.error("Password must be at least 6 characters long" );
      return false;
    }
    
    return true;
  }

  const handelSignup = async () => {
    if(!validateSignup()){
      return;
    }
     await apiClient.post(SIGNUP_ROUTES , {email , password} , {withCredentials:true}).then((res)=>{
      toast.success("Signup successful" , {id:"signup"});
      setUserInfo(res.data.user);
      navigate('/profile');
    }).catch((err) => {
      toast.error(err.response.data.msg , {id: "signup"});
    })
  };

  const handelLogin = async () => {
    if(!validateLogin()){
      return;
    }
    await apiClient.post(LOGIN_ROUTES , {email, password}, {withCredentials:true}).then((res)=>{
      console.log(res);
      toast.success("Login successful" , {id:"login"});
      if(res.data.user.id){
        setUserInfo(res.data.user)
        if(res.data.user.profileSetup){
          navigate('/chat');
        }else{
          navigate('/profile');
        }
      }
    }).catch((err) => {
      toast.error(err.response.data.msg , {id: "login"});
    })
  };

  
  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vwP] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2  ">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center ">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={Victory} alt="Victory Emoji" className="h-[100px]" />
            </div>
            <p className="font-medium text-center">
              Fill in the detaails to get started with the best chat app!
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4" defaultValue="login">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black  data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                  value="login"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black  data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                  value="signup"
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button className='rounded-full ' onClick={handelLogin}>Login</Button>
              </TabsContent>
              <TabsContent className="flex flex-col gap-2 " value="signup">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  className="rounded-full p-4"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button className='rounded-full mt-3' onClick={handelSignup}>Signup</Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center">
            <img src={Background} alt="background login" className="h-[400px]" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
