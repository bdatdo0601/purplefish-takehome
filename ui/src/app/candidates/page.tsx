import React from "react";
import PocketBase from "pocketbase";
import { CandidateData } from "@/types/candidateInfo";

const CandidatesPage: React.FC = async () => {
  const pb = new PocketBase("http://127.0.0.1:8090");
  const candidates = await pb.collection("candidate_info").getFullList();

  const candidateList = candidates.map((item) => item.data.data);
  return (
    <div className="candidates-page">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">All Candidates</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {candidateList.map((candidate) => (
            <div
              key={candidate.id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {candidate.name}
                </h2>
                <p className="text-gray-600">{candidate.location}</p>
                <p className="text-gray-600">
                  Expected Salary: {candidate.expectedSalary}
                </p>
              </div>

              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Evaluation Score:
                  </span>
                  <span
                    className={`ml-2 px-2 py-1 rounded text-sm font-semibold ${
                      candidate.evaluation.score >= 9
                        ? "bg-green-100 text-green-800"
                        : candidate.evaluation.score >= 8
                          ? "bg-blue-100 text-blue-800"
                          : candidate.evaluation.score >= 7
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                    }`}
                  >
                    {candidate.evaluation.score}/10
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {candidate.evaluation.feedback}
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Background:
                </h3>
                <p className="text-sm text-gray-600">
                  {candidate.evaluation.excerpt.background}
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Skills:
                </h3>
                <div className="flex flex-wrap gap-1">
                  {candidate.evaluation.excerpt.identifiedSkills.map(
                    (skill: string, index: number) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Recommended Jobs:
                </h3>
                <div className="space-y-2">
                  {candidate.evaluation.recommendedJobs.map(
                    (job: any, index: number) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-3 rounded text-sm"
                      >
                        <p className="font-medium text-gray-800">{job.title}</p>
                        <p className="text-gray-600">{job.company}</p>
                        <p className="text-gray-500">{job.location}</p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidatesPage;
