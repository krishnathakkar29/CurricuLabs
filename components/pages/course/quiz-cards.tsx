"use client";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Chapter, Question } from "@/lib/generated/prisma/client";
import { ChevronRight, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

type QuizCardsProps = {
  chapter: Chapter & {
    questions: Question[];
  };
};

function QuizCards({ chapter }: QuizCardsProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [questionState, setQuestionState] = useState<
    Record<string, boolean | null>
  >({});
  const [isChecking, setIsChecking] = useState(false);

  const checkAnswer = useCallback(() => {
    setIsChecking(true);
    setTimeout(() => {
      const newQuestionState = { ...questionState };
      chapter.questions.forEach((question) => {
        const user_answer = answers[question.id];
        if (!user_answer) return;
        newQuestionState[question.id] = user_answer === question.answer;
      });
      setQuestionState(newQuestionState);
      setIsChecking(false);
    }, 600);
  }, [answers, questionState, chapter.questions]);

  return (
    <Card className="xl:sticky xl:top-24 border-border bg-card/50 backdrop-blur-sm shadow-xl overflow-hidden w-full">
      <CardHeader className="bg-primary/5 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Chapter Check</CardTitle>
              <CardDescription className="text-xs">Test your knowledge</CardDescription>
            </div>
          </div>
          <div className="text-xs font-bold font-mono px-2 py-1 rounded bg-background border border-border">
            {Object.keys(questionState).length}/{chapter.questions.length}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-8">
        {chapter.questions.map((question, qIdx) => {
          const options = JSON.parse(question.options) as string[];
          const isCorrect = questionState[question.id] === true;
          const isWrong = questionState[question.id] === false;
          
          return (
            <motion.div 
              key={question.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: qIdx * 0.1 }}
              className="space-y-4"
            >
              <div className="flex gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-muted text-xs font-bold shrink-0">
                  {qIdx + 1}
                </span>
                <h3 className="font-semibold leading-tight">{question.question}</h3>
              </div>

              <RadioGroup
                onValueChange={(val) => {
                  setAnswers(prev => ({ ...prev, [question.id]: val }));
                  setQuestionState(prev => ({ ...prev, [question.id]: null }));
                }}
                className="grid gap-2"
              >
                {options.map((option, idx) => {
                  const isSelected = answers[question.id] === option;
                  return (
                    <Label
                      key={idx}
                      htmlFor={`${question.id}-${idx}`}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:bg-accent",
                        isSelected ? "border-primary bg-primary/5" : "border-transparent bg-muted/30",
                        isCorrect && isSelected && "border-green-500 bg-green-500/10",
                        isWrong && isSelected && "border-destructive bg-destructive/10"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value={option} id={`${question.id}-${idx}`} className="sr-only" />
                        <span className="text-sm font-medium">{option}</span>
                      </div>
                      {isSelected && (
                        <AnimatePresence mode="wait">
                          {isCorrect ? (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><CheckCircle2 className="w-4 h-4 text-green-500" /></motion.div>
                          ) : isWrong ? (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><XCircle className="w-4 h-4 text-destructive" /></motion.div>
                          ) : (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><div className="w-2 h-2 rounded-full bg-primary animate-pulse" /></motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </Label>
                  );
                })}
              </RadioGroup>
            </motion.div>
          );
        })}
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button 
          className="w-full h-12 text-md font-bold shadow-lg shadow-primary/20 group" 
          onClick={checkAnswer}
          disabled={isChecking || Object.keys(answers).length < chapter.questions.length}
        >
          {isChecking ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
              Checking...
            </div>
          ) : (
            <>
              Verify Answers
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default QuizCards;
