/**
 * Interface for an Event on the schedule
 */
export interface ScheduleEvent {
  time: string,
  title: string,
  description: string,
  location: string,
  type: "social" | "main" | "food" | "activity"
}