import myIcon from "@/assets/my_icon.svg";
import "./Home.css";
import Profile from "@/components/Profile/Profile";
import Topics from "@/components/Topics/Topics";
import RelatedLinks from "@/components/RelatedLinks/RelatedLinks";

export default function Home() {
  return (
    <div id="home_page">
      <Profile iconImage={myIcon}/>
      <Topics />
      <RelatedLinks />
    </div>
  )
}
