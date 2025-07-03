// app/routes/about.tsx
import { Link } from "react-router";
// import type { Route } from "./+types/about";
import { motion } from "framer-motion";
import styles from "../styles/about.module.scss";
// import { transition } from "three/examples/jsm/tsl/display/TransitionNode.js";

// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: "About - Front-End Developer" },
//     { 
//       name: "description", 
//       content: "Front-End Web Developer specializing in blending imagination with functionality to craft digital experiences that ignite the senses." 
//     },
//   ];
// }

// Different animation for about page
const aboutVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  in: {
    opacity: 1,
    y: 0,
        transition: {
      duration: 3,
      ease: "easeInOut",
    }
  },
  out: {
    opacity: 0,
    y: -100,
    transition: {
      duration: 3,
      ease: "easeInOut",
    }
  },
};

const aboutTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  duration: 6
};

export default function About() {
  return (
    // <motion.div
        //     initial={{ opacity: 0 }}
        //     animate={{ opacity: 1 }}
        //     exit={{ opacity: 0, transition: { duration: 0.5 } }}
        //     transition={{ duration: 0.5 }}
        // >
    <main className={styles.about}>
      <div className={styles.container}>
        {/* Heading */}
        <h1 className={styles.heading}>About Me</h1>

        {/* Content */}
        <div className={styles.content}>
          <p className={styles.paragraph}>
            As a Front-End Web Developer, I strive to blend imagination with functionality, 
            crafting digital experiences that ignite the senses.
          </p>
          
          <p className={styles.paragraph}>
            My goal is to create experiences where creativity and functionality meet, 
            transforming ideas and designs into elegant, user-centric products. 
            Passionate about learning, having fun, and evolving, I aim to craft 
            experiences that immerse, engage and inspire.
          </p>
        </div>

        {/* Social Links */}
        <div className={styles.socialLinks}>
          <Link
            to="https://twitter.com"
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.socialText}>Twitter</span>
            <svg
              className={styles.socialIcon}
              viewBox="0 0 340 340"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="matrix(0.553203,0,0,0.553203,28.38,28.38)">
                <path
                  d="M459.37,151.716C459.695,156.264 459.695,160.813 459.695,165.361C459.695,304.081 354.112,463.919 161.137,463.919C101.685,463.919 46.457,446.7 0,416.813C8.447,417.787 16.568,418.112 25.34,418.112C74.395,418.112 119.553,401.544 155.614,373.28C109.482,372.305 70.822,342.092 57.502,300.508C64,301.482 70.497,302.132 77.32,302.132C86.741,302.132 96.163,300.832 104.934,298.559C56.853,288.812 20.791,246.579 20.791,195.574L20.791,194.275C34.76,202.072 51.005,206.945 68.222,207.594C39.958,188.751 21.441,156.589 21.441,120.203C21.441,100.711 26.638,82.843 35.735,67.249C87.39,130.924 165.035,172.507 252.1,177.056C250.476,169.259 249.501,161.138 249.501,153.016C249.501,95.188 296.283,48.082 354.435,48.082C384.648,48.082 411.937,60.752 431.105,81.219C454.82,76.671 477.561,67.899 497.704,55.879C489.906,80.245 473.338,100.712 451.572,113.706C472.689,111.433 493.156,105.584 511.998,97.463C497.706,118.254 479.837,136.771 459.37,151.716Z"
                  fillRule="nonzero"
                />
              </g>
            </svg>
          </Link>
          <Link
            to="https://linkedin.com"
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.socialText}>LinkedIn</span>
            <svg
              className={styles.socialIcon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              fill="currentColor"
            >
              <path
                d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"
                fillRule="nonzero"
              />
            </svg>
          </Link>
          <Link
            to="https://github.com"
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.socialText}>Github</span>
            <svg
              className={styles.socialIcon}
              viewBox="0 0 340 340"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="matrix(0.576975,0,0,0.576975,26.9102,22.2944)">
                <path
                  d="M165.9,397.4C165.9,399.4 163.6,401 160.7,401C157.4,401.3 155.1,399.7 155.1,397.4C155.1,395.4 157.4,393.8 160.3,393.8C163.3,393.5 165.9,395.1 165.9,397.4ZM134.8,392.9C134.1,394.9 136.1,397.2 139.1,397.8C141.7,398.8 144.7,397.8 145.3,395.8C145.9,393.8 144,391.5 141,390.6C138.4,389.9 135.5,390.9 134.8,392.9ZM179,391.2C176.1,391.9 174.1,393.8 174.4,396.1C174.7,398.1 177.3,399.4 180.3,398.7C183.2,398 185.2,396.1 184.9,394.1C184.6,392.2 181.9,390.9 179,391.2ZM244.8,8C106.1,8 0,113.3 0,252C0,362.9 69.8,457.8 169.5,491.2C182.3,493.5 186.8,485.6 186.8,479.1C186.8,472.9 186.5,438.7 186.5,417.7C186.5,417.7 116.5,432.7 101.8,387.9C101.8,387.9 90.4,358.8 74,351.3C74,351.3 51.1,335.6 75.6,335.9C75.6,335.9 100.5,337.9 114.2,361.7C136.1,400.3 172.8,389.2 187.1,382.6C189.4,366.6 195.9,355.5 203.1,348.9C147.2,342.7 90.8,334.6 90.8,238.4C90.8,210.9 98.4,197.1 114.4,179.5C111.8,173 103.3,146.2 117,111.6C137.9,105.1 186,138.6 186,138.6C206,133 227.5,130.1 248.8,130.1C270.1,130.1 291.6,133 311.6,138.6C311.6,138.6 359.7,105 380.6,111.6C394.3,146.3 385.8,173 383.2,179.5C399.2,197.2 409,211 409,238.4C409,334.9 350.1,342.6 294.2,348.9C303.4,356.8 311.2,371.8 311.2,395.3C311.2,429 310.9,470.7 310.9,478.9C310.9,485.4 315.5,493.3 328.2,491C428.2,457.8 496,362.9 496,252C496,113.3 383.5,8 244.8,8ZM97.2,352.9C95.9,353.9 96.2,356.2 97.9,358.1C99.5,359.7 101.8,360.4 103.1,359.1C104.4,358.1 104.1,355.8 102.4,353.9C100.8,352.3 98.5,351.6 97.2,352.9ZM86.4,344.8C85.7,346.1 86.7,347.7 88.7,348.7C90.3,349.7 92.3,349.4 93,348C93.7,346.7 92.7,345.1 90.7,344.1C88.7,343.5 87.1,343.8 86.4,344.8ZM118.8,380.4C117.2,381.7 117.8,384.7 120.1,386.6C122.4,388.9 125.3,389.2 126.6,387.6C127.9,386.3 127.3,383.3 125.3,381.4C123.1,379.1 120.1,378.8 118.8,380.4ZM107.4,365.7C105.8,366.7 105.8,369.3 107.4,371.6C109,373.9 111.7,374.9 113,373.9C114.6,372.6 114.6,370 113,367.7C111.6,365.4 109,364.4 107.4,365.7Z"
                  fillRule="nonzero"
                />
              </g>
            </svg>
          </Link>
        </div>
      </div>
    </main>
    // {/* </motion.div> */}
  );
}