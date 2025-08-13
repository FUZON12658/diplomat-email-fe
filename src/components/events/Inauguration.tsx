'use client';
// import { registerForMiniEventApi } from '@/api/registration/register';
// import { uploadImageApi } from '@/api/uploadImage';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowNarrowRight, Check } from '@untitled-ui/icons-react';
import { ChevronsUpDown, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import SignatureCanvas from 'react-signature-canvas';
import 'rodal/lib/rodal.css';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Option } from '../ui/multiple-selector';
import { useMutation } from '@tanstack/react-query';
import { registerForMiniEventApi } from '@/api/events/events';
import { toast } from 'sonner';
import { uploadImageApi } from '@/api/uploadImage';
import { BodyText, Heading } from '../Common/Typography';
import { countries } from '../json/countries';
import { cn } from '@/lib/utils';


const registrationFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  fullName: z.string().min(1, 'Please enter your First Name'),
  signature: z.any(),
  countryOfResidence: z
    .string()
    .min(1, 'Please select your country of residence'),
  organizationName: z.string().optional(),
  phoneNumber: z.string().min(1, 'Please enter your phone number'),
});

interface RegistrationFormData {
  email: string;
  fullName: string
  countryOfResidence: string;
  signature?: any;
  organizationName?: string;
  phoneNumber: string;

}

export const Inauguration = () => {
  const router = useRouter();

  const [sendToSuccess, setSendToSuccess] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [emergencyContactValue, setEmergencyContactValue] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [emergencyOpen, setEmergencyOpen] = React.useState(false);
  const [maxLength, setMaxLength] = React.useState(10); // Default max length
  const [selectedCountry, setSelectedCountry] = React.useState({
    name: 'Nepal',
    code: '+977',
    flag: 'https://flagcdn.com/np.svg',
  });
  const [selectedEmergencyContactCountry, setSelectedEmergencyContactCountry] =
    React.useState({
      name: 'Nepal',
      code: '+977',
      flag: 'https://flagcdn.com/np.svg',
    });
  const [isRepresentingOrganization, setIsRepresentingOrganization] =
    React.useState(false);
  const [maxLengthEmergencyContact, setMaxLengthEmergencyContact] =
    React.useState(10);
  const [interests, setInterests] = React.useState<string[]>([]); // New state for interests
  const [loading, setLoading] = React.useState(true);
  const [areaOfInterestOptions, setAreaOfInterestOptions] = React.useState<
    Option[]
  >([]);
  const [isPageOne, setIsPageOne] = React.useState(true);
  const [isPageTwo, setIsPageTwo] = React.useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState(1);
  const [isSubmittingForm, setIsSubmittingForm] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const canvasRef = React.useRef<any>(null);

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      email: '',
      fullName: '',
      phoneNumber: '',
      countryOfResidence: '',
      organizationName: '',
      signature: null,
    },
  });
  const signature = form.getValues().signature as File | undefined;

  const handleUseSignature = () => {
    if (canvasRef && canvasRef.current) {
      // Get the base64 string from the canvas
      console.log(canvasRef.current);
      const dataURL = canvasRef.current
        .getTrimmedCanvas()
        .toDataURL('image/png');
      const file = dataURLtoFile(dataURL, 'signature.png');

      // Trigger the onChange function with the file
      form.setValue('signature', file);
      setModal(false); // Close the modal after using the signature

      canvasRef.current.clear();
    }
  };

  const dataURLtoFile = (dataURL: string, filename: string) => {
    const arr = dataURL.split(',');

    const mimeMatch = arr[0]?.match(/:(.*?);/);
    if (!mimeMatch) throw new Error('Invalid data URL format.');
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const registrationFormMutation = useMutation({
    mutationKey: ['userRegistration'],
    mutationFn: registerForMiniEventApi,
    onSuccess: (data) => {
      toast.success('You have successfully registered for the event');
      setIsSubmittingForm(false);
      window.location.href = data.redirectUrl;
    },
    onError: (data) => {
      console.log(data);
      setIsSubmittingForm(false);
      //@ts-expect-error no error occurs
      toast.error(`${data.response.data.errors[0].message}`);
    },
  });

  const onSubmit = async () => {
    setIsSubmittingForm(true);
    let values: any = form.getValues();
    let signature: any;

    if (values.signature) {
      if (values.signature instanceof File) {
        signature = await uploadImageApi(values.signature);
      } else {
        signature = { url: values.profilePicture };
      }
    }

    const formattedValues = {
      email: values.email,
      fullName: values.fullName,
      organizationName: values.organizationName,
      phoneNumber: values.phoneNumber,
      signature: signature.url,
      countryOfResidence: values.countryOfResidence
    };

    registrationFormMutation.mutate(formattedValues);
  };

  return (
    <div className="relative flex items-center justify-center flex-col">
      <Heading variant="h2" className="mt-4 md:mt-20 w-[22.375rem] md:w-auto">
        REGISTER FOR INAUGURATION EVEN
      </Heading>
      {/* <Rodal
        visible={modal}
        onClose={() => {
          if (canvasRef && canvasRef.current) {
            canvasRef.current.clear();
          }
          setModal(false);
        }}
        animation="zoom"
        height={380}
        className=" rounded-3xl px-4"
      >
        <div className="border-b flex items-center justify-between pb-2 mb-4 border-gray-300 z-50 ">
          Add your signature
        </div>

        <div>
          <SignatureCanvas
            penColor="green"
            canvasProps={{
              width: 500,
              height: 200,
              className: 'sigCanvas',
            }}
            ref={canvasRef}
          />

          <button
            type="button"
            onClick={() => {
              if (canvasRef && canvasRef.current) {
                canvasRef.current.clear();
              }
            }}
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 -mt-5 w-full rounded-lg text-sm px-5 py-2"
          >
            Clear Canvas
          </button>

          <button
            type="button"
            onClick={handleUseSignature}
            className="text-white bg-green-500 hover:bg--600 focus:ring-4 focus:ring-secondary-300 w-full mt-2 rounded-lg text-sm px-5 py-2"
          >
            Use this Signature
          </button>
        </div>
      </Rodal> */}
      {isPageOne && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="top relative w-[22.375rem] mx-auto md:w-[49.5rem] mt-[2rem]">
              <div className="header sticky top-6 w-[22.375rem] md:w-[49.5rem] h-[2.75rem] flex items-center justify-center bg-[#DEE7F7] rounded-[0.5rem] z-30">
                <Heading variant="h6">Required Information</Heading>
              </div>
              <div className="p-8 bg-[#f7f9fd] mt-2 rounded-[0.5rem] relative z-10">
                <div className="flex flex-wrap gap-x-8 gap-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem className="max-w-[18.375rem] w-[18.375rem] md:min-w-[21.75rem]">
                        <FormLabel className="">
                          <BodyText variant="trimmed">Full Name</BodyText>
                        </FormLabel>
                        <FormControl className="w-[21.75rem]">
                          <Input
                            className="rounded-[0.5rem] max-w-[18.375rem] w-[18.375rem] md:w-[21.75rem] md:min-w-[21.75rem] h-[2.75rem] min-h-[2.75rem] placeholder:text-[0.875rem] sm:text-base"
                            placeholder="Enter your full name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="md:min-w-[21.75rem]">
                        <FormLabel>
                          <BodyText variant="trimmed">Email Address</BodyText>
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-[0.5rem] max-w-[18.375rem] w-[18.375rem] md:w-[21.75rem] md:min-w-[21.75rem] h-[2.75rem] min-h-[2.75rem] placeholder:text-[0.875rem] sm:text-base"
                            placeholder="Enter your email address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="countryOfResidence"
                    render={({ field }) => (
                      <FormItem className="w-[19.375rem] md:min-w-[21.75rem]">
                        <FormLabel className="text-[0.875rem] sm:text-[1.25rem]">
                          <BodyText variant="trimmed">
                            Country Of Residence
                          </BodyText>
                        </FormLabel>
                        <FormControl className="w-full">
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-full justify-between rounded-[0.5rem] min-h-[2.75rem] focus-visible:ring-0 text-[0.875rem] sm:text-base"
                              >
                                {value
                                  ? countries.find(
                                      (country) => country.name === value
                                    )?.name
                                  : 'Select country...'}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="md:min-w-[21.75rem] p-0">
                              <Command>
                                <CommandInput placeholder="Search country..." />
                                <CommandList>
                                  <CommandEmpty>No country found.</CommandEmpty>
                                  <CommandGroup>
                                    {countries.map((country) => (
                                      <CommandItem
                                        key={country.code}
                                        value={country.name}
                                        onSelect={(currentValue) => {
                                          setValue(
                                            currentValue === value
                                              ? ''
                                              : currentValue
                                          );
                                          field.onChange(currentValue);
                                          const selectedCountry =
                                            countries.find(
                                              (country) =>
                                                country.name === currentValue
                                            );
                                          setSelectedCountry(
                                            selectedCountry
                                              ? selectedCountry
                                              : {
                                                  name: 'Nepal',
                                                  code: '+977',
                                                  flag: 'https://flagcdn.com/np.svg',
                                                }
                                          );
                                          setMaxLength(
                                            Math.max(
                                              ...(selectedCountry?.allowedLengths || [
                                                10,
                                              ])
                                            )
                                          );
                                          setOpen(false);
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            'mr-2 h-4 w-4',
                                            value === country.name
                                              ? 'opacity-100'
                                              : 'opacity-0'
                                          )}
                                        />
                                        {country.name}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem className="w-[19.375rem] md:min-w-[21.75rem]">
                        <FormLabel className="text-[1.25rem] flex justify-between">
                          <BodyText variant="trimmed">Phone Number</BodyText>
                          <span className=" text-sm text-gray-500">
                            {form.getValues().phoneNumber?.length || 0} /{' '}
                            {maxLength}
                          </span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative flex flex-col">
                            <div className="relative flex">
                              {selectedCountry.flag && (
                                <img
                                  src={selectedCountry.flag}
                                  alt="flag"
                                  className="absolute hidden md:flex left-2 top-1/2 transform -translate-y-1/2 w-6 h-4"
                                />
                              )}
                              <Input
                                className="rounded-r-none rounded-l-[0.5rem] min-h-[2.75rem] w-[4.125rem] sm:w-[6rem] focus-visible:ring-0 text-xs md:text-base  sm:pl-8"
                                value={selectedCountry.code}
                                readOnly
                              />
                              <Input
                                className="rounded-l-none rounded-r-[0.5rem] min-h-[2.75rem] focus-visible:ring-0 text-[0.875rem] sm:text-base"
                                placeholder="Enter your phone number"
                                maxLength={maxLength}
                                {...field}
                                onInput={(e) => {
                                  e.currentTarget.value =
                                    e.currentTarget.value.replace(/\D/g, '');
                                  field.onChange(e);
                                }}
                              />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organizationName"
                    render={({ field }) => (
                      <FormItem className="max-w-[18.375rem] w-[18.375rem] md:min-w-[21.75rem]">
                        <FormLabel className="">
                          <BodyText variant="trimmed">
                            Organization Name
                          </BodyText>
                        </FormLabel>
                        <FormControl className="w-[21.75rem]">
                          <Input
                            className="rounded-[0.5rem] max-w-[18.375rem] w-[18.375rem] md:w-[21.75rem] md:min-w-[21.75rem] h-[2.75rem] min-h-[2.75rem] placeholder:text-[0.875rem] sm:text-base"
                            placeholder="Enter your organizaition name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="signature"
                    render={({ field }) => (
                      <FormItem className="md:min-w-[21.75rem]">
                        <FormLabel>
                          <BodyText variant="trimmed">Signature</BodyText>
                        </FormLabel>
                        <FormControl>
                          {form.getValues().signature === null ? (
                            <Button
                              type="button"
                              onClick={() => setModal(true)}
                              className="rounded-[0.5rem] max-w-[18.375rem] w-[18.375rem] md:w-[21.75rem] md:min-w-[21.75rem] h-[2.75rem] min-h-[2.75rem] placeholder:text-[0.875rem] sm:text-base bg-transparent border-[#ececec] hover:bg-blue-100 text-gray-500 hover:text-black text-start justify-start"
                            >
                              <BodyText variant="trimmed">
                                Enter Your Signature
                              </BodyText>
                            </Button>
                          ) : (
                            <div className="relative max-w-[21.75rem] min-w-[21.75rem] flex items-center justify-center">
                              {form.getValues().signature !== null && (
                                <img
                                  src={URL.createObjectURL(
                                    form.getValues().signature
                                  )}
                                  alt="Signature"
                                  className="max-w-[21.75rem] h-auto rounded-[0.5rem]"
                                />
                              )}

                              <Button
                                type="button"
                                variant="destructive"
                                onClick={() => {
                                  form.setValue('signature', null);
                                }}
                                className="absolute top-0  right-8"
                              >
                                <X className="max-w-6 max-h-6" />
                              </Button>
                            </div>
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              // disabled={registrationFormMutation.isPending || isSubmittingForm}
              className="rounded-sm w-[14rem] sm:w-[15.625rem] h-[3.125rem] hover:opacity-[0.8] active:opacity-[0.6] mt-4 mb-4 md:mb-0"
            >
              {
                // registrationFormMutation.isPending ||
                isSubmittingForm ? (
                  <BodyText variant="medium">Please Wait!</BodyText>
                ) : (
                  <BodyText variant="medium"> Complete Registration</BodyText>
                )
              }
              <ArrowNarrowRight
                width={`1.25rem`}
                height={`1.25rem`}
                color="white"
              />
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};
