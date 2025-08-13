'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import MaxWidthWrapper from '@/components/Common/MaxWidthWrapper';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { JoinNow } from '@/components/Common/animatedComponent/JoinNow';
import { useMutation, useQuery } from '@tanstack/react-query';
import { updateUserUsingAuthInQuery } from '@/api/auth/updateUser';
import { toast } from 'sonner';

// Form schema with zod validation - now includes privacy policy agreement
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
  agreeToPrivacyPolicy: z.boolean().refine((value) => value === true, {
    message: "You must agree to the privacy policy to continue",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const CompleteProfile = () => {
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [auth, setAuth] = useState<string|null>(null);
  const [email, setEmail] = useState<string|null>(null);

  React.useEffect(() => {
    const authParam = searchParams.get('auth');
    const emailParam = searchParams.get('email');
    if(!authParam||!emailParam){
      router.push('/');
      return;
    }
    setAuth(authParam);
    setEmail(emailParam);
  }, [searchParams]);

  // Initialize react-hook-form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      agreeToPrivacyPolicy: false,
    },
  });

  const updateUserMutaton = useMutation({
    mutationFn: updateUserUsingAuthInQuery,
    onSuccess: () => {
      toast.success("Welcome to Ambassadors Club Nepal!")
      router.push(`/auth/login`)
      form.reset();
    },
    onError: () => {
      toast.error("Something went wrong. Please contact support!")
    }
  })

  React.useEffect(()=>{
    email && form.setValue('email', email);
  },[email])

  const onSubmit = (values:any) => {
    setError('');
    console.log(values);
    
    try {
      // Process form submission
      if(!auth){
        router.push('/');
        return;
      }
      updateUserMutaton.mutate({ auth: auth, updates: values})
      
    } catch (err) {
      setError('There was an error completing your profile. Please try again.');
    }
  };

  return (
    <section
      className="bg-on-surface-black bg-blend-color-burn pt-8 pb-[6.25rem] h-[60rem]"
      style={{
        backgroundImage: "url('/bgTexturedark.png')",
      }}
    >
      <MaxWidthWrapper>
        <div className="mx-auto bg-on-surface-black border border-primary-dark-gradient p-10 md:w-fit mt-52 space-y-[5.5rem]">
          <div>
            <div className="space-y-[4.5rem]">
              <div className="max-w-[22.375rem] md:max-w-[32.75rem] md:w-[32.75rem] border-b border-b-primary-on-light/50 pb-4">
                <p className="font-diamend text-2xl leading-8 text-center text-primary-dark-gradient">
                  Complete Your Profile
                </p>
              </div>
              
              <div className="w-[16.8125rem] mx-auto space-y-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      disabled={true}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="Enter Your Email"
                              className="w-full p-3 placeholder:text-[#8F8FA3] text-on-surface-bright-white text-base leading-6 outline outline-primary-dark-gradient bg-transparent border-none"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              placeholder="Create Password"
                              className="w-full p-3 placeholder:text-[#8F8FA3] text-on-surface-bright-white text-base leading-6 outline outline-primary-dark-gradient bg-transparent border-none"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              placeholder="Confirm Password"
                              className="w-full p-3 placeholder:text-[#8F8FA3] text-on-surface-bright-white text-base leading-6 outline outline-primary-dark-gradient bg-transparent border-none"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />

                    {/* Privacy Policy Checkbox */}
                    <FormField
                      control={form.control}
                      name="agreeToPrivacyPolicy"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={field.value}
                                onChange={(e) => field.onChange(e.target.checked)}
                                className="w-4 h-4 accent-primary-dark-gradient border border-primary-dark-gradient rounded focus:ring-primary-dark-gradient"
                              />
                            </div>
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm flex flex-wrap text-on-surface-white cursor-pointer">
                              I agree to the{' '}
                              <Link 
                                href="/privacy" 
                                className="text-primary-dark-gradient hover:underline"
                                target="_blank"
                              >
                                Privacy Policy
                              </Link>
                              {' '}and{' '}
                              <Link 
                                href="/terms-and-conditions" 
                                className="text-primary-dark-gradient hover:underline"
                                target="_blank"
                              >
                                Terms of Service
                              </Link>
                            </FormLabel>
                            <FormMessage className="text-red-500 text-sm" />
                          </div>
                        </FormItem>
                      )}
                    />

                    <div className="space-y-2 transition-all duration-200">
                      {error && <p className="text-red-500">{error}</p>}
                      <Button 
                        type="submit"
                        className="py-3 w-full bg-border-primary-dark-gradient text-base leading-6 text-on-surface-black cursor-pointer hover:bg-primary-dark-gradient/90 transition-all duration-200"
                      >
                        Complete Profile
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
          
          <div className="w-fit flex gap-2 items-start mx-auto">
            <p className="text-on-surface-white text-base leading-6">
              Having Trouble?{' '}
            </p>
            <Link href="/contact" className="text-primary-dark-gradient text-base leading-6 hover:underline">
              Contact Support
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};