"use client";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { Zap } from "lucide-react";
import axios from "axios";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";

type Props = {};

const SubscriptionAction = (props: Props) => {
  const { data } = useSession();
  console.log("data", data);
  const [loading, setLoading] = React.useState(false);
  const [credits, setCredits] = React.useState<number>(0);
  const [creditsLoading, setCreditsLoading] = React.useState(true);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const response = await axios.get("/api/credits");
        setCredits(response.data.credits);
      } catch (error) {
        console.error("Error fetching credits:", error);
      } finally {
        setCreditsLoading(false);
      }
    };
    fetchCredits();
  }, []);
  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  if (creditsLoading) {
    return (
      <div className="w-1/2 p-4 mx-auto mt-4 rounded-md bg-secondary animate-pulse h-10"></div>
    );
  }
  return (
    <div className="flex flex-col items-center w-1/2 p-4 mx-auto mt-4 rounded-md bg-secondary">
      {credits} / 10 Free Generations
      <Progress className="mt-2" value={credits ? (credits / 10) * 100 : 0} />
      <Button
        disabled={loading}
        onClick={handleSubscribe}
        className="mt-3 font-bold text-white transition bg-gradient-to-tr from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600"
      >
        Upgrade
        <Zap className="fill-white ml-2" />
      </Button>
    </div>
  );
};

export default SubscriptionAction;
