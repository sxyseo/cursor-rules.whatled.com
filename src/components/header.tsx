import Link from "next/link";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { SubscribeForm } from "./ui/subscribe-form";

export function Header() {
  return (
    <div className="md:fixed top-0 z-10 px-6 py-2 w-full flex justify-between items-center bg-background backdrop-filter backdrop-blur-sm bg-opacity-30">
      <Link href="/" className="font-medium font-mono text-sm">
        cursor-rules.whatled.com
      </Link>

      <div className="flex items-center gap-4">
        <div className="hidden md:block">
          <SubscribeForm group="newsletter" placeholder="Get latest updates" />
        </div>

        <Link
          href="/live"
          className="flex items-center gap-2 text-sm font-medium"
        >
          <div className="font-semibold text-sm font-mono">
            <span className="relative ml-auto flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-red-400" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
          </div>
          <span>Live</span>
        </Link>

        <Link href="/learn" className="text-sm font-medium">
          Learn
        </Link>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="hover:bg-transparent p-0 text-sm font-medium"
            >
              About
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>About</DialogTitle>
            </DialogHeader>

            <DialogDescription>
              Copy and add a .cursorrules file in the root of your project.
              <br />
              <br />
              The instructions in the .cursorrules file will be included for
              features such as Cursor Chat and Ctrl/⌘ K. <br />
              <br />
              The more specific your rules for your project, the better.
              <br />
              <br />
              Feel free to create your own directory using our{" "}
              <a href="https://git.new/cd" className="underline">
                template
              </a>{" "}
              on GitHub.
              <br />
              <br />
              <br />
              <a href="https://git.new/cd">
                <Button
                  className="w-full bg-white text-black rounded-full"
                  variant="outline"
                >
                  Submit
                </Button>
              </a>
              <div className="flex items-center space-x-1 mt-8 justify-center">
                Made by{" "}
                <a href="https://midday.ai">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={102}
                    height={30}
                    fill="none"
                    className="scale-75"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M14.347 0a14.931 14.931 0 0 0-6.282 1.68l6.282 10.88V0Zm0 17.443L8.067 28.32a14.933 14.933 0 0 0 6.28 1.68V17.443ZM15.652 30V17.432l6.285 10.887A14.932 14.932 0 0 1 15.652 30Zm0-17.43V0c2.26.097 4.392.693 6.287 1.682l-6.287 10.889ZM2.336 23.068l10.884-6.284-6.284 10.884a15.093 15.093 0 0 1-4.6-4.6Zm25.33-16.132-10.88 6.282 6.282-10.88a15.094 15.094 0 0 1 4.598 4.598ZM2.335 6.934a15.094 15.094 0 0 1 4.6-4.6l6.284 10.884L2.335 6.934Zm-.654 1.13A14.931 14.931 0 0 0 0 14.35h12.568L1.681 8.064Zm0 13.873a14.932 14.932 0 0 1-1.68-6.282h12.562L1.682 21.938Zm15.754-7.587H30a14.93 14.93 0 0 0-1.68-6.285L17.435 14.35Zm10.884 7.586-10.878-6.28H30a14.932 14.932 0 0 1-1.68 6.28Zm-11.533-5.151 6.281 10.88a15.092 15.092 0 0 0 4.598-4.599l-10.88-6.281Z"
                      clipRule="evenodd"
                    />
                    <path
                      fill="currentColor"
                      d="M92.34 11.912h1.637l2.995 8.223 2.884-8.223h1.619l-4 11.107c-.372 1.06-1.08 1.544-2.196 1.544h-1.172v-1.358h1.024c.502 0 .8-.186.986-.707l.353-.912h-.52l-3.61-9.674ZM82.744 14.814c.39-1.916 1.916-3.126 4.018-3.126 2.549 0 3.963 1.489 3.963 4.13v3.964c0 .446.186.632.614.632h.39v1.358h-.65c-1.005 0-1.88-.335-1.861-1.544-.428.93-1.544 1.767-3.107 1.767-1.954 0-3.535-1.041-3.535-2.79 0-2.028 1.544-2.55 3.702-2.977l2.921-.558c-.018-1.712-.818-2.53-2.437-2.53-1.265 0-2.102.65-2.4 1.804l-1.618-.13Zm1.432 4.39c0 .8.689 1.452 2.14 1.433 1.637 0 2.92-1.153 2.92-3.442v-.167l-2.362.41c-1.47.26-2.698.371-2.698 1.767ZM80.129 8.563v13.21h-1.377l-.056-1.452c-.558 1.042-1.618 1.675-3.144 1.675-2.847 0-4.168-2.419-4.168-5.154s1.321-5.153 4.168-5.153c1.451 0 2.493.558 3.051 1.562V8.563h1.526Zm-7.145 8.28c0 1.915.819 3.701 2.884 3.701 2.028 0 2.865-1.823 2.865-3.702 0-1.953-.837-3.758-2.865-3.758-2.065 0-2.884 1.786-2.884 3.758ZM68.936 8.563v13.21H67.56l-.056-1.452c-.558 1.042-1.619 1.675-3.144 1.675-2.847 0-4.168-2.419-4.168-5.154s1.321-5.153 4.168-5.153c1.45 0 2.493.558 3.05 1.562V8.563h1.526Zm-7.144 8.28c0 1.915.819 3.701 2.884 3.701 2.028 0 2.865-1.823 2.865-3.702 0-1.953-.837-3.758-2.865-3.758-2.065 0-2.884 1.786-2.884 3.758ZM56.212 11.912h1.525v9.86h-1.525v-9.86Zm-.037-1.544V8.6h1.6v1.768h-1.6ZM40.224 11.912h1.395l.056 1.674c.446-1.21 1.47-1.898 2.846-1.898 1.414 0 2.438.763 2.865 2.084.428-1.34 1.47-2.084 3.014-2.084 1.973 0 3.126 1.377 3.126 3.74v6.344H52v-5.897c0-1.805-.707-2.828-1.916-2.828-1.544 0-2.437 1.041-2.437 2.846v5.88H46.12v-5.899c0-1.767-.725-2.827-1.916-2.827-1.526 0-2.456 1.079-2.456 2.827v5.898h-1.525v-9.86Z"
                    />
                  </svg>
                </a>
              </div>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
