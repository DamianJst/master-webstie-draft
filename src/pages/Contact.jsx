// app/routes/contact.tsx
// import type { Route } from "./+types/contact";
import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm";
import styles from "../styles/contact.module.scss";

// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: "Contact - Front-End Developer" },
//     { 
//       name: "description", 
//       content: "Get in touch to discuss your next project or collaboration." 
//     },
//   ];
// }

export default function Contact() {
  return (
    <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            transition={{ duration: 0.5 }}
        >
    <main className={styles.contact}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Contact</h1>
        <ContactForm />
      </div>
    </main>
    </motion.div>
  );
}