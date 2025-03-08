'use client';

import { motion } from 'framer-motion';
import { 
  Activity, 
  Brain, 
  FileText, 
  Heart, 
  Search, 
  Stethoscope,
  Zap,
  Network,
  Database,
  Shield,
  Clock,
  LineChart
} from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const services = [
  {
    icon: Brain,
    title: 'Advanced AI Models',
    description: 'Cutting-edge neural networks for neurological analysis',
    features: [
      'EEG analysis and interpretation',
      'Stroke detection and prediction',
      'Neurodegenerative disease assessment',
    ],
  },
  {
    icon: Network,
    title: 'Multi-Modal Integration',
    description: 'Seamless fusion of multiple imaging modalities',
    features: [
      'MRI, CT, and PET data integration',
      'Cross-modality analysis',
      'Comprehensive visualization',
    ],
  },
  {
    icon: Activity,
    title: 'Real-Time Monitoring',
    description: 'Continuous patient monitoring and analysis',
    features: [
      'Live vital sign tracking',
      'Automated anomaly detection',
      'Instant alert system',
    ],
  },
  {
    icon: Database,
    title: 'Smart Data Management',
    description: 'Intelligent processing of NeuroVEDical records',
    features: [
      'Automated data organization',
      'Secure storage and retrieval',
      'Advanced search capabilities',
    ],
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description: 'Enterprise-grade security for NeuroVEDical data',
    features: [
      'HIPAA compliance',
      'End-to-end encryption',
      'Access control management',
    ],
  },
  {
    icon: Clock,
    title: 'Workflow Automation',
    description: 'Streamlined clinical processes',
    features: [
      'Automated scheduling',
      'Report generation',
      'Task prioritization',
    ],
  },
];

const additionalFeatures = [
  {
    icon: LineChart,
    title: 'Predictive Analytics',
    description: 'AI-driven predictions for patient outcomes',
  },
  {
    icon: Zap,
    title: 'Fast Processing',
    description: 'Real-time analysis and results delivery',
  },
  {
    icon: Heart,
    title: 'Patient-Centric',
    description: 'Focused on improving patient care quality',
  },
];

export default function ServicesPage() {
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
            Comprehensive Neurological Solutions
          </h1>
          <p className="text-xl text-[#7886C7] max-w-3xl mx-auto">
            Advanced AI-powered tools designed to enhance diagnostic accuracy,
            streamline workflows, and improve patient outcomes.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border border-[#A9B5DF]/20"
            >
              <service.icon className="w-12 h-12 text-[#2D336B] mb-6" />
              <h2 className="text-2xl font-bold text-[#2D336B] mb-4">
                {service.title}
              </h2>
              <p className="text-[#7886C7] mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-[#7886C7]"
                  >
                    <span className="w-2 h-2 bg-[#A9B5DF] rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Additional Features */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-[#2D336B] rounded-2xl p-12 mb-20"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Additional Capabilities
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <feature.icon className="w-12 h-12 text-[#A9B5DF] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#A9B5DF]">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}