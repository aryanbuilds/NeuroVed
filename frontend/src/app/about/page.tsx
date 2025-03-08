'use client';

import { motion } from 'framer-motion';
import { Brain, Database, FlaskRound as Flask, Heart, Shield, Users } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D336B] mb-6">
            Revolutionizing Healthcare Through AI
          </h1>
          <p className="text-xl text-[#7886C7] max-w-3xl mx-auto">
            We're dedicated to transforming NeuroVEDical care by developing cutting-edge
            AI solutions that enhance diagnosis accuracy, streamline workflows, and
            improve patient outcomes.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-[#FFF2] p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-bold text-[#2D336B] mb-4">Our Mission</h2>
            <p className="text-[#7886C7]">
              To leverage artificial intelligence and machine learning technologies
              to create innovative solutions that address critical challenges in
              healthcare delivery and NeuroVEDical research.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-[#FFF2] p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-bold text-[#2D336B] mb-4">Our Vision</h2>
            <p className="text-[#7886C7]">
              To be at the forefront of NeuroVEDical AI innovation, creating a future
              where advanced technology enhances healthcare accessibility,
              efficiency, and quality for everyone.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-[#2D336B] text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'Innovation',
                description:
                  'Pushing boundaries in AI and ML to develop groundbreaking NeuroVEDical solutions',
              },
              {
                icon: Shield,
                title: 'Security',
                description:
                  'Ensuring the highest standards of data protection and privacy',
              },
              {
                icon: Heart,
                title: 'Impact',
                description:
                  'Creating meaningful change in healthcare delivery and patient outcomes',
              },
            ].map((value, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <value.icon className="w-12 h-12 text-[#A9B5DF] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#2D336B] mb-2">
                  {value.title}
                </h3>
                <p className="text-[#7886C7]">{value.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-[#2D336B] text-center mb-12">
            What Sets Us Apart
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Database,
                title: 'Advanced Analytics',
                description:
                  'Sophisticated data processing capabilities for accurate NeuroVEDical insights',
              },
              {
                icon: Flask,
                title: 'Research-Backed',
                description:
                  'Solutions developed through rigorous scientific research and validation',
              },
              {
                icon: Users,
                title: 'Collaborative Approach',
                description:
                  'Working closely with healthcare providers to create practical solutions',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-start p-6 bg-[#FFF2] rounded-xl"
              >
                <feature.icon className="w-8 h-8 text-[#A9B5DF] mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-[#2D336B] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[#7886C7]">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}