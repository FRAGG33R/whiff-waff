import { motion } from "framer-motion";


export default function ValidationAlert(props  : {bigText : string, smallText : string})
{
	return(
		<motion.div
          initial={{ x: 0 }}
          style={{ x: 0 }}
          whileInView={{ x: 60 }}
          className="p-4 mb-4 text-sm md:w-1/3 w-10/12 absolute z-10 bottom-10 -left-10 md:left-0 text-green-800 rounded-lg bg-green-50 dark:text-green-400"
          role="alert"
        >
          <span className="font-medium">{props.bigText}</span>{" "}
			{props.smallText}
        </motion.div>
	)
}