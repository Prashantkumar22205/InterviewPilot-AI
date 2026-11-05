const {GoogleGenAI} = require("@google/genai");
const { model } = require("mongoose");
const { z } = require("zod")
// const { zodToJsonSchema } = require("zod-to-json-schema")

// const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

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

const puppeteer = require("puppeteer");

async function generateResumeFromPdf(htmlContent) {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox"
        ]
    });

    try {
        const page = await browser.newPage();

        await page.setContent(htmlContent, {
            waitUntil: "networkidle0"
        });

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
           margin: {
              top: "9mm",
              bottom: "9mm",
              left: "11mm",
              right: "11mm"
}
        });

        return pdfBuffer;

    } finally {
        await browser.close();
    }
}
// async function generateResumeFromPdf(htmlContent) {

//      const executablePath = process.env.CHROMIUM_PATH || await chromium.executablePath();
//          const browser = await puppeteer.launch({
//           executablePath,
//           args: chromium.args,
//           headless: true,
//   });
//       const page = await browser.newPage()
//       await page.setContent(htmlContent, { waitUntil: "networkidle0" })

//         const pdfBuffer = await page.pdf({
//         format: "A4", margin: {
//             top: "20mm",
//             bottom: "20mm",
//             left: "15mm",
//             right: "15mm"
//         }
//     })

//     await browser.close()

//     return pdfBuffer
// }


// async function generateResumePdf({ resume, selfDescription, jobDescription }){
//     const resumePdfSchema = z.object({
//         html:z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
//     })

//     const prompt = `Generate resume for a candidate with the following details:
//                         Resume: ${resume}
//                         Self Description: ${selfDescription}
//                         Job Description: ${jobDescription}
//                        *** The resume should be a single page remmber single page.
//                         the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
//                         The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
//                         The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
//                         you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
//                         The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
//                         The resume should not be so lengthy, it should ideally be 1y pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
//                     `
//     const response = await ai.models.generateContent({
//         model:"gemini-2.5-flash",
//         contents:prompt,
//            config: {
//             responseMimeType: "application/json",
//             responseSchema: z.toJSONSchema(resumePdfSchema)
//         }
//     })

//     const jsonContent = JSON.parse(response.text)

//     const pdfBuffer = await generateResumeFromPdf(jsonContent.html)

//     return pdfBuffer


// }

async function generateResumePdf({ resume, selfDescription, jobDescription }){
      const resumeContent = await generateResumeContent({
        resume,
        selfDescription,
        jobDescription
    });
    
      const html = buildResumeHtml(resumeContent);
      const pdfBuffer = await generateResumeFromPdf(html);

    return pdfBuffer;

}


async function generateResumeContent({ resume, selfDescription, jobDescription }) {

    const resumeSchema = z.object({
        name: z.string(),

        contact: z.object({
            phone: z.string(),
            email: z.string(),
            linkedin: z.string().optional(),
            github: z.string().optional(),
            portfolio: z.string().optional()
        }),

        summary: z.string(),

        skills: z.array(
            z.object({
                category: z.string(),
                skills: z.array(z.string())
            })
        ),

        projects: z.array(
            z.object({
                name: z.string(),
                technologies: z.array(z.string()),
                bullets: z.array(z.string())
            })
        ),

        education: z.array(
            z.object({
                degree: z.string(),
                institution: z.string(),
                details: z.string()
            })
        ),

        certifications: z.array(z.string()),

        achievements: z.array(z.string())
    });


    const prompt = `
You are an expert technical resume writer.

Create structured resume content for the candidate below.

========================
CANDIDATE RESUME
========================
${resume}

========================
SELF DESCRIPTION
========================
${selfDescription}

========================
TARGET JOB DESCRIPTION
========================
${jobDescription}

========================
IMPORTANT RULES
========================

1. Generate ONLY the structured resume content required by the schema.

2. Do NOT generate HTML.

3. Do NOT generate CSS.

4. Do NOT generate Markdown.

5. The final resume will be rendered by our application into a SINGLE A4 PAGE.

6. Keep the content concise enough to fit on one page.

7. Do NOT invent:
   - technologies
   - companies
   - experience
   - achievements
   - certifications
   - projects
   - metrics

8. Tailor the resume toward the target job description.

9. Prioritize skills and experience that are relevant to the target job.

10. Summary:
    - maximum 2-3 sentences
    - concise
    - professional
    - avoid generic AI-generated language

11. Skills:
    - include only skills supported by the candidate information
    - group related skills logically

12. Projects:
    - include the most relevant projects
    - maximum 3 projects
    - maximum 4 bullet points per project
    - bullets should be concise
    - emphasize technologies, implementation, and measurable impact when actual metrics exist

13. Education:
    - keep it concise

14. Certifications:
    - include only actual certifications

15. Achievements:
    - include only actual achievements

16. ATS FRIENDLINESS:
    - use standard professional terminology
    - use conventional section information
    - avoid decorative content
    - avoid unnecessary wording
    - prioritize keywords from the job description when they are genuinely supported by the candidate

17. Never claim that the candidate has experience with a technology merely because it appears in the job description.

Return ONLY valid JSON matching the provided schema.
`;


    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",

        contents: prompt,

        config: {
            responseMimeType: "application/json",
            responseSchema: z.toJSONSchema(resumeSchema)
        }
    });


    const resumeContent = JSON.parse(response.text);

    console.dir(resumeContent, {
        depth: null,
        colors: true
    });

    return resumeContent;
}

 function buildResumeHtml(data) {
    const {
        name,
        contact,
        summary,
        skills,
        projects,
        education,
        certifications,
        achievements
    } = data;

    const escapeHtml = (text = "") =>
        String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    const contactItems = [
        contact.phone,
        contact.email,
        contact.linkedin,
        contact.github,
        contact.portfolio
    ].filter(Boolean);

    const skillsHtml = skills.map(skill => `
        <div class="skill-row">
            <strong>${escapeHtml(skill.category)}:</strong>
            <span>${skill.skills.map(escapeHtml).join(", ")}</span>
        </div>
    `).join("");

    const projectsHtml = projects.map(project => `
        <div class="project">
            <div class="project-header">
                <strong>${escapeHtml(project.name)}</strong>
                <span>${project.technologies.map(escapeHtml).join(", ")}</span>
            </div>

            <ul>
                ${project.bullets.map(bullet => `
                    <li>${escapeHtml(bullet)}</li>
                `).join("")}
            </ul>
        </div>
    `).join("");

    const educationHtml = education.map(item => `
        <div class="education-item">
            <div class="education-header">
                <strong>${escapeHtml(item.degree)}</strong>
            </div>

            <div class="institution">
                ${escapeHtml(item.institution)}
            </div>

            <div class="education-details">
                ${escapeHtml(item.details)}
            </div>
        </div>
    `).join("");

    const certificationsHtml = certifications.length
        ? `
            <ul>
                ${certifications.map(item => `
                    <li>${escapeHtml(item)}</li>
                `).join("")}
            </ul>
        `
        : "";

    const achievementsHtml = achievements.length
        ? `
            <ul>
                ${achievements.map(item => `
                    <li>${escapeHtml(item)}</li>
                `).join("")}
            </ul>
        `
        : "";

    return `
<!DOCTYPE html>
<html>
<head>

<meta charset="UTF-8">

<style>

@page {
    size: A4;
    margin: 8mm 10mm;
}

* {
    box-sizing: border-box;
}

html,
body {
    margin: 0;
    padding: 0;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    color: #111;
    font-size: 9.3pt;
    line-height: 1.18;
}

.resume {
    width: 100%;
}

/* =========================
   HEADER
========================= */

.header {
    text-align: center;
    margin-bottom: 5px;
}

.name {
    font-size: 18pt;
    font-weight: 700;
    margin-bottom: 3px;
    letter-spacing: 0.2px;
}

.contact {
    font-size: 8.2pt;
    line-height: 1.2;
}

.contact span {
    display: inline;
}

.contact span:not(:last-child)::after {
    content: " | ";
    margin: 0 2px;
}


/* =========================
   SECTIONS
========================= */

.section {
    margin-top: 5px;
}

.section-title {
    font-size: 10pt;
    font-weight: 700;
    text-transform: uppercase;

    border-bottom: 1px solid #222;

    padding-bottom: 1.5px;
    margin-bottom: 3px;
}


/* =========================
   SUMMARY
========================= */

.summary {
    line-height: 1.18;
}


/* =========================
   SKILLS
========================= */

.skill-row {
    margin-bottom: 1.5px;
    line-height: 1.16;
}

.skill-row strong {
    font-weight: 700;
}


/* =========================
   PROJECTS
========================= */

.project {
    margin-bottom: 4px;

    /* Prevent a project from being split unnecessarily */
    break-inside: avoid;
    page-break-inside: avoid;
}

.project-header {
    margin-bottom: 1px;
    line-height: 1.15;
}

.project-header strong {
    font-size: 9.4pt;
    font-weight: 700;
}

.project-header span {
    font-size: 8.4pt;
    color: #222;
}

ul {
    margin: 1px 0 0 14px;
    padding: 0;
}

li {
    margin-bottom: 1px;
    padding-left: 1px;
    line-height: 1.16;
}


/* =========================
   EDUCATION
========================= */

.education-item {
    margin-bottom: 2px;

    break-inside: avoid;
    page-break-inside: avoid;
}

.education-header {
    font-size: 9.2pt;
    line-height: 1.15;
}

.institution {
    font-size: 8.9pt;
    line-height: 1.15;
}

.education-details {
    font-size: 8.4pt;
    line-height: 1.15;
}


/* =========================
   CERTIFICATIONS
========================= */

.section ul {
    margin-top: 1px;
}


/* =========================
   ATS SAFETY
========================= */

a {
    color: #111;
    text-decoration: none;
}

</style>

</head>

<body>

<div class="resume">

    <!-- HEADER -->

    <div class="header">

        <div class="name">
            ${escapeHtml(name)}
        </div>

        <div class="contact">
            ${contactItems.map(item => `
                <span>${escapeHtml(item)}</span>
            `).join("")}
        </div>

    </div>


    <!-- SUMMARY -->

    <div class="section">

        <div class="section-title">
            Summary
        </div>

        <div class="summary">
            ${escapeHtml(summary)}
        </div>

    </div>


    <!-- SKILLS -->

    <div class="section">

        <div class="section-title">
            Technical Skills
        </div>

        ${skillsHtml}

    </div>


    <!-- PROJECTS -->

    <div class="section">

        <div class="section-title">
            Projects
        </div>

        ${projectsHtml}

    </div>


    <!-- EDUCATION -->

    <div class="section">

        <div class="section-title">
            Education
        </div>

        ${educationHtml}

    </div>


    <!-- CERTIFICATIONS -->

    ${
        certifications.length
        ? `
        <div class="section">

            <div class="section-title">
                Certifications
            </div>

            ${certificationsHtml}

        </div>
        `
        : ""
    }


    <!-- ACHIEVEMENTS -->

    ${
        achievements.length
        ? `
        <div class="section">

            <div class="section-title">
                Achievements
            </div>

            ${achievementsHtml}

        </div>
        `
        : ""
    }

</div>

</body>
</html>
`;
}

module.exports={generateInterviewReport,generateResumePdf}
