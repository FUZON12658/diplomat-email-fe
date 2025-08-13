"use client";
import React, { useState, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  Calendar,
  MapPin,
  Clock,
  Share2,
  ArrowRight,
  Star,
  DollarSign,
  Upload,
  X,
  CheckCircle,
  Award,
  Building2,
  Users,
  Briefcase,
  Target,
  Globe,
  Heart,
  TrendingUp,
  Mail,
  Phone,
  FileText,
} from "lucide-react";
import { fetchJobsBySlug, submitJobApplication } from "@/api/events/events";
import { Heading, SubHeading, BodyText } from "@/components/Common/Typography";
import { uploadImageApi } from "@/api/uploadImage";

// Type definitions
interface JobAuthor {
  id: string;
  fullName: string;
  email: string;
  userImage?: string;
  phoneNumber?: string;
  isSuperAdmin: boolean;
  isStaff: boolean;
  dateCreated: string;
  facebook?: string;
  instagram?: string;
  website?: string;
  linkedIn?: string;
  twoStepVerification: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  addressOne?: string;
  addressTwo?: string;
}

interface JobData {
  id: string;
  slug: string;
  title: string;
  description: string;
  dateCreated: string;
  dateUpdated: string;
  featuredImage?: string;
  images: string[];
  venue?: string;
  department?: string;
  jobType?: string;
  salary?: string;
  experience?: string;
  deadline?: string;
  requirements: string[];
  perks: string[];
  responsibilities: string[];
  applicationCount: number;
  maxApplications: number;
  isActive: boolean;
  isFeatured: boolean;
  priority: number;
  version: number;
  authorId: string;
  lastEditorId: string;
  author: JobAuthor;
  lastEditor: JobAuthor;
  categories: any[];
  editHistory: Array<{
    userId: string;
    version: number;
    editTime: string;
    userRole: string;
  }>;
}

interface JobApplicationData {
  name: string;
  email: string;
  phone: string;
  cv: File | null;
  coverLetter: string;
}

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobData: JobData;
}

// Utility functions
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const stripHtmlTags = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

// Application Modal Component
const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  jobData,
}) => {
  const [formData, setFormData] = useState<JobApplicationData>({
    name: "",
    email: "",
    phone: "",
    cv: null,
    coverLetter: "",
  });
  const [isUploadingCV, setIsUploadingCV] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File upload mutation
  const uploadMutation = useMutation({
    mutationFn: uploadImageApi,
    onSuccess: (data) => {
      console.log("CV uploaded successfully:", data);
    },
    onError: (error) => {
      console.error("CV upload failed:", error);
      alert("Failed to upload CV. Please try again.");
    },
  });

  // Job application submission mutation
  const applicationMutation = useMutation({
    mutationFn: submitJobApplication,
    onSuccess: (data) => {
      console.log("Application submitted successfully:", data);
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          cv: null,
          coverLetter: "",
        });
        onClose();
      }, 3000);
    },
    onError: (error) => {
      console.error("Application submission failed:", error);
      alert("Failed to submit application. Please try again.");
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, cv: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.cv) {
      alert("Please upload your CV");
      return;
    }

    try {
      setIsUploadingCV(true);
      
      // First upload the CV file
      const uploadResult = await uploadMutation.mutateAsync(formData.cv);
      
      setIsUploadingCV(false);

      // Prepare application data according to your API structure
      const applicationData = {
        jobId: jobData.id,
        applicantName: formData.name,
        applicantEmail: formData.email,
        applicantPhone: formData.phone,
        coverLetter: formData.coverLetter,
        cvFileName: formData.cv.name,
        cvFilePath: uploadResult.url, // Use the uploaded file URL
        cvFileSize: formData.cv.size,
        cvMimeType: formData.cv.type,
        source: "website", // Optional: specify source
        referredBy: null, // Optional: if you have referral system
      };

      // Submit the job application
      applicationMutation.mutate(applicationData);

    } catch (error) {
      setIsUploadingCV(false);
      console.error("Error during application submission:", error);
    }
  };

  if (!isOpen) return null;

  const isSubmitting = uploadMutation.isPending || applicationMutation.isPending || isUploadingCV;
  const isSubmitted = applicationMutation.isSuccess;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      style={{ zIndex: "99999" }}
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <Heading variant="h3" className="text-on-surface-black mb-2">
                Apply for Position
              </Heading>
              <BodyText variant="medium" className="text-on-surface-black/70">
                {jobData.title}
              </BodyText>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              disabled={isSubmitting}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <Heading variant="h4" className="text-on-surface-black mb-4">
                Application Submitted!
              </Heading>
              <BodyText variant="medium" className="text-on-surface-black/70">
                Thank you for your interest. We'll review your application and
                get back to you soon.
              </BodyText>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Display */}
              {(uploadMutation.isError || applicationMutation.isError) && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <BodyText variant="medium" className="text-red-700">
                    {uploadMutation.error?.message || 
                     applicationMutation.error?.message || 
                     "Something went wrong. Please try again."}
                  </BodyText>
                </div>
              )}

              {/* Personal Information */}
              <div className="space-y-4">
                <SubHeading variant="sh1" className="text-on-surface-black">
                  Personal Information
                </SubHeading>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-on-surface-black mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark-gradient/20 focus:border-primary-dark-gradient disabled:bg-gray-50 disabled:cursor-not-allowed"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-on-surface-black mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark-gradient/20 focus:border-primary-dark-gradient disabled:bg-gray-50 disabled:cursor-not-allowed"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-surface-black mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark-gradient/20 focus:border-primary-dark-gradient disabled:bg-gray-50 disabled:cursor-not-allowed"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {/* CV Upload */}
              <div>
                <label className="block text-sm font-medium text-on-surface-black mb-2">
                  Resume/CV *
                </label>
                <div
                  onClick={() => !isSubmitting && fileInputRef.current?.click()}
                  className={`border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:border-primary-dark-gradient/50 transition-colors ${
                    isSubmitting ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                >
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  {formData.cv ? (
                    <div>
                      <BodyText
                        variant="medium"
                        className="text-on-surface-black font-medium"
                      >
                        {formData.cv.name}
                      </BodyText>
                      <BodyText
                        variant="small"
                        className="text-on-surface-black/60"
                      >
                        {isSubmitting ? "Uploading..." : "Click to change file"}
                      </BodyText>
                    </div>
                  ) : (
                    <div>
                      <BodyText
                        variant="medium"
                        className="text-on-surface-black/70"
                      >
                        Click to upload your resume/CV
                      </BodyText>
                      <BodyText
                        variant="small"
                        className="text-on-surface-black/50"
                      >
                        PDF, DOC, DOCX (Max 5MB)
                      </BodyText>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-sm font-medium text-on-surface-black mb-2">
                  Cover Letter *
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark-gradient/20 focus:border-primary-dark-gradient resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 border border-gray-200 text-on-surface-black font-semibold hover:bg-gray-50 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-3 flex-1 hover:scale-110 active:scale-90 hover:opacity-75 duration-200 ease-in-out transition-all bg-border-primary-dark-gradient text-base leading-6 text-on-surface-black cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isUploadingCV 
                    ? "Uploading CV..." 
                    : uploadMutation.isPending 
                    ? "Uploading CV..." 
                    : applicationMutation.isPending 
                    ? "Submitting Application..." 
                    : "Submit Application"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Job Details Page Component
const JobDetailsPage: React.FC<any> = () => {
  const { slug } = useParams();
  const router = useRouter();
  const tooltipRef = useRef<HTMLSpanElement>(null);

  const [applicationModal, setApplicationModal] = useState<{
    isOpen: boolean;
    jobData: JobData | null;
  }>({
    isOpen: false,
    jobData: null,
  });

  const {
    data: jobData,
    isLoading,
    isError,
    error,
  } = useQuery<JobData>({
    queryKey: ["job", slug],
    queryFn: () => fetchJobsBySlug(slug),
    enabled: !!slug,
  });

  const handleBackToList = () => {
    router.push("/careers");
  };

  const handleApplyClick = () => {
    if (jobData) {
      setApplicationModal({ isOpen: true, jobData });
    }
  };

  const closeApplicationModal = () => {
    setApplicationModal({ isOpen: false, jobData: null });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      const tooltip = tooltipRef.current;
      if (tooltip) {
        tooltip.style.visibility = "visible";
        tooltip.style.opacity = "1";
        setTimeout(() => {
          tooltip.style.opacity = "0";
          setTimeout(() => (tooltip.style.visibility = "hidden"), 300);
        }, 1500);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-main-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin  h-12 w-12 border-b-2 border-primary-dark-gradient mx-auto mb-4"></div>
          <BodyText variant="medium" className="text-on-surface-black">
            Loading job details...
          </BodyText>
        </div>
      </div>
    );
  }

  if (isError || !jobData) {
    return (
      <div className="min-h-screen bg-surface-main-bg flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 bg-red-50  flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <Heading variant="h3" className="text-on-surface-black mb-4">
            Job not found
          </Heading>
          <BodyText variant="medium" className="text-on-surface-black/70 mb-6">
            {error instanceof Error
              ? error.message
              : "The job you're looking for doesn't exist or has been removed."}
          </BodyText>
          <button
            onClick={handleBackToList}
            className="bg-primary-dark-gradient text-white px-6 py-3  font-semibold hover:opacity-90 transition-opacity"
          >
            Back to Careers
          </button>
        </div>
      </div>
    );
  }

  const applicationDeadline = jobData.deadline
    ? new Date(jobData.deadline)
    : null;
  const isDeadlineApproaching =
    applicationDeadline &&
    applicationDeadline.getTime() - new Date().getTime() <
      7 * 24 * 60 * 60 * 1000; // 7 days

  return (
    <>
      <div className="min-h-screen bg-surface-main-bg">
        {/* Hero Section */}
        <div className="relative h-80 bg-gradient-to-br from-primary-dark-gradient to-primary-dark-gradient/80 overflow-hidden">
          {jobData.featuredImage && (
            <>
              <img
                src={jobData.featuredImage}
                alt={jobData.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
            </>
          )}

          <div className="relative max-w-6xl mx-auto px-6 py-12 flex items-center h-full">
            <div className="text-white">
              <button
                onClick={handleBackToList}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to Careers
              </button>

              <Heading variant="h1" className="text-white mb-4 max-w-4xl">
                {jobData.title}
              </Heading>

              <div className="flex flex-wrap gap-4">
                {jobData.department && (
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2">
                    <Building2 className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {jobData.department}
                    </span>
                  </div>
                )}
                {jobData.venue && (
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 full">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">{jobData.venue}</span>
                  </div>
                )}
                {jobData.jobType && (
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 full">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {jobData.jobType}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Overview */}
              <div className="bg-white p-6 2xl border border-gray-100">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {jobData.salary && (
                    <div className="text-center p-4 bg-gray-50 lg">
                      <DollarSign className="w-6 h-6 text-primary-dark-gradient mx-auto mb-2" />
                      <BodyText
                        variant="small"
                        className="text-on-surface-black/60 mb-1"
                      >
                        Salary
                      </BodyText>
                      <BodyText
                        variant="medium"
                        className="text-on-surface-black font-semibold"
                      >
                        {jobData.salary}
                      </BodyText>
                    </div>
                  )}

                  {jobData.experience && (
                    <div className="text-center p-4 bg-gray-50 lg">
                      <Award className="w-6 h-6 text-primary-dark-gradient mx-auto mb-2" />
                      <BodyText
                        variant="small"
                        className="text-on-surface-black/60 mb-1"
                      >
                        Experience
                      </BodyText>
                      <BodyText
                        variant="medium"
                        className="text-on-surface-black font-semibold"
                      >
                        {jobData.experience}
                      </BodyText>
                    </div>
                  )}

                  <div className="text-center p-4 bg-gray-50 lg">
                    <Calendar className="w-6 h-6 text-primary-dark-gradient mx-auto mb-2" />
                    <BodyText
                      variant="small"
                      className="text-on-surface-black/60 mb-1"
                    >
                      Posted
                    </BodyText>
                    <BodyText
                      variant="medium"
                      className="text-on-surface-black font-semibold"
                    >
                      {formatDate(jobData.dateCreated)}
                    </BodyText>
                  </div>

                  {/*<div className="text-center p-4 bg-gray-50 lg">
                    <Users className="w-6 h-6 text-primary-dark-gradient mx-auto mb-2" />
                    <BodyText
                      variant="small"
                      className="text-on-surface-black/60 mb-1"
                    >
                      Applications
                    </BodyText>
                    <BodyText
                      variant="medium"
                      className="text-on-surface-black font-semibold"
                    >
                      {jobData.applicationCount}/{jobData.maxApplications}
                    </BodyText>
                  </div>*/}
                </div>
              </div>

              {/* Job Description */}
              <div className="bg-white p-6 2xl border border-gray-100">
                <SubHeading
                  variant="sh1"
                  className="text-on-surface-black mb-4"
                >
                  About This Role
                </SubHeading>
                <BodyText
                  variant="medium"
                  className="text-on-surface-black/80 leading-relaxed"
                >
                  {stripHtmlTags(jobData.description)}
                </BodyText>
              </div>

              {/* Key Responsibilities */}
              {jobData.responsibilities &&
                jobData.responsibilities.length > 0 && (
                  <div className="bg-white p-6 2xl border border-gray-100">
                    <SubHeading
                      variant="sh1"
                      className="text-on-surface-black mb-4"
                    >
                      Key Responsibilities
                    </SubHeading>
                    <ul className="space-y-3">
                      {jobData.responsibilities.map((responsibility, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-primary-dark-gradient full mt-2 flex-shrink-0" />
                          <BodyText
                            variant="medium"
                            className="text-on-surface-black/80"
                          >
                            {responsibility}
                          </BodyText>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Requirements */}
              {jobData.requirements && jobData.requirements.length > 0 && (
                <div className="bg-white p-6 2xl border border-gray-100">
                  <SubHeading
                    variant="sh1"
                    className="text-on-surface-black mb-4"
                  >
                    Requirements & Qualifications
                  </SubHeading>
                  <ul className="space-y-3">
                    {jobData.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <BodyText
                          variant="medium"
                          className="text-on-surface-black/80"
                        >
                          {requirement}
                        </BodyText>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Perks & Benefits */}
              {jobData.perks && jobData.perks.length > 0 && (
                <div className="bg-white p-6 2xl border border-gray-100">
                  <SubHeading
                    variant="sh1"
                    className="text-on-surface-black mb-4"
                  >
                    Perks & Benefits
                  </SubHeading>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {jobData.perks.map((perk, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-gray-50 lg"
                      >
                        <Star className="w-5 h-5 text-primary-dark-gradient mt-0.5 flex-shrink-0" />
                        <BodyText
                          variant="medium"
                          className="text-on-surface-black/80"
                        >
                          {perk}
                        </BodyText>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Company Culture */}
              <div className="bg-white p-6 2xl border border-gray-100">
                <SubHeading
                  variant="sh1"
                  className="text-on-surface-black mb-4"
                >
                  Why Join Ambassadors Club?
                </SubHeading>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary-dark-gradient/10 lg flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-6 h-6 text-black" />
                    </div>
                    <SubHeading
                      variant="sh1"
                      className="text-on-surface-black mb-2"
                    >
                      Growth Focused
                    </SubHeading>
                    <BodyText
                      variant="small"
                      className="text-on-surface-black/70"
                    >
                      Continuous learning opportunities and career advancement
                      paths
                    </BodyText>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary-dark-gradient/10 lg flex items-center justify-center mx-auto mb-3">
                      <Heart className="w-6 h-6 text-black" />
                    </div>
                    <SubHeading
                      variant="sh1"
                      className="text-on-surface-black mb-2"
                    >
                      Work-Life Balance
                    </SubHeading>
                    <BodyText
                      variant="small"
                      className="text-on-surface-black/70"
                    >
                      Flexible schedules and remote work options for better
                      balance
                    </BodyText>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary-dark-gradient/10 lg flex items-center justify-center mx-auto mb-3">
                      <Globe className="w-6 h-6 text-black" />
                    </div>
                    <SubHeading
                      variant="sh1"
                      className="text-on-surface-black mb-2"
                    >
                      Global Impact
                    </SubHeading>
                    <BodyText
                      variant="small"
                      className="text-on-surface-black/70"
                    >
                      Make a meaningful difference on a worldwide scale
                    </BodyText>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply Card */}
              <div className="bg-white p-6 2xl border border-gray-100 sticky top-32">
                <div className="text-center mb-6">
                  <Heading variant="h3" className="text-on-surface-black mb-2">
                    Ready to Apply?
                  </Heading>
                  <BodyText
                    variant="medium"
                    className="text-on-surface-black/70"
                  >
                    Join our team and grow with Ambassadors Club
                  </BodyText>
                </div>

                {jobData.isActive ? (
                  <button
                    onClick={handleApplyClick}
                    className="py-3 hover:scale-110 active:scale-90 hover:opacity-75 duration-200 ease-in-out transition-all w-full bg-border-primary-dark-gradient text-base my-2 leading-6 text-on-surface-black cursor-pointer"
                  >
                    Apply Now
                  </button>
                ) : (
                  <div className="w-full py-3 px-6 bg-gray-100 text-gray-500 lg font-semibold text-center mb-4">
                    Applications Closed
                  </div>
                )}

                {/* Application Deadline Warning */}
                {applicationDeadline && (
                  <div
                    className={`p-4 mb-4 ${
                      isDeadlineApproaching
                        ? "bg-red-50 border border-red-200"
                        : "bg-blue-50 border border-blue-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Clock
                        className={`w-4 h-4 ${
                          isDeadlineApproaching
                            ? "text-red-500"
                            : "text-blue-500"
                        }`}
                      />
                      <BodyText
                        variant="small"
                        className={`font-medium ${
                          isDeadlineApproaching
                            ? "text-red-700"
                            : "text-blue-700"
                        }`}
                      >
                        Application Deadline
                      </BodyText>
                    </div>
                    <BodyText
                      variant="small"
                      className={
                        isDeadlineApproaching ? "text-red-600" : "text-blue-600"
                      }
                    >
                      {jobData.deadline && formatDate(jobData.deadline)}
                    </BodyText>
                  </div>
                )}

                {/* Share Job */}
                <div className="flex items-center gap-2 justify-center pt-4 border-t border-gray-100">
                  <Share2 className="w-4 h-4 text-on-surface-black/60" />
                  <button
                    onClick={() => handleCopy(window.location.href)}
                    className="text-sm text-on-surface-black/70 hover:text-on-surface-black transition-colors relative"
                  >
                    Share this job
                    <span
                      ref={tooltipRef}
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 opacity-0 invisible transition-opacity duration-300"
                    >
                      Copied!
                    </span>
                  </button>
                </div>

                     <div className="bg-white p-6  border border-gray-100 mt-4">
                {/* <SubHeading
                  variant="sh1"
                  className="text-on-surface-black mb-4"
                >
                  Job Statistics
                </SubHeading> */}
                <div className="space-y-4">
                  {/* <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary-dark-gradient" />
                      <BodyText
                        variant="small"
                        className="text-on-surface-black/70"
                      >
                        Applications
                      </BodyText>
                    </div>
                    <BodyText
                      variant="small"
                      className="text-on-surface-black font-semibold"
                    >
                      {jobData.applicationCount}/{jobData.maxApplications}
                    </BodyText>
                  </div> */}

                  {/* <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary-dark-gradient" />
                      <BodyText
                        variant="small"
                        className="text-on-surface-black/70"
                      >
                        Priority Level
                      </BodyText>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < jobData.priority
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div> */}

            
                  {jobData.isFeatured && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-primary-dark-gradient" />
                        <BodyText
                          variant="small"
                          className="text-on-surface-black/70"
                        >
                          Status
                        </BodyText>
                      </div>
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1  font-medium">
                        Featured
                      </span>
                    </div>
                  )}

                     <div className="bg-gradient-to-r from-primary-dark-gradient to-primary-dark-gradient/80 2xl text-white">
                <button
                  onClick={handleBackToList}
                   className="py-3 hover:scale-110 active:scale-90 hover:opacity-75 duration-200 ease-in-out transition-all w-full bg-border-primary-dark-gradient text-base leading-6 text-on-surface-black cursor-pointer"
                >
                  View Other Jobs
                </button>
              </div>
                </div>
              </div>
              </div>

              {/* Job Stats */}
         

              {/* Similar Jobs CTA */}
           
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={applicationModal.isOpen}
        onClose={closeApplicationModal}
        jobData={applicationModal.jobData!}
      />
    </>
  );
};

export default JobDetailsPage;
