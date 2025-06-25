import { Link } from 'react-router-dom';
import { Badge } from '../../../components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../../../components/ui/card';
import {type Snippet } from '../types'; // Import your Snippet type

interface SnippetListItemProps {
  snippet: Snippet;
}
export const SnippetListItem = ({snippet}:SnippetListItemProps) => {
    return(
        <Link to={`/snippets/${snippet.id}`}>
      <Card className="hover:border-primary transition-colors">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle>{snippet.title}</CardTitle>
            {snippet.language && <Badge>{snippet.language}</Badge>}
          </div>
          <CardDescription>{snippet.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
    )
}