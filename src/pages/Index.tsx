import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code2, Users, Zap, Sparkles, Github, Linkedin, Terminal, Rocket, Star, Globe, Shield, Cpu, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/ui/section-header';
import { DeveloperCard } from '@/components/ui/developer-card';
import { FuturisticBackground } from '@/components/ui/futuristic-background';
import { AdvancedTextAnimation, GlitchText } from '@/components/ui/advanced-text-animation';
import { PremiumButton, ButtonGroup } from '@/components/ui/premium-button';
import { projectService } from '../services/project.service';
import { adminService } from '../services/admin.service';
import { useTheme } from '@/contexts/ThemeContext';

const Index = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamLoading, setTeamLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const { theme } = useTheme();

  const words = ["Blitzs", "Excellence", "Innovation", "Quality", "Future", "Success"];

  // Typing animation logic
  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseDuration = 2000;

    const handleTyping = () => {
      if (isTyping) {
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
        } else {
          setTimeout(() => {
            setIsTyping(false);
          }, pauseDuration);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          setIsTyping(true);
        }
      }
    };

    const timeout = setTimeout(
      handleTyping,
      isTyping ? typingSpeed : deletingSpeed
    );

    return () => clearTimeout(timeout);
  }, [currentText, isTyping, currentWordIndex, words]);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  useEffect(() => {
    setIsLoaded(true);
    const fetchFeaturedProjects = async () => {
      try {
        setProjectsLoading(true);
        const response = await projectService.getAllProjects({ 
          limit: 6, 
          sortBy: 'created_at' 
        });
        
        if (response.success) {
          setFeaturedProjects(response.data.projects);
        }
      } catch (error) {
        console.error('Error fetching featured projects:', error);
      } finally {
        setProjectsLoading(false);
      }
    };

    const fetchTeamMembers = async () => {
      try {
        setTeamLoading(true);
        const response = await adminService.getAllDevelopers();
        
        if (response.success) {
          setTeamMembers(response.data.developers || []);
        }
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setTeamLoading(false);
      }
    };

    fetchFeaturedProjects();
    fetchTeamMembers();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section - Perfectly Centered & Enhanced */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">


        <FuturisticBackground />
        
        {/* Enhanced animated geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Primary floating orbs */}
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              borderRadius: ['30%', '60%', '30%'],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-10 right-10 w-80 h-80 bg-gradient-to-br from-blue-500/15 via-purple-500/15 to-pink-500/15 blur-3xl"
          />
          <motion.div
            animate={{
              rotate: [360, 0],
              scale: [1.3, 1, 1.3],
              borderRadius: ['60%', '30%', '60%'],
              x: [0, -50, 0],
              y: [0, 30, 0]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-tr from-pink-500/15 via-orange-500/15 to-yellow-500/15 blur-3xl"
          />
          
          {/* Secondary floating elements */}
          <motion.div
            animate={{
              y: [0, -40, 0],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-20 h-20 border-2 border-purple-500/20 rounded-lg rotate-45"
          />
          <motion.div
            animate={{
              y: [0, 40, 0],
              rotate: [360, 180, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-1/4 right-1/4 w-24 h-24 border-2 border-blue-500/20 rounded-full"
          />
          
          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -Math.random() * 60 - 20, 0],
                x: [0, Math.random() * 40 - 20, 0],
                opacity: [0.1, 0.4, 0.1],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
              className="absolute"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
            >
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
            </motion.div>
          ))}
        </div>
        
        {/* Perfectly centered content */}
        <div className="container mx-auto px-4 relative z-10">
          <AnimatePresence>
            {isLoaded && (
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="max-w-6xl mx-auto text-center flex flex-col items-center justify-center"
              >
                {/* Enhanced top badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.8, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center mt-6 gap-3 px-8 py-4 mb-16 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 backdrop-blur-md shadow-lg"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-6 h-6 text-blue-500" />
                  </motion.div>
                  <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Next-Gen Development Solutions
                  </span>
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/50" />
                  </motion.div>
                </motion.div>
                
                {/* Main headline - perfectly centered */}
                <div className="mb-10 -mt-10">
                  <div className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
                    <span className="block mb-2">
                      <span className="text-foreground">Build Your Next</span>{' '}
                      <motion.span
                        className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        style={{
                          backgroundSize: '200% 200%'
                        }}
                      >
                        Project
                      </motion.span>
                    </span>
                    
                    <span className="block">
                      <span className="text-foreground">with</span>{' '}
                      <span className="relative inline-block">
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={currentWordIndex}
                            className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent"
                            variants={letterVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                          >
                            {currentText}
                          </motion.span>
                        </AnimatePresence>
                        
                        {/* Cursor */}
                        <motion.span
                          className="inline-block w-1 h-12 lg:h-16 bg-gradient-to-b from-purple-600 to-pink-600 ml-1"
                          animate={{ opacity: showCursor ? 1 : 0 }}
                          transition={{ duration: 0.1 }}
                        />
                      </span>
                    </span>
                  </div>
                  
                  {/* Perfectly centered subtitle - main focal point */}
                  <motion.p
                    className="text-2xl md:text-3xl lg:text-4xl text-foreground font-medium max-w-4xl mx-auto leading-relaxed text-center px-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                  >
                    Transform your ideas into reality with our{' '}
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                      cutting-edge development solutions
                    </span>{' '}
                    and{' '}
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
                      expert team
                    </span>
                  </motion.p>
                </div>

                {/* Enhanced CTA buttons */}
                <ButtonGroup className="mb-20">
                  <PremiumButton href="/projects" variant="primary" size="xl">
                    Explore Projects
                  </PremiumButton>
                  <PremiumButton href="/contact" variant="secondary" size="xl">
                    Start Your Journey
                  </PremiumButton>
                </ButtonGroup>

                {/* Enhanced stats section */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 1 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto w-full"
                >
                  {[
                    { icon: Code2, label: "Projects", value: "100+", color: "from-blue-500 to-cyan-500" },
                    { icon: Users, label: "Developers", value: "25+", color: "from-purple-500 to-pink-500" },
                    { icon: Shield, label: "Security", value: "A+", color: "from-green-500 to-emerald-500" },
                    { icon: Globe, label: "Countries", value: "30+", color: "from-orange-500 to-red-500" }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.6 + index * 0.15, duration: 0.6, type: "spring" }}
                      whileHover={{ scale: 1.08, y: -5 }}
                      className="group relative"
                    >
                      <div className="relative p-8 rounded-2xl bg-background/60 backdrop-blur-lg border border-border/40 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-2xl">
                        {/* Enhanced icon container */}
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <stat.icon className="w-8 h-8 text-white" />
                        </div>
                        
                        {/* Enhanced value animation */}
                        <motion.div 
                          className="text-4xl font-bold mb-2 bg-gradient-to-r from-foreground via-primary to-muted-foreground bg-clip-text text-transparent"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.8 + index * 0.15, duration: 0.6 }}
                        >
                          {stat.value}
                        </motion.div>
                        
                        <div className="text-sm text-muted-foreground font-semibold">{stat.label}</div>
                        
                        {/* Enhanced hover glow */}
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} opacity-15 blur-xl`} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Enhanced trust indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2, duration: 1.2 }}
                  className="mt-20 flex flex-wrap items-center justify-center gap-10 text-muted-foreground"
                >
                  <motion.div 
                    className="flex items-center gap-3 px-4 py-2 rounded-full bg-background/40 backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Shield className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium">Enterprise Security</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-3 px-4 py-2 rounded-full bg-background/40 backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Cpu className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium">AI-Powered</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-3 px-4 py-2 rounded-full bg-background/40 backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Layers className="w-5 h-5 text-purple-500" />
                    <span className="text-sm font-medium">Scalable Architecture</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader badge="Our Work" title="Featured Projects" description="Discover our latest production-ready applications" />
          
          {projectsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-muted rounded-xl h-80"></div>
                </div>
              ))}
            </div>
          ) : featuredProjects.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <Code2 className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
                <p className="text-muted-foreground">
                  Check back soon for our latest projects!
                </p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project: any, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                    <img
                      src={project.images && project.images.length > 0 ? project.images[0] : 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400'}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{project.short_description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">{project.category}</span>
                    <span className="font-bold">{project.is_free ? 'Free' : `$${project.price}`}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {(project.tech_stack || []).slice(0, 3).map((tech: string) => (
                      <span key={tech} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Button asChild className="w-full">
                    <Link to={`/projects/${project.id}`}>
                      View Details
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link to="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeader badge="The Team" title="Meet Our Experts" description="Talented developers ready to bring your vision to life" />
          
          {teamLoading ? (
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-muted rounded-xl h-80"></div>
                </div>
              ))}
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No team members yet</h3>
                <p className="text-muted-foreground">
                  Our team is growing! Check back soon to meet our talented developers.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id || member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border rounded-lg p-6 hover:shadow-lg transition-all duration-300 bg-card"
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-muted mx-auto mb-4">
                    <img
                      src={member.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{member.experience || 'Developer'}</p>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{member.bio}</p>
                  <div className="flex flex-wrap gap-1 justify-center mb-4">
                    {(member.skills || []).slice(0, 3).map((skill: string) => (
                      <span key={skill} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-center gap-3">
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group"
                      >
                        <Github className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 group"
                      >
                        <Linkedin className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link to="/team">View Full Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
