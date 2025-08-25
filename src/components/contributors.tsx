"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

const Contributors: React.FC = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/isaias-alt/format-x/contributors",
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch contributors");
        }

        const data = await response.json();
        setContributors(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching contributors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground">Loading contributors...</div>
      </div>
    );
  }

  if (error || contributors.length === 0) {
    return null;
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Contributors</h2>
      <p className="text-center text-muted-foreground mb-8">
        Thank you to all the amazing people who have contributed to Format-X!
      </p>

      <div className="flex flex-wrap justify-center items-center gap-2 max-w-4xl mx-auto">
        {contributors.map((contributor) => (
          <Link
            key={contributor.id}
            href={contributor.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
            title={`@${contributor.login} - ${contributor.contributions} contributions`}
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-200 hover:scale-110">
              <Image
                src={contributor.avatar_url}
                alt={`@${contributor.login}`}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
            </div>

            {/* Tooltip */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border shadow-md">
              @{contributor.login}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-popover"></div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          Want to contribute?{" "}
          <Link
            href="https://github.com/isaias-alt/format-x/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Read our contributing guide
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Contributors;
