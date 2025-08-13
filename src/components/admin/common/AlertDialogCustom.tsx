'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Trash01, Edit05 } from '@untitled-ui/icons-react';
import React from 'react';

export const AlertDialogCustom = ({
  onConfirm,
}: {
  onConfirm: () => void;
}) => {
  const [inputValue, setInputValue] = React.useState<string>('');

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash01 className="w-6 h-6 max-w-6 max-h-6 cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            activity. Please type <b>CONFIRM</b> to proceed.
            <Input
              className="mt-3 rounded-[0.5rem] w-full placeholder:text-[0.875rem] sm:text-base"
              placeholder="Type CONFIRM to delete"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={inputValue !== 'CONFIRM'}
            className={`${
              inputValue === 'CONFIRM'
                ? 'bg-primary text-white cursor-pointer'
                : 'bg-gray-400 text-gray-200 cursor-not-allowed'
            }`}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
