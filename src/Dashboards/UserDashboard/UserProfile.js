import Profile from "./../../Profilepage/Profile"
import NavBar from '../../NavBar'
import ChangePassword from "./../../Profilepage/ChangePassword"


function UserProfile(props) {
  const links = [
    false,
    { name: "Calendar", url: "/customer/calendar" },
    { name: "Profile", url: "/customer/profile" },
    { name: "Log Out", url: "/home" },
  ]

  return (
    <div>
      <div className="navOffset">
        <NavBar links={links} />
      </div>
      <div><Profile client={props.client} /></div>
      <div><ChangePassword client={props.client} /></div>
    </div>
  )
}

export default UserProfile