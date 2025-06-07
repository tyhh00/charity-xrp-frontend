import { FaShieldAlt, FaHeartbeat, FaEye } from "react-icons/fa";
import { motion } from "framer-motion";

export function HowItWorksXRPL() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const metricsVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6,
        delay: 0.4
      }
    }
  };

  const numberVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        delay: 0.7 + (custom * 0.1)
      }
    })
  };

  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-center gap-8 py-16 px-8 bg-[#fff6f6] rounded-xl mt-8">
      {/* Left: Features */}
      <motion.div 
        className="flex-1 flex flex-col gap-8 max-w-lg"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className="flex items-start gap-4" variants={itemVariants}>
          <motion.div 
            className="bg-[#ffeaea] text-[#cb2121] rounded-xl p-3 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <FaShieldAlt className="w-6 h-6" />
          </motion.div>
          <div>
            <div className="font-bold text-lg md:text-xl mb-1">Tamper-Proof Security</div>
            <div className="text-gray-600 text-base">All transactions are cryptographically secured and immutably recorded on the blockchain, ensuring complete data integrity.</div>
          </div>
        </motion.div>
        
        <motion.div className="flex items-start gap-4" variants={itemVariants}>
          <motion.div 
            className="bg-[#ffeaea] text-[#cb2121] rounded-xl p-3 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <FaHeartbeat className="w-6 h-6" />
          </motion.div>
          <div>
            <div className="font-bold text-lg md:text-xl mb-1">Lightning Fast Settlements</div>
            <div className="text-gray-600 text-base">Transactions settle in 3-5 seconds with minimal fees, ensuring aid reaches recipients quickly and efficiently.</div>
          </div>
        </motion.div>
        
        <motion.div className="flex items-start gap-4" variants={itemVariants}>
          <motion.div 
            className="bg-[#ffeaea] text-[#cb2121] rounded-xl p-3 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <FaEye className="w-6 h-6" />
          </motion.div>
          <div>
            <div className="font-bold text-lg md:text-xl mb-1">Complete Transparency</div>
            <div className="text-gray-600 text-base">Every transaction is publicly verifiable while protecting individual beneficiary privacy through advanced cryptographic techniques.</div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Right: Metrics Card */}
      <div className="flex-1 flex items-center justify-center">
        <motion.div 
          className="bg-[#ffeaea] rounded-2xl p-8 w-full max-w-md shadow flex flex-col items-center"
          variants={metricsVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="font-bold text-xl mb-6 text-black text-center">XRPL Performance Metrics</div>
          <div className="grid grid-cols-2 gap-8 w-full text-center">
            <div>
              <motion.div 
                className="text-3xl font-bold text-[#cb2121]"
                variants={numberVariants}
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                99.97%
              </motion.div>
              <div className="text-gray-600 text-sm mt-1">Network Uptime</div>
            </div>
            <div>
              <motion.div 
                className="text-3xl font-bold text-[#cb2121]"
                variants={numberVariants}
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                $0.0002
              </motion.div>
              <div className="text-gray-600 text-sm mt-1">Avg Transaction Fee</div>
            </div>
            <div>
              <motion.div 
                className="text-3xl font-bold text-[#cb2121]"
                variants={numberVariants}
                custom={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                3-5s
              </motion.div>
              <div className="text-gray-600 text-sm mt-1">Settlement Time</div>
            </div>
            <div>
              <motion.div 
                className="text-3xl font-bold text-[#cb2121]"
                variants={numberVariants}
                custom={3}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                1.5M+
              </motion.div>
              <div className="text-gray-600 text-sm mt-1">Daily Transactions</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 