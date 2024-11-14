import Skeleton from "react-loading-skeleton";
import {
  InlineWrapperCalendar,
  InlineWrapperStatuses,
} from "../../../helpers/skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./index.scss";

export const CalendarSkeleton = () => {
  return (
    <div className="home-loading-skeletons">
      <div className="calendar-title-skeleton">
        <div className="calendar-view-type-skeleton">
          <Skeleton width={180} height={40} wrapper={InlineWrapperCalendar} />
          <Skeleton width={100} height={40} wrapper={InlineWrapperCalendar} />
        </div>
        <Skeleton
          width={90}
          height={30}
          count={3}
          inline
          wrapper={InlineWrapperStatuses}
        />
      </div>

      <div className="calendar-skeleton">
        <div className="calendar-wrapper-skeleton">
          <Skeleton width={200} height={250} />
          <Skeleton wrapper={InlineWrapperCalendar} height={250} />
        </div>
      </div>
    </div>
  );
};
