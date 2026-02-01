import GalleryCourseCard from "@/components/pages/gallery/gallery-course-card";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { InfoIcon } from "lucide-react";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

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
    <div className="py-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      {session?.user && (
        <div className="mb-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3 text-amber-500 animate-in fade-in slide-in-from-top-4 duration-500">
          <InfoIcon className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">
            You get only  <span className="font-bold underline">2 credits </span> for a account. This means you can generate <span className="font-bold underline">2 courses</span> from this account.
          </p>
        </div>
      )}
      <div className="flex flex-col mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Course Gallery
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Explore our collection of AI-generated courses and start your learning journey today.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course) => {
          return <GalleryCourseCard course={course} key={course.id} />;
        })}
      </div>
    </div>
  );
};

export default page;
