import Link from "next/link";
import { Button } from "@/components/button";
import Image from "next/image";
import hero from "../public/images/hero.svg";
import team from "../public/images/work-with-any-team.png";
import information from "../public/images/information.svg";
import workflow from "../public/images/workflow.png";

export default function Home() {
  return (
    <div>
      <nav className="flex items-center justify-end h-16 px-4 gap-3 bg-muted">
        <Link href="/login">
          <Button className="h-8 bg-transparent hover:bg-transparent hover:font-semibold">
            Login
          </Button>
        </Link>
        <Link href="/register">
          <Button className="h-8 bg-primary">Register</Button>
        </Link>
      </nav>
      <main className="mx-auto w-full flex flex-col items-center p-2 max-w-5xl gap-16">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
          <div className="max-w-xl flex flex-col gap-3">
            <h2 className="text-3xl text-gradient-blue font-extrabold">
              Our task management app empowers teams to collaborate more
              effectively and enhance productivity
            </h2>
            <p className="text-xl">
              With intuitive boards, lists, and cards, teams can effortlessly
              organize and prioritize projects in an engaging, adaptable, and
              satisfying manner.
            </p>
          </div>
          <Image src={hero} alt="Hero image with tasks and people" />
        </div>
        <div className="flex lg:flex-row flex-col-reverse items-center justify-center gap-10">
          <Image src={team} alt="Hero image with tasks and people" />
          <div className="max-w-xl flex flex-col gap-3">
            <h2 className="text-3xl text-gradient-blue font-extrabold">
              Collaborate with Any Team
            </h2>
            <p className="text-xl">
              Whether it&apos;s for work, a side project, or planning your next
              family vacation, our app keeps your team organized and on track.
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
          <div className="max-w-xl flex flex-col gap-3">
            <h2 className="text-3xl text-gradient-blue font-extrabold">
              Key Insights at a Glance
            </h2>
            <p className="text-xl">
              Explore the details by adding comments, attachments, due dates,
              and more directly to your task cards. Collaborate on projects from
              start to finish.
            </p>
          </div>
          <Image src={information} alt="Hero image with tasks and people" />
        </div>
        <div className="flex lg:flex-row flex-col-reverse items-center justify-center gap-10">
          <div className="max-w-sm">
            <Image src={workflow} alt="Hero image with tasks and people" />
          </div>
          <div className="max-w-xl flex flex-col gap-3">
            <h2 className="text-3xl text-gradient-blue font-extrabold">
              Integrated Workflow Automation
            </h2>
            <p className="text-xl">
              Let automation handle the repetitive tasks! Enhance productivity
              by harnessing the power of automated workflows across your team.
              Eliminate tedious tasks from your to-do lists with:
            </p>
            <ul className="list-inside list-disc">
              <li>Rule-Based Triggers</li>
              <li>Custom Card & Board Buttons</li>
              <li>Calendar Commands</li>
              <li>Due Date Commands</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
