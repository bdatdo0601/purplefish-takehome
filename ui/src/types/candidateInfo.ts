export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
}

export interface CandidateEvaluation {
  score: number;
  feedback: string;
  excerpt: {
    identifiedSkills: string[];
    background: string;
  };
  recommendedJobs: Job[];
}

export interface CandidateInfo {
  id: string;
  sessionId: string;
  name: string;
  email: string;
  location: string;
  expectedSalary: string;
  evaluation: CandidateEvaluation;
}

export interface CandidateData {
  id: string;
  data: CandidateInfo;
}
