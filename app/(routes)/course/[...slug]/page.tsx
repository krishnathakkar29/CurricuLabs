import CourseSidebar from "@/components/pages/course/course-sidebar";
import MainVideoSummary from "@/components/pages/course/main-video-summary";
import QuizCards from "@/components/pages/course/quiz-cards";
import {prisma} from "@/lib/db";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = await (await params).slug;
  const [courseId, unitIndexParam, chapterIndexParam] = slug;

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      units: {
        include: {
          chapters: {
            include: {
              questions: true,
            },
          },
        },
      },
    },
  });

  if (!course) {
    redirect("/gallery");
  }
  let unitIndex = parseInt(unitIndexParam);
  let chapterIndex = parseInt(chapterIndexParam);

  const unit = course.units[unitIndex];

  if (!unit) {
    redirect("/gallery");
  }
  const chapter = unit.chapters[chapterIndex];
  if (!chapter) {
    redirect("/gallery");
  }
  const nextChapter = unit.chapters[chapterIndex + 1];
  const prevChapter = unit.chapters[chapterIndex - 1];
  //   console.log("course unitss \n ", JSON.stringify(course.units[0]));
  return (
    <div className="min-h-screen bg-background">
      <CourseSidebar course={course} currentChapterId={chapter.id} />
      <main className="lg:pl-[400px] transition-all duration-300">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col xl:flex-row gap-8">
            <div className="flex-1 space-y-8">
              <MainVideoSummary
                chapter={chapter}
                chapterIndex={chapterIndex}
                unit={unit}
                unitIndex={unitIndex}
              />
              
              <div className="flex items-center justify-between pt-8 border-t border-border">
                {prevChapter ? (
                  <Link
                    href={`/course/${course.id}/${unitIndex}/${chapterIndex - 1}`}
                    className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-accent transition-all"
                  >
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Previous</span>
                      <span className="text-sm font-bold line-clamp-1">{prevChapter.name}</span>
                    </div>
                  </Link>
                ) : <div />}

                {nextChapter && (
                  <Link
                    href={`/course/${course.id}/${unitIndex}/${chapterIndex + 1}`}
                    className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-accent transition-all text-right"
                  >
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Next</span>
                      <span className="text-sm font-bold line-clamp-1">{nextChapter.name}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            </div>
            
            <aside className="xl:w-[450px] shrink-0">
              <QuizCards chapter={chapter} />
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
