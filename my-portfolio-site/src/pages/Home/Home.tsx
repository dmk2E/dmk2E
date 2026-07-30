import myIcon from "@/assets/my_icon.svg";
import "./Home.css";
import { Helmet } from "react-helmet-async";
// 自作コンポーネント系
import Profile from "@/components/Profile/Profile";
import Topics from "@/components/Topics/Topics";
import RelatedLinks from "@/components/RelatedLinks/RelatedLinks";

export default function Home() {
  const BASE_URL = window.location.origin;

  return (
    <div id="home_page">
      <Helmet>
        <title>HOME | dmk2E - My Portfolio</title>

        <link rel="canonical" href={`${BASE_URL}/`} />

        <meta name="description" content="自己紹介やTopics欄・関連リンク" />
      </Helmet>

      <Profile iconImage={myIcon}/>
      <Topics />
      <RelatedLinks />
    </div>
  )
}
