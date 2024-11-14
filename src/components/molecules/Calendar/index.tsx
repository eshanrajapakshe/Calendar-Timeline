import { useCallback, useEffect, useMemo, useState } from "react";
import moment from "moment";
import { cloneDeep } from "lodash";
import classNames from "classnames";
import { Badge, Divider, Tooltip, Typography } from "../../atoms/index";
import {
  ICalendarEvent,
  IMonth,
  ISurveyNameData,
  ITimelineData,
  IWeek,
  ITimelineProps,
} from "../../../models/models";
import { CalendarViewTypes, EventStatus } from "../../../models/enum";
import { dateFormat } from "../../../constants";
import "./index.scss";

interface ICalendarProps {
  calendarData: ICalendarEvent[];
  calendarViewType: CalendarViewTypes;
}

export const Calendar = ({
  calendarViewType,
  calendarData,
}: ICalendarProps) => {
  const [timelineData, setTimelineData] = useState<ITimelineData>({
    calendar: [],
    timeline: [],
  });

  const [surveyNameData, setSurveyNameData] = useState<ISurveyNameData[]>([]);

  const calculateTimelineProps = ({
    startDate,
    endDate,
    weekColWidth,
  }: ITimelineProps) => {
    const dayColWidth = weekColWidth / 7;
    const diffDays = endDate.diff(startDate, "days");

    return {
      progressWidth: diffDays * dayColWidth,
    };
  };

  const calculateDayViewProps = (
    startDate: moment.Moment,
    endDate: moment.Moment
  ) => {
    const dayColWidth = 60;
    const diffDays = endDate.diff(startDate, "days") + 1;
    return {
      progressWidth: diffDays * dayColWidth,
    };
  };

  const handleTimeline = useCallback(
    (event: ICalendarEvent) => {
      const weekColWidth = 200;
      const progLeftRightPadding = 36;
      const paddingWithTooltipWidth = progLeftRightPadding + 35;
      const startDate = moment(event.startDate, dateFormat);
      const endDate = moment(event.endDate, dateFormat);
      const surveyNameWidthData = surveyNameData.find(
        (item) => item.id === event.id
      );
      const surveyNameWidthWithProgressPadding =
        surveyNameWidthData?.surveyNameWidth !== undefined
          ? surveyNameWidthData.surveyNameWidth + progLeftRightPadding
          : 0;
      const { progressWidth } = calculateTimelineProps({
        startDate,
        endDate,
        weekColWidth,
      });

      return (
        <div
          data-timeline-id={event.id}
          data-sort-order={event.sortOrder}
          className={classNames(
            "survey-timeline-frame",
            event.status === EventStatus.ACTIVE && "progress-color--active",
            event.status === EventStatus.PLANNED && "progress-color--planned",
            event.status === EventStatus.FINISHED && "progress-color--finished"
          )}
          style={{
            width: progressWidth,
          }}
        >
          <div
            style={{ width: `${event.answerPercentage}%` }}
            className="survey-timeline-progress"
          />

          {surveyNameWidthWithProgressPadding > progressWidth ? (
            <div
              className="event-tooltip"
              data-survey-name-width={surveyNameWidthData?.surveyNameWidth}
            >
              {progressWidth - paddingWithTooltipWidth > 0 && (
                <Typography
                  variant="baseMedium"
                  color="gray-900"
                  customClassName="timeline-survey-name-truncate"
                  style={{ width: progressWidth - paddingWithTooltipWidth }}
                >
                  {event.surveyName}
                </Typography>
              )}

              <Tooltip
                text={
                  <div className="tooltip-survey-name-content">
                    <Typography
                      variant="smallMedium"
                      color="white"
                      customClassName="timeline-survey-name"
                    >
                      {event.surveyName}
                    </Typography>
                    <Badge
                      status=""
                      text={`${event.answerPercentage}%`}
                      rounded
                    />
                  </div>
                }
                place="top"
                delay={100}
                animation="scale"
                wrapperClassName="survey-name-tooltip"
              >
                <i className="ri-information-fill" />
              </Tooltip>
            </div>
          ) : (
            <div className="event-title">
              <Typography
                variant="baseMedium"
                color="gray-900"
                customClassName="timeline-survey-name"
              >
                {event.surveyName}
              </Typography>
              <Badge status="" text={`${event.answerPercentage}%`} rounded />
            </div>
          )}
        </div>
      );
    },
    [calculateTimelineProps, surveyNameData.length]
  );

  const handleTimelineForDays = (event: ICalendarEvent) => {
    const progLeftRightPadding = 36;
    const paddingWithTooltipWidth = progLeftRightPadding + 35;
    const startDate = moment(event.startDate, dateFormat);
    const endDate = moment(event.endDate, dateFormat);
    const { progressWidth } = calculateDayViewProps(startDate, endDate);

    const surveyNameWidthData = surveyNameData.find(
      (item) => item.id === event.id
    );
    const surveyNameWidthWithProgressPadding =
      surveyNameWidthData?.surveyNameWidth !== undefined
        ? surveyNameWidthData.surveyNameWidth + progLeftRightPadding
        : 0;

    return (
      <div
        className={classNames(
          "survey-timeline-frame",
          event.status === EventStatus.ACTIVE && "progress-color--active",
          event.status === EventStatus.PLANNED && "progress-color--planned",
          event.status === EventStatus.FINISHED && "progress-color--finished"
        )}
        style={{
          width: progressWidth,
        }}
      >
        {surveyNameWidthWithProgressPadding > progressWidth ? (
          <div
            className="event-tooltip"
            data-survey-name-width={surveyNameWidthData?.surveyNameWidth}
          >
            {progressWidth - paddingWithTooltipWidth > 0 && (
              <Typography
                variant="baseMedium"
                color="gray-900"
                customClassName="timeline-survey-name-truncate"
                style={{ width: progressWidth - paddingWithTooltipWidth }}
              >
                {event.surveyName}
              </Typography>
            )}

            <Tooltip
              text={
                <div className="tooltip-survey-name-content">
                  <Typography
                    variant="smallMedium"
                    color="white"
                    customClassName="timeline-survey-name"
                  >
                    {event.surveyName}
                  </Typography>
                  <Badge
                    status=""
                    text={`${event.answerPercentage}%`}
                    rounded
                  />
                </div>
              }
              place="top"
              delay={100}
              animation="scale"
              wrapperClassName="survey-name-tooltip"
            >
              <i className="ri-information-fill" />
            </Tooltip>
          </div>
        ) : (
          <div className="event-title">
            <Typography
              variant="baseMedium"
              color="gray-900"
              customClassName="timeline-survey-name"
            >
              {event.surveyName}
            </Typography>
            <Badge status="" text={`${event.answerPercentage}%`} rounded />
          </div>
        )}
      </div>
    );
  };

  const sortedTimeline = useMemo(
    () => timelineData.timeline.sort((a, b) => a.sortOrder - b.sortOrder),
    [timelineData.timeline]
  );

  useEffect(() => {
    const newCalendarData = cloneDeep(calendarData);

    newCalendarData.forEach((event) => {
      event.weekNum = moment(event.startDate).isoWeek();
    });

    const startDates = newCalendarData.map((data) => moment(data.startDate));
    const endDates = newCalendarData.map((data) => moment(data.endDate));

    const oldestStartDate = moment.min(...startDates).format(dateFormat);
    const latestEndDate = moment.max(...endDates).format(dateFormat);

    const startMoment = moment(oldestStartDate);
    const endMoment = moment(latestEndDate);
    const monthDiff = endMoment.diff(startMoment, "months") + 1;
    const finalMonthDiff = Math.max(monthDiff, 2);

    const nextMonths: ITimelineData = { calendar: [], timeline: [] };

    if (calendarViewType === CalendarViewTypes.WEEK) {
      const processedWeeks = new Set();

      for (let i = 0; i < finalMonthDiff; i++) {
        const monthStart = moment(oldestStartDate)
          .add(i, "months")
          .startOf("month");
        const monthEnd = moment(oldestStartDate)
          .add(i, "months")
          .endOf("month");
        const weeks: IWeek[] = [];

        let currWeek = moment(monthStart).startOf("isoWeek");

        while (currWeek.isBefore(monthEnd) || currWeek.isSame(monthEnd)) {
          const weekYear = currWeek.isoWeekYear();
          const weekNum = currWeek.isoWeek();
          const weekIdentifier = `${weekYear}-${weekNum}`;

          if (!processedWeeks.has(weekIdentifier)) {
            const days: string[] = [];
            for (let j = 0; j < 7; j++) {
              days.push(currWeek.format(dateFormat));
              currWeek = currWeek.add(1, "days");
            }
            weeks.push({
              weekNum,
              days,
              yearAndMonth: `${monthStart.format("YYYY-MM")}`,
              weekIdentifier,
            });
            processedWeeks.add(weekIdentifier);
          } else {
            currWeek = currWeek.add(7, "days");
          }
        }

        nextMonths.calendar.push({
          id: `${monthStart.format("YYYY-MM")}`,
          monthName: monthStart.format("MMMM"),
          weeks,
        });
      }
    } else {
      // Daily view or non-weekly view
      for (let i = 0; i < finalMonthDiff; i++) {
        const monthStart = moment(oldestStartDate)
          .add(i, "months")
          .startOf("month");
        const monthEnd = moment(oldestStartDate)
          .add(i, "months")
          .endOf("month");
        const weeks: IWeek[] = [];

        let currDay = moment(monthStart);

        while (currDay.isBefore(monthEnd) || currDay.isSame(monthEnd)) {
          const weekNum = currDay.isoWeek();
          const days: string[] = [];

          // add days until the end of the week or month
          do {
            days.push(currDay.format(dateFormat));
            currDay = currDay.add(1, "days");
          } while (currDay.isoWeek() === weekNum && currDay.isBefore(monthEnd));

          weeks.push({ weekNum, days });
        }

        nextMonths.calendar.push({
          id: `${monthStart.format("YYYY-MM")}`,
          monthName: monthStart.format("MMMM"),
          weeks,
        });
      }
    }

    // Update timeline data
    newCalendarData.forEach((event, index) => {
      nextMonths.timeline.push({
        id: event.id,
        sortOrder: index + 1,
        startDate: moment(event.startDate).format(dateFormat),
        endDate: moment(event.endDate).format(dateFormat),
        surveyName: event.surveyName,
        status: event.status,
        responsesReceived: event.responsesReceived,
        totalResponsesCreated: event.totalResponsesCreated,
        answerPercentage: event.answerPercentage,
        weekNum: event.weekNum!,
        weekIdentifier: `${moment(event.startDate).isoWeekYear()}-${moment(
          event.startDate
        ).isoWeek()}`,
      });
    });

    setTimelineData(nextMonths);
  }, [calendarData, calendarViewType]);

  useEffect(() => {
    if (timelineData.timeline.length) {
      const timelineWidthData: ISurveyNameData[] = [];

      const timelines = document.querySelectorAll(".survey-timeline-frame");
      timelines.forEach((timeline) => {
        const id = timeline.getAttribute("data-timeline-id");
        const sortOrder = parseInt(
          timeline.getAttribute("data-sort-order")!,
          10
        );
        const surveyNameWidth =
          (timeline.querySelector(".event-title") as HTMLElement)
            ?.offsetWidth ||
          parseInt(
            timeline
              .querySelector(".event-tooltip")!
              .getAttribute("data-survey-name-width")!,
            10
          );

        timelineWidthData.push({ id, surveyNameWidth, sortOrder });
      });

      timelineWidthData.sort((a, b) => a.sortOrder - b.sortOrder);
      setSurveyNameData(timelineWidthData);
    }
  }, [timelineData.timeline.length]);

  // console.log(timelineData.calendar, "timelineData.calendar");
  // console.log(sortedTimeline, "sortedTimeline");

  return (
    <div className="calendar-wrapper">
      <div className="calender-year-filter"></div>

      {calendarViewType === CalendarViewTypes.WEEK ? (
        <div className="timeline-container week-view">
          {timelineData.calendar.map((month: IMonth) => (
            <div className="month-wrapper" key={month.id}>
              <div className="month-name-wrapper">
                <div className="month-name">
                  <Typography
                    variant="smallBold"
                    color="blue-600"
                    customClassName="month-name-inner"
                  >
                    {month.monthName.substring(0, 3)}
                  </Typography>
                </div>
              </div>

              <div className="week-wrapper">
                {month.weeks.map((week) => (
                  <div className="week-col" key={week.weekNum}>
                    <div className="week-number">
                      <Typography variant="smallBold" color="brand-midnight ">
                        Uke {week.weekNum}
                      </Typography>
                    </div>

                    {sortedTimeline.map((event) => (
                      <div
                        className="week-slot-wrapper"
                        key={`${event.id + week.weekNum}`}
                      >
                        {event.weekIdentifier === week.weekIdentifier ? (
                          <div className="timeline-period-wrapper">
                            <div className="period-item">
                              <Typography variant="baseMedium" color="black">
                                {`Start - ${moment(event.startDate).format(
                                  "DD.MMMYYYY"
                                )}`}
                              </Typography>
                              <Typography
                                variant="smallRegular"
                                color="gray-500"
                              >
                                {`Slutt - ${moment(event.endDate).format(
                                  "DD.MMMYYYY"
                                )}`}
                              </Typography>
                            </div>
                          </div>
                        ) : null}

                        <div className="week-slot">
                          {event.weekIdentifier === week.weekIdentifier ? (
                            <div className="week-day-wrapper">
                              {week.days.map((day) => (
                                <div className="week-day" key={day}>
                                  {day === event.startDate ? (
                                    <div className="survey-timeline-wrapper">
                                      {handleTimeline(event)}
                                    </div>
                                  ) : null}
                                </div>
                              ))}
                            </div>
                          ) : null}

                          <Divider
                            type="solid"
                            styles={{ borderTop: "1px solid #E5E7EB" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="timeline-container day-view">
          {timelineData.calendar.map((month: IMonth) => (
            <div className="month-wrapper" key={month.id}>
              <div className="month-name-wrapper">
                <div className="month-name">
                  <Typography
                    variant="smallBold"
                    color="blue-600"
                    customClassName="month-name-inner"
                  >
                    {month.monthName.substring(0, 3)}
                  </Typography>
                </div>
              </div>

              <div className="week-wrapper">
                {month.weeks.map((week) =>
                  week.days.map((day) => (
                    <div className="day-col" key={day}>
                      <div className="day-wrapper">
                        <Typography variant="smallBold" color="brand-midnight ">
                          {moment(day).format("ddd D")}
                        </Typography>
                      </div>

                      {sortedTimeline.map((event) => (
                        <div className="week-slot-wrapper" key={event.id}>
                          {moment(day).isSame(event.startDate, "day") ? (
                            <div className="timeline-period-wrapper">
                              <div className="period-item">
                                <Typography variant="baseMedium" color="black">
                                  {`Start - ${moment(event.startDate).format(
                                    "DD.MMMYYYY"
                                  )}`}
                                </Typography>
                                <Typography
                                  variant="smallRegular"
                                  color="gray-500"
                                >
                                  {`Slutt - ${moment(event.endDate).format(
                                    "DD.MMMYYYY"
                                  )}`}
                                </Typography>
                              </div>
                            </div>
                          ) : null}

                          {moment(day).isSame(event.startDate, "day") ? (
                            <div className="survey-timeline-wrapper">
                              {handleTimelineForDays(event)}
                            </div>
                          ) : null}

                          <div className="week-slot">
                            <Divider
                              type="solid"
                              styles={{ borderTop: "1px solid #E5E7EB" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
