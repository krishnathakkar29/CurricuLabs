"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Brain, Sparkles, ArrowRight, BookOpen, Layers, Zap, GraduationCap, Trophy, MousePointer2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const features = [
    {
      title: "AI Course Generation",
      icon: Brain,
      desc: "Transform any topic into a comprehensive structured course in seconds using advanced AI models.",
      color: "from-cyan-500/20 to-blue-500/20",
    },
    {
      title: "Interactive Quizzes",
      icon: Zap,
      desc: "Test your knowledge with AI-generated quizzes that adapt to your learning progress.",
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      title: "Detailed Summaries",
      icon: BookOpen,
      desc: "Get concise, AI-powered summaries of video content to reinforce key concepts.",
      color: "from-emerald-500/20 to-teal-500/20",
    },
    {
      title: "Structured Learning",
      icon: Layers,
      desc: "Courses are organized into logical units and chapters for a seamless learning path.",
      color: "from-orange-500/20 to-yellow-500/20",
    },
  ];

  const steps = [
    {
      title: "Define Your Goal",
      desc: "Enter any topic you want to master, from Quantum Physics to Baking.",
      icon: MousePointer2,
    },
    {
      title: "AI Synthesis",
      desc: "Our AI curates the best content and structures it into a logical path.",
      icon: Sparkles,
    },
    {
      title: "Interactive Learning",
      desc: "Watch, read, and take quizzes to solidify your understanding.",
      icon: GraduationCap,
    },
    {
      title: "Mastery",
      desc: "Complete the course and earn your digital certification of knowledge.",
      icon: Trophy,
    },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white selection:bg-cyan-500/30 font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20">
        {/* Dynamic Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-cyan-500/5 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        <motion.div 
          style={{ opacity, scale }}
          className="container relative z-10 px-4 mx-auto text-center"
        >
          {/* Brand Logo & Name */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <div className="group relative w-12 h-12 sm:w-16 sm:h-16 cursor-pointer">
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/80 border border-white/10 rounded-2xl backdrop-blur-2xl shadow-2xl group-hover:border-cyan-500/50 transition-all duration-500 group-hover:scale-105">
                <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              </div>
            </div>
            <span className="text-2xl sm:text-3xl font-black tracking-tighter uppercase italic">
              Curricu<span className="text-cyan-400">Labs</span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-6xl mx-auto text-5xl font-black tracking-tight sm:text-7xl lg:text-[8rem] leading-[0.95]"
          >
            LEARN <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 via-purple-500 to-cyan-400 animate-gradient-x">
              EVERYTHING
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto mt-12 text-xl leading-relaxed text-zinc-400 font-medium"
          >
            CurricuLabs synthesizes the world's knowledge into personalized, interactive learning paths tailored specifically for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-6 mt-20 sm:flex-row"
          >
            <Link href="/create">
              <Button size="lg" className="h-20 px-20 text-2xl font-black rounded-3xl bg-white text-black hover:bg-zinc-200 shadow-[0_0_50px_rgba(255,255,255,0.15)] group transition-all active:scale-95">
                START NOW
                <ArrowRight className="w-8 h-8 ml-3 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>
            <Link href="/gallery">
              <Button size="lg" variant="outline" className="h-20 px-12 text-2xl font-black rounded-3xl border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all active:scale-95">
                GALLERY
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/10 flex justify-center p-1">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-cyan-400 rounded-full" 
            />
          </div>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section className="py-40 relative">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto mb-32 text-center">
            <h2 className="text-5xl font-black tracking-tighter sm:text-7xl mb-8 uppercase">How it works</h2>
            <div className="h-1.5 w-24 bg-cyan-500 mx-auto rounded-full" />
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-cyan-500/50 via-purple-500/50 to-transparent hidden md:block" />

            <div className="space-y-24">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                >
                  <div className="flex-1 text-center md:text-left">
                    <div className={`flex flex-col ${i % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
                      <span className="text-8xl font-black text-white/5 mb-[-2rem] select-none">0{i + 1}</span>
                      <h3 className="text-3xl font-black mb-4 uppercase tracking-tight">{step.title}</h3>
                      <p className="text-xl text-zinc-400 leading-relaxed max-w-md">{step.desc}</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-xl group hover:border-cyan-500/50 transition-colors">
                      <step.icon className="w-10 h-10 text-cyan-400 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-40 bg-zinc-950/30">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 max-w-6xl mx-auto">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="group relative h-full border-white/5 bg-zinc-900/20 backdrop-blur-2xl transition-all duration-500 hover:border-white/20 overflow-hidden rounded-[2rem]">
                  <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-linear-to-br ${feature.color} blur-3xl`} />
                  
                  <CardHeader className="relative z-10 p-10">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cyan-400 shadow-2xl group-hover:bg-cyan-500 group-hover:text-white transition-all duration-500">
                        <feature.icon className="h-8 w-8" />
                      </div>
                      
                    </div>
                    <CardTitle className="text-3xl font-black uppercase tracking-tighter mb-4">{feature.title}</CardTitle>
                    <p className="text-xl text-zinc-400 leading-relaxed font-medium">
                      {feature.desc}
                    </p>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-40 relative px-4">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 sm:p-12 md:p-24 rounded-[2rem] sm:rounded-[4rem] overflow-hidden bg-zinc-900 border border-white/5 text-center shadow-2xl max-w-5xl mx-auto"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.03)_0%,transparent_100%)]" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-black mb-8 tracking-tighter uppercase leading-none">
                Ready to <br />
                <span className="text-cyan-400">evolve?</span>
              </h2>
              <Link href="/create">
                <Button size="lg" className="h-16 sm:h-20 px-8 sm:px-12 text-xl sm:text-2xl font-black rounded-2xl sm:rounded-[2rem] bg-cyan-500 text-white hover:bg-cyan-400 transition-all shadow-[0_0_40px_rgba(6,182,212,0.2)] hover:scale-105 active:scale-95">
                  GET STARTED FREE
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
