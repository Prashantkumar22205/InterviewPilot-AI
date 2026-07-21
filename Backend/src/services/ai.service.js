const {GoogleGenAI} = require("@google/genai");
const { model } = require("mongoose");
const { z } = require("zod")
// const { zodToJsonSchema } = require("zod-to-json-schema")

const puppeteer = require("puppeteer")

const ai= new GoogleGenAI({
     apiKey: process.env.GOOGLE_GENAI_API_KEY
});




const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
     title: z.string().describe("The title of the job for which the interview report is generated"),
})


async function generateInterviewReport({ resume, selfDescription, jobDescription }) {


//   const prompt = `
// You are an expert technical interviewer.

// Analyze the candidate.

// Resume:
// ${resume}

// Self Description:
// ${selfDescription}

// Job Description:
// ${jobDescription}

// IMPORTANT RULES

// Return ONLY JSON.

// Do not return markdown.

// Do not wrap JSON objects inside strings.

// Every array element must be a JSON object.

// Do not create extra properties.

// Follow the provided response schema exactly.

// Generate:
// - title of Report
// - matchScore
// - 8 technical questions
// - 5 behavioral questions
// - skill gaps
// - 7-day preparation plan
// `;

const prompt = `
You are an experienced Senior Software Engineer and Technical Interviewer at a top product-based company (Google, Microsoft, Amazon, Meta, Adobe, Atlassian).

Your job is to analyze the candidate's profile against the target job description and generate a realistic interview preparation report.

Candidate Resume:
${resume}

Candidate Self Description:
${selfDescription}

Target Job Description:
${jobDescription}

========================
GUIDELINES
========================

Analyze BOTH the candidate profile and the job description before generating the report.

Base every recommendation on the information provided.

Never generate generic interview content.

Prioritize skills explicitly mentioned in the job description.

If the candidate already demonstrates a required skill through projects or experience, generate deeper practical interview questions instead of basic theoretical ones.

If an important required skill is missing, generate interview questions that evaluate that missing skill.

Do not invent technologies or experience that are not present in either the resume or the job description.

========================
TECHNICAL QUESTIONS
========================

Generate EXACTLY 8 technical interview questions.

Requirements:

- Cover multiple important technologies from the job description.
- Progress naturally from easier questions to more challenging ones.
- Prefer scenario-based and practical questions over textbook definitions.
- Reference the candidate's projects or experience whenever possible.
- Avoid repeating the same topic.
- If DSA, System Design, or OOP are not required by the job description, do not force questions about them.

For every technical question:
- Explain what the interviewer wants to evaluate.
- Provide a concise, high-quality answer that highlights the key points a strong candidate should cover.

========================
BEHAVIORAL QUESTIONS
========================

Generate EXACTLY 5 behavioral interview questions.

Requirements:

- Tailor them to the candidate's background.
- Ask about projects, teamwork, problem-solving, learning ability, ownership, debugging, communication, deadlines, and decision making where appropriate.
- Avoid generic questions like "Tell me about yourself" unless absolutely necessary.
- Make the questions sound like those asked by real interviewers.

For every behavioral question:
- Explain why the interviewer is asking it.
- Provide a structured answer using the STAR approach whenever appropriate.

========================
SKILL GAPS
========================

Identify only meaningful skill gaps.

Do not list technologies that are optional or only loosely related to the role.

Severity should reflect how much the missing skill affects the candidate's chances.

========================
7-DAY PREPARATION PLAN
========================

Generate a practical 7-day preparation plan.

Requirements:

- Prioritize the most important missing skills first.
- Do not waste time revising technologies the candidate already demonstrates confidently.
- Mix theory, coding practice, project revision, interview preparation, and behavioral preparation.
- Each day's workload should realistically take around 2-3 hours.
- Ensure the preparation order builds logically from fundamentals to advanced concepts.

========================
OUTPUT FORMAT
========================

Return ONLY valid JSON.

Do NOT return Markdown.

Do NOT include explanations outside the JSON.

Follow the response schema exactly.

Do not add extra fields.
`;


    const response = await ai.models.generateContent({
       model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: z.toJSONSchema(interviewReportSchema)
        }
    })


  const report = JSON.parse(response.text);

const normalize = (arr) =>
  arr.map(item => {
    if (typeof item === "string") {
      return JSON.parse(item);
    }
    return item;
  });

if (report.technicalQuestions)
  report.technicalQuestions = normalize(report.technicalQuestions);

if (report.behavioralQuestions)
  report.behavioralQuestions = normalize(report.behavioralQuestions);

if (report.skillGaps)
  report.skillGaps = normalize(report.skillGaps);

if (report.preparationPlan)
  report.preparationPlan = normalize(report.preparationPlan);

console.dir(report, {
    depth: null,
    colors: true
});

return report;


}


async function generateResumeFromPdf(htmlContent) {

      const isRender = !!process.env.RENDER;

      const executable = await puppeteer.executablePath();
      console.log("RENDER:", process.env.RENDER);
      console.log("Executable:", executable);

        const browser = await puppeteer.launch({
           executablePath: executable,
            headless: true,
            args: isRender
            ? [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
              ]
            : [],
  })
      const page = await browser.newPage()
      await page.setContent(htmlContent, { waitUntil: "networkidle0" })

        const pdfBuffer = await page.pdf({
        format: "A4", margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    })

    await browser.close()

    return pdfBuffer
}


async function generateResumePdf({ resume, selfDescription, jobDescription }){
    const resumePdfSchema = z.object({
        html:z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                    `
    const response = await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:prompt,
           config: {
            responseMimeType: "application/json",
            responseSchema: z.toJSONSchema(resumePdfSchema)
        }
    })

    const jsonContent = JSON.parse(response.text)

    const pdfBuffer = await generateResumeFromPdf(jsonContent.html)

    return pdfBuffer


}

module.exports={generateInterviewReport,generateResumePdf}
