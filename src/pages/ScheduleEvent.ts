/**
 * Interface for an Event
 */
export interface ScheduleEvent {
  id: number,
  title: string,
  description: string,
  date: string,
  time: string,
  location: string,
  address: string,
  capacity: string,
  dressCode: string,
  type: "social" | "main" | "food" | "activity" | "external"
}