import { useContext,useEffect } from "react";
import { InterviewContext } from "../interview.context";
import {getAllInterviewReports, generateInterviewReport, getInterviewReportById,generateResumePdf}  from "../services/interview.api"
import { useParams } from "react-router";


export const useInterview = ()=>{
    const context = useContext(InterviewContext)
     const { interviewId } = useParams()

         if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }
    const {loading, setLoading, report, setReport, reports, setReports} = context

    const generateReport = async ({jobDescription, selfDescription, resumeFile })=>{
        setLoading(true)
        let responce=null
        try {
               responce = await generateInterviewReport({jobDescription, selfDescription, resumeFile})
               setReport(responce.interviewReport)
        } catch (err) {
            console.log(err)
        }
        finally{
            setLoading(false)
        }

        return responce.interviewReport
    }

    const getReportById =async(interviewId)=>{
        setLoading(true)
         let responce=null
         try {
               responce = await getInterviewReportById(interviewId)
               setReport(responce.interviewReport)
        } catch (err) {
            console.log(err)
        }
        finally{
            setLoading(false)
        }

        return responce.interviewReport
    }


    const  getReports= async()=>{
        setLoading(true)
         let responce=null
         try {
               responce = await getAllInterviewReports()
               setReports(responce.interviewReports)
        } catch (err) {
            console.log(err)
        }
        finally{
            setLoading(false)
        }

        return responce.interviewReports
    }

    const getResumePdf = async(interviewReportId)=>{
        setLoading(true)
         let responce=null
         try {
               responce = await generateResumePdf(interviewReportId)
                const url = window.URL.createObjectURL(new Blob([ responce ], { type: "application/pdf" }))
                const link = document.createElement("a")
                link.href = url
                link.setAttribute("download", `resume_${interviewReportId}.pdf`)
                document.body.appendChild(link)
                link.click()
        } catch (err) {
            console.log(err)
        }
        finally{
            setLoading(false)
        }
        
    }


     useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getReports()
        }
    }, [ interviewId ])

     return { loading, report, reports, generateReport, getReportById, getReports ,getResumePdf}


}