import moment from "moment";

export interface IWeek {
  weekNum: number;
  days: string[];
  yearAndMonth?: string;
  weekIdentifier?: string;
}

export interface IMonth {
  id: string;
  monthName: string;
  weeks: IWeek[];
}

export interface ICalendarEvent {
  id: string;
  surveyName: string;
  startDate: string;
  endDate: string;
  status: string;
  responsesReceived: string;
  totalResponsesCreated: string;
  answerPercentage: number;
  weekNum?: number;
  sortOrder?: number;
}

export interface ITimeline {
  id: string;
  sortOrder: number;
  startDate: string;
  endDate: string;
  surveyName: string;
  status: string;
  answerPercentage: number;
  responsesReceived: string;
  totalResponsesCreated: string;
  weekNum: number;
  weekIdentifier: string;
}

export interface ITimelineProps {
  startDate: moment.Moment;
  endDate: moment.Moment;
  weekColWidth: number;
}

export interface ITimelineData {
  calendar: IMonth[];
  timeline: ITimeline[];
}

export interface ISurveyNameData {
  id: string | null;
  surveyNameWidth: number;
  sortOrder: number;
}
