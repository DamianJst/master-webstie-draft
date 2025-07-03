// import type { Route } from "./+types/home";
import { motion } from "framer-motion";
import styles from "../styles/home.module.scss";

// export function meta({}: Route.MetaArgs) {
// 	return [
// 		{ title: "Home - Front-End Developer" },
// 		{
// 			name: "description",
// 			content:
// 				"Great experiences are priceless. Let's create them together. Front-End Developer portfolio.",
// 		},
// 	];
// }

// Page transition variants
const pageVariants = {
	initial: {
		opacity: 0,
		x: -200,
		scale: 0.8,
	},
	in: {
		opacity: 1,
		x: 0,
		scale: 1,
		transition: {
			duration: 3,
			ease: "easeInOut",
		},
	},
	out: {
		opacity: 0,
		x: 200,
		scale: 1.2,
		transition: {
			duration: 3,
			ease: "easeInOut",
		},
	},
};

const pageTransition = {
	type: "tween",
	ease: "easeInOut",
	duration: 3,
};

export default function Home() {
	return (
		// <div
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // exit={{ opacity: 0, transition: { duration: 0.5 } }}
            // transition={{ duration: 0.5 }}
        // >
			<main className={styles.hero}>
				<div className={styles.content}>
					<h1 className={styles.heading}>
						<span className={styles.line1}>
							GREAT EXPERIENCES ARE PRICELESS
						</span>
						<span className={styles.line2}>
							LET&apos;S CREATE THEM TOGETHER
						</span>
					</h1>
					<p className={styles.title}>FRONT-END DEVELOPER</p>
				</div>

				<div className={styles.scrollHint}>
					<span>Scroll down</span>
				</div>
			</main>
		// </div>
	);
}
