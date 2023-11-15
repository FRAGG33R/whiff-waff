import { Variants } from "framer-motion";
export const itemVariants: Variants = {
	open: {
	  opacity: 1,
	  y: 0,
	  transition: { type: "spring", stiffness: 300, damping: 24 },
	},
	closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };