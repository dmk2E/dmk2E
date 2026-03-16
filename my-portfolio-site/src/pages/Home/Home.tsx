import myIcon from "@/assets/my_icon.svg";
import "./Home.css";
import Profile from "@/components/Profile/Profile";

export default function Home() {
  return (
    <div id="home_page">
      <Profile iconImage={myIcon}/>
    </div>
  )
}
