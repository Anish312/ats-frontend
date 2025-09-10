import "./Checklist.css";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

function Checklist() {
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.section
      className="checklist-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} 
      // once = true → animation runs only once
      // amount = 0.2 → start anim when 20% of section is visible
    >
      <motion.div
        className="checklist-header"
        variants={{
          hidden: { opacity: 0, y: -30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
        }}
      >
        <h1>Our AI-powered resume checker goes beyond typos and punctuation</h1>
        <p>
          We’ve built-in ChatGPT to help you create a resume that’s tailored to the
          position you’re applying for.
        </p>
      </motion.div>

      <div className="checklist-content">
        <motion.div
          className="checklist-text"
          variants={{
            hidden: { opacity: 0, x: -40 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.3 } },
          }}
        >
          <h2>Resume optimization checklist</h2>
          <p>
            We check for 16 crucial things across 5 different categories on your resume
            including content, file type, and keywords in the most important sections
            of your resume. Here’s a full list of the checks you’ll receive:
          </p>
        </motion.div>

        <div className="checklist-grid">
          {[
            {
              title: "Content",
              items: [
                "ATS parse rate",
                "Repetition of words and phrases",
                "Spelling and grammar",
                "Quantifying impact in experience section with examples",
              ],
            },
            {
              title: "Format",
              items: [
                "File format and size",
                "Resume length",
                "Long bullet points with suggestions on how to shorten",
              ],
            },
            {
              title: "Resume sections",
              items: [
                "Contact information",
                "Essential sections",
                "Personality showcase with tips on how to improve",
              ],
            },
            {
              title: "Skills suggestion",
              items: ["Hard skills", "Soft skills"],
            },
            {
              title: "Style",
              items: [
                "Resume design",
                "Email address",
                "Usage of active voice",
                "Usage of buzzwords and cliches",
              ],
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              className="card"
              custom={i}
              variants={cardVariants}
            >
              <h3>{card.title}</h3>
              <ul>
                {card.items.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: i * 0.2 + idx * 0.1,
                      duration: 0.4,
                    }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle /> {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default Checklist;
