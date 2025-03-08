'use client';

import { motion } from 'framer-motion';
import { Binary, Brain, Cpu, Database, Network, Server, Workflow } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const technologies = [
  {
    icon: Brain,
    title: 'Machine Learning Models',
    description: 'State-of-the-art neural networks and deep learning architectures',
    details: [
      'Convolutional Neural Networks for image analysis',
      'Recurrent Neural Networks for sequence data',
      'Transformer models for natural language processing',
    ],
  },
  {
    icon: Database,
    title: 'Data Processing',
    description: 'Advanced data pipeline and processing infrastructure',
    details: [
      'Real-time data processing',
      'Secure data storage and encryption',
      'Automated data validation and cleaning',
    ],
  },
  {
    icon: Network,
    title: 'Cloud Infrastructure',
    description: 'Scalable and reliable cloud computing platform',
    details: [
      'Distributed computing resources',
      'High-availability systems',
      'Automated scaling and load balancing',
    ],
  },
  {
    icon: Binary,
    title: 'Algorithms',
    description: 'Cutting-edge algorithmic implementations',
    details: [
      'Custom optimization algorithms',
      'Efficient search and matching',
      'Advanced statistical analysis',
    ],
  },
];

export default function TechnologyPage() {
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
            Our Technology Stack
          </h1>
          <p className="text-xl text-[#7886C7] max-w-3xl mx-auto">
            Explore the advanced technologies and infrastructure that power our
            medical AI solutions.
          </p>
        </motion.div>

        {/* Technology Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-[#FFF2] p-8 rounded-xl shadow-lg"
            >
              <tech.icon className="w-12 h-12 text-[#A9B5DF] mb-6" />
              <h2 className="text-2xl font-bold text-[#2D336B] mb-4">
                {tech.title}
              </h2>
              <p className="text-[#7886C7] mb-6">{tech.description}</p>
              <ul className="space-y-3">
                {tech.details.map((detail, detailIndex) => (
                  <li
                    key={detailIndex}
                    className="flex items-center text-[#7886C7]"
                  >
                    <span className="w-2 h-2 bg-[#A9B5DF] rounded-full mr-3" />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Architecture Diagram */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-[#2D336B] text-center mb-12">
            System Architecture
          </h2>
          <div className="bg-[#FFF2] p-8 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Server,
                  title: 'Infrastructure Layer',
                  description: 'Cloud servers and computing resources',
                },
                {
                  icon: Workflow,
                  title: 'Processing Layer',
                  description: 'Data processing and ML pipeline',
                },
                {
                  icon: Cpu,
                  title: 'Application Layer',
                  description: 'User interfaces and API endpoints',
                },
              ].map((layer, index) => (
                <div key={index} className="text-center">
                  <layer.icon className="w-16 h-16 text-[#A9B5DF] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[#2D336B] mb-2">
                    {layer.title}
                  </h3>
                  <p className="text-[#7886C7]">{layer.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}