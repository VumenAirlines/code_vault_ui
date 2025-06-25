import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { SnippetList } from '../features/snippets/components/SnippetList';
import { useGetAllSnippets } from '../features/snippets/hooks/useGetAllSnippets';

const SnippetsPage = () => {
  const { data: snippets, isLoading, isError } = useGetAllSnippets();

  if (isLoading && !snippets) {
    return <div>Loading...</div>; 
  }

  if (isError) {
    return <div>Error loading your snippets. Please try again.</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Snippets</h1>
        <Button asChild>
          <Link to="/snippets/new">Create Snippet</Link>
        </Button>
      </div>
      <SnippetList snippets={snippets || []} />
    </div>
  );
};

export default SnippetsPage;