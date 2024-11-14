import { useMemo } from "react";
import moment from "moment";
import classNames from "classnames";
import { Typography, Badge } from "../../atoms";
import { ITimeline, ITimelineProps } from "../../../models/models";
import { EventStatus } from "../../../models/enum";

interface IProps {
  event: ITimeline;
}

const WeekTimeLine = ({ event }: IProps) => {
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
  console.log("R");
  const dateFormat = "YYYY-MM-DD";
  const handleTimeline = useMemo(() => {
    const weekColWidth = 200;
    const startDate = moment(event.startDate, dateFormat);
    const endDate = moment(event.endDate, dateFormat);

    const { progressWidth } = calculateTimelineProps({
      startDate,
      endDate,
      weekColWidth,
    });

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
        <div
          style={{ width: `${event.answerPercentage}%` }}
          className="survey-timeline-progress"
        />

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
      </div>
    );
  }, [event, dateFormat]);

  return <div>{handleTimeline}</div>;
};

export default WeekTimeLine;
