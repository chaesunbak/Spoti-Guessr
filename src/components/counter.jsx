import { motion ,animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function Counter({ to }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    count.set(0);
    const controls = animate(count, to, { duration: 3 });

    return () => controls.stop();
  }, [to]);

  return <div className="text-white text-3xl drop-shadow-lg"><motion.div>{rounded}</motion.div></div>;
}