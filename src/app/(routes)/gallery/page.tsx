import GalleryCourseCard from "@/components/pages/gallery/gallery-course-card";
import { prisma } from "@/lib/db";
import React from "react";

const page = async () => {
  const courses = await prisma.course.findMany({
    include: {
      units: {
        include: {
          chapters: true,
        },
      },
    },
  });
  return (
    <div className="py-8 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
        {courses.map((course) => {
          return <GalleryCourseCard course={course} key={course.id} />;
        })}
      </div>
    </div>
  );
};

export default page;
