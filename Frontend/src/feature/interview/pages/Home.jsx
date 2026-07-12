import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useInterview } from '../hooks/useInterview.js'
import { useAuth } from '../../auth/hooks/useAuth.js'
import { Settings } from "lucide-react";
import DashboardLayout from '../../../components/layout/DashboardLayout.jsx';

const Home = () => {

    const { loading, generateReport,reports } = useInterview()
    const {handleLogout} = useAuth()
    const [ jobDescription, setJobDescription ] = useState("")
    const [ selfDescription, setSelfDescription ] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()


    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[ 0 ]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        navigate(`/interview/${data._id}`)
    }

// Logout
    const handlelogout = async()=>{
        try{
           await handleLogout()
            navigate("/login")
        }catch(err){
            console.log(err)
        }
    }

// Setting
    const handleSettings = () => {
        navigate("/settings");
    };



    if (loading) {
        return (
            <main className='w-full min-h-screen flex items-center justify-center bg-[#0d1117] text-[#e6edf3]'>
                <h1 className='text-lg'>Loading your interview plan...</h1>
            </main>
        )
    }

    return (
    <div className="w-full min-h-screen bg-[#0d1117] text-[#e6edf3] flex flex-col items-center justify-center px-6 py-12 gap-8">

            {/* Page Header */}
         <div className='w-full min-h-[100px] flex items-center justify-between'>

              <div className="flex-1">
                {/* Empty for now */}
                </div>

            <header className=" flex-2 text-center">
                <h1 className="text-4xl font-bold text-[#e6edf3] mb-2">Create Your Custom <span className="text-pink-500">Interview Plan</span></h1>
                <p className="text-[#7d8590] text-[15px] max-w-[480px] mx-auto leading-7">Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
            </header>
         
            <div className=" flex-1 flex items-center gap-3 justify-center ">
                <button
                onClick={handleSettings}
                className="flex items-center gap-2 rounded-[15px] h-[50px] px-5 bg-[#161b22] border border-[#2a3348] text-[#e6edf3] font-semibold transition hover:border-pink-500 hover:bg-pink-500/10" >
                <Settings size={18} />
                Settings
               </button>

               <button
                onClick={handlelogout}
                className="rounded-[15px] h-[50px] px-5 bg-[#161b22] border border-[#2a3348] text-[#e6edf3] font-semibold transition hover:border-pink-500 hover:bg-pink-500/10" >
                Logout
               </button>

             </div>
         </div>
   

            {/* Main Card */}
            <div className="w-full max-w-[900px] bg-[#161b22] border border-[#2a3348] rounded-2xl overflow-hidden">
                <div className="flex min-h-[520px]">

                    {/* Left Panel - Job Description */}
                    <div className="flex-1 flex flex-col gap-4 p-6 relative">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="flex items-center text-pink-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                            </span>
                            <h2 className="text-base font-semibold text-[#e6edf3] flex-1">Target Job Description</h2>
                            <span className="text-[11px] uppercase tracking-widest font-semibold px-2 py-1 rounded-full bg-white/5 text-[#c9d1d9] border border-white/10">Required</span>
                        </div>
                        <textarea
                            onChange={(e) => { setJobDescription(e.target.value) }}
                            className="flex-1 w-full bg-[#1e2535] border border-[#2a3348] rounded-lg px-4 py-3 text-[#e6edf3] text-sm resize-none outline-none focus:border-pink-500 placeholder:text-[#7d8590] leading-6"
                            placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                            maxLength={5000}
                        />
                        <div className="absolute bottom-9 right-8 text-xs text-[#7d8590]">0 / 5000 chars</div>
                    </div>

                    {/* Vertical Divider */}
                    <div className="w-px bg-[#2a3348] shrink-0" />

                    {/* Right Panel - Profile */}
                    <div className="flex-1 flex flex-col gap-3 p-6">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="flex items-center text-pink-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </span>
                            <h2 className="text-base font-semibold text-[#e6edf3] flex-1">Your Profile</h2>
                        </div>

                        {/* Upload Resume */}
                        <div className="flex flex-col gap-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-[#e6edf3] mb-1">
                                Upload Resume
                                <span className="text-[11px] uppercase tracking-wide font-semibold px-2 py-1 rounded bg-pink-500/15 text-pink-500 border border-pink-500/30">Best Results</span>
                            </label>

                            <label className="flex flex-col items-center justify-center gap-1 px-4 py-6 bg-[#1e2535] border-2 border-dashed border-[#2a3348] rounded-lg cursor-pointer transition-all hover:border-pink-500 hover:bg-pink-500/5" htmlFor='resume'>

                                <span className="text-pink-500 mb-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                </span>
                                <p className="text-sm font-medium text-[#e6edf3]">Click to upload or drag &amp; drop</p>
                                <p className="text-xs text-[#7d8590]">PDF (Max 3MB)</p>
                                <input ref={resumeInputRef} hidden type='file' id='resume' name='resume' accept='.pdf,.docx' />
                            </label>
                        </div>

                        {/* OR Divider */}
                        <div className="flex items-center gap-3 text-xs text-[#7d8590]">
                            <div className="flex-1 h-px bg-[#2a3348]"></div>
                            <span className="px-3">OR</span>
                            <div className="flex-1 h-px bg-[#2a3348]"></div>
                        </div>

                        {/* Quick Self-Description */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-[#e6edf3]" htmlFor='selfDescription'>Quick Self-Description</label>
                            <textarea
                                onChange={(e) => { setSelfDescription(e.target.value) }}
                                id='selfDescription'
                                name='selfDescription'
                                className="w-full h-24 bg-[#1e2535] border border-[#2a3348] rounded-lg px-4 py-3 text-[#e6edf3] text-sm resize-none outline-none focus:border-pink-500 placeholder:text-[#7d8590]"
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            />
                        </div>

                        {/* Info Box */}
                        <div className="flex items-start gap-2 px-4 py-3 bg-[#1b2a4a] border border-[#2d4a7a] rounded-lg">
                            <span className="shrink-0 text-blue-400 mt-[1px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2" /></svg>
                            </span>
                            <p>Either a <strong className="text-[#e6edf3]">Resume</strong > or a <strong className="text-[#e6edf3]">Self Description</strong> is required to generate a personalized plan.</p>
                        </div>
                    </div>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-[#2a3348]"  >
                    <span className="text-xs text-[#7d8590]">AI-Powered Strategy Generation &bull; Approx 30s</span>
                    <button
                        onClick={handleGenerateReport}
                        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 text-white text-sm font-semibold transition hover:opacity-90 active:scale-95">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                        Generate My Interview Strategy
                    </button>
                </div>
            </div>

            {/* Recent Reports List */}
            {reports.length > 0 && (
                <section className="flex flex-col gap-4 w-full max-w-[900px]">
                    <h2 className="text-2xl font-semibold text-[#e6edf3]">My Recent Interview Plans</h2>
                    <ul className="flex flex-wrap gap-3">
                        {reports.map(report => (
                            <li key={report._id} 
                            className="flex flex-col gap-2 flex-1 shrink-0 p-4 rounded-lg bg-[#161b22] border border-[#2a3348] cursor-pointer hover:border-pink-500 transition" 
                            onClick={() => navigate(`/interview/${report._id}`)}>
                                <h3 className="text-base font-semibold text-[#e6edf3]">{report.title || 'Untitled Position'}</h3>
                                <p className="text-xs text-[#7d8590]">Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                <p className={`text-sm font-semibold ${report.matchScore >= 80 ? 'text-green-400' : report.matchScore >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>Match Score: {report.matchScore}%</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Page Footer */}
            <footer className="flex flex-wrap gap-6 text-xs text-[#7d8590]">
                <a className="hover:text-[#e6edf3] transition-colors" href='#'>Privacy Policy</a>
                <a className="hover:text-[#e6edf3] transition-colors" href='#'>Terms of Service</a>
                <a className="hover:text-[#e6edf3] transition-colors" href='#'>Help Center</a>
            </footer>

   
          </div>
    )
}

export default Home