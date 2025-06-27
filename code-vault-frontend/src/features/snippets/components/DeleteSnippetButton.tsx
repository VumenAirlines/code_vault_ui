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
} from '../../../components/ui/alert-dialog';
import { Label } from '../../../components/ui/label';
import { useDeleteSnippet } from '../hooks/useDeleteSnippet';

interface DeleteSnippetButtonProps {
  snippetId: string;
}

export const DeleteSnippetButton = ({ snippetId }: DeleteSnippetButtonProps) => {
  const deleteSnippetMutation = useDeleteSnippet();

   const handleConfirmDelete = () => {
   
    deleteSnippetMutation.mutate(snippetId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
            <Label className='text-red-500'>Delete snippet</Label>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            snippet and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmDelete}
            disabled={deleteSnippetMutation.isPending}
          >
            {deleteSnippetMutation.isPending ? 'Deleting...' : 'Continue'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};