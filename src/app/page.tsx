"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Brain, FileText, Play, Youtube } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  const { data } = useSession();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] overflow-hidden">
      <ParticleBackground />

      {/* Navbar */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-cyan-500 rounded-full opacity-50 blur-md animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              CurricuLabs
            </span>
          </div>
          <div className="relative z-100 flex items-center gap-4">
            {data?.user ? (
              <>
                <Link href="/gallery">
                  <Button
                    variant="outline"
                    className="border-cyan-500 text-cyan-400 hover:bg-cyan-950/30 group"
                  >
                    Gallery
                  </Button>
                </Link>
                <Link href="/gallery">
                  <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-white hover:bg-transparent bg-gray-800 cursor-pointer transition-all duration-150"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer"
                  >
                    Log in
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300">
            Revolutionize Learning with AI-Powered Course Creation
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto">
            Generate structured courses, integrate videos, quizzes, and
            summaries effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/gallery">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </Link>
            {/* <Button
              size="lg"
              variant="outline"
              className="border-cyan-500 text-cyan-400 hover:bg-cyan-950/30 group"
            >
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button> */}
          </div>
        </motion.div>

        {/* Hero Background Glow */}
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-gradient-to-r from-cyan-500/20 to-purple-600/20 blur-[100px] rounded-full"></div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="container mx-auto px-4 py-20 relative"
        ref={featuresRef}
      >
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300"
          >
            Core Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Powerful AI tools to transform how you create and deliver
            educational content
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<Brain />}
            title="AI-Powered Course Generation"
            description="Create structured courses with AI that adapts to your content needs and learning objectives."
            delay={0}
            isVisible={isVisible}
          />
          <FeatureCard
            icon={<Youtube />}
            title="YouTube Integration"
            description="Seamlessly import videos and transcripts to enhance your courses with multimedia content."
            delay={0.2}
            isVisible={isVisible}
          />
          <FeatureCard
            icon={<FileText />}
            title="Interactive Quizzes"
            description="Generate engaging quizzes and assessments automatically from your course material."
            delay={0.4}
            isVisible={isVisible}
          />
          <FeatureCard
            icon={<ArrowRight />}
            title="Subscription System"
            description="Flexible subscription and credit system to monetize your educational content."
            delay={0.6}
            isVisible={isVisible}
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="container mx-auto px-4 py-20 relative"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300">
            How It Works
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Three simple steps to transform your content into engaging courses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <StepCard
            number="01"
            title="Input Your Content"
            description="Upload documents, links, or videos that contain your educational content."
          />
          <StepCard
            number="02"
            title="AI Processing"
            description="Our AI analyzes and structures your content into a comprehensive course."
          />
          <StepCard
            number="03"
            title="Publish & Share"
            description="Review, customize, and publish your course to share with students."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 relative">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 p-8 md:p-12">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-0 right-0 bg-cyan-500 w-64 h-64 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 bg-purple-600 w-64 h-64 rounded-full blur-[100px]"></div>
          </div>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Transform Your Educational Content?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Join thousands of educators and content creators who are using
              CurricuLabs to create engaging, interactive courses.
            </p>
            <Button
              onClick={() => router.push("/gallery")}
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 group"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
    >
      {children}
    </Link>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-gray-500 hover:text-cyan-400 transition-colors duration-200 text-sm"
    >
      {children}
    </Link>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  delay,
  isVisible,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  isVisible: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
    >
      <Card className="p-6 bg-gray-900/50 border border-gray-800 hover:border-cyan-800 transition-all duration-300 h-full group">
        <div className="mb-4 relative w-12 h-12">
          <div className="absolute inset-0 bg-cyan-500/20 rounded-full group-hover:bg-cyan-500/30 transition-colors duration-300"></div>
          <div className="absolute inset-0 flex items-center justify-center text-cyan-400">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-200 group-hover:text-cyan-300 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-400">{description}</p>
      </Card>
    </motion.div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative">
      <div className="absolute -top-6 -left-6 text-5xl font-bold text-gray-800">
        {number}
      </div>
      <Card className="p-6 bg-gray-900/50 border border-gray-800 h-full relative z-10">
        <h3 className="text-xl font-semibold mb-3 text-gray-200">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </Card>
    </div>
  );
}

function ParticleBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-cyan-500/5 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-600/5 rounded-full blur-[100px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-blue-600/5 rounded-full blur-[100px]"></div>

      {/* Animated dots */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="smallGrid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="2"
              cy="2"
              r="1"
              fill="#4AEAFF"
              className="animate-pulse"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#smallGrid)" />
      </svg>
    </div>
  );
}
