import { Document, DocumentData } from "flexsearch";
import { flatten, unflatten } from "flat";
import { v4 as uuidv4 } from "uuid";
import { JobPosition, jobs } from "./jobs_db";

const jobIndex = new Document({
  document: {
    id: "id",
    store: true,
    index: [
      {
        field: "title",
      },
      {
        field: "company",
      },
      {
        field: "description",
      },
      {
        field: "location",
      },
      {
        field: "jobRequirements.mustHave",
      },
      {
        field: "jobRequirements.niceToHave",
      },
    ],
  },
});

for (const job of jobs) {
  const flattenJob = flatten(job);

  jobIndex.add(uuidv4(), flattenJob as any);
}

export const searchRelevantJob = (query: string[]) => {
  const results = jobIndex.search({
    query: query.join(" "),
    suggest: true,
    enrich: true,
    merge: true,
  });
  return results.map<JobPosition>((result) =>
    unflatten(result.doc as DocumentData),
  );
};
