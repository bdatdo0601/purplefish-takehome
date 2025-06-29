import { Job } from "./candidateInfo";

export interface PreScreeningAgentResponse {
  response: {
    title: string;
    isConversationCompleted: boolean;
    followUp: string;
    candidateEvaluation: {
      basicInfo: {
        name: string;
        salaryExpectation: string;
        location: string;
        email: string;
      };
      recommendedJobs: {
        job?: Job;
      };
      score: number;
      feedback: string;
      excerpt: {
        candidateSkills: string;
        candidateBackground: string;
      };
    };
  };
}
