import axios from "axios";
import Image from "next/image";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Project from "../components/projects/Project";
import { pageAnimationVariants } from "../services/animations/common";
import projectStyles from "../styles/pages/Projects.module.css";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { useStateValue } from "../context/StateProvider";

interface ProjectsInterface {
  projects: Array<{
    id: string;
    imageURL: string;
    title: string;
    description: string;
    link: string;
  }>;
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const projects = (
    await axios.get("https://www.omlondhe.codes/api/projects")
  ).data;
  return {
    props: {
      projects,
      revalidate: true,
    },
  };
};

const Projects = ({ projects }: ProjectsInterface) => {
  const [{ mode }] = useStateValue();

  return (
    <motion.div
      className={projectStyles.projects}
      variants={pageAnimationVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        background: mode === "dark" ? "#111" : "white",
      }}
    >
      {projects.map((project, index) => (
        <Project
          key={project?.id}
          link={project?.link}
          imageURL={project?.imageURL}
          title={project?.title}
          description={project?.description}
          index={index}
        />
      ))}
    </motion.div>
  );
};

export default Projects;
