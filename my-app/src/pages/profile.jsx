import PageShell from "../components/PageShell";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Education from "../components/Education";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { profile } from "../data/profile";

function Profile() {
  return (
    <PageShell>
      <title>{`${profile.name} — ${profile.title}`}</title>
      <meta name="description" content={profile.pitch} />

      <Navbar />
      <main className="pb-24">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />
    </PageShell>
  );
}

export default Profile;
