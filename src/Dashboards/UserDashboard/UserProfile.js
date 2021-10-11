import Profile from "./../../Profilepage/Profile"
import NavBar from '../../NavBar'


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
        <div><Profile /></div>
    </div>
  )
}

export default UserProfile