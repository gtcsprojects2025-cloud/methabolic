// src/app/membership/page.tsx
"use client";

import { useState } from "react";

export default function MembershipPage() {
  // State for Membership Interest Form
  const [interestForm, setInterestForm] = useState({
    fullName: "",
    email: "",
    contribution: "",
  });
  const [interestSubmitting, setInterestSubmitting] = useState(false);
  const [interestStatus, setInterestStatus] = useState<"idle" | "success" | "error">("idle");

  // State for Join Us Resume Form
  const [joinForm, setJoinForm] = useState({ name: "", email: "", message: "" });
  const [dragActive, setDragActive] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [joinSubmitting, setJoinSubmitting] = useState(false);
  const [joinStatus, setJoinStatus] = useState<"idle" | "success" | "error">("idle");

  // Handlers for Membership Interest Form
  const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInterestForm({ ...interestForm, [e.target.name]: e.target.value });
  };

  const handleInterestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInterestSubmitting(true);
    setInterestStatus("idle");

    try {
      const response = await fetch("/api/send-membership-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(interestForm),
      });

      if (response.ok) {
        setInterestStatus("success");
        setInterestForm({ fullName: "", email: "", contribution: "" });
      } else {
        setInterestStatus("error");
      }
    } catch {
      setInterestStatus("error");
    } finally {
      setInterestSubmitting(false);
    }
  };

  // Handlers for Join Us Resume Form
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) setResumeFile(e.dataTransfer.files[0]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setResumeFile(e.target.files[0]);
  };

  const handleJoinChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setJoinForm({ ...joinForm, [e.target.name]: e.target.value });
  };

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) return alert("Please upload your resume/CV");

    setJoinSubmitting(true);
    setJoinStatus("idle");

    const data = new FormData();
    data.append("name", joinForm.name);
    data.append("email", joinForm.email);
    data.append("message", joinForm.message);
    data.append("resume", resumeFile);

    try {
      const res = await fetch("/api/send-resume", { method: "POST", body: data });
      if (res.ok) {
        setJoinStatus("success");
        setJoinForm({ name: "", email: "", message: "" });
        setResumeFile(null);
      } else {
        setJoinStatus("error");
      }
    } catch {
      setJoinStatus("error");
    } finally {
      setJoinSubmitting(false);
    }
  };

  return (
    <>
      {/* Small Hero Section with Background Image */}
      <section className="relative mt-10 h-96 md:h-[500px] flex items-center bg-cover bg-center" style={{ backgroundImage: "url('/Image 6.jpeg')" }}>
        <div className="absolute inset-0 bg-black opacity-70" />
        <div className="relative z-10  px-6 text-white items-center max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Membership</h1>
          <p className="text-lg md:text-xl mb-4">
            Two pathways: Metabolomics Africa for experts shaping the field, and STEMxAfrica for volunteers amplifying impact.
          </p>
          <p className="text-base md:text-lg opacity-90 ">
            Join us to position metabolomics on the African continent, mentor students, and deploy STEMxAfrica programs that welcome non-experts into the movement.
          </p>
        </div>
      </section>

      {/* Two Column Pathways */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Experts */}
            <div className="bg-white rounded-3xl shadow-xl p-10 md:p-14">
              <p className="text-purple-900 font-bold uppercase tracking-wider text-sm mb-6">
                Metabolomics Africa (Experts)
              </p>
              <h2 className="text-2xl text-center md:text-left  md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
                Join us to position metabolomics on the African continent and mentor students who will be active members in the future.
              </h2>
              <ul className="space-y-5  text-base text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-purple-900 mt-1">•</span>
                  <span>Invitation to shape the continental charter and governance blueprint.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-900 mt-1">•</span>
                  <span>Access to instrument-sharing pools and shared SOP repositories.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-900 mt-1">•</span>
                  <span>Direct matching with fellows seeking mentors or lab attachments.</span>
                </li>
              </ul>
            </div>

            {/* Volunteers */}
            <div className="bg-white rounded-3xl shadow-xl p-10 md:p-14">
              <p className="text-purple-900 font-bold uppercase tracking-wider text-sm mb-6">
                STEMxAfrica (Volunteers)
              </p>
              {/* centralize formobile */}
              <h2 className="text-2xl text-center md:text-left md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
                Non-experts, creatives, and operators join STEMxAfrica to contribute to the advancement of metabolomics on the African continent.
              </h2>
              <ul className="space-y-5 text-base text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-purple-900 mt-1">•</span>
                  <span>Invites to continent-wide convenings and documentation studios.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-900 mt-1">•</span>
                  <span>Access to digital playbooks for STEMxClubs and STEM festivals.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-900 mt-1">•</span>
                  <span>Opportunities to co-author blog posts and newsletters with experts.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Interest Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Express your interest in joining
            </h2>
            <p className="text-lg text-gray-700">
              Tell us about yourself and how you'd like to contribute. We'll get back to you soon.
            </p>
          </div>

          <form onSubmit={handleInterestSubmit} className="bg-white rounded-3xl shadow-xl p-10 md:p-14">
            <div className="space-y-8">
              <div>
                <label htmlFor="fullName" className="block text-base font-medium text-gray-900 mb-2">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={interestForm.fullName}
                  onChange={handleInterestChange}
                  required
                  className="w-full text-black px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-900"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-base font-medium text-gray-900 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={interestForm.email}
                  onChange={handleInterestChange}
                  required
                  className="w-full text-black px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-900"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="contribution" className="block text-base font-medium text-gray-900 mb-2">
                  What would you like to contribute?
                </label>
                <textarea
                  id="contribution"
                  name="contribution"
                  value={interestForm.contribution}
                  onChange={handleInterestChange}
                  required
                  rows={6}
                  className="w-full text-black px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-900 resize-none"
                  placeholder="Share your skills, interests, or how you'd like to get involved..."
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={interestSubmitting}
                  className="bg-purple-900 text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-purple-800 disabled:opacity-70"
                >
                  {interestSubmitting ? "Sending..." : "Submit Interest"}
                </button>

                {interestStatus === "success" && <p className="mt-6 text-green-600 font-medium">Thank you! We'll be in touch soon.</p>}
                {interestStatus === "error" && <p className="mt-6 text-red-600 font-medium">Something went wrong. Please try again.</p>}
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Join Us - Resume Upload Section (Separate) */}
      <section id="join" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Join Us – Submit Your Application
            </h2>
            <p className="text-lg text-gray-700">
              Upload your resume/CV and tell us how you'd like to contribute.
            </p>
          </div>

          <form onSubmit={handleJoinSubmit} className="bg-gray-50 rounded-3xl shadow-xl p-10 md:p-14">
            <div className="space-y-8">
              <div>
                <label htmlFor="name" className="block text-base font-medium text-gray-900 mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={joinForm.name}
                  onChange={handleJoinChange}
                  required
                  className="w-full text-black px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-900"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-base font-medium text-gray-900 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={joinForm.email}
                  onChange={handleJoinChange}
                  required
                  className="w-full text-black px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-900"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-base font-medium text-gray-900 mb-2">Message (optional)</label>
                <textarea
                  id="message"
                  name="message"
                  value={joinForm.message}
                  onChange={handleJoinChange}
                  rows={5}
                  className="w-full text-black px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-900 resize-none"
                  placeholder="Tell us about your background and interests..."
                />
              </div>

              {/* Drag & Drop Resume Upload */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-10 text-center transition-colors ${
                  dragActive ? "border-purple-900 bg-purple-50" : "border-gray-300"
                }`}
              >
                <input type="file" id="resume" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
                <p className="text-lg text-gray-700 mb-4">
                  {resumeFile ? resumeFile.name : "Drag & drop your resume/CV here or"}
                </p>
                <label
                  htmlFor="resume"
                  className="inline-block bg-purple-900 text-white px-8 py-4 rounded-full cursor-pointer hover:bg-purple-800 transition"
                >
                  Browse Files
                </label>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={joinSubmitting || !resumeFile}
                  className="bg-purple-900 text-white px-12 py-4 rounded-full text-lg font-medium hover:bg-purple-800 disabled:opacity-70"
                >
                  {joinSubmitting ? "Sending..." : "Submit Application"}
                </button>

                {joinStatus === "success" && <p className="mt-6 text-green-600 font-medium">Application sent successfully!</p>}
                {joinStatus === "error" && <p className="mt-6 text-red-600 font-medium">Error – please try again.</p>}
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}