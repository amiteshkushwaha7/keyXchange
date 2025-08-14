import { motion } from 'framer-motion';
import { FaUsers, FaHandshake, FaLightbulb, FaLock, FaGlobe, FaRecycle } from 'react-icons/fa';

const About = () => {
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
    };

    return (
        <>
            <title>About Us | Digital Goods Marketplace</title>
            <meta name="description" content="Learn about our mission and values" />

            <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen font-sans">
                {/* Hero Section */}
                <div className="relative bg-gray-900">
                    <div className="absolute inset-0">
                        <img
                            className="w-full h-full object-cover opacity-30"
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                            alt="Our team working together"
                        />
                    </div>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8"
                    >
                        <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                            About Our Company
                        </h1>
                        <p className="mt-6 text-lg text-gray-300 max-w-3xl">
                            Connecting buyers and sellers of digital goods with trust and convenience.
                        </p>
                    </motion.div>
                </div>

                {/* Our Story */}
                <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        className="lg:grid lg:grid-cols-2 lg:gap-12"
                    >
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                Our Story
                            </h2>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                Founded in 2023, Digital Goods Marketplace began with a simple idea: to create a
                                trusted platform where people could buy and sell digital products with complete peace
                                of mind.
                            </p>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                What started as a small team of passionate individuals has grown into a thriving
                                marketplace serving thousands of customers worldwide.
                            </p>
                        </div>
                        <div className="mt-8 lg:mt-0">
                            <img
                                className="rounded-2xl shadow-lg w-full"
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                                alt="Our founding team"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Mission and Values */}
                <div className="bg-white rounded-2xl shadow-sm mx-4 sm:mx-6 lg:mx-8 mb-12">
                    <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                        <motion.div 
                            initial="hidden"
                            animate="visible"
                            variants={fadeIn}
                            className="text-center"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                Our Mission & Values
                            </h2>
                            <p className="mt-4 max-w-2xl text-gray-600 mx-auto">
                                Guiding principles that shape everything we do
                            </p>
                        </motion.div>

                        <motion.div 
                            initial="hidden"
                            animate="visible"
                            variants={fadeIn}
                            className="mt-16"
                        >
                            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
                                {[
                                    {
                                        name: 'Customer First',
                                        description:
                                            'We prioritize our customers in every decision we make, ensuring their needs are always met with exceptional service.',
                                        icon: <FaUsers className="h-6 w-6 text-purple-600" />,
                                    },
                                    {
                                        name: 'Integrity',
                                        description:
                                            'We conduct business with honesty and transparency, building trust with every transaction.',
                                        icon: <FaHandshake className="h-6 w-6 text-purple-600" />,
                                    },
                                    {
                                        name: 'Innovation',
                                        description:
                                            'We continuously improve our platform to deliver cutting-edge solutions for digital commerce.',
                                        icon: <FaLightbulb className="h-6 w-6 text-purple-600" />,
                                    },
                                    {
                                        name: 'Security',
                                        description:
                                            'We implement robust security measures to protect both buyers and sellers.',
                                        icon: <FaLock className="h-6 w-6 text-purple-600" />,
                                    },
                                    {
                                        name: 'Community',
                                        description:
                                            'We foster a vibrant community where digital creators and consumers can thrive together.',
                                        icon: <FaGlobe className="h-6 w-6 text-purple-600" />,
                                    },
                                    {
                                        name: 'Sustainability',
                                        description:
                                            'We promote the digital economy as a sustainable alternative to physical goods.',
                                        icon: <FaRecycle className="h-6 w-6 text-purple-600" />,
                                    },
                                ].map((value) => (
                                    <motion.div 
                                        key={value.name}
                                        whileHover={{ y: -5 }}
                                        className="bg-gray-50 p-6 rounded-xl"
                                    >
                                        <dt>
                                            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-purple-50">
                                                {value.icon}
                                            </div>
                                            <p className="mt-4 text-lg font-medium text-gray-900">
                                                {value.name}
                                            </p>
                                        </dt>
                                        <dd className="mt-2 text-gray-600">
                                            {value.description}
                                        </dd>
                                    </motion.div>
                                ))}
                            </dl>
                        </motion.div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        className="text-center"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                            Meet Our Leadership
                        </h2>
                        <p className="mt-4 max-w-2xl text-gray-600 mx-auto">
                            The passionate individuals driving our vision forward
                        </p>
                    </motion.div>

                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {[
                            {
                                name: 'Alex Johnson',
                                role: 'Founder & CEO',
                                image:
                                    'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
                                bio: 'Serial entrepreneur with a passion for digital marketplaces.',
                            },
                            {
                                name: 'Maria Garcia',
                                role: 'Chief Technology Officer',
                                image:
                                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
                                bio: 'Tech visionary with 15+ years in platform development.',
                            },
                            {
                                name: 'James Wilson',
                                role: 'Head of Marketplace',
                                image:
                                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
                                bio: 'Expert in building thriving digital communities.',
                            },
                        ].map((person) => (
                            <motion.div 
                                key={person.name}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-2xl shadow-md overflow-hidden"
                            >
                                <img className="w-full h-64 object-cover" src={person.image} alt={person.name} />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900">{person.name}</h3>
                                    <p className="text-purple-600 font-medium">{person.role}</p>
                                    <p className="mt-3 text-gray-600">{person.bio}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default About;