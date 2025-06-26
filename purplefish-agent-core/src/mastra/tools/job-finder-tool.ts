import { createTool } from "@mastra/core/tools";
import { z } from "zod";

interface JobPosition {
  title: string;
  description: string;
  location: string;
  salaryRange: {
    lessThan: number;
    greaterThan: number;
  };
  jobRequirements: {
    niceToHave: string[];
    mustHave: string[];
  };
}

const exampleJobPositions: JobPosition[] = [
  {
    title: "Software Engineer",
    description: "Develop and maintain software applications",
    location: "San Francisco, CA",
    salaryRange: {
      lessThan: 150000,
      greaterThan: 100000,
    },
    jobRequirements: {
      niceToHave: [
        "Experience with React and Node.js",
        "Experience with AWS and Docker",
      ],
      mustHave: [
        "Bachelor's degree in Computer Science",
        "Proficiency in JavaScript and TypeScript",
      ],
    },
  },
  {
    title: "Data Scientist",
    description: "Analyze and interpret complex data sets",
    location: "New York, NY",
    salaryRange: {
      lessThan: 180000,
      greaterThan: 120000,
    },
    jobRequirements: {
      niceToHave: [
        "Experience with machine learning and data visualization",
        "Experience with AWS and Docker",
      ],
      mustHave: [
        "Master's degree in Statistics or related field",
        "Proficiency in Python and SQL",
      ],
    },
  },
  {
    title: "Nurse Practitioner",
    description: "Provide primary care and manage patient health",
    location: "Seattle, WA",
    salaryRange: {
      lessThan: 160000,
      greaterThan: 110000,
    },
    jobRequirements: {
      niceToHave: [
        "Experience with patient care and medical procedures",
        "Experience with AWS and Docker",
      ],
      mustHave: [
        "Bachelor's degree in Nursing",
        "Certification as a Registered Nurse",
      ],
    },
  },
];

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
  console.info(keywords);
  return exampleJobPositions;
};
