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
    <div>
      <CourseSidebar course={course} currentChapterId={chapter.id} />
      <div>
        <div className="ml-[400px] px-8">
          <div className="flex">
            <MainVideoSummary
              chapter={chapter}
              chapterIndex={chapterIndex}
              unit={unit}
              unitIndex={unitIndex}
            />
            <QuizCards chapter={chapter} />
          </div>
          <div className="flex-[1] h-[1px] mt-4 text-gray-500 bg-gray-500" />

          <div className="flex px-8 pb-8">
            {prevChapter && (
              <Link
                href={`/course/${course.id}/${unitIndex}/${chapterIndex - 1}`}
                className="flex mt-4 mr-auto w-fit"
              >
                <div className="flex items-center">
                  <ChevronLeft className="w-6 h-6 mr-1" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-secondary-foreground/60">
                      Previous
                    </span>
                    <span className="text-xl font-bold">
                      {prevChapter.name}
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {nextChapter && (
              <Link
                href={`/course/${course.id}/${unitIndex}/${chapterIndex + 1}`}
                className="flex mt-4 ml-auto w-fit"
              >
                <div className="flex items-center">
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-secondary-foreground/60">
                      Next
                    </span>
                    <span className="text-xl font-bold">
                      {nextChapter.name}
                    </span>
                  </div>
                  <ChevronRight className="w-6 h-6 ml-1" />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
