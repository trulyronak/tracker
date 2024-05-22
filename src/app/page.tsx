'use client';
import { DaysCounter } from "@/components/days-counter";
import useQueryParam from "@/lib/useQueryParam";
import { NextPage } from "next";
import { useMemo } from "react";

export default function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const param = searchParams['dateString']
  const [dateString, setDateString] = useQueryParam(
    "dateString",
     typeof param === 'string' ? param : new Date().toISOString()
  );


  const date = useMemo(() => new Date(dateString), [dateString]);

  const setDate = (newDate: Date) => setDateString(newDate.toISOString());
  return <DaysCounter date={date} setDate={setDate} />;
}
