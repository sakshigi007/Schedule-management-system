import React, { useEffect, useState } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import Loading from "../common/Loading";

export default function ViewMeetingsByRoom() {
  const [meetings, setMeetings] = useState([]);
  const [room, setRoom] = useState({});
  const [error, setError] = useState("");
  const [inProgress, setInProgress] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const getRoom = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_ENDPOINT_HOST}api/v1/room/${id}`
    );
    const result = await response.json();
    return result;
  };

  const getMeetingsByRoom = async (id) => {
    if (id) {
      const response = await fetch(
        `${process.env.REACT_APP_ENDPOINT_HOST}api/v1/schedule/get-meetings/room?roomId=${id}`
      );
      const result = await response.json();
      return result;
    }
  };

  const dateTimeParser = (meeting) => {
    let date_options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    let time_options = {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    };
    return {
      date: new Date(Date.parse(meeting.meetingDate)).toLocaleDateString(
        "en-IN",
        date_options
      ),
      start_time: new Date(Date.parse(meeting.startTime)).toLocaleTimeString(
        "en-IN",
        time_options
      ),
      end_time: new Date(Date.parse(meeting.endTime)).toLocaleTimeString(
        "en-IN",
        time_options
      ),
    };
  };

  const getMeetingMetaData = async (meetings) => {
    const data = meetings.map((meeting_data) => {
      let mt = {};
      mt["date"] = new Date(Date.parse(meeting_data.date)).toLocaleDateString(
        "en-IN",
        {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }
      );
      let meetings_data = meeting_data.meetings.map((meeting) => {
        let meet = meeting;
        let datetime = dateTimeParser(meeting);
        meet.meetingDate = datetime.date;
        meet.startTime = datetime.start_time;
        meet.endTime = datetime.end_time;
        return meet;
      });
      mt["meetings"] = meetings_data;
      return mt;
    });
    return data;
  };

  useEffect(() => {
    if (searchParams.get("id")) {
      getRoom(searchParams.get("id")).then((result) => {
        if (result.success) {
          setRoom(result.data);
          getMeetingsByRoom(searchParams.get("id")).then((result) => {
            if (result && result.success) {
              const segregate = result.data.reduce((groups, meeting) => {
                const date = meeting.meetingDate;
                if (!groups[date]) {
                  groups[date] = [];
                }
                groups[date].push(meeting);
                return groups;
              }, {});
              const segregateArray = Object.keys(segregate).map((date) => {
                return {
                  date,
                  meetings: segregate[date],
                };
              });
              getMeetingMetaData(segregateArray).then((res) => {
                setInProgress(false);
                setMeetings(res);
              });
            }
          });
        } else {
          setError(result.message);
        }
      });
    }
  }, []);

  return (
    <div className="container">
      <div className="row g-3">
        {inProgress && (
          <div className="col-12">
            <Loading />
          </div>
        )}
        {!inProgress && room.roomName && (
          <div className="col-12">
            <h4>Meetings in {room.roomName}</h4>
          </div>
        )}
        {!inProgress && meetings.length > 0 && (
          <div className="col-12">
            <Tab.Container id="dates-list">
              <Row>
                <Col md={2}>
                  <Nav variant="pills" className="flex-column">
                    {meetings.map((meeting, i) => {
                      return (
                        <Nav.Item key={i}>
                          <Nav.Link eventKey={i} className="text-center">
                            {meeting.date}
                          </Nav.Link>
                        </Nav.Item>
                      );
                    })}
                  </Nav>
                </Col>
                <Col md={10}>
                  <Tab.Content>
                    {meetings.map((meeting, i) => {
                      return (
                        <Tab.Pane eventKey={i} key={i}>
                          <div className="row g-3">
                            {meeting.meetings.map((meet) => {
                              return (
                                <div className="col-md-3" key={meet._id}>
                                  <div className="card card-body shadow border-0">
                                    <h6>Room: {meet.roomId}</h6>
                                    <h6>Host: {meet.hostUserId}</h6>
                                    <p className="small mb-0">
                                      Start Time: {meet.startTime}
                                    </p>
                                    <p className="small mb-0">
                                      End Time: {meet.endTime}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </Tab.Pane>
                      );
                    })}
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        )}
        {!inProgress && meetings.length === 0 && (
          <div className="col-12">
            <h6 className="text-danger">
              No meetings are scheduled in {room.roomName}
            </h6>
          </div>
        )}
        {error && (
          <div className="col-12 text-danger fw-bold fs-4 text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
