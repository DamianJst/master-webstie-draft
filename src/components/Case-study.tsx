// app/routes/projects.case-study.tsx
import { Link } from "react-router";
import type { Route } from "./+types/case-study";
import { motion } from "framer-motion";
import CaseStudySlider from "~/components/CaseStudySlider";
import styles from "~/styles/caseStudy.module.scss";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Case Study - E-Commerce Platform | Your Portfolio" },
    { 
      name: "description", 
      content: "An in-depth look at the design and development process behind this project." 
    },
  ];
}

// Static data - could come from CMS/MDX
const slides = [
  {
    heading: "Cras Risus",
    paragraph: `Posuere vitae fringilla id, consequat a mauris.
                Praesent ac nibh at lectus pharetra aliquam. Sed
                efficitur maximus suscipit. Nullam sed nisi sagittis,
                posuere nulla id, blandit velit. Nam tempus
                sollicitudin congue.`,
    link: "Sollicitudin congue.",
  },
  {
    heading: "Vitae Neque",
    paragraph: `Purus at lorem pretium eleifend molestie nec augue.
                Nunc non ligula feugiat, varius lacus quis, maximus
                elit. Fusce sodales mi vel tincidunt tempor.
                Pellentesque vitae odio vitae nisl dapibus consectetur.`,
    link: "Sed efficitur",
  },
  {
    heading: "Tempor Quis",
    paragraph: `Aenean bibendum magna magna, eget accumsan eros
                elementum a. Vivamus sed nisi venenatis, maximus metus
                vel, eleifend ligula. Nullam sagittis ornare augue sed
                elementum. Curabitur euismod, sem id euismod
                vestibulum, magna urna venenatis mi`,
    link: "Nullam sagittis",
  },
  {
    heading: "Pretium Feugiat",
    paragraph: `Maecenas feugiat in lectus vitae commodo. Nunc pharetra
                vehicula mauris, quis placerat nibh finibus eget. Etiam
                condimentum venenatis lorem et faucibus. Nam et mattis
                lacus. Aenean urna odio, euismod nec ipsum sed.
                Placerat convallis turpis. Quisque quis placerat nibh`,
    link: "Integer vulputate",
  },
  {
    heading: "Morbi Luctus",
    paragraph: `Quisque eu urna turpis. Etiam convallis hendrerit quam,
                vitae commodo lacus luctus a. Vivamus tincidunt augue
                id ligula rhoncus, quis varius quam sagittis. In cursus
                massa in accumsan ultrices.`,
    link: "Vulputate libero",
  },
  {
    heading: "Cras risus",
    paragraph: `Vivamus aliquam diam vel ornare porta. Mauris varius
                dapibus ligula. Phasellus eget auctor dui, eu fermentum
                dui. Fusce ac tristique neque. Etiam mollis turpis a
                dolor sodales tristique. Nunc eget enim tortor.`,
    link: "Sapien dignissim",
  },
  {
    heading: "Vestibulum Vitae",
    paragraph: `Phasellus odio nibh, maximus malesuada sapien id,
                tempus fringilla purus. Nullam imperdiet scelerisque
                mattis. Donec tempor felis eu rhoncus sollicitudin.`,
    link: "Aenean feugiat",
  },
  {
    heading: "Donec fringilla",
    paragraph: `Maecenas non volutpat urna, vel luctus lacus.
                Vestibulum a efficitur mauris. Sed leo dolor, lobortis
                id condimentum nec, semper ut quam. Aliquam congue
                elementum accumsan. Nam iaculis lacus nisl. Ac dictum
                sapien tempus eu. Donec finibus tortor eget nibh
                imperdiet`,
    link: "Curabitur ut dolor",
  },
];

export default function CaseStudy() {
  return (
    <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            transition={{ duration: 0.5 }}
        >
    <main className={styles.caseStudy}>
      {/* Back Button */}
      <Link to="/projects" className={styles.backButton}>
        <div className={styles.backBtnContent}>
          <div className={styles.arrowLeft} />
          <div className={styles.text}>Back</div>
        </div>
      </Link>

      {/* Slides Content - All pre-rendered for SEO */}
      <CaseStudySlider slides={slides} />
    </main>
    </motion.div>
  );
}