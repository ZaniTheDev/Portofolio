import Image from "next/image";
import Hero from "../components/hero";
import Navbar from "../components/navbar";
import Services from "../components/services";
import Industries from "../components/industries";
import Work from "../components/work";
import HowIWork from "../components/how-i-work";
import Quote from "../components/quote";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Industries />
      <Work />
      <HowIWork />
      <Quote />
    </main>
  );
}
