"use client"
import { useState } from 'react';
// components
import Navbar from "@/components/Navbar"
import Videos from '@/components/Videos';
import Footer from '@/components/Footer';
import Login from '@/components/Login';
import Register from '@/components/Register';
import UserPage from '@/components/UserPage';
import { animateScroll as scroll } from 'react-scroll'; 
interface UserInfo {
  _id: string;
  username: string;
  likedVideos: object[]; 
}

export default function Home(){
  const [logOrRegister, setLogOrRegister] = useState(true);
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);
const [userInfo, setUserInfo] = useState<UserInfo>({ _id: '', username: '', likedVideos: [] })
  function handleHome() {
    window.location.reload();
  }
  function handleUserData(data:any) {
    setUserInfo(data);
    setAuthenticated((value) => !value);
  }
  function refreshUserData(data:any) {
    setUserInfo(data);
  }

  function handleSignOut() {
    setAuthenticated((value) => !value);
  }

  return (
    <div className="font-allerta">
      {isAuthenticated ? (
        <UserPage
          newUserData={refreshUserData}
          userId={userInfo._id}
          userName={userInfo.username}
          likedVideos={userInfo.likedVideos}
          handleSignOut={handleSignOut}
        />
      ) : (
        <div className="App">
          {showSignInForm &&
            (logOrRegister ? (
              <Login
                onLogin={() => setShowSignInForm(false)}
                userData={handleUserData}
                onGoToRegister={() => setLogOrRegister(false)}
                onCut={() => setShowSignInForm(false)}
              />
            ) : (
              <Register
                onGoToLogin={() => setLogOrRegister(true)}
                onCut={() => setShowSignInForm(false)}
              />
            ))}
          <div className="welcomeDiv bg-[#1c1c24]">
            <Navbar
              Nav1="Feature"
              onNav1={() => {}}
              Nav2="Home"
              onNav2={handleHome}
              Nav3="Login/Register"
              onNav3={() => {
                setShowSignInForm(true);
                scroll.scrollToTop();
              }}
              Nav4="About"
              onNav4={() => {}}
            />
            <div className=" px-6 md:px-12 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <img
                  className={`text-center rounded-3xl  ${
                    !showSignInForm ? 'animate-slow-bounce' : ''
                  } transition-transform`}
                  src="/vid.webp"
                  alt=""
                />
                <p className="text-white text-[1.5rem] md:text-[2rem] font-fredoka p-10 md:p-20 ">
                  Upload, Watch and Like entaertaining videos !
                </p>
              </div>
            </div>
          </div>
          <Videos
            onLike={() => {
              setShowSignInForm(true);
              scroll.scrollToTop();
            }}
            onView={() => {
              setShowSignInForm(true);
              scroll.scrollToTop();
              
            }}
            sendVideos={()=>""}
            seed={""}
          />
          <Footer />
        </div>
      )}
    </div>  

  );
}