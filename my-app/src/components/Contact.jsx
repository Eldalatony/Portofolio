import { motion } from "motion/react";
import Section from "./Section";
import { fadeUp, inView, stagger } from "../lib/animations";
import { contacts, newTab, profile } from "../data/profile";

function Contact() {
  return (
    <Section
      id="contact"
      title="Contact"
      intro={`${profile.availability}. The quickest way to reach me is email.`}
    >
      <motion.ul
        variants={stagger}
        {...inView}
        className="grid grid-cols-1 gap-3 sm:grid-cols-3"
      >
        {contacts.map((contact) => (
          <motion.li key={contact.label} variants={fadeUp}>
            <a
              href={contact.href}
              {...(contact.external ? newTab : {})}
              className="card card-hover flex h-full flex-col justify-between gap-3 rounded-2xl p-5"
            >
              <span className="mono-label">{contact.label}</span>
              <span className="text-sm font-medium break-words">
                {contact.value}
                {contact.external && " ↗"}
              </span>
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}

export default Contact;
