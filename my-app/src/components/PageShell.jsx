import { MotionConfig } from "motion/react";

function PageShell({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative isolate min-h-screen overflow-x-clip">
        <div className="glow" aria-hidden="true"></div>
        <div className="glow-low" aria-hidden="true"></div>
        {children}
      </div>
    </MotionConfig>
  );
}

export default PageShell;
