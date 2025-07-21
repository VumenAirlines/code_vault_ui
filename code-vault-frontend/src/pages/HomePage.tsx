import { GeneralStatsCard } from "../features/snippets/components/GeneralStatsCard";
import { LanguageStatsCard } from "../features/snippets/components/LanguageStatsCard";
import { SnippetCard } from "../features/snippets/components/SnippetCard";
import { TagsStatsCard } from "../features/snippets/components/TagsStatsCard";
import { useGetLatest } from "../features/snippets/hooks/useGetLatest";
import { useGetStats } from "../features/snippets/hooks/useGetStats";

const HomePage = () => {
  const { data: snippets } = useGetLatest();
  const { data: stats, isError, isLoading } = useGetStats();
  if (isLoading) return <div>Loading stats...</div>;
  if (isError) return <div>Error: Could not load statistics.</div>;
  if (isError) return <div>Error: Could not load snippets.</div>;
  if (!stats) return <div>Stats not found.</div>;
  if (!snippets) return <div>Stats not found.</div>;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4 mx-auto">
        <LanguageStatsCard langs={stats.mostUsedLanguage} />
        <TagsStatsCard tags={stats.mostUsedTags} />
        <GeneralStatsCard
          tagCount={5}
          langCount={5}
          totalCount={stats.totalCount}
        />
      </div>
      <div className="flex flex-row gap-4">
        {snippets.map((snippet, index) => (
          <SnippetCard key={index} snippet={snippet} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
