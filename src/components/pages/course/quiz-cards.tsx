"use client";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Chapter, Question } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import React from "react";

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

  const checkAnswer = useCallback(() => {
    const newQuestionState = { ...questionState };

    chapter.questions.forEach((question) => {
      const user_answer = answers[question.id];
      if (!user_answer) return;
      if (user_answer == question.answer) {
        newQuestionState[question.id] = true;
      } else {
        newQuestionState[question.id] = false;
      }
    });
    setQuestionState(newQuestionState);
  }, [answers, questionState, chapter.questions]);

  return (
    <div className="flex-[1] mt-10 ml-8">
      <h1 className="text-2xl font-bold">Chapter Check</h1>
      <div className="mt-8">
        {chapter.questions.map((question) => {
          const options = JSON.parse(question.options) as string[];
          return (
            <div
              key={question.id}
              className={cn("p-3 mt-4 border border-secondary rounded-lg", {
                "bg-green-700": questionState[question.id] === true,
                "bg-red-700": questionState[question.id] === false,
                "bg-secondary": questionState[question.id] === null,
              })}
            >
              <h1 className="font-semibold text-lg">{question.question}</h1>

              <div className="mt-2">
                <RadioGroup
                  onValueChange={(e) => {
                    setAnswers((prev) => {
                      return {
                        ...prev,
                        [question.id]: e,
                      };
                    });
                  }}
                >
                  {options.map((option, index) => {
                    return (
                      <div className="flex items-center space-x-2" key={index}>
                        <RadioGroupItem
                          value={option}
                          id={question.id + index.toString()}
                        />
                        <Label htmlFor={question.id + index.toString()}>
                          {option}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>
            </div>
          );
        })}
      </div>
      <Button className="w-full mt-2" size="lg" onClick={checkAnswer}>
        Check Answer
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
}

export default QuizCards;
