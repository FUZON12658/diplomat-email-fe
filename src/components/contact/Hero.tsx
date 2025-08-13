'use client'

import React from 'react';
import Link from 'next/link';
import { ChevronDown, Mail, Phone } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from '@tanstack/react-query';
import { saveContactFormDataApi } from '@/api/Contact/contact';
import { toast } from 'sonner';
import MaxWidthWrapper from '../Common/MaxWidthWrapper';
import { countries } from '../json/countries';


export const Hero = () => {
  const [selectedCountry, setSelectedCountry] = React.useState(countries[0]);

  // Define form schema with Zod
  const formSchema = z.object({
    prefix: z.string().min(1, "Prefix is required"),
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    country: z.string().min(1, "Country is required"),
    phone: z.string().refine((val:any) => {
      const country:any = countries.find(c => c.name === form.getValues().country);
      if (!country) return true;
      
      // Check if phone number length is valid for selected country
      return country.allowedLengths.includes(val.replace(/\D/g, '').length);
    }, {
      message: "Phone number length is invalid for selected country"
    }),
    subject: z.string().min(1, "Subject is required"),
    organizationName: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters")
  });

  // Initialize form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prefix: "Mr.",
      fullName: "",
      email: "",
      country: countries[0].name,
      phone: "",
      subject: "Join The Club",
      organizationName: "",
      message: ""
    }
  });

  // Handle country selection change
  const handleCountryChange = (value:any) => {
    const country = countries.find((c) => c.name === value);
    if(country){
    setSelectedCountry(country);
    }

    
    // Validate phone number after country change
    form.trigger("phone");
  };

  const contactFormMutation = useMutation({
    mutationKey: ["ambassadorContactForm"],
    mutationFn: saveContactFormDataApi,
    onSuccess: () => {
      toast.success("Successfully saved your request!")
      form.reset();
    },
    onError: () => {
      toast.error("Oops! Something went wrong when saving your request!")
    }
  })
  const onSubmit = (values:any) => {
    console.log("Form submitted with data:", values);
    const postData = {
      prefix: values.prefix,
      name: values.fullName,
      email: values.email,
      countryOfResidence: values.country,
      phoneNumber: values.phone,
      subject: values.subject,
      organizationName: values.organizationName,
      message: values.message
    }
    contactFormMutation.mutate({...postData})

  };

  return (
    <section
      className="bg-on-surface-black bg-blend-color-burn pt-8 pb-24"
      style={{
        backgroundImage: "url('/bgTexturedark.png')",
      }}
    >
      <MaxWidthWrapper>
        <div className="mx-auto md:p-10 w-full max-w-4xl space-y-12">
          <div className="w-full border-b border-b-primary-on-light/50 pb-6">
            <p className="font-diamend text-5xl leading-tight text-center text-primary-dark-gradient">
              Contact
            </p>
          </div>
          <div className="w-[22.375rem] md:w-full bg-on-surface-black border border-primary-dark-gradient">
            <div className="space-y-6 p-6 md:p-10">
              <div className="w-full border-b border-b-primary-on-light/50 pb-4">
                <p className="font-diamend text-2xl leading-8 text-left text-primary-dark-gradient">
                  Contact Form
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Prefix */}
                    <FormField
                      control={form.control}
                      name="prefix"
                      render={({ field }) => (
                        <FormItem className="flex-1 md:flex-[0.25]">
                          <FormLabel className="text-base text-on-surface-white">Prefix</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full p-3 text-on-surface-white border-primary-dark-gradient">
                                <SelectValue placeholder="Select a prefix" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-on-surface-black text-on-surface-white">
                              <SelectItem value="H.E.">H.E.</SelectItem>
                              <SelectItem value="Hon'ble">Hon'ble</SelectItem>
                              <SelectItem value="Prof. Dr.">Prof. Dr.</SelectItem>
                              <SelectItem value="Prof.">Prof.</SelectItem>
                              <SelectItem value="Dr.">Dr.</SelectItem>
                              <SelectItem value="Mr.">Mr.</SelectItem>
                              <SelectItem value="Mrs.">Mrs.</SelectItem>
                              <SelectItem value="Ms.">Ms.</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    {/* Full Name */}
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-base text-on-surface-white">Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Your Full Name"
                              className="w-full p-3 placeholder:text-gray-500 text-on-surface-white border-primary-dark-gradient bg-transparent"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    {/* Email Address */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-base text-on-surface-white">Email Address</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter Your Email Address"
                              className="w-full p-3 placeholder:text-gray-500 text-on-surface-white border-primary-dark-gradient bg-transparent"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Country */}
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-base text-on-surface-white">Country</FormLabel>
                          <Select 
                            onValueChange={(value) => {
                              field.onChange(value);
                              handleCountryChange(value);
                            }} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full p-3 text-on-surface-white border-primary-dark-gradient pl-12 relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                  <img
                                    src={selectedCountry.flag}
                                    alt={`${selectedCountry.name} flag`}
                                    className="w-6 h-4 object-fit"
                                  />
                                </div>
                                <SelectValue placeholder="Select a country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-64 overflow-y-auto bg-on-surface-black text-on-surface-white">
                              {countries.map((country) => (
                                <SelectItem key={country.name} value={country.name} className="flex items-center">
                                  <div className="flex items-center">
                                    {country.name}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    {/* Phone Number */}
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="flex-1 relative">
                          <FormLabel className="text-base text-on-surface-white">Phone Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type="tel"
                                placeholder="Enter Phone Number"
                                className="w-full p-3 pl-16 placeholder:text-gray-500 text-on-surface-white border-primary-dark-gradient bg-transparent"
                                onChange={(e) => {
                                  const value = e.target.value.replace(/\D/g, '');
                                  field.onChange(value);
                                }}
                                value={field.value}
                              />
                              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                {selectedCountry.code}
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-500" />
                          {selectedCountry && (
                            <p className="text-xs text-gray-400 mt-1 absolute right-0 top-0">
                              Expected length: {selectedCountry.allowedLengths.join(' or ')} digits
                            </p>
                          )}
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Subject */}
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-base text-on-surface-white">Subject</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full p-3 text-on-surface-white border-primary-dark-gradient">
                                <SelectValue placeholder="Select subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-on-surface-black text-on-surface-white">
                              <SelectItem value="Join The Club">Join The Club</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    {/* Organization Name */}
                    <FormField
                      control={form.control}
                      name="organizationName"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-base text-on-surface-white">Organization Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Organization Name"
                              className="w-full p-3 placeholder:text-gray-500 text-on-surface-white border-primary-dark-gradient bg-transparent"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Message */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base text-on-surface-white">Your Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter Your Message"
                            className="w-full p-3 placeholder:text-gray-500 text-on-surface-white border-primary-dark-gradient resize-none bg-transparent min-h-24"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <Button 
                      type="submit" 
                      className="py-3 cursor-pointer hover:bg-opacity-50 px-9 bg-border-primary-dark-gradient text-base text-on-surface-black hover:opacity-90"
                    >
                      Submit
                    </Button>
                    
                    <div className="flex flex-col md:flex-row gap-6">
                      <Link href={'tel:+977014500300'} className="flex gap-2 items-center">
                        <Phone size={20} strokeWidth={1} stroke="#C2A75A" />
                        <p className="text-base text-on-surface-white">+977 01-4500300</p>
                      </Link>
                      <Link href={'mailto:info@ambassadorsclubnepal.com'} className="flex gap-2 items-center">
                        <Mail size={24} strokeWidth={1} stroke="#C2A75A" />
                        <p className="text-base text-on-surface-white">info@ambassadorsclubnepal.com</p>
                      </Link>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};