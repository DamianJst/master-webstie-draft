// app/routes/projects.tsx
import { Link } from "react-router";
// import type { Route } from "./+types/projects";
import { motion } from "framer-motion";
import styles from "../styles/project.module.scss";

// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: "Projects - Front-End Developer" },
//     { 
//       name: "description", 
//       content: "Explore my projects through live demos, case studies, and source code." 
//     },
//   ];
// }

export default function Projects() {
  return (
    <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            transition={{ duration: 0.5 }}
        >
    <section className={styles.project}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Projects</h1>
        
        <p className={styles.description}>
          Explore the demo, gain insight into my journey, from concept to execution, 
          through the case study, or check out the project&apos;s source code.
        </p>

        <div className={styles.buttons}>
          <button className={styles.button}>
            <span>Live Demo</span>
            <svg viewBox="0 0 8 8" fill="currentColor">
              <path d="M4,0C1.79,0 0,1.79 0,4C0,6.21 1.79,8 4,8C6.21,8 8,6.21 8,4C8,1.79 6.21,0 4,0ZM3,2L6,4L3,6L3,2Z" />
            </svg>
          </button>

          <Link to="/projects/case-study" className={styles.button}>
            <span>Case Study</span>
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M70.263,25.738L70.263,13L9.263,13L9.263,87L70.263,87L70.263,73.261C67.396,74.379 64.283,75 61.025,75C49.758,75 40.182,67.652 36.818,57.5L23.263,57.5L23.263,52.5L35.708,52.5C35.592,51.515 35.525,50.515 35.525,49.499C35.525,48.139 35.635,46.804 35.841,45.5L23.263,45.5L23.263,40.5L37.17,40.5C38.137,37.946 39.502,35.588 41.19,33.5L23.263,33.5L23.263,28.5L46.582,28.5C50.691,25.665 55.667,24 61.025,24C64.283,24 67.396,24.621 70.263,25.738Z" />
              <path d="M90.737,73.525L78.081,60.869C80.254,57.614 81.525,53.706 81.525,49.499C81.525,38.178 72.347,29 61.025,29C49.7,29 40.525,38.178 40.525,49.499C40.525,60.821 49.7,70 61.025,70C65.611,70 69.831,68.476 73.245,65.932L85.788,78.475L90.737,73.525ZM45.525,49.499C45.525,40.953 52.478,34 61.025,34C69.572,34 76.525,40.953 76.525,49.499C76.525,58.046 69.572,65 61.025,65C52.478,65 45.525,58.046 45.525,49.499Z" />
            </svg>
          </Link>

          <button className={styles.button}>
            <span>Source Code</span>
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M97.4,10.1L2.5,10.1L2.5,89.9L97.4,89.9L97.4,10.1ZM91,83.4L9,83.4L9,30.6L91,30.6L91,83.4Z" />
              <path d="M38.3,74.1C38.7,74.5 39.4,74.5 39.8,74.1L44.5,69.4C44.9,69 44.9,68.3 44.5,67.9L33.7,57L44.5,46.2C44.9,45.8 44.9,45.1 44.5,44.7L39.8,40C39.4,39.6 38.7,39.6 38.3,40L22.1,56.3C21.7,56.7 21.7,57.4 22.1,57.8L38.3,74.1Z" />
              <path d="M55.5,69.4L60.2,74.1C60.6,74.5 61.3,74.5 61.7,74.1L78,57.8C78.4,57.4 78.4,56.7 78,56.3L61.7,40C61.3,39.6 60.6,39.6 60.2,40L55.5,44.7C55.1,45.1 55.1,45.8 55.5,46.2L66.3,57L55.5,67.9C55.1,68.3 55.1,69 55.5,69.4Z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
    </motion.div>
  );
}