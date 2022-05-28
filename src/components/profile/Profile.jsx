import Avatar from "boring-avatars";
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {

  const userData = useSelector((state) => {
    return state.userInfo.userData
  })

  return (<>
    <Avatar
      size={40}
      name={userData.username}
      variant="beam"
      colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
    />
  </>)

}

export default Profile