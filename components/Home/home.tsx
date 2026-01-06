import Layout from "../layout/layout";
import HomeAbout from "./about";
import HomeCta from "./cta";
import HomeHero from "./hero";

export default function HomePage() {
  return (
    <Layout>
      <HomeHero />
      <HomeAbout />
      <HomeCta />
    </Layout>
  );
}
