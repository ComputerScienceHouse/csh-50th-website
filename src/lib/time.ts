import { useEffect, useState } from "react";

const TEST_NOW_QUERY_KEY = "testNow";
const TEST_NOW_STORAGE_KEY = "cshTestNow";

function parseDate(value: string | null): Date | null {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
}

export function getTestNow(): Date {
  if (typeof window === "undefined") {
    return new Date();
  }

  return getConfiguredTestNow() ?? new Date();
}

export function getConfiguredTestNow(): Date | null {
  if (typeof window === "undefined") {
    return null;
  }

  const queryValue = new URLSearchParams(window.location.search).get(TEST_NOW_QUERY_KEY);
  const queryDate = parseDate(queryValue);
  if (queryDate) {
    return queryDate;
  }

  return parseDate(window.localStorage.getItem(TEST_NOW_STORAGE_KEY));
}

export function setTestNow(value: string) {
  if (typeof window === "undefined") {
    return;
  }

  const parsed = parseDate(value);
  if (!parsed) {
    throw new Error("Invalid date string. Use an ISO-like value, e.g. 2026-04-11T17:30:00-04:00");
  }

  window.localStorage.setItem(TEST_NOW_STORAGE_KEY, value);
}

export function clearTestNow() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(TEST_NOW_STORAGE_KEY);
}

export function useLiveNow(intervalMs = 1000): Date {
  const [testAnchor] = useState<Date | null>(() => getConfiguredTestNow());
  const [realAnchor] = useState<number>(() => Date.now());
  const [now, setNow] = useState<Date>(() => testAnchor ?? new Date());

  useEffect(() => {
    const update = () => {
      if (testAnchor) {
        const elapsed = Date.now() - realAnchor;
        setNow(new Date(testAnchor.getTime() + elapsed));
        return;
      }

      setNow(new Date());
    };

    update();
    const timerId = window.setInterval(update, intervalMs);

    return () => window.clearInterval(timerId);
  }, [intervalMs, realAnchor, testAnchor]);

  return now;
}
