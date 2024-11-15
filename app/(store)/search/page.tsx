const SearchPage = async ({
  searchParams,
}: {
  searchParams: { query: string };
}) => {
  const { query } = await searchParams;
  return <div>SearchPage for {query}</div>;
};

export default SearchPage;
