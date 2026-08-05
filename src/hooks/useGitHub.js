import { useEffect, useState } from "react";

// Live GitHub metadata for the project cards.
// null while fetching, "failed" on error, otherwise a map of
// lowercased repo name -> { stars, pushed }.
export default function useGitHub() {
  const [gh, setGh] = useState(null);

  useEffect(() => {
    let alive = true;
    fetch("https://api.github.com/users/kalebsofer/repos?per_page=100&sort=updated")
      .then((r) => {
        if (!r.ok) throw new Error(`GitHub API ${r.status}`);
        return r.json();
      })
      .then((repos) => {
        if (!alive) return;
        const map = {};
        repos.forEach((repo) => {
          map[repo.name.toLowerCase()] = {
            stars: repo.stargazers_count,
            pushed: repo.pushed_at,
          };
        });
        setGh(map);
      })
      .catch(() => {
        if (alive) setGh("failed");
      });
    return () => {
      alive = false;
    };
  }, []);

  return gh;
}
