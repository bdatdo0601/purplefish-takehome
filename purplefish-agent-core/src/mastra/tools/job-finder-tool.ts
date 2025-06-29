import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { searchRelevantJob } from "./job-store";

export const jobFinderTool = createTool({
  id: "job-finder",
  description: "finding best matched job based on keywords",
  inputSchema: z.object({
    keywords: z.array(z.string().describe("relevant keywords")),
  }),
  outputSchema: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      location: z.string(),
      salaryRange: z.object({
        lessThan: z.number(),
        greaterThan: z.number(),
      }),
      jobRequirements: z.object({
        niceToHave: z.array(z.string()),
        mustHave: z.array(z.string()),
      }),
    }),
  ),
  execute: async ({ context }) => {
    return await getJobs(context.keywords);
  },
});

const getJobs = async (keywords: string[]) => {
  const result = searchRelevantJob(keywords);
  console.log(result);
  return result;
};
