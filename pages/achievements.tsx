import axios from "axios";
import { motion } from "framer-motion";
import { GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";
import AchievementCard from "../components/achievements/AchievementCard";
import { useStateValue } from "../context/StateProvider";
import { pageAnimationVariants } from "../services/animations/common";
import achievementStyles from "../styles/pages/Achievements.module.css";
interface AchievementsInterface {
  achievements: Array<{ id: string; imageURL: string; title: string }>;
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const achievements = (
    await axios.get(`https://www.omlondhe.codes/api/achievements`)
  ).data;

  return {
    props: {
      achievements,
      revalidate: true,
    },
  };
};

const Achievements = ({ achievements }: AchievementsInterface) => {
  const [{ mode }] = useStateValue();

  return (
    <motion.div
      variants={pageAnimationVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={achievementStyles.achievements}
      style={{
        background: mode === "dark" ? "#111" : "#fff",
      }}
    >
      {achievements.map((achievement, index) => (
        <AchievementCard
          key={achievement.id}
          id={achievement.id}
          imageURL={achievement.imageURL}
          text={achievement.title}
          index={index}
        />
      ))}
    </motion.div>
  );
};

export default Achievements;
