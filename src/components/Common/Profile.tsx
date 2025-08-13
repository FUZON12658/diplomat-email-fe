'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Camera,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import MaxWidthWrapper from '@/components/Common/MaxWidthWrapper';
import { BodyText, Heading } from '@/components/Common/Typography';
import { uploadImageApi } from '@/api/uploadImage';
import { updateUserUsingSessionApi } from '@/api/auth/updateUser';
import { getUserApi } from '@/api/auth/logout';

const ProfilePage = () => {
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState<string|null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Define profile schema with Zod
  const profileSchema = z.object({
    fullName: z.string().min(3, 'Full name is required (min 3 characters)'),
    email: z.string().email('Valid email address is required'),
    phoneNumber: z.string().min(5, 'Valid phone number is required'),
    addressOne: z.string().min(3, 'Address is required'),
    addressTwo: z.string().optional(),
    facebook: z.string().optional().nullable(),
    instagram: z.string().optional().nullable(),
    website: z.string().url().optional().nullable().or(z.literal('')),
    linkedIn: z.string().optional().nullable(),
    twoStepVerification: z.boolean().default(false),
  });

  // Fetch user data
  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUserApi,
  });

  // Initialize form with react-hook-form
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      addressOne: '',
      addressTwo: '',
      facebook: '',
      instagram: '',
      website: '',
      linkedIn: '',
      twoStepVerification: false,
    },
  });

  // Set up mutation for profile update
  const updateProfileMutation = useMutation({
    mutationKey: ['updateUserProfile'],
    mutationFn: updateUserUsingSessionApi,
    onSuccess: () => {
      toast.success('Profile updated successfully!');
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    },
    onError: () => {
      toast.error('Failed to update profile. Please try again.');
    },
  });

  // Set up mutation for image upload
  const uploadImageMutation = useMutation({
    mutationKey: ['uploadUserImage'],
    mutationFn: uploadImageApi,
    onSuccess: (data) => {
      setPreviewImage(data.url);
      const updates = {
        userImage: data.url
      }
      updateProfileMutation.mutate({updates})
    },
    onError: () => {
      toast.error('Failed to upload image. Please try again.');
    },
  });

  // Handle image change
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      uploadImageMutation.mutate(file);
    }
  };

  // Handle form submission
  const onSubmit = (values: any) => {
    console.log(values);
    const updatedProfile = {
      ...values,
      userImage: previewImage || userData?.userImage,
    };
    console.log(updatedProfile);
    updateProfileMutation.mutate({updates:updatedProfile});
  };

  // Set form values when user data is loaded
  useEffect(() => {
    if (userData) {
      form.reset({
        fullName: userData.fullName || '',
        email: userData.email || '',
        phoneNumber: userData.phoneNumber || '',
        addressOne: userData.addressOne || '',
        addressTwo: userData.addressTwo || '',
        facebook: userData.facebook || '',
        instagram: userData.instagram || '',
        website: userData.website || '',
        linkedIn: userData.linkedIn || '',
        twoStepVerification: userData.twoStepVerification || false,
      });

      if (userData.userImage) {
        setPreviewImage(userData.userImage);
      }
    }
  }, [userData, form]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-on-surface-black text-on-surface-bright-white">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-t-primary-dark-gradient rounded-full animate-spin"></div>
          <p className="mt-4 text-primary-dark-gradient">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-on-surface-black text-on-surface-bright-white">
        <div className="flex flex-col items-center">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <p className="mt-4 text-red-500">
            Failed to load profile. Please try again later.
          </p>
          <Button
            onClick={() => router.push('/dashboard')}
            className="mt-4 bg-primary-dark-gradient text-on-surface-black"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    userData && (
      <div className="bg-on-surface-black text-on-surface-bright-white">
        <div className="pt-[5.5rem]"></div>
        <MaxWidthWrapper>
          <div className="py-[2rem] md:py-[3rem]">
            <div className="max-w-3xl mx-auto">
              <div className="mb-8 flex items-center">
                <Button
                  variant="ghost"
                  onClick={() => router.push('/dashboard')}
                  className="mr-4 text-primary-dark-gradient hover:text-amber-400"
                >
                  <ArrowLeft className="w-5 h-5 mr-2 text-white" />
                  Back to Dashboard
                </Button>
                <Heading variant="h3" className="text-amber-500">
                  Profile
                </Heading>
              </div>

              {showSuccessMessage && (
                <div className="mb-6 p-4 bg-green-900/20 border border-green-500 rounded-md flex items-center text-green-500">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              <div className="bg-on-surface-black border border-primary-dark-gradient p-6 md:p-8 rounded-md">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    {/* Profile Image */}
                    <div className="flex flex-col items-center md:items-start mb-8">
                      <div className="relative">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary-dark-gradient bg-gray-800 flex items-center justify-center">
                          {previewImage ? (
                            <img
                              src={previewImage}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-4xl text-gray-400">
                              {userData.fullName?.charAt(0)}
                            </span>
                          )}
                        </div>
                        <label className="absolute bottom-0 right-0 bg-primary-dark-gradient p-2 rounded-full cursor-pointer">
                          <Camera className="w-5 h-5 text-on-surface-black" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                        </label>
                      </div>
                      <div className="mt-2 text-center md:text-left">
                        <p className="text-amber-500 font-semibold">
                          Profile Photo
                        </p>
                        <p className="text-sm text-gray-400">
                          Upload a high-quality image for your profile
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Personal Information */}
                      <div className="space-y-6 md:col-span-2">
                        <Heading
                          variant="h4"
                          className="text-primary-dark-gradient pb-2 border-b border-amber-500/30"
                        >
                          Personal Information
                        </Heading>

                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-on-surface-white">
                                Full Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your full name"
                                  className="bg-transparent border-primary-dark-gradient text-on-surface-white"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-500" />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="email"
                            disabled
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-on-surface-white">
                                  Email
                                  {userData.emailVerified && (
                                    <span className="ml-2 inline-flex items-center text-green-500 text-xs">
                                      <CheckCircle className="w-3 h-3 mr-1" />{' '}
                                      Verified
                                    </span>
                                  )}
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder="Your email address"
                                    className="bg-transparent border-primary-dark-gradient text-on-surface-white"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="phoneNumber"
                                           disabled
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-on-surface-white">
                                  Phone Number
                                  {userData.phoneVerified && (
                                    <span className="ml-2 inline-flex items-center text-green-500 text-xs">
                                      <CheckCircle className="w-3 h-3 mr-1" />{' '}
                                      Verified
                                    </span>
                                  )}
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Your phone number"
                                    className="bg-transparent border-primary-dark-gradient text-on-surface-white"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* Address */}
                      <div className="space-y-6 md:col-span-2">
                        <Heading
                          variant="h4"
                          className="text-primary-dark-gradient pb-2 border-b border-amber-500/30"
                        >
                          Address
                        </Heading>

                        <FormField
                          control={form.control}
                          name="addressOne"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-on-surface-white">
                                Address Line 1
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Your primary address"
                                  className="bg-transparent border-primary-dark-gradient text-on-surface-white"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-500" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="addressTwo"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-on-surface-white">
                                Address Line 2 (Optional)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Apartment, suite, unit, etc."
                                  className="bg-transparent border-primary-dark-gradient text-on-surface-white"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-500" />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Social Media */}
                      <div className="space-y-6 md:col-span-2">
                        <Heading
                          variant="h4"
                          className="text-primary-dark-gradient pb-2 border-b border-amber-500/30"
                        >
                          Social Media
                        </Heading>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="facebook"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-on-surface-white">
                                  Facebook (Optional)
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Facebook profile URL"
                                    className="bg-transparent border-primary-dark-gradient text-on-surface-white"
                                    {...field}
                                    value={field.value || ''}
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="instagram"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-on-surface-white">
                                  Instagram (Optional)
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Instagram handle"
                                    className="bg-transparent border-primary-dark-gradient text-on-surface-white"
                                    {...field}
                                    value={field.value || ''}
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="linkedIn"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-on-surface-white">
                                  LinkedIn (Optional)
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="LinkedIn profile URL"
                                    className="bg-transparent border-primary-dark-gradient text-on-surface-white"
                                    {...field}
                                    value={field.value || ''}
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-on-surface-white">
                                  Website (Optional)
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Your personal or company website"
                                    className="bg-transparent border-primary-dark-gradient text-on-surface-white"
                                    {...field}
                                    value={field.value || ''}
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* Security */}
                      <div className="space-y-6 md:col-span-2">
                        <Heading
                          variant="h4"
                          className="text-primary-dark-gradient pb-2 border-b border-amber-500/30"
                        >
                          Security
                        </Heading>

                        <FormField
                          control={form.control}
                          name="twoStepVerification"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between p-4 border border-primary-dark-gradient/30 rounded-md">
                              <div className="space-y-0.5">
                                <FormLabel className="text-on-surface-white">
                                  Two-Step Verification
                                </FormLabel>
                                <p className="text-sm text-gray-400">
                                  Enable two-step verification for enhanced
                                  account security
                                </p>
                              </div>
                              <FormControl>
                                <Switch
                                  id="twoStepVerification"
                                  label="Two Step Verification"
                                  value={field.value ? 'Yes' : 'No'}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="pt-6">
                      <div className="flex justify-end gap-4">
                        <Button
                          type="submit"
                          className="py-3 px-4 cursor-pointer hover:bg-opacity-50 bg-border-primary-dark-gradient text-base text-on-surface-black hover:opacity-90"
                          disabled={updateProfileMutation.isPending}
                        >
                          {updateProfileMutation.isPending ? (
                            <>
                              <div className="w-4 h-4 border-2 border-t-transparent border-on-surface-black rounded-full animate-spin"></div>
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4" />
                              Save Changes
                            </>
                          )}
                        </Button>
                        <Button
                          type="button"
                          onClick={() => router.push('/dashboard')}
                          className="border-primary-dark-gradient rounded-none hover:bg-amber-500 border-2 hover:text-black text-on-surface-white cursor-pointer"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </div>

              <div className="mt-8 text-center text-sm text-gray-400">
                <p>
                  Member since{' '}
                  {new Date(userData.dateCreated).toLocaleDateString()}
                </p>
                <p className="mt-1">User ID: {userData.id}</p>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    )
  );
};

export default ProfilePage;
