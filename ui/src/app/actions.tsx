"use server";

import PocketBase from "pocketbase";
import { MastraClient } from "@mastra/client-js";
import { ChatSession } from "@/types/chat";
import { XMLParser } from "fast-xml-parser";
import { PreScreeningAgentResponse } from "@/types/agent";
import { CandidateData } from "@/types/candidateInfo";
import { revalidatePath } from "next/cache";

export async function createChatSession() {
  const pocketbase = new PocketBase("http://localhost:8090");
  // Create chat session on server
  try {
    const session = await pocketbase
      .collection("chat_sessions")
      .create<ChatSession>({
        title: "",
        metadata: {},
        session_data: {
          messages: [],
        },
      });
    return session.id;
  } catch (error) {
    console.log(JSON.stringify(error));
    throw error;
  }
}

export async function deleteChatSession(id: string) {
  const pocketbase = new PocketBase("http://localhost:8090");
  // Delete chat session on server
  try {
    await pocketbase.collection("chat_sessions").delete(id);
  } catch (error) {
    console.log(JSON.stringify(error));
    throw error;
  }
}

export async function onNewMessageInSession(updatedSession: ChatSession) {
  const mastra = new MastraClient({
    baseUrl: "http://localhost:4111",
  });
  const pb = new PocketBase("http://localhost:8090");
  const processingData = { ...updatedSession };

  try {
    // Update session in database
    await pb
      .collection("chat_sessions")
      .update<ChatSession>(updatedSession.id, updatedSession);

    // Generate AI response
    const agentResponse = await generateAgentResponse(mastra, processingData);
    const parsedResponse = parseAgentResponse(agentResponse.text);

    // Update session with AI response
    updateSessionWithResponse(processingData, parsedResponse);

    // Save updated session
    await pb
      .collection("chat_sessions")
      .update<ChatSession>(processingData.id, processingData);

    // Handle conversation completion
    if (processingData.session_data.isCompleted) {
      await handleConversationCompletion(pb, processingData, parsedResponse);
    }

    revalidatePath(`/?sessionId=${processingData.id}`);
  } catch (error) {
    console.log("Error processing message:", error);
    throw error;
  }
}

async function generateAgentResponse(
  mastra: MastraClient,
  processingData: ChatSession,
) {
  const agent = mastra.getAgent("preScreeningAgent");
  return await agent.generate({
    messages: processingData.session_data.messages.map<{
      role: "user" | "assistant";
      content: string;
    }>((item) => ({
      role: item.role as "user" | "assistant",
      content: item.content,
    })),
    threadId: processingData.id,
    resourceId: "pre-screening-chat",
  });
}

function parseAgentResponse(responseText: string): PreScreeningAgentResponse {
  // extract XML response using regex with <response>...</response>
  const xmlRegex = /<response>([\s\S]*?)<\/response>/;
  const xmlMatch = responseText.match(xmlRegex);
  const xmlRawString = xmlMatch ? xmlMatch[0] : null;

  if (!xmlRawString) {
    return {
      response: {
        followUp: responseText,
        isConversationCompleted: false,
        title: "",
        candidateEvaluation: {
          basicInfo: {
            name: "",
            salaryExpectation: "",
            location: "",
            email: "",
          },
          recommendedJobs: {},
          score: 0,
          feedback: "",
          excerpt: {
            candidateSkills: "",
            candidateBackground: "",
          },
        },
      },
    };
  }
  const xmlParser = new XMLParser();
  return xmlParser.parse(xmlRawString) as PreScreeningAgentResponse;
}

function updateSessionWithResponse(
  processingData: ChatSession,
  parsedResponse: PreScreeningAgentResponse,
) {
  processingData.session_data.messages.push({
    role: "assistant",
    content: parsedResponse.response.followUp,
    timestamp: new Date(),
    id: processingData.session_data.messages.length.toString(),
  });
  processingData.title = parsedResponse.response.title;
  processingData.session_data.isCompleted =
    parsedResponse.response.isConversationCompleted;
  processingData.session_data.isLoading = false;
}

async function handleConversationCompletion(
  pb: PocketBase,
  processingData: ChatSession,
  parsedResponse: PreScreeningAgentResponse,
) {
  const candidateInfo = buildCandidateData(processingData, parsedResponse);
  await pb.collection("candidate_info").create<CandidateData>({
    id: candidateInfo.id,
    data: candidateInfo,
  });
}

function buildCandidateData(
  processingData: ChatSession,
  parsedResponse: PreScreeningAgentResponse,
): CandidateData {
  const evaluation = parsedResponse.response.candidateEvaluation;

  return {
    id: processingData.id,
    data: {
      id: processingData.id,
      sessionId: processingData.id,
      name: evaluation.basicInfo.name,
      email: evaluation.basicInfo.email,
      location: evaluation.basicInfo.location,
      expectedSalary: evaluation.basicInfo.salaryExpectation.toString(),
      evaluation: {
        score: evaluation.score,
        feedback: evaluation.feedback,
        excerpt: {
          identifiedSkills: evaluation.excerpt.candidateSkills
            .split(",")
            .map((item) => item.trim()),
          background: evaluation.excerpt.candidateBackground,
        },
        recommendedJobs: evaluation.recommendedJobs.job
          ? [evaluation.recommendedJobs.job]
          : [],
      },
    },
  };
}
