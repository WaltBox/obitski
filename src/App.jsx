import { useRoute } from "./router.jsx";
import Home from "./pages/Home.jsx";
import WhoIAm from "./pages/WhoIAm.jsx";
import TellMeAboutYou from "./pages/TellMeAboutYou.jsx";

export default function App() {
  const path = useRoute();

  switch (path) {
    case "/who-i-am":
      return <WhoIAm />;
    case "/tell-me-about-you":
      return <TellMeAboutYou />;
    case "/":
    default:
      return <Home />;
  }
}
