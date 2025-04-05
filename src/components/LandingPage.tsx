import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  ArrowRight,
  FileText,
  Sparkles,
  Award,
  CheckCircle,
  Briefcase,
  Download,
  Zap,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header/Navigation */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-[#2B6CB0] to-[#4299E1] p-2 rounded-lg shadow-lg">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#2B6CB0] font-playfair tracking-tight">
              Q-Genics<span className="text-[#4299E1]">AI</span>
            </h1>
          </div>
          <nav className="hidden md:flex space-x-8 font-work-sans">
            <a
              href="#features"
              className="text-gray-700 hover:text-[#2B6CB0] font-medium"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-700 hover:text-[#2B6CB0] font-medium"
            >
              How It Works
            </a>
            <a
              href="#ai-models"
              className="text-gray-700 hover:text-[#2B6CB0] font-medium"
            >
              AI Models
            </a>
            <a
              href="#testimonials"
              className="text-gray-700 hover:text-[#2B6CB0] font-medium"
            >
              Testimonials
            </a>
          </nav>
          <div>
            <Link to="/optimizer">
              <Button className="bg-[#E0F7FA] text-[#2B6CB0] hover:bg-[#B2EBF2] font-medium px-6">
                Start Optimizing
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-[#E0F7FA] text-[#2B6CB0] px-3 py-1 text-sm font-medium rounded-full">
              AI-Powered CV Optimization
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight font-playfair mb-6">
              Elevate Your Career with{" "}
              <span className="text-[#2B6CB0]">AI-Enhanced CVs</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 font-work-sans leading-relaxed">
              Our cutting-edge AI analyzes your CV, optimizes content, and
              tailors it to specific job requirements, giving you a competitive
              edge in today's job market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/optimizer">
                <Button className="bg-[#2B6CB0] hover:bg-[#1E4E8C] text-white font-medium px-8 py-6 rounded-lg text-lg flex items-center">
                  Optimize My CV <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button
                  variant="outline"
                  className="border-[#2B6CB0] text-[#2B6CB0] font-medium px-8 py-6 rounded-lg text-lg"
                >
                  Learn More
                </Button>
              </a>
            </div>
            <div className="mt-8 flex items-center space-x-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-[#E0F7FA] border-2 border-white flex items-center justify-center"
                  >
                    <span className="text-[#2B6CB0] font-medium">{i}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">1,000+</span> professionals
                optimized their CVs this week
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#E0F7FA] rounded-full opacity-50 z-0"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#E0F7FA] rounded-full opacity-50 z-0"></div>
            <div className="relative z-10 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80"
                alt="CV Optimization"
                className="w-full h-auto"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-[#2B6CB0]" />
                  <span className="text-sm font-medium text-[#2B6CB0]">
                    AI-Powered
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#E0F7FA] text-[#2B6CB0] px-3 py-1 text-sm font-medium rounded-full">
              Key Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-playfair mb-4">
              Why Choose Our CV Optimizer
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-work-sans">
              Leverage the power of multiple AI models to create the perfect CV
              tailored to your target position.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="h-8 w-8 text-[#2B6CB0]" />,
                title: "AI-Powered Analysis",
                description:
                  "Our AI analyzes your CV against industry standards and job requirements to identify improvement areas.",
              },
              {
                icon: <FileText className="h-8 w-8 text-[#2B6CB0]" />,
                title: "TOR Integration",
                description:
                  "Upload Terms of Reference documents to tailor your CV specifically to job requirements.",
              },
              {
                icon: <Award className="h-8 w-8 text-[#2B6CB0]" />,
                title: "Professional Templates",
                description:
                  "Choose from multiple professional templates designed for different industries and organizations.",
              },
              {
                icon: <Briefcase className="h-8 w-8 text-[#2B6CB0]" />,
                title: "Competency Highlighting",
                description:
                  "Emphasize your key competencies and skills that match the job requirements.",
              },
              {
                icon: <Download className="h-8 w-8 text-[#2B6CB0]" />,
                title: "Multiple Export Formats",
                description:
                  "Download your optimized CV in PDF or DOCX formats for different submission requirements.",
              },
              {
                icon: <Zap className="h-8 w-8 text-[#2B6CB0]" />,
                title: "Multiple AI Models",
                description:
                  "Choose from OpenAI, Claude, Google Gemini, Qwen, or DeepSeek AI models for different optimization approaches.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="bg-[#E0F7FA] w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 font-playfair">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 font-work-sans">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#E0F7FA] text-[#2B6CB0] px-3 py-1 text-sm font-medium rounded-full">
              Simple Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-playfair mb-4">
              How Our CV Optimizer Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-work-sans">
              A streamlined process to transform your CV in minutes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Upload Your CV",
                description:
                  "Upload your current CV and optional TOR document to provide context for the optimization.",
              },
              {
                step: "02",
                title: "AI Analysis & Optimization",
                description:
                  "Our AI analyzes your CV, identifies improvement areas, and generates an optimized version.",
              },
              {
                step: "03",
                title: "Review & Download",
                description:
                  "Review the AI suggestions, make any final edits, and download your professionally optimized CV.",
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-[#F5F5DC] rounded-lg p-8 h-full border border-[#E0F7FA]">
                  <div className="bg-[#2B6CB0] text-white text-xl font-bold w-12 h-12 rounded-full flex items-center justify-center mb-6">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 font-playfair">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 font-work-sans">
                    {step.description}
                  </p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="h-8 w-8 text-[#2B6CB0]" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/optimizer">
              <Button className="bg-[#2B6CB0] hover:bg-[#1E4E8C] text-white font-medium px-8 py-6 rounded-lg text-lg">
                Start Optimizing Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* AI Models Section */}
      <section id="ai-models" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#E0F7FA] text-[#2B6CB0] px-3 py-1 text-sm font-medium rounded-full">
              Advanced Technology
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-playfair mb-4">
              Choose Your AI Model
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-work-sans">
              Select from multiple leading AI models to optimize your CV
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[
              {
                name: "OpenAI",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1024px-OpenAI_Logo.svg.png",
                description: "Powered by GPT-4 technology",
                strengths: [
                  "Strong language understanding",
                  "Excellent formatting",
                  "Detailed suggestions",
                ],
              },
              {
                name: "Claude",
                logo: "https://images.unsplash.com/photo-1701977407870-3f6d7a8b0a0d?w=800&q=80",
                description: "Claude 3.7 Sonnet by Anthropic",
                strengths: [
                  "Nuanced content improvements",
                  "Professional tone",
                  "Context awareness",
                ],
              },
              {
                name: "Google Gemini",
                logo: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini_1.max-1000x1000.png",
                description: "Google's advanced AI model",
                strengths: [
                  "Comprehensive analysis",
                  "Industry insights",
                  "Structured formatting",
                ],
              },
              {
                name: "Qwen",
                logo: "https://images.unsplash.com/photo-1701977407870-3f6d7a8b0a0d?w=800&q=80",
                description: "Alibaba's powerful AI",
                strengths: [
                  "Multilingual support",
                  "Technical expertise",
                  "Concise optimization",
                ],
              },
              {
                name: "DeepSeek",
                logo: "https://images.unsplash.com/photo-1701977407870-3f6d7a8b0a0d?w=800&q=80",
                description: "Specialized deep learning model",
                strengths: [
                  "Technical CV expertise",
                  "Research focus",
                  "Academic optimization",
                ],
              },
            ].map((model, index) => (
              <Card
                key={index}
                className="border border-gray-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 mb-4 rounded-full bg-white flex items-center justify-center overflow-hidden">
                      <img
                        src={model.logo}
                        alt={`${model.name} logo`}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-1 text-gray-900 font-playfair">
                      {model.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4 font-work-sans">
                      {model.description}
                    </p>
                    <ul className="text-sm text-gray-600 space-y-2 w-full">
                      {model.strengths.map((strength, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-[#2B6CB0] mr-2 mt-0.5 flex-shrink-0" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[#E0F7FA] py-3 px-4 text-center">
                    <span className="text-sm font-medium text-[#2B6CB0]">
                      Available for optimization
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#E0F7FA] text-[#2B6CB0] px-3 py-1 text-sm font-medium rounded-full">
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-playfair mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-work-sans">
              Hear from professionals who transformed their careers with our CV
              Optimizer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "The AI suggestions were spot-on. I received interview calls from 3 top consulting firms after optimizing my CV.",
                name: "Sarah Johnson",
                title: "Management Consultant",
                avatar:
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
              },
              {
                quote:
                  "Being able to upload the TOR and get a tailored CV was game-changing. Secured a position at a Big 4 firm.",
                name: "Michael Chen",
                title: "Financial Analyst",
                avatar:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
              },
              {
                quote:
                  "The different AI models offered unique perspectives. I used Claude for my academic CV and it perfectly highlighted my research.",
                name: "Dr. Emily Rodriguez",
                title: "Research Scientist",
                avatar:
                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic font-work-sans">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 font-playfair">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-500 font-work-sans">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#2B6CB0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair mb-6">
            Ready to Transform Your Career Opportunities?
          </h2>
          <p className="text-xl text-blue-100 mb-8 font-work-sans max-w-3xl mx-auto">
            Join thousands of professionals who have enhanced their CVs and
            secured their dream positions.
          </p>
          <Link to="/optimizer">
            <Button className="bg-white text-[#2B6CB0] hover:bg-blue-50 font-medium px-8 py-6 rounded-lg text-lg">
              Optimize My CV Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-white p-1 rounded">
                  <Sparkles className="h-6 w-6 text-[#2B6CB0]" />
                </div>
                <h3 className="text-xl font-bold font-playfair">Q-GenicsAI</h3>
              </div>
              <p className="text-gray-400 font-work-sans">
                AI-powered CV optimization for professionals seeking career
                advancement.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4 font-playfair">Features</h4>
              <ul className="space-y-2 font-work-sans">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    AI Analysis
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    TOR Integration
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Multiple AI Models
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Professional Templates
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4 font-playfair">
                Resources
              </h4>
              <ul className="space-y-2 font-work-sans">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    CV Writing Tips
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Career Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Success Stories
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4 font-playfair">Contact</h4>
              <ul className="space-y-2 font-work-sans">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Sales
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Partnerships
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm font-work-sans">
              © {new Date().getFullYear()} Q-Genics AI. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
