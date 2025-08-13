"use client";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { FeatureAndCards } from "./FeaturedAndCards";
import { Heading } from "../Common/Typography";
import { fetchLatestEventDataApi } from "@/api/events/events";

export const PressRelease = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["latestEvent"],
    queryFn: fetchLatestEventDataApi,
  });



  return data && (
    <section className="pt-[3.75rem] max-w-[80rem] mx-auto">
        <div className="space-y-12">
          <div className="flex items-end justify-between">
            <div className="space-y-3">
              <Heading
                variant="h1"
              >
                Press Releases 
              </Heading>
            </div>
            {/* <div className="h-fit relative ">
              <input
                type="search"
                name="search"
                id="search"
                placeholder={
                  "Search in this page"
                }
                className="flex gap-4 p-3 ps-[3.25rem] bg-bg-3 rounded-[.5rem] placeholder:text-essential-disabled text-essential-black w-[18.75rem] outline-0 "
              />
              <Search
                className="absolute top-[.8125rem] left-3 "
                color="#273827"
                size={"1.5rem"}
              />
            </div> */}
          </div>
          <div>
            <FeatureAndCards
              dark
              data={data}
              title={"Latest" }
            />
          </div>
        </div>
    </section>
  );
};
