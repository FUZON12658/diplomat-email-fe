'use client';
import { ambclubAxios } from '@/api';
import { uploadImageApi } from '@/api/uploadImage';
import { BodyText, Heading } from '@/components/admin/common/typography';
import FileUploader from '@/components/admin/ui/fileuploader';
import CustomJodit from '@/components/Common/CustomJodit';
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
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { capitalizeFirstLetter, formatDateInNepaliTimezone } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import { Plus } from '@untitled-ui/icons-react';
import { X } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { toast } from 'sonner';
import { z } from 'zod';

const isImageFile = (fileNameOrUrl?: string) => {
  if (!fileNameOrUrl || typeof fileNameOrUrl !== 'string') return false; // Ensure it's a valid string

  const imageExtensions = ['png', 'jpg', 'jpeg', 'webp', 'svg'];

  try {
    const url = new URL(fileNameOrUrl); // Check if it's a valid URL
    const decodedPath = decodeURIComponent(url.pathname.toLowerCase()); // Decode and normalize
    return imageExtensions.some((ext) => decodedPath.endsWith(`.${ext}`));
  } catch (e) {
    // Not a valid URL, treat it as a filename
    const fileExtension = fileNameOrUrl.split('.').pop()?.toLowerCase();
    return fileExtension ? imageExtensions.includes(fileExtension) : false;
  }
};

const getValidationSchema = (fields: any) => {
  const schema = {};
  fields.forEach(
    ({
      key,
      type,
      required,
      allowAny,
    }: {
      key: any;
      type: any;
      required: any;
      allowAny: any;
    }) => {
      let fieldSchema;
      switch (type) {
        case 'text':
          if (allowAny) {
            fieldSchema = z.any();
            break;
          }
          fieldSchema = z.string();
          if (required) fieldSchema = fieldSchema.min(1, `${key} is required`);
          break;
        case 'jsonArray':
          fieldSchema = z
            .array(
              z.object({}).passthrough() // Allow any keys in the object
            )
            .optional();
          if (required) {
            fieldSchema = z
              .array(z.object({}).passthrough())
              .min(1, `At least one ${key} item is required`);
          }
          break;
        case 'htmlfield':
          fieldSchema = z.string();
          if (required) fieldSchema = fieldSchema.min(1, `${key} is required`);
          break;
        case 'file':
          fieldSchema = z.any(); // `File` instance validation may fail in some environments
          break;
        case 'filegallery':
          fieldSchema = z.any(); // `File` instance validation may fail in some environments
          break;
        case 'switch':
          fieldSchema = z.string().optional();
          break;
        case 'number':
          fieldSchema = z.number();
          if (required) fieldSchema = fieldSchema.min(1, `${key} is required`);
          break;
        case 'multiselect':
          fieldSchema = z.any();
          break;
        case 'singleselectstatic':
          fieldSchema = z.any();
          break;
        case 'singleselect':
          fieldSchema = z.any();
          break;
        case 'time':
          fieldSchema = z.string();
          if (required) fieldSchema = fieldSchema.min(1, `${key} is required`);
          break;
        case 'date':
          fieldSchema = z.string();
          if (required) fieldSchema = fieldSchema.min(1, `${key} is required`);
          break;
        default:
          fieldSchema = z.any();
      }
      //@ts-expect-error nothing just bullshit typescript showing bullshit warnings
      schema[key] = fieldSchema;
    }
  );
  return z.object(schema);
};

interface FormData {
  [key: string]: any;
}

interface DynamicFormProps {
  formDataSupplied?: FormData;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  formDataSupplied,
}) => {
  const { slug } = useParams();
  const [files, setFiles] = React.useState<Record<string, File[]>>({});
  const [formValues, setFormValues] = React.useState({});
  const [singleSelectStaticOptions, setSingleSelectStaticOptions] =
    React.useState({});

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const getDataFromRoute = async (route: string) => {
    const response = await ambclubAxios.get(route);
    return response.data;
  };

  const postDetailsApi = async (data: any) => {
    const response = await ambclubAxios.post(
      `${viewData.displayModel.actions.add.actionRoute}`,
      data
    );
    return response.data;
  };

  const handleFileUpload = (key: string, newFiles: File[]) => {
    setFiles((prev) => ({
      ...prev,
      [key]: newFiles,
    }));
  };

  // Function to get files for a specific key
  const getFilesForKey = (key: string): File[] => {
    return files[key] || [];
  };

  // Function to remove a specific file from a key
  const removeFileFromKey = (key: string, fileIndex: number) => {
    setFiles((prev) => ({
      ...prev,
      [key]: (prev[key] || []).filter((_, index) => index !== fileIndex),
    }));
  };

  // Function to clear all files for a specific key
  const clearFilesForKey = (key: string) => {
    setFiles((prev) => ({
      ...prev,
      [key]: [],
    }));
  };
  const putDetailsApi = async (data: any) => {
    const response = await ambclubAxios.put(
      //@ts-expect-error nothing just bullshit typescript showing bullshit warnings
      `${viewData.displayModel.actions.edit.actionRoute}${formDataSupplied.id}`,
      data
    );
    return response.data;
  };

  const getDetailsApi = async (
    limit: number = 1,
    offset: number = 0,
    sortOrder: 'ASC' | 'DESC' = 'DESC'
  ) => {
    const response = await ambclubAxios.get(`/api/v1/${slug}`, {
      params: { limit, offset, sort: sortOrder },
    });
    return response.data;
  };

  const putDetailsMutation = useMutation({
    mutationFn: putDetailsApi,
    onSuccess: () => {
      setIsSubmitting(false);
    },
    onError: () => {
      setIsSubmitting(false);
    },
  });

  const postDetailMutation = useMutation({
    mutationFn: postDetailsApi,
    onSuccess: () => {
      setIsSubmitting(false);
    },
    onError: () => {
      setIsSubmitting(false);
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: uploadImageApi,
    onError: () => {
      setIsSubmitting(false);
    },
  });

  const {
    data: viewData,
    isLoading,
    error,
    refetch: viewDataRefetch,
  } = useQuery({
    queryKey: [`${slug}-view`],
    queryFn: () => getDetailsApi(1, 0, 'DESC'),
  });



  const handleSendEmail = async (id: string) => {  
    try {
      const response = await ambclubAxios.post(
        `/api/v1/newsletter/${id}`
      );
      toast.success('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send email');
    }
  }

  const [multiSelectData, setMultiSelectData] = React.useState({});
  const editor = React.useRef<any>(null);

  // Only create validation schema once viewData is available
  const validationSchema = React.useMemo(() => {
    if (!viewData) return null;
    return getValidationSchema(viewData.displayModel.formFields);
  }, [viewData]);

  // Initialize form only after viewData and validation schema are ready
  const form = useForm({
    //@ts-expect-error nothing just bullshit typescript showing bullshit warnings
    resolver: viewData ? zodResolver(validationSchema) : undefined,
    defaultValues: {},
  });

  const dataFilledRef = React.useRef(false);

  React.useEffect(() => {
    if (viewData && !dataFilledRef.current && formDataSupplied) {
      const newDefaultValues = viewData.displayModel.formFields.reduce(
        //@ts-expect-error nothing just bullshit typescript showing bullshit warnings
        (acc, { key, type, populatedKey }) => {
          if (type === 'switch') {
            acc[key] = formDataSupplied?.[key] ? 'Yes' : 'No';
          } else if (type === 'number') {
            acc[key] = formDataSupplied?.[key] ?? 0;
          } else if (type === 'multiselect') {
            const value = formDataSupplied?.[key];
            acc[key] = Array.isArray(value)
              ? value.map((item) =>
                  typeof item === 'object' && item !== null
                    ? item
                    : { label: item, value: item }
                )
              : [];
          } else if (type === 'singleselect') {
            acc[key] = formDataSupplied?.[key]
              ? formDataSupplied?.[populatedKey]
                ? formDataSupplied?.[populatedKey]
                : formDataSupplied?.[key]
              : [];
          } else if (type === 'file') {
            acc[key] = formDataSupplied?.[key] ?? null;
          } else if (type === 'complexarray') {
          const apiData = formDataSupplied?.[key];
          if (Array.isArray(apiData)) {
            acc[key] = apiData.map((item) => {
              // Find the matching option for the author ID
              //@ts-ignore
              const authorOptions = multiSelectData[key] || [];
              return {
                field1: item.title || '',
                field2: item.link || '',
                selectField: item.author || ''
              };
            });
          } else {
            acc[key] = [];
          }
        }
        else if (type === 'filegallery') {
            acc[key] = formDataSupplied?.[key] ?? null;

            // Set files for this specific key
            setFiles((prev) => ({
              ...prev,
              [key]:
                formDataSupplied?.[key] && (formDataSupplied?.[key]).length > 0
                  ? (formDataSupplied?.[key]).map((item: any) => {
                      // If it's already a File object, return it
                      if (item instanceof File) return item;
                      // If it's a URL string, create a placeholder or handle as needed
                      // Note: You might need to handle URL-to-File conversion differently
                      return item.url || item; // Return the URL string for now
                    })
                  : [],
            }));
          } else if (type === 'singleselectstatic') {
            const value = formDataSupplied?.[key];
            acc[key] = value ? { value, label: value } : null;
          } else if (type === 'time') {
            acc[key] = formDataSupplied?.[key] ?? '';
          } else if (type === 'date') {
            const dateValue = formDataSupplied?.[key];
            acc[key] = dateValue
              ? new Date(dateValue).toISOString().split('T')[0]
              : '';
          } else {
            acc[key] = formDataSupplied?.[key] ?? '';
          }
          return acc;
        },
        {}
      );
      console.log(newDefaultValues);
      form.reset(newDefaultValues); // ✅ Dynamically update form values
    }
  }, [viewData, form, formDataSupplied]);

  React.useEffect(() => {
    if (viewData) {
      const staticOptions = {};
      viewData.displayModel.formFields.forEach((field: any) => {
        // Handle singleselectstatic fields
        if (
          field.type === 'singleselectstatic' &&
          Array.isArray(field.values)
        ) {
          //@ts-expect-error nothing just bullshit typescript showing bullshit warnings
          staticOptions[field.key] = field.values.map((value) =>
            value.value
              ? {
                  value: value.value,
                  label: value.label,
                }
              : {
                  value,
                  label: value,
                }
          );
        }

        // Handle static multiselect options provided directly in formFields
        if (field.type === 'multiselect' && Array.isArray(field.options)) {
          //@ts-expect-error nothing just bullshit typescript showing bullshit warnings
          staticOptions[field.key] = field.options;

          // Also add these options to the multiSelectData state
          setMultiSelectData((prev) => ({
            ...prev,
            [field.key]: field.options,
          }));
        }

        if (field.type === 'complexarray') {
          // Check if the field has static options for the select field
          if (Array.isArray(field.selectOptions)) {
            //@ts-expect-error nothing just bullshit typescript showing bullshit warnings
            staticOptions[field.key] = field.selectOptions.map((option) =>
              option.value
                ? {
                    value: option.value,
                    label: option.label,
                  }
                : {
                    value: option,
                    label: option,
                  }
            );

            // Also add these options to the multiSelectData state
            setMultiSelectData((prev) => ({
              ...prev,
              //@ts-ignore
              [field.key]: staticOptions[field.key],
            }));
          }
        }
      });

      setSingleSelectStaticOptions(staticOptions);
    }
  }, [viewData]);

  const multiSelectFields = React.useMemo(
    () =>
      viewData?.displayModel?.formFields?.filter(
        //@ts-expect-error nothing just bullshit typescript showing bullshit warnings
        ({ type, dataRoute, dataToShow, options }) =>
          // Only include fields that need API data fetching
          (type === 'multiselect' ||
            type === 'singleselect' ||
            type === 'complexarray') &&
          dataRoute &&
          dataToShow &&
          !options // Skip if it has static options
      ) || [],
    [viewData]
  );

  //@ts-expect-error nothing just bullshit typescript showing bullshit warnings
  const transformQueryData = React.useCallback((data, dataToShow) => {
    if (!data || data.length <= 0 || !dataToShow) return [{}];
    //@ts-expect-error nothing just bullshit typescript showing bullshit warnings
    return data.map((item) => {
      // Get label by joining the specified fields
      //@ts-expect-error nothing just bullshit typescript showing bullshit warnings
      const labelParts = dataToShow.map((field) => {
        // Check if the field is nested
        if (field.includes('.')) {
          return renderNestedValue(item, field);
        }
        if (field === 'date') {
          return formatDateInNepaliTimezone(item[field], false);
        }
        // Otherwise, access it directly
        return item[field] ?? '—';
      });

      const label = labelParts.join(' : ');

      return {
        value: item.id,
        label: label || 'Untitled', // Fallback if no fields are available
      };
    });
  }, []);

  // Helper function to handle nested paths
  //@ts-expect-error nothing just bullshit typescript showing bullshit warnings
  const renderNestedValue = (obj, key) => {
    if (!obj) return '—';

    // Handle nested paths like 'user.fullName' or 'group.groupName'
    const parts = key.split('.');
    let value = obj;

    for (const part of parts) {
      value = value[part];
      if (value === undefined || value === null) return '—';
    }

    return value;
  };
  //@ts-expect-error nothing just bullshit typescript showing bullshit warnings
  const findMatchingOptions = React.useCallback((options, fieldValues) => {
    console.log(fieldValues)
    if (
      !Array.isArray(fieldValues) ||
      !Array.isArray(options) ||
      !fieldValues ||
      fieldValues === null
    )
      return [];
    console.log(JSON.stringify(fieldValues));
    // Extract IDs from fieldValues objects
    let fieldValueIds = fieldValues.map((item) => item.id||item);
    if (!fieldValueIds[0]) {
      fieldValueIds = fieldValues.map((item) => item.value);
    }
    // Find matching options based on the IDs
    const matchingValues = options.filter((option) =>
      fieldValueIds.includes(option.value)
    );

    return matchingValues;
  }, []);

  // const findMatchingOptionsForSingleSelect = React.useCallback(`
  //   //@ts-expect-error nothing just bullshit typescript showing bullshit warnings
  //   (options, fieldValues) => {
  //     if (!Array.isArray(options)) return [];
  //     console.log(JSON.stringify(fieldValues));
  //     // Extract IDs from fieldValues objects
  //     let fieldValueIds = fieldValues.id||fieldValues;
  //     if (!fieldValueIds) {
  //       fieldValueIds = fieldValues.value;
  //     }
  //     // Find matching options based on the IDs
  //     const matchingValues = options.filter(
  //       (option) => fieldValueIds === option.value
  //     );

  //     console.log('Field Value IDs:', fieldValueIds);
  //     console.log('Matching Values:', matchingValues);

  //     return matchingValues;
  //   },
  //   []
  // );
  // Check if all fields have data

// Fixed findMatchingOptionsForSingleSelect function
const findMatchingOptionsForSingleSelect = React.useCallback(
  (options: any[], fieldValue: any) => {
    if (!Array.isArray(options) || !fieldValue) return null;
    
    console.log('Field Value:', JSON.stringify(fieldValue));
    
    // Handle different value formats
    let fieldValueId = fieldValue;
    if (typeof fieldValue === 'object' && fieldValue !== null) {
      fieldValueId = fieldValue.id || fieldValue.value;
    }
    
    // Find matching option
    const matchingValue = options.find(
      (option) => option.value === fieldValueId
    );
    
    console.log('Field Value ID:', fieldValueId);
    console.log('Matching Value:', matchingValue);
    
    return matchingValue || null;
  },
  []
);


  const isDataComplete = React.useCallback(
    (data: any) => {
      if (!multiSelectFields.length) return false;
      return multiSelectFields.every(
        (field: any) => data[field.key] && data[field.key].length > 0
      );
    },
    [multiSelectFields]
  );

  const handleDataUpdate = React.useCallback(
    (key: any, transformedData: any) => {
      console.log('Iam being triggered af');
      setMultiSelectData((prev) => {
        const newData = {
          ...prev,
          [key]: transformedData,
        };

        // If all fields have data, mark as filled
        if (isDataComplete(newData)) {
          dataFilledRef.current = true;
        }

        return newData;
      });
    },
    [isDataComplete]
  );

  React.useEffect(() => {
    console.log('reached here baagagaman');
    console.log(multiSelectData);
  }, [multiSelectData]);

  const queriesConfig = React.useMemo(
    () =>
      //@ts-expect-error nothing just bullshit typescript showing bullshit warnings
      multiSelectFields.map(({ key, dataRoute, dataToShow }) => ({
        queryKey: [`${slug}-${key}-data`],
        queryFn: () => {
          console.log('Fetching data from:', dataRoute);
          return getDataFromRoute(dataRoute);
        },
        enabled: !!viewData && !!dataRoute && !dataFilledRef.current,
        staleTime: Infinity,
        onSuccess: (data: any) => {
          if (!data || dataFilledRef.current) return;
          const transformedData = transformQueryData(data.mainData, dataToShow);
          handleDataUpdate(key, transformedData);
        },
      })),
    [multiSelectFields, slug, viewData, transformQueryData, handleDataUpdate]
  );

  const multiSelectQueries = useQueries({ queries: queriesConfig });

  // Only update when not already filled
  React.useEffect(() => {
    console.log('entered here');
    if (dataFilledRef.current) {
      console.log('Data already filled, skipping update');
      return;
    }

    const allQueriesSuccessful = multiSelectQueries.every(
      (query) => query.isSuccess && query.data
    );

    if (allQueriesSuccessful && viewData) {
      //@ts-expect-error nothing just bullshit typescript showing bullshit warnings
      const newData = multiSelectFields.reduce((acc, field, index) => {
        //@ts-ignore
        const queryData = multiSelectQueries[index].data.mainData;
        if (queryData) {
          acc[field.key] = transformQueryData(queryData, field.dataToShow);
        }
        return acc;
      }, {});

      if (isDataComplete(newData)) {
        dataFilledRef.current = true;
        setMultiSelectData(newData);
        console.log('Data filled completely:', newData);
      }
    }
  }, [
    multiSelectQueries,
    multiSelectFields,
    viewData,
    transformQueryData,
    isDataComplete,
  ]);
  //@ts-expect-error nothing just bullshit typescript showing bullshit warnings
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      let processedData = { ...data };
      console.log(processedData);
      // Get field types from viewData
      const fieldTypes = viewData.displayModel.formFields.reduce(
        //@ts-expect-error nothing just bullshit typescript showing bullshit warnings
        (acc, field) => {
          acc[field.key] = field.type;
          return acc;
        },
        {}
      );

      // Process all fields based on their types
      for (let [key, value] of Object.entries(processedData)) {
        const fieldType = fieldTypes[key];

        // Handle file uploads
        if (fieldType === 'file' && value instanceof File) {
          const uploadResponse = await uploadImageMutation.mutateAsync(value);
          processedData[key] = uploadResponse.url;
        }

        if (fieldType === 'scorecard') {
          delete processedData[key];
        }

        if (fieldType === 'jsonArray' && Array.isArray(value)) {
          // Process any file uploads within the array items
          processedData[key] = await Promise.all(
            value.map(async (item) => {
              const processedItem = { ...item };
              // If item has an icon field and it's a File object, upload it
              if (item.icon instanceof File) {
                const uploadResponse = await uploadImageMutation.mutateAsync(
                  item.icon
                );
                processedItem.icon = uploadResponse.url;
              }
              return processedItem;
            })
          );
        }

        if (fieldType === 'filegallery') {
          console.log('entered fil uploading');
          const currentFiles = files[key]; // Get files for this specific key
          //@ts-ignore
          if (currentFiles || (currentFiles && currentFiles.length !== 0)) {
            let valuesArray: (File | string)[];
            if (Array.isArray(currentFiles)) {
              valuesArray = currentFiles;
            } else {
              throw new Error('Invalid value type for filegallery');
            }

            const uploadedUrls = await Promise.all(
              valuesArray.map(async (item) => {
                if (item instanceof File) {
                  const uploadResponse =
                    await uploadImageMutation.mutateAsync(item);
                  return uploadResponse.url;
                }
                return item; // It's already a URL string
              })
            );

            processedData[key] = uploadedUrls;
          }
        }
        // Handle multiselect fields
        if (
          fieldType === 'multiselect' &&
          Array.isArray(value) &&
          value.length > 0 &&
          (value[0]?.value || value[0]?.id)
        ) {
          // Extract just the value from each selected option
          processedData[key] = value.map((item) => item.value || item.id);
        }
        console.log('Hello');
        if (fieldType === 'singleselect' && value) {
          console.log(typeof value);
          console.log(value);
        }
        if (
          fieldType === 'singleselect' &&
          value &&
          typeof value === 'object' &&
          'id' in value
        ) {
          processedData[key] = value.id;
        }
        if (
          fieldType === 'singleselect' &&
          value &&
          typeof value === 'object' &&
          'value' in value
        ) {
          processedData[key] = value.value;
        }

        if (fieldType === 'switch') {
          processedData[key] = value === 'Yes';
        }

        if (fieldType === 'date' && typeof value === 'string') {
          console.log('date magaman');
          console.log(value);

          // Since value is already a Date object, just convert it to UTC ISO string
          processedData[key] = new Date(value).toISOString(); // This gives you the UTC date in ISO 8601 format
        }
        if (
          fieldType === 'singleselectstatic' &&
          value &&
          typeof value === 'object' &&
          'value' in value
        ) {
          processedData[key] = value.value;
        }

        if (fieldType === 'complexarray' && Array.isArray(value)) {
          // Process complexarray items (like ArticleContent)
          processedData[key] = value
            .map((item) => {
              const processedItem: any = {};

              // Map the generic field names to specific ArticleContent properties
              // field1 = title (text)
              if (item.field1) {
                processedItem.title = item.field1;
              }

              // field2 = link (text)
              if (item.field2) {
                processedItem.link = item.field2;
              }

              // selectField = author (select)
              if (item.selectField && typeof item.selectField === 'object') {
                // Handle select field - extract value or id for author
                if (item.selectField.value) {
                  processedItem.author = item.selectField.value;
                } else if (item.selectField.id) {
                  processedItem.author = item.selectField.id;
                }
              } else if (typeof item.selectField === 'string') {
                // Handle case where selectField is already a string
                processedItem.author = item.selectField;
              }

              return processedItem;
            })
            .filter((item) => {
              // Filter out empty items (where all fields are empty)
              return item.title || item.author || item.link;
            });
        }
      }

      console.log('final Data here');
      console.log(processedData);
      if (formDataSupplied) {
        await putDetailsMutation.mutateAsync(processedData);
        toast.success('Item updated successfully');
        setIsSubmitting(false);
      } else {
        await postDetailMutation.mutateAsync(processedData);
        toast.success('Item created successfully');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('An error occurred when saving the data');
    }
  };

  const handleSelectChange = (selected: any, field: any) => {
    const currentValues = field.value?.selectedValues || [];
    let newValues;

    if (selected.length > currentValues.length) {
      // Adding a new value
      const newOption = selected[selected.length - 1];
      newValues = [...currentValues, newOption.value];
    } else {
      // Removing a value
      const removedOption = currentValues.find(
        (value: any) => !selected.map((s: any) => s.value).includes(value)
      );
      newValues = currentValues.filter((value: any) => value !== removedOption);
    }

    field.onChange({
      ...field.value,
      selectedValues: newValues,
    });
  };

  React.useEffect(() => {
    const subscription = form.watch((values) => {
      setFormValues(values);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    viewData && (
      <div className="flex flex-col w-full h-full text-black">
        <Heading variant="h2" className="w-full px-10 mt-6">
          {formDataSupplied
            ? `Edit`
            : `Add New ${String(capitalizeFirstLetter(slug))}`}
        </Heading>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full px-10 pb-20 mt-4"
          >
            {viewData &&
              viewData.displayModel.formFields.map(
                ({
                  key,
                  label,
                  type,
                  disabled,
                  required,
                  schema,
                  isArray,
                }: {
                  key: string;
                  label: string;
                  type: string;
                  disabled?: boolean;
                  required?: boolean;
                  schema?: any;
                  isArray?: boolean;
                }) => (
                  <FormField
                    control={form.control}
                    key={key}
                    //@ts-ignore
                    name={key}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <BodyText variant="trimmed"> {label}</BodyText>
                        </FormLabel>
                        <FormControl className="w-[21.75rem]">
                          <div className="min-w-full">
                            {type === 'textarray' && (
                              <div className="space-y-2">
                                {
                                  //@ts-ignore
                                  (field.value || []).map((item, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center gap-2"
                                    >
                                      <Input
                                        className="border p-2 flex-1"
                                        disabled={disabled ?? false}
                                        value={item || ''}
                                        onChange={(e) => {
                                          const newArray = [
                                            ...(field.value || []),
                                          ];
                                          //@ts-ignore
                                          newArray[index] = e.target.value;
                                          field.onChange(newArray);
                                        }}
                                        placeholder={`${label} ${index + 1}`}
                                      />
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const newArray = (field.value || [])
                                            //@ts-ignore
                                            .filter((_, i) => i !== index);
                                          field.onChange(newArray);
                                        }}
                                        className="text-red-500 hover:text-red-700 p-1"
                                        disabled={disabled ?? false}
                                      >
                                        <X className="w-4 h-4" />
                                      </button>
                                    </div>
                                  ))
                                }
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newArray = [
                                      ...(field.value || []),
                                      '',
                                    ];
                                    field.onChange(newArray);
                                  }}
                                  className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1"
                                  disabled={disabled ?? false}
                                >
                                  <Plus className="w-4 h-4" />
                                  Add {label}
                                </button>
                              </div>
                            )}
                            {type === 'textareaarray' && (
                              <div className="space-y-2">
                                {
                                  //@ts-ignore
                                  (field.value || []).map(
                                    (item: any, index: any) => (
                                      <div
                                        key={index}
                                        className="flex items-start gap-2"
                                      >
                                        <Textarea
                                          className="border p-2 flex-1"
                                          disabled={disabled ?? false}
                                          value={item || ''}
                                          onChange={(e) => {
                                            const newArray = [
                                              ...(field.value || []),
                                            ];
                                            //@ts-ignore
                                            newArray[index] = e.target.value;
                                            field.onChange(newArray);
                                          }}
                                          placeholder={`${label} ${index + 1}`}
                                        />
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const newArray = (field.value || [])
                                              //@ts-ignore
                                              .filter(
                                                (_: any, i: any) => i !== index
                                              );
                                            field.onChange(newArray);
                                          }}
                                          className="text-red-500 hover:text-red-700 p-1 mt-1"
                                          disabled={disabled ?? false}
                                        >
                                          <X className="w-4 h-4" />
                                        </button>
                                      </div>
                                    )
                                  )
                                }
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newArray = [
                                      ...(field.value || []),
                                      '',
                                    ];
                                    field.onChange(newArray);
                                  }}
                                  className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1"
                                  disabled={disabled ?? false}
                                >
                                  <Plus className="w-4 h-4" />
                                  Add {label}
                                </button>
                              </div>
                            )}
                            {type === 'text' && (
                              <Input
                                className="border p-2 w-full"
                                disabled={disabled ?? false}
                                {...field}
                              />
                            )}
                            {type === 'time' && (
                              <Input
                                type="time"
                                className="border p-2 w-full"
                                disabled={disabled ?? false}
                                {...field}
                              />
                            )}
                            {type === 'date' && (
                              <Input
                                type="date"
                                className="border p-2 w-full"
                                disabled={disabled ?? false}
                                {...field}
                              />
                            )}
                            {type === 'htmlfield' && (
                              // <ZoditEditor value={watch(key) || ""} onChange={(content) => setValue(key, content)} />
                              <div className="w-[798px] -ml-2 mr-auto">
                                <CustomJodit
                                  ref={editor}
                                  onChange={field.onChange}
                                  value={field.value}
                                  variable="blogPreview"
                                  editorStyles="max-width:805px !important;"
                                />
                              </div>
                            )}
                            {type === 'multiselect' && (
                              <Select
                                key={key}
                                isMulti
                                isDisabled={disabled ?? false}
                                //@ts-expect-error nothing just bullshit typescript showing bullshit warnings
                                options={multiSelectData[key] || []}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                isSearchable
                                value={findMatchingOptions(
                                  //@ts-expect-error nothing just bullshit typescript showing bullshit warnings
                                  multiSelectData[key] || [],
                                  field.value || [] // Ensure we are accessing the correct field value
                                )}
                                onChange={(selected) => {
                                  // Update the field value by combining existing and new selected values
                                  field.onChange(selected);
                                }}
                              />
                            )}
                            {type === 'singleselect' && (
                              <Select
                                key={key}
                                isDisabled={disabled ?? false}
                                options={(() => {
                                  //@ts-expect-error nothing just bullshit typescript showing bullshit warnings
                                  const allOptions = multiSelectData[key] || [];

                                  // Check if this field has sync property
                                  if (
                                    schema?.property === 'sync' &&
                                    schema?.id
                                  ) {
                                    // Find all other fields with the same sync ID
                                    const relatedFields =
                                      viewData.displayModel.formFields.filter(
                                        (f: any) =>
                                          f.type === 'singleselect' &&
                                          f.schema?.id === schema.id &&
                                          f.schema?.property === 'sync' &&
                                          f.key !== key
                                      );
                                    //@ts-expect-error nothing just bullshit typescript showing bullshit warnings
                                    const valuesToExclude = [];
                                    //@ts-expect-error nothing just bullshit typescript showing bullshit warnings
                                    relatedFields.forEach((relatedField) => {
                                      const relatedValue =
                                        //@ts-expect-error nothing just bullshit typescript showing bullshit warnings
                                        formValues[relatedField.key];

                                      if (relatedValue) {
                                        // Handle both object values and direct values
                                        if (
                                          typeof relatedValue === 'object' &&
                                          relatedValue !== null
                                        ) {
                                          if (relatedValue.value) {
                                            valuesToExclude.push(
                                              relatedValue.value
                                            );
                                          }
                                        } else {
                                          valuesToExclude.push(relatedValue);
                                        }
                                      }
                                    });

                                    // Return filtered options
                                    return allOptions.filter(
                                      (option: any) =>
                                        //@ts-expect-error nothing just bullshit typescript showing bullshit warnings
                                        !valuesToExclude.includes(option.value)
                                    );
                                  }

                                  // No sync needed, return all options
                                  return allOptions;
                                })()}
                                className="basic-select"
                                classNamePrefix="select"
                                isSearchable
                                value={findMatchingOptionsForSingleSelect(
                                  //@ts-expect-error nothing just bullshit typescript showing bullshit warnings
                                  multiSelectData[key] || [],
                                  field.value || []
                                )}
                                onChange={(selected) => {
                                  console.log(
                                    `Field ${key} selected:`,
                                    selected
                                  );

                                  field.onChange(selected);
                                }}
                              />
                            )}
                            {type === 'filegallery' && (
                              <div className="p-4" key={key}>
                                <FileUploader
                                  multiple={true}
                                  files={getFilesForKey(key)} // Pass files for this specific key
                                  onFilesChange={(newFiles) => {
                                    //@ts-expect-error nothing just bullshit typescript showing bullshit warnings
                                    handleFileUpload(key, newFiles);
                                  }}
                                  buttonText="Upload Files"
                                  id={`file-gallery-upload-${key}`}
                                  accept=".png,.jpg,.jpeg,.webp,.svg,.pdf,.docx"
                                  label={label || 'Upload Files'}
                                />
                              </div>
                            )}
                            {type === 'singleselectstatic' && (
                              <Select
                                key={key}
                                isDisabled={disabled ?? false}
                                //@ts-expect-error nothing just bullshit typescript showing bullshit warnings
                                options={singleSelectStaticOptions[key] || []}
                                className="basic-select"
                                classNamePrefix="select"
                                isSearchable
                                value={field.value}
                                onChange={(selected) => {
                                  field.onChange(selected);
                                }}
                                placeholder="Select an option..."
                              />
                            )}
                            {type === 'complexarray' && (
                              <div className="space-y-2">
                                {
                                  //@ts-ignore
                                  (field.value || []).map((item, index) => (
                                    <div
                                      key={index}
                                      className="border p-4 rounded-lg space-y-3 bg-gray-50 relative group"
                                      draggable={!disabled}
                                      onDragStart={(e) => {
                                        e.dataTransfer.setData(
                                          'text/plain',
                                          index.toString()
                                        );
                                        e.currentTarget.style.opacity = '0.5';
                                      }}
                                      onDragEnd={(e) => {
                                        e.currentTarget.style.opacity = '1';
                                      }}
                                      onDragOver={(e) => {
                                        e.preventDefault();
                                        e.currentTarget.classList.add(
                                          'border-blue-300',
                                          'bg-blue-50'
                                        );
                                      }}
                                      onDragLeave={(e) => {
                                        e.currentTarget.classList.remove(
                                          'border-blue-300',
                                          'bg-blue-50'
                                        );
                                      }}
                                      onDrop={(e) => {
                                        e.preventDefault();
                                        e.currentTarget.classList.remove(
                                          'border-blue-300',
                                          'bg-blue-50'
                                        );

                                        const draggedIndex = parseInt(
                                          e.dataTransfer.getData('text/plain')
                                        );
                                        const dropIndex = index;

                                        if (draggedIndex !== dropIndex) {
                                          const newArray = [
                                            ...(field.value || []),
                                          ];
                                          const draggedItem =
                                            newArray[draggedIndex];

                                          // Remove the dragged item
                                          newArray.splice(draggedIndex, 1);
                                          // Insert it at the new position
                                          newArray.splice(
                                            dropIndex,
                                            0,
                                            draggedItem
                                          );

                                          field.onChange(newArray);
                                        }
                                      }}
                                    >
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          {/* Drag Handle */}
                                          <div
                                            className="cursor-move text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Drag to reorder"
                                          >
                                            <svg
                                              width="16"
                                              height="16"
                                              viewBox="0 0 16 16"
                                              fill="currentColor"
                                            >
                                              <circle cx="3" cy="3" r="1" />
                                              <circle cx="3" cy="8" r="1" />
                                              <circle cx="3" cy="13" r="1" />
                                              <circle cx="8" cy="3" r="1" />
                                              <circle cx="8" cy="8" r="1" />
                                              <circle cx="8" cy="13" r="1" />
                                              <circle cx="13" cy="3" r="1" />
                                              <circle cx="13" cy="8" r="1" />
                                              <circle cx="13" cy="13" r="1" />
                                            </svg>
                                          </div>
                                          <h4 className="text-sm font-medium text-gray-700">
                                            {label} {index + 1}
                                          </h4>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          {/* Move Up Button */}
                                          {index > 0 && (
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const newArray = [
                                                  ...(field.value || []),
                                                ];
                                                const temp = newArray[index];
                                                newArray[index] =
                                                  newArray[index - 1];
                                                newArray[index - 1] = temp;
                                                field.onChange(newArray);
                                              }}
                                              className="text-gray-500 hover:text-gray-700 p-1"
                                              disabled={disabled ?? false}
                                              title="Move up"
                                            >
                                              <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="currentColor"
                                              >
                                                <path d="M8 3l4 4H9v6H7V7H4l4-4z" />
                                              </svg>
                                            </button>
                                          )}
                                          {/* Move Down Button */}
                                          {index <
                                          //@ts-ignore
                                            (field.value || []).length - 1 && (
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const newArray = [
                                                  ...(field.value || []),
                                                ];
                                                const temp = newArray[index];
                                                newArray[index] =
                                                  newArray[index + 1];
                                                newArray[index + 1] = temp;
                                                field.onChange(newArray);
                                              }}
                                              className="text-gray-500 hover:text-gray-700 p-1"
                                              disabled={disabled ?? false}
                                              title="Move down"
                                            >
                                              <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="currentColor"
                                              >
                                                <path d="M8 13l-4-4h3V3h2v6h3l-4 4z" />
                                              </svg>
                                            </button>
                                          )}
                                          {/* Delete Button */}
                                          <button
                                            type="button"
                                            onClick={() => {
                                              const newArray = (
                                                field.value || []
                                              )
                                                //@ts-ignore
                                                .filter((_, i) => i !== index);
                                              field.onChange(newArray);
                                            }}
                                            className="text-red-500 hover:text-red-700 p-1"
                                            disabled={disabled ?? false}
                                            title="Delete"
                                          >
                                            <X className="w-4 h-4" />
                                          </button>
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {/* Title Text Field */}
                                        <div>
                                          <label className="block text-xs font-medium text-gray-600 mb-1">
                                            Title
                                          </label>
                                          <Input
                                            className="border p-2 w-full"
                                            disabled={disabled ?? false}
                                            value={item?.field1 || ''}
                                            onChange={(e) => {
                                              const newArray:any = [
                                                ...(field.value || []),
                                              ];
                                              //@ts-ignore
                                              newArray[index] = {
                                                ...newArray[index],
                                                field1: e.target.value,
                                              };
                                              field.onChange(newArray);
                                            }}
                                            placeholder="Enter article title"
                                          />
                                        </div>

                                        {/* Link Text Field */}
                                        <div>
                                          <label className="block text-xs font-medium text-gray-600 mb-1">
                                            Link
                                          </label>
                                          <Input
                                            className="border p-2 w-full"
                                            disabled={disabled ?? false}
                                            value={item?.field2 || ''}
                                            onChange={(e) => {
                                              const newArray:any = [
                                                ...(field.value || []),
                                              ];
                                              //@ts-ignore
                                              newArray[index] = {
                                                ...newArray[index],
                                                field2: e.target.value,
                                              };
                                              field.onChange(newArray);
                                            }}
                                            placeholder="Enter article link"
                                          />
                                        </div>
                                      </div>

                                      {/* Author Select Field */}
                                      <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">
                                          Author
                                        </label>
                                        <Select
                                          key={`${key}-${index}`}
                                          isDisabled={disabled ?? false}
                                          //@ts-expect-error nothing just bullshit typescript showing bullshit warnings
                                          options={multiSelectData[key] || []}
                                          className="basic-select"
                                          classNamePrefix="select"
                                          isSearchable
                                          value={findMatchingOptionsForSingleSelect(
                                            //@ts-expect-error nothing just bullshit typescript showing bullshit warnings
                                            multiSelectData[key] || [],
                                            item?.selectField||[]
                                          )}
                                          onChange={(selected) => {
                                            const newArray:any = [
                                              ...(field.value || []),
                                            ];
                                            //@ts-ignore
                                            newArray[index] = {
                                              ...newArray[index],
                                              selectField: selected,
                                            };
                                            field.onChange(newArray);
                                          }}
                                        />
                                      </div>
                                    </div>
                                  ))
                                }
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newArray = [
                                      ...(field.value || []),
                                      {
                                        field1: '',
                                        field2: '',
                                        selectField: null,
                                      },
                                    ];
                                    field.onChange(newArray);
                                  }}
                                  className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1 mt-3"
                                  disabled={disabled ?? false}
                                >
                                  <Plus className="w-4 h-4" />
                                  Add {label}
                                </button>
                              </div>
                            )}
                            {type === 'file' &&
                              (!field.value ? (
                                <FileUploader
                                  multiple={false}
                                  onFilesChange={(files) => {
                                    // Update field with the first file since multiple is false
                                    if (files && files.length > 0) {
                                      field.onChange(files[0]);
                                    } else {
                                      field.onChange(null);
                                    }
                                  }}
                                  buttonText="Upload File"
                                  id={`file-upload-${field.name}`}
                                  // {...props.accept && { accept: props.accept }}
                                />
                              ) : (
                                <div className="mt-2 relative min-w-[5.25rem] min-h-[5.25rem] flex items-center gap-2">
                                  <X
                                    className="m-1 absolute top-0 left-0 w-6 h-6 text-red-500 hover:text-red-700 cursor-pointer"
                                    onClick={() => field.onChange(null)}
                                  />
                                  {typeof field.value === 'string' ? (
                                    // If value is a URL
                                    isImageFile(field.value) ? (
                                      <img
                                        src={field.value}
                                        alt="Uploaded"
                                        className="max-w-full max-h-32 rounded-md bg-black"
                                      />
                                    ) : (
                                      <a
                                        href={field.value}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                      >
                                        Open File
                                      </a>
                                    )
                                  ) : // If value is a File instance
                                  //@ts-ignore
                                  isImageFile(field.value.name) ? (
                                    <img
                                      src={URL.createObjectURL(field.value)}
                                      alt="Uploaded"
                                      className="max-w-full max-h-32 rounded-md"
                                    />
                                  ) : (
                                    <a
                                      href={URL.createObjectURL(field.value)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-500 underline"
                                    >
                                      Open File
                                    </a>
                                  )}
                                </div>
                              ))}
                            {type === 'switch' && (
                              <Switch
                                id={key}
                                label=""
                                value={field?.value || 'No'}
                                onChange={(value: any) => {
                                  field.onChange(value);
                                }}
                              />
                            )}
                            {type === 'number' && (
                              <Input
                                type="number"
                                {...field}
                                className="border p-2 w-full"
                                disabled={disabled ?? false}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            )}
                            {type === 'textarea' && (
                              <Textarea
                                {...field}
                                className="border p-2 w-full"
                                disabled={disabled ?? false}
                                onChange={(e) => field.onChange(e.target.value)}
                              />
                            )}{' '}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              )}
  <div className='flex gap-4'>
            <Button
              type="submit"
              className="text-white p-2 rounded"
              disabled={
                putDetailsMutation.isPending ||
                postDetailMutation.isPending ||
                isSubmitting
              }
            >
              {putDetailsMutation.isPending ||
              postDetailMutation.isPending ||
              isSubmitting
                ? 'Please Wait...'
                : 'Submit'}
            </Button>
                       {slug === "articles" ? <Button
              type="button"
              onClick={()=>handleSendEmail(formDataSupplied?.id)}
              className="text-white p-2 rounded"
              disabled={
                putDetailsMutation.isPending ||
                postDetailMutation.isPending ||
                isSubmitting
              }
            >
              {putDetailsMutation.isPending ||
              postDetailMutation.isPending ||
              isSubmitting
                ? 'Please Wait...'
                : 'Send Email'}
            </Button>:""}
            </div>
          </form>
        </Form>
      </div>
    )
  );
};
