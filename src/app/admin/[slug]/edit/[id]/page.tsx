'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { DynamicForm } from '../../add-new/DynamicForm';
import { ambclubAxios } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

const Page = () => {
  const { slug, id } = useParams();
  const getEditDetailsApi = async (
  ) => {
    const response = await ambclubAxios.get(`/api/v1/${slug}/${id}`);
    return response.data;
  };
  const {
    data,
    isLoading,
    error,
    refetch: viewDataRefetch,
  } = useQuery({
    queryKey: [`${slug}-${id}-view`],
    queryFn: getEditDetailsApi
  });

  return (
    <div className=" h-full">
      {data && <DynamicForm formDataSupplied={data} />}
    </div>
  );
};

export default Page;
