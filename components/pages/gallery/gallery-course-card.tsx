import { Chapter, Course, Unit } from "@/lib/generated/prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Layers, ArrowRight } from "lucide-react";

type GalleryCourseCardProps = {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
};

function GalleryCourseCard({ course }: GalleryCourseCardProps) {
  const totalChapters = course.units.reduce((acc, unit) => acc + unit.chapters.length, 0);

  return (
    <Card className="group overflow-hidden border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
      <Link href={`/course/${course.id}/0/0`} className="block">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={course.image || ""}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            width={400}
            height={225}
            alt={course.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
          <div className="absolute bottom-3 left-3 right-3">
             <Badge variant="secondary" className="bg-primary/90 text-primary-foreground border-none backdrop-blur-md">
                {course.units.length} Units
             </Badge>
          </div>
        </div>
      </Link>

      <CardHeader className="p-5 pb-2">
        <Link href={`/course/${course.id}/0/0`}>
          <h3 className="text-xl font-bold leading-tight tracking-tight group-hover:text-primary transition-colors line-clamp-1">
            {course.name}
          </h3>
        </Link>
      </CardHeader>

      <CardContent className="p-5 pt-0 space-y-4">
        <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>{course.units.length} Units</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{totalChapters} Chapters</span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">Featured Units</p>
          <div className="flex flex-wrap gap-1.5">
            {course.units.slice(0, 3).map((unit) => (
              <Badge key={unit.id} variant="outline" className="text-[10px] font-medium bg-muted/50">
                {unit.name}
              </Badge>
            ))}
            {course.units.length > 3 && (
              <span className="text-[10px] text-muted-foreground font-medium pl-1">
                +{course.units.length - 3} more
              </span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 border-t border-border/50 mt-auto">
        <Link 
          href={`/course/${course.id}/0/0`}
          className="w-full mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl active:scale-95"
        >
          Start Learning
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  );
}

export default GalleryCourseCard;
