import MarkDownViewer from "@/components/MarkDownViewer";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";

import { Textarea } from "@/components/ui/textarea";
import { RotateCcw } from "lucide-react";
import { useState } from "react";

export const TestPage2 = () => {
  const [content, setContent] = useState("");
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  return (
    <div className={"flex flex-col justify-center items-center min-h-dvh"}>
      <div className=" h-full flex-col container border-2 rounded-lg">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">Playground</h2>
        </div>
        <Separator />
        <div className="flex-1">
          <div className="container h-full py-6">
            <div className="grid h-full items-stretch gap-6 ">
              <div className="hidden flex-col space-y-4 sm:flex md:order-2"></div>
              <div className="md:order-1">
                <div className="mt-0 border-0 p-0">
                  <div className="flex flex-col space-y-4">
                    <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
                      <Textarea
                        placeholder="We're writing to [inset]. Congrats from OpenAI!"
                        className=" min-h-[300px] lg:min-h-[700px] xl:min-h-[700px] max-h-[700px]"
                        value={content}
                        onChange={handleContentChange}
                      />
                      <div className="rounded-md border bg-muted p-4 max-h-[700px] overflow-y-auto">
                        <MarkDownViewer content={content} />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button>Submit</Button>
                      <Button variant="secondary">
                        <span className="sr-only">Show history</span>
                        <RotateCcw />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
