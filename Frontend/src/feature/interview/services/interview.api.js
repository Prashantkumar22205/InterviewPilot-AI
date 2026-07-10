    import axios from "axios"
    const API = import.meta.env.VITE_API_URL;

    const api = axios.create({
        baseURL:`${API}/api/interview`,
        // baseURL:"http://localhost:3000/api/interview",
        withCredentials:true
    })


    /**
 * @description Service to generate interview report based on user self description, resume and job description.
 */
    export const generateInterviewReport = async({jobDescription, selfDescription, resumeFile})=>{
        const formData = new FormData()
        formData.append("jobDescription",jobDescription)
        formData.append(" selfDescription ",selfDescription)
        formData.append("resume",resumeFile)

        const responce = await api.post("/",formData,{
             headers: {
            "Content-Type": "multipart/form-data"
          }
        })

        return responce.data
    }


    /**
 * @description Service to get interview report by interviewId.
 */
   export const  getInterviewReportById = async(interviewId)=>{
       const responce = await api.get(`/report/${interviewId}`)

       return responce.data
   }

/**
 * @description Service to get all interview reports of logged in user.
 */
   export const getAllInterviewReports = async(req,res)=>{
        const responce = await api.get("/")

        return responce.data
   }

/**
 * @description Service to generate resume pdf based on user self description, resume content and job description.
 */
   export const generateResumePdf = async (interviewReportId)=>{
    const responce = await api.post(`/resume/pdf/${interviewReportId}`,null,{
        responseType:"blob"
    })

    return responce.data

   }

   