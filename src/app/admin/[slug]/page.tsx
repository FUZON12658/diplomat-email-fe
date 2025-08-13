'use client';
import { ambclubAxios } from '@/api';
import { AlertDialogCustom } from '@/components/admin/common/AlertDialogCustom';
import { Header } from '@/components/admin/common/Header';
import { ImageWithFallback } from '@/components/Common/ImageWithFallback';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCollapsedStore } from '@/hooks/store';
import { capitalizeFirstLetter, formatDateInNepaliTimezone } from '@/lib/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Edit05 } from '@untitled-ui/icons-react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

const Page = () => {
  const { slug } = useParams();
  const isCollapsed = useCollapsedStore((state) => state.isCollapsed);
  const toggleCollapsed = useCollapsedStore((state) => state.toggleCollapsed);
  const [dontViewMedia, setDontViewMedia] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [pendingButtonId, setPendingButtonId] = useState<
    string | null | undefined
  >('');
  const getDetailsApi = async (
    limit: number = itemsPerPage,
    offset: number = 0,
    sortOrder: 'ASC' | 'DESC' = 'DESC'
  ) => {
    const response = await ambclubAxios.get(`/api/v1/${slug}`, {
      params: { limit, offset, sort: sortOrder },
    });
    return response.data;
  };

  const putDetailsApi = async (
    limit: number = itemsPerPage,
    offset: number = 0,
    sortOrder: 'ASC' | 'DESC' = 'DESC'
  ) => {
    const response = await ambclubAxios.get(`/api/v1/${slug}`, {
      params: { limit, offset, sort: sortOrder },
    });
    return response.data;
  };

  const deleteItemApi = async ({
    id,
    endpoint,
  }: {
    id: string;
    endpoint: string;
  }) => {
    const response = await ambclubAxios.delete(`${endpoint}${id}`);
    return response.data;
  };

  const {
    data: viewData,
    isLoading,
    error,
    refetch: viewDataRefetch,
  } = useQuery({
    queryKey: [`${slug}-view`, currentPage, itemsPerPage],
    queryFn: () =>
      getDetailsApi(itemsPerPage, (currentPage - 1) * itemsPerPage, 'DESC'),
  });

  const handleAction = async ({
    route,
    method,
    id = '',
    data,
  }: {
    route: string;
    method: string;
    id?: string;
    data: any;
  }) => {
    let endpoint = `${route}${id}/`;
    if (id !== '') {
      endpoint = `${route}${id}/`;
    } else {
      endpoint = `${route}`;
    }
    let response;
    if (method === 'POST') {
      response = await ambclubAxios.post(endpoint, data);
    } else if (method === 'PUT') {
      response = await ambclubAxios.put(endpoint, data);
    } else if (method === 'PATCH') {
      response = await ambclubAxios.patch(endpoint, data);
    } else if (method === 'DELETE') {
      response = await ambclubAxios.delete(endpoint, data);
    } else if (method === 'GET') {
      response = await ambclubAxios.get(endpoint);
    }
    return response.data;
  };

  const actionMutation = useMutation({
    mutationKey: ['action'],
    mutationFn: handleAction,
    onSuccess: () => {
      viewDataRefetch();
      toast.success('Action completed successfully');
      // Clear the pending button ID when complete
      setPendingButtonId(null);
    },
    onError: () => {
      // Make sure to clear the pending state on error too
      setPendingButtonId(null);
    },
  });

  const handleActionMutation = (
    route: string,
    method: string,
    id?: string,
    data?: string
  ) => {
    setPendingButtonId(id);
    actionMutation.mutate({ route, method, id, data });
  };

  const renderNestedValue = (obj: any, key: string) => {
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

  const renderCell = (
    value: any,
    type?: string,
    tblClmn?: any,
    dataItem?: any
  ) => {
    if (tblClmn.key.includes('.')) {
      value = renderNestedValue(dataItem, tblClmn.key);
    }
    const getFileExtension = (url: string): string | null => {
      try {
        const filename = url.split('/').pop();
        return filename?.split('.').pop()?.toLowerCase() || null;
      } catch {
        return null;
      }
    };

    const isImageExtension = (extension: string | null): boolean => {
      const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
      return extension ? imageExtensions.includes(extension) : false;
    };

    const isPdfExtension = (extension: string | null): boolean => {
      return extension === 'pdf';
    };

    switch (type) {
      case 'action':
        switch (tblClmn.actionType) {
          case 'checkbox':
            return (
              <Checkbox
                checked={value}
                onClick={() =>
                  handleActionMutation(
                    tblClmn.actionRoute,
                    tblClmn.actionMethod,
                    dataItem.id
                  )
                }
              />
            );
          case 'button':
            return (
              <Button
                disabled={pendingButtonId === dataItem.id}
                key={tblClmn}
                onClick={() =>
                  handleActionMutation(
                    tblClmn.actionRoute,
                    tblClmn.actionMethod,
                    dataItem.id
                  )
                }
              >
                {pendingButtonId === dataItem.id
                  ? 'Please wait!'
                  : tblClmn.label}
              </Button>
            );
        }
      case 'boolean':
        return value ? '✔️ Yes' : '❌ No';

      case 'date':
        return formatDateInNepaliTimezone(value);

      case 'number':
        return Number(value);

      case 'image':
        if (!value) return '—';

        const extension = getFileExtension(value);

        if (isImageExtension(extension)) {
          return (
            <ImageWithFallback
              src={value}
              alt="image"
              imageClassname="object-contain"
            />
          );
        } else if (isPdfExtension(extension)) {
          return (
            <div className="flex items-center justify-center w-full h-full gap-2">
              <svg
                className="w-8 h-8 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M4 18h12a2 2 0 002-2V6.414l-3.293-3.293A1 1 0 0014.414 3H4a2 2 0 00-2 2v11a2 2 0 002 2zm10-16v3a1 1 0 001 1h3L14 2z" />
              </svg>
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View PDF
              </a>
            </div>
          );
        } else {
          return <div className="text-gray-500">Unsupported file type</div>;
        }

      default:
        return value || '—';
    }
  };

  React.useEffect(() => {
    viewData &&
      viewData.displayModel.summary &&
      setTotalItems(viewData.displayModel.summary.total);
    viewData && setTotalPages(Math.ceil(totalItems / itemsPerPage));
  }, [viewData]);

  React.useEffect(() => {
    viewData && setTotalPages(Math.ceil(totalItems / itemsPerPage));
    setCurrentPage(1);
  }, [totalItems, itemsPerPage]);

  const deleteItemMutation = useMutation({
    mutationKey: ['deleteEvent'],
    mutationFn: deleteItemApi,
    onSuccess: () => {
      viewDataRefetch();
      toast.success('Delete action completed Successfully');
    },
  });

  const handleDelete = (id: string, endpoint: string) => {
    deleteItemMutation.mutateAsync({ id, endpoint });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white ">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-600 text-lg font-medium">
            Loading, please wait...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        An error occurred while loading the data
      </div>
    );
  }

  return (
    <div
      className={`relative min-h-screen overflow-hidden bg-gray-50 p-6 transition-all duration-300 ${isCollapsed ? 'max-w-[calc(100vw-6rem)]' : 'max-w-[calc(100vw-20rem)]'}`}
    >
      {
        <div className="flex justify-between items-center">
          <Header
            title={String(capitalizeFirstLetter(viewData.displayModel.title ?? slug))}
            addNew={
              (viewData && viewData.displayModel.actions.add.status) || false
            }
            addNewLink={`/admin/${slug}/add-new`}
          />
          <Button
            onClick={() => setDontViewMedia(!dontViewMedia)}
            variant="outline"
            className="flex items-center gap-2"
          >
            {dontViewMedia ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
            {dontViewMedia ? 'Show Media' : 'Hide Media'}
          </Button>
        </div>
      }
      <div className="flex items-center  px-4 py-4 border-t">
        <div className="flex flex-col items-center gap-4">
          <Select
            value={String(itemsPerPage)}
            onValueChange={(value) => setItemsPerPage(Number(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Show entries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">Show 10 entries</SelectItem>
              <SelectItem value="25">Show 25 entries</SelectItem>
              <SelectItem value="50">Show 50 entries</SelectItem>
              <SelectItem value="100">Show 100 entries</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-600">      
            {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{' '}
            entries
          </span>
        </div>
        <div className="flex ml-4 flex-col items-center gap-4">
          <Select
            value={String(itemsPerPage)}
            onValueChange={(value) => setItemsPerPage(Number(value))}
          >
            <SelectTrigger className="w-[11.25rem]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              {viewData &&
                viewData.displayModel.tableColumns
                  .filter((column: any) => column.sortable)
                  .map((column: any) => (
                    <SelectItem key={column.key} value={column.key}>
                      {column.label}
                    </SelectItem>
                  ))}
              <SelectItem key={'date'} value={'dateCreated'}>
                Date
              </SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-600">
            {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{' '}
            entries
          </span>
        </div>
        <div className="flex ml-auto items-center gap-2">
          <div key={totalPages} className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  disabled={isLoading}
                  className="w-8 h-8 p-0"
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="bg-white relative overflow-hidden rounded-lg shadow-sm ">
        <div className="overflow-x-scroll">
          <Table className="">
            <TableCaption className="pb-4">
              Total {totalItems} {capitalizeFirstLetter(String(slug))}
            </TableCaption>
            <TableHeader>
              {viewData && (
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  {(viewData.displayModel.actions.edit.status ||
                    viewData.displayModel.actions.delete.status) && (
                    <TableHead className="font-semibold text-center">
                      Actions
                    </TableHead>
                  )}
                  {viewData.displayModel.tableColumns.map((tblClmn: any) => {
                    if (tblClmn.type === 'image' && dontViewMedia) return null;
                    return (
                      <TableHead
                        key={tblClmn.key}
                        className={`${
                          tblClmn.type === 'image'
                            ? 'bg-gray-100 w-[12rem] h-[12rem]'
                            : 'min-w-[3rem]'
                        } text-center font-semibold`}
                      >
                        {tblClmn.label}
                      </TableHead>
                    );
                  })}
                </TableRow>
              )}
            </TableHeader>
            <TableBody>
              {viewData?.mainData.map((dataItem: any, index: number) => (
                <TableRow key={dataItem.id} className="hover:bg-gray-50">
                  {viewData &&
                    (viewData.displayModel.actions.edit.status ||
                      viewData.displayModel.actions.delete.status) && (
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          {viewData.displayModel.actions.edit.status && (
                            <Link
                              href={`/admin/${slug}/edit/${dataItem.id}`}
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <Edit05 className="w-5 h-5" />
                            </Link>
                          )}
                          {viewData.displayModel.actions.delete.status && (
                            <AlertDialogCustom
                              onConfirm={() =>
                                handleDelete(
                                  dataItem.id,
                                  viewData.displayModel.actions.delete
                                    .actionRoute
                                )
                              }
                            />
                          )}
                        </div>
                      </TableCell>
                    )}
                  {viewData.displayModel.tableColumns.map((tblClmn: any) => {
                    if (tblClmn.type === 'image' && dontViewMedia) return null;
                    return (
                      <TableCell
                        key={tblClmn.key}
                        className={`${
                          tblClmn.type === 'image'
                            ? 'max-w-[12rem] h-[12rem]'
                            : 'min-w-[3rem]'
                        } text-center relative`}
                      >
                        {renderCell(
                          dataItem[`${tblClmn.key}`],
                          tblClmn.type,
                          tblClmn,
                          dataItem
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Page;
