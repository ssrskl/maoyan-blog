import MarkDownViewer from "@/components/MarkDownViewer";
import { TagSelect } from "@/components/TagSelect";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useSet } from "ahooks";

import { RotateCcw } from "lucide-react";
import React, { useState } from "react";

export const BlogPublish = () => {
  const [content, setContent] = useState("");
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const [selectedValues, { add, remove, reset }] = useSet<string>([]);
  return (
    <div className={"flex flex-col justify-center items-center min-h-dvh"}>
      <div className=" h-full flex-col container border-2 rounded-lg">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">发布文章</h2>
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
                        placeholder="请输入文章内容"
                        className=" min-h-[300px] lg:min-h-[700px] xl:min-h-[700px] max-h-[700px]"
                        value={content}
                        onChange={handleContentChange}
                      />
                      <div className="rounded-md border bg-muted p-4 max-h-[700px] overflow-y-auto">
                        <MarkDownViewer content={content} />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button onClick={() => console.log(selectedValues)}>
                        发布
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setContent("")}
                      >
                        <RotateCcw />
                      </Button>
                      <TagSelect
                        selectedValues={selectedValues}
                        onAdd={add}
                        onRemove={remove}
                        onReset={reset}
                      />
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
