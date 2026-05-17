import { motion } from "framer-motion";
import HeroPhoto from "./HeroPhoto";

export default function HeroSection({ profile }) {
  const { name, mbti, sign, tag, funFact } = profile;
  const [firstName, ...rest] = name.split(" ");
  const lastName = rest.join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="hero"
    >
      <h1 className="hero-name">
        {firstName}
        <br />
        {lastName}
      </h1>

      <p className="hero-sub">
        {mbti.toUpperCase()} <span>|</span> {sign.toUpperCase()} <span>|</span>{" "}
        {tag.toUpperCase()}
      </p>

      <HeroPhoto profile={profile} />

      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="hero-funfact"
      >
        🛠 {funFact}
      </motion.div>
    </motion.div>
  );
}
