export const ease = [0.22, 0.61, 0.36, 1];

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export const inView = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "0px 0px -10% 0px" },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};
