import { ScrollArea } from "@/components/ui/scroll-area";
import { Chapter, Course, Unit } from "@/lib/generated/prisma/client";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, PlayCircle } from "lucide-react";
import Link from "next/link";

type Props = {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
  currentChapterId: string;
};

function CourseSidebar({ course, currentChapterId }: Props) {
  return (
    <div className="hidden lg:flex flex-col w-[400px] fixed top-16 left-0 bottom-0 border-r border-border bg-card/50 backdrop-blur-xl">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold tracking-tight line-clamp-2">{course.name}</h1>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {course.units.map((unit, unitIndex) => (
            <div key={unit.id} className="space-y-3">
              <div className="flex items-center gap-2 px-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                  {unitIndex + 1}
                </span>
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {unit.name}
                </h2>
              </div>
              
              <div className="space-y-1">
                {unit.chapters.map((chapter, chapterIndex) => {
                  const isActive = chapter.id === currentChapterId;
                  return (
                    <Link
                      key={chapter.id}
                      href={`/course/${course.id}/${unitIndex}/${chapterIndex}`}
                      className={cn(
                        "group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                        isActive 
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                          : "hover:bg-accent text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {isActive ? (
                        <PlayCircle className="w-4 h-4 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 shrink-0 group-hover:text-primary transition-colors" />
                      )}
                      <span className="text-sm font-medium line-clamp-1">
                        {chapter.name}
                      </span>
                      {/* Mock completion icon */}
                      {chapterIndex === 0 && unitIndex === 0 && !isActive && (
                        <CheckCircle2 className="w-3.5 h-3.5 ml-auto text-green-500" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default CourseSidebar;
