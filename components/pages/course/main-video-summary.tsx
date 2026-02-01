import { Chapter, Unit } from "@/lib/generated/prisma/client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FileText, Play } from "lucide-react";

type MainVideoSummaryProps = {
  chapter: Chapter;
  chapterIndex: number;
  unit: Unit;
  unitIndex: number;
};

function MainVideoSummary({
  chapter,
  chapterIndex,
  unit,
  unitIndex,
}: MainVideoSummaryProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="font-mono text-[10px] uppercase tracking-wider">
            Unit {unitIndex + 1}
          </Badge>
          <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-wider">
            Chapter {chapterIndex + 1}
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          {chapter.name}
        </h1>
      </div>

      <Card className="overflow-hidden border-border bg-muted/30 shadow-2xl shadow-primary/5">
        <div className="aspect-video relative group">
          <iframe
            title="chapter video"
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${chapter.videoId}`}
            allowFullScreen
          />
        </div>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-border pb-2">
          <FileText className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-bold">Chapter Summary</h3>
        </div>
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed text-muted-foreground bg-accent/30 p-6 rounded-2xl border border-border/50">
            {chapter.summary}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainVideoSummary;
