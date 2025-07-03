import HeroSection from "../components/HeroSection";
import SubSection from "../components/SubSection";
export default function Home() {
  return (
    <div>
      <HeroSection title={"Welcome to HKNUTRA"} />
      <SubSection
        body={"lorem dkjas"}
        images={["logoGreen.png", "logoGreen.png"]}
      />
    </div>
  );
}
