"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaHome, FaSearch, FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-9xl font-bold text-accent mb-4">404</h1>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
            Oops! The page you're looking for seems to have vanished into the digital void. 
            Let's get you back to solid ground.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/">
            <Button className="bg-accent text-primary hover:bg-accent/90 flex items-center gap-2">
              <FaHome className="text-sm" />
              Back to Home
            </Button>
          </Link>
          
          <Link href="/services">
            <Button variant="outline" className="border-accent text-accent hover:bg-accent/10 flex items-center gap-2">
              <FaSearch className="text-sm" />
              Browse Services
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            className="border-white/20 text-white hover:bg-white/10 flex items-center gap-2"
            onClick={() => window.history.back()}
          >
            <FaArrowLeft className="text-sm" />
            Go Back
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <div className="text-white/40 text-sm">
            <p>Error code: 404 - Page not found</p>
            <p className="mt-2">If you believe this is an error, please contact support.</p>
          </div>
        </motion.div>

        {/* Animated background elements */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-accent/10 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-20 right-20 w-16 h-16 bg-accent/10 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-24 h-24 bg-accent/10 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>
    </div>
  );
};

export default NotFound;
