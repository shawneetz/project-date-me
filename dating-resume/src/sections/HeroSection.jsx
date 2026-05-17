import { motion } from "framer-motion";
import HeroPhoto from "../components/HeroPhoto";

export default function HeroSection({ profile }) {
  const { heroGreeting, mbti, sign, tag, funFact } = profile;
  const [firstLine, ...rest] = heroGreeting.split(" ");
  const lastLine = rest.join(" ");

  return (
    <motion.section
      id="hero"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="hero"
    >
      <h1 className="hero-name">
        {firstLine}
        <br />
        {lastLine}
      </h1>

      <HeroPhoto profile={profile} />
      <p className="hero-sub">
        {mbti.toUpperCase()} <span>|</span> {sign.toUpperCase()} <span>|</span>{" "}
        {tag.toUpperCase()}
      </p>

      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="hero-funfact"
      >
        Fun Fact: {funFact}
      </motion.div>
    </motion.section>
  );
}
