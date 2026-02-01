
import CreateCourseForm from "@/components/pages/create/create-course-form";
import { auth } from "@/lib/auth";
// import { checkSubscription } from "@/lib/stripe";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const CreatePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return redirect("/gallery");
  }
  // const isPro = await checkSubscription();
  return (
    <div className="flex flex-col items-start max-w-xl px-8 mx-auto my-16 sm:px-0">
      <h1 className="self-center text-3xl font-bold text-center sm:text-6xl">
        CurricuLabs
      </h1>
      <div className="flex p-4 mt-5 border-none bg-secondary">
        <InfoIcon className="w-12 h-12 mr-3 text-blue-400" />
        <div>
          Enter in a course title, or what you want to learn about. Then enter a
          list of units, which are the specifics you want to learn. And our AI
          will generate a course for you!
        </div>
      </div>

      <CreateCourseForm isPro={false} />
    </div>
  );
};

export default CreatePage;
