"use client";
import {motion,useReducedMotion} from "motion/react";
export function Reveal({children,delay=0,className}:{children:React.ReactNode;delay?:number;className?:string}){const reduce=useReducedMotion();return <motion.div className={className} initial={reduce?false:{opacity:0,y:16}} whileInView={reduce?undefined:{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:.42,delay,ease:[.2,.8,.2,1]}}>{children}</motion.div>}
