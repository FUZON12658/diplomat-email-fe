'use client';
import { JoinNow } from '@/components/Common/animatedComponent/JoinNow';
import MaxWidthWrapper from '@/components/Common/MaxWidthWrapper';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { loginApi } from '@/api/auth/login';
// Add your API imports here
import { toast } from 'sonner';
import { X } from 'lucide-react'; // For remove button icon
import { uploadImageApi } from '@/api/uploadImage';
import { updateUserUsingSessionApi } from '@/api/auth/updateUser';

// Define validation schema
const emailOrPhoneSchema = z.union([
  z.string().email({ message: "Please enter a valid email" }),
  z.string().regex(/^\+?\d{7,15}$/, { message: "Please enter a valid phone number" }),
]);

const loginSchema = z.object({
  username: emailOrPhoneSchema,
  password: z.string().min(1, { message: "Password is required" })
});

// Profile completion schema
const profileCompletionSchema = z.object({
  currentTitle: z.string().min(1, { message: "Current title is required" }),
  nationality: z.string().min(1, { message: "Nationality is required" }),
  organization: z.string().min(1, { message: "Organization is required" }),
  currentAddress: z.string().min(1, { message: "Current address is required" }),
  userImage: z.any().optional()
});

// Type definitions
type LoginFormData = z.infer<typeof loginSchema>;
type ProfileCompletionFormData = z.infer<typeof profileCompletionSchema>;

interface UserProfile {
  id: string;
  membershipId: string;
  currentTitle: string | null;
  fullName: string;
  email: string;
  phoneNumber: string;
  nationality: string | null;
  organization: string | null;
  professionalBackground: string | null;
  currentAddress: string | null;
  isSuperAdmin: boolean;
  isStaff: boolean;
  dateCreated: string;
  facebook: string | null;
  instagram: string | null;
  website: string | null;
  linkedIn: string | null;
  twoStepVerification: boolean;
  userImage: string | null;
  emailVerified: boolean;
  phoneVerified: boolean;
}

interface ProfileUpdateData {
  currentTitle: string;
  nationality: string;
  organization: string;
  currentAddress: string;
  userImage?: string;
}

export const Login: React.FC = () => {
  const [error, setError] = useState<string>(''); 
  const [showProfileCompletion, setShowProfileCompletion] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  const router = useRouter();

  // Initialize react-hook-form for login
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  // Initialize react-hook-form for profile completion
  const { 
    register: registerProfile, 
    handleSubmit: handleSubmitProfile, 
    formState: { errors: profileErrors },
    setValue: setProfileValue,
    watch: watchProfile
  } = useForm<ProfileCompletionFormData>({
    resolver: zodResolver(profileCompletionSchema),
    defaultValues: {
      currentTitle: '',
      nationality: '',
      organization: '',
      currentAddress: '',
      userImage: undefined
    }
  });

  // Function to check if profile is incomplete
  const isProfileIncomplete = (profile: UserProfile): boolean => {
    return !profile.currentTitle || 
           !profile.nationality || 
           !profile.organization || 
           !profile.currentAddress || 
           !profile.userImage;
  };

  // Pre-fill form with existing data when profile is loaded
  useEffect(() => {
    if (userProfile && showProfileCompletion) {
      if (userProfile.currentTitle) {
        setProfileValue('currentTitle', userProfile.currentTitle);
      }
      if (userProfile.nationality) {
        setProfileValue('nationality', userProfile.nationality);
      }
      if (userProfile.organization) {
        setProfileValue('organization', userProfile.organization);
      }
      if (userProfile.currentAddress) {
        setProfileValue('currentAddress', userProfile.currentAddress);
      }
      if (userProfile.userImage) {
        setUploadedImageUrl(userProfile.userImage);
      }
    }
  }, [userProfile, showProfileCompletion, setProfileValue]);

  // Image upload mutation
  const imageUploadMutation = useMutation<{ url: string }, Error, File>({
    mutationFn: uploadImageApi,
    onSuccess: (data) => {
      setUploadedImageUrl(data.url);
      setIsUploadingImage(false);
      toast.success("Image uploaded successfully!");
    },
    onError: (error) => {
      setIsUploadingImage(false);
      toast.error("Failed to upload image. Please try again.");
      console.error('Image upload error:', error);
    }
  });

  const loginMutation = useMutation<UserProfile, Error, LoginFormData>({
    mutationFn: loginApi,
    onSuccess: (data: UserProfile) => {
      const profile = data;
      console.log(profile);
      setUserProfile(profile);
      
      if (isProfileIncomplete(profile)) {
        setShowProfileCompletion(true);
        toast.info("Please complete your profile to continue");
      } else {
        toast.success("Logged in successfully. Redirecting you to dashboard...");
        router.push('/dashboard');
      }
    },
    onError: (error: Error) => {
      toast.error("Please enter valid credentials.");
      console.error('Login error:', error);
    }
  });

  // Profile completion mutation
  const profileCompletionMutation = useMutation<any, Error, ProfileUpdateData>({
    mutationFn: async (profileData: ProfileUpdateData) => {
      return await updateUserUsingSessionApi({
        updates: profileData
      });
    },
    onSuccess: () => {
      toast.success("Profile completed successfully! Redirecting to dashboard...");
      router.push('/dashboard');
    },
    onError: (error: Error) => {
      toast.error("Failed to update profile. Please try again.");
      console.error('Profile completion error:', error);
    }
  });

  const onSubmit = (data: LoginFormData): void => {
    setError('');
    loginMutation.mutate(data);
  };

  const onProfileSubmit = (data: ProfileCompletionFormData): void => {
    const profileData: ProfileUpdateData = {
      currentTitle: data.currentTitle,
      nationality: data.nationality,
      organization: data.organization,
      currentAddress: data.currentAddress,
      userImage: uploadedImageUrl || undefined
    };
    
    profileCompletionMutation.mutate(profileData);
  };

  const handleSkipProfile = (): void => {
    toast.info("Profile completion skipped. You can complete it later from settings.");
    router.push('/dashboard');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please select a valid image file");
        return;
      }
      
      // Validate file size (e.g., 5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      setIsUploadingImage(true);
      imageUploadMutation.mutate(file);
    }
  };

  const handleRemoveImage = (): void => {
    setUploadedImageUrl(null);
    // Reset file input
    const fileInput = document.getElementById('userImage') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  // Profile completion form
  if (showProfileCompletion) {
    return (
      <section
        className="bg-on-surface-black bg-blend-color-burn pt-8 pb-[6.25rem]"
        style={{
          backgroundImage: "url('/bgTexturedark.png')",
        }}
      >
        <MaxWidthWrapper>
          <div className="mx-auto bg-on-surface-black border border-primary-dark-gradient p-10 md:w-fit space-y-[5.5rem]">
            <div>
              <div className="space-y-[4.5rem]">
                <div className="max-w-[22.375rem] md:max-w-[32.75rem] md:w-[32.75rem] border-b border-b-primary-on-light/50 pb-4">
                  <p className="font-diamend text-2xl leading-8 text-center text-primary-dark-gradient">
                    Complete Your Profile
                  </p>
                  <p className="text-on-surface-white text-sm text-center mt-2">
                    Please fill in the missing information to continue
                  </p>
                </div>
                <div className="w-[16.8125rem] mx-auto space-y-6">
                  <form onSubmit={handleSubmitProfile(onProfileSubmit)} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        id="currentTitle"
                        placeholder="Current Title"
                        className="w-full p-3 placeholder:text-[#8F8FA3] text-on-surface-bright-white text-base leading-6 outline outline-primary-dark-gradient"
                        {...registerProfile('currentTitle')}
                      />
                      {profileErrors.currentTitle && (
                        <p className="text-red-500 text-sm mt-1">{profileErrors.currentTitle.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <input
                        type="text"
                        id="nationality"
                        placeholder="Nationality"
                        className="w-full p-3 placeholder:text-[#8F8FA3] text-on-surface-bright-white text-base leading-6 outline outline-primary-dark-gradient"
                        {...registerProfile('nationality')}
                      />
                      {profileErrors.nationality && (
                        <p className="text-red-500 text-sm mt-1">{profileErrors.nationality.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <input
                        type="text"
                        id="organization"
                        placeholder="Organization"
                        className="w-full p-3 placeholder:text-[#8F8FA3] text-on-surface-bright-white text-base leading-6 outline outline-primary-dark-gradient"
                        {...registerProfile('organization')}
                      />
                      {profileErrors.organization && (
                        <p className="text-red-500 text-sm mt-1">{profileErrors.organization.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <input
                        type="text"
                        id="currentAddress"
                        placeholder="Current Address"
                        className="w-full p-3 placeholder:text-[#8F8FA3] text-on-surface-bright-white text-base leading-6 outline outline-primary-dark-gradient"
                        {...registerProfile('currentAddress')}
                      />
                      {profileErrors.currentAddress && (
                        <p className="text-red-500 text-sm mt-1">{profileErrors.currentAddress.message}</p>
                      )}
                    </div>
                    
                    {/* Image Upload Section */}
                    <div className="space-y-2">
                      {uploadedImageUrl ? (
                        <div className="relative">
                          <img
                            src={uploadedImageUrl}
                            alt="Profile"
                            className="w-full h-32 object-cover rounded border border-primary-dark-gradient"
                          />
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                          >
                            <X size={16} />
                          </button>
                          <p className="text-xs text-on-surface-white mt-1">
                            Profile picture uploaded. Click X to remove.
                          </p>
                        </div>
                      ) : (
                        <div>
                          <input
                            type="file"
                            id="userImage"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={isUploadingImage || imageUploadMutation.isPending}
                            className="w-full p-3 text-on-surface-bright-white text-base leading-6 outline outline-primary-dark-gradient file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-dark-gradient file:text-on-surface-black hover:file:bg-opacity-80 disabled:opacity-50"
                          />
                          <p className="text-xs text-on-surface-white mt-1">
                            {isUploadingImage || imageUploadMutation.isPending 
                              ? "Uploading image..." 
                              : "Upload your profile picture (Max 5MB)"}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 transition-all duration-200">
                      <button
                        type="submit"
                        disabled={profileCompletionMutation.isPending || isUploadingImage}
                        className={`py-3 hover:scale-110 active:scale-90 hover:opacity-75 duration-200 ease-in-out transition-all w-full bg-border-primary-dark-gradient text-base leading-6 text-on-surface-black cursor-pointer ${
                          profileCompletionMutation.isPending || isUploadingImage ? "opacity-50" : ""
                        }`}
                      >
                        {profileCompletionMutation.isPending ? "Updating Profile..." : "Complete Profile"}
                      </button>
                      
                      <button
                        type="button"
                        onClick={handleSkipProfile}
                        disabled={profileCompletionMutation.isPending || isUploadingImage}
                        className="py-3 hover:scale-110 active:scale-90 hover:opacity-75 duration-200 ease-in-out transition-all w-full bg-transparent border border-primary-dark-gradient text-base leading-6 text-primary-dark-gradient cursor-pointer disabled:opacity-50"
                      >
                        Skip for Now
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    );
  }

  // Original login form
  return (
    <section
      className="bg-on-surface-black bg-blend-color-burn pt-8 pb-[6.25rem]"
      style={{
        backgroundImage: "url('/bgTexturedark.png')",
      }}
    >
      <MaxWidthWrapper>
        <div className="mx-auto bg-on-surface-black border border-primary-dark-gradient p-10 md:w-fit space-y-[5.5rem]">
          <div>
            <div className="space-y-[4.5rem]">
              <div className="max-w-[22.375rem] md:max-w-[32.75rem] md:w-[32.75rem] border-b border-b-primary-on-light/50 pb-4">
                <p className="font-diamend text-2xl leading-8 text-center text-primary-dark-gradient">
                  Login
                </p>
              </div>
              <div className="w-[16.8125rem] mx-auto space-y-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      id="username"
                      placeholder="Enter Your username"
                      className="w-full p-3 placeholder:text-[#8F8FA3] text-on-surface-bright-white text-base leading-6 outline outline-primary-dark-gradient"
                      {...register('username')}
                    />
                    {errors.username && (
                      <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="password"
                      id="password"
                      placeholder="Enter Your Password"
                      className="w-full p-3 placeholder:text-[#8F8FA3] text-on-surface-bright-white text-base leading-6 outline outline-primary-dark-gradient"
                      {...register('password')}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                  </div>

                  <div className="space-y-2 transition-all duration-200">
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                      type="submit"
                      disabled={loginMutation.isPending}
                      className={`py-3 hover:scale-110 active:scale-90 hover:opacity-75 duration-200 ease-in-out transition-all w-full bg-border-primary-dark-gradient text-base leading-6 text-on-surface-black cursor-pointer ${loginMutation.isPending ? "opacity-50" : ""}`}
                    >
                      {loginMutation.isPending ? "Logging In..." : "Login"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="w-fit flex gap-2 items-start mx-auto">
            <p className="text-on-surface-white text-base leading-6">
              Not A Member?{' '}
            </p>
            <JoinNow text={"Request To Join"} small={true} />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};