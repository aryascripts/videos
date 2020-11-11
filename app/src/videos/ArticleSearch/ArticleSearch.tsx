import React, { useEffect } from "react";
import useData from "../../hooks/useData";


function ArticleSearch() {
  const [data, query, setQuery, loading, error] = useData(
    "https://hn.algolia.com/api/v1/search"
  );

  // Update query on input
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = {
      query: event.target.value || ""
    };
    setQuery(params);
  };

  useEffect(() => {
    if (error) {
      throw new Error(error);
    }
  }, [error]);

  return (
    <div>
      <input type="text" value={query.query} onChange={handleQueryChange} />

      {loading && <div>Loading...</div>}

      <ul>
        {data.map((article: any) => (
          <li>
            <a href={article.url}>{article.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArticleSearch;
