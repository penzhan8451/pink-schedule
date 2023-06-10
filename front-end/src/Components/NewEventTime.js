import React from "react";
import styled from "styled-components";
import {HOURS, MINUTES} from "../Constants";
import {BsArrowRight} from "react-icons/bs";

const NewEventTime = ({form, setForm}) => {
    const allDaySelect = (checked) => {
        if (checked) {
            setForm({
                ...form,
                start: {...form.start, time: {...form.start.time, allday: true}},
                end: {...form.end, time: {...form.end.time, allday: true}},
            });
        } else {
            setForm({
                ...form,
                start: {...form.start, time: {...form.start.time, allday: false}},
                end: {...form.end, time: {...form.end.time, allday: false}},
            });
        }
    };

    const onStartHourChange = (value) => {
        setForm({
            ...form,
            start: {...form.start, time: {...form.start.time, hours: value}},
        });
    };
    const onStartMinChange = (value) => {
        setForm({
            ...form,
            start: {...form.start, time: {...form.start.time, minutes: value}},
        });
    };
    const onStartAPChange = (value) => {
        setForm({
            ...form,
            start: {...form.start, time: {...form.start.time, ap: value}},
        });
    };
    const onEndHourChange = (value) => {
        setForm({
            ...form,
            end: {...form.end, time: {...form.end.time, hours: value}},
        });
    };
    const onEndMinChange = (value) => {
        setForm({
            ...form,
            end: {...form.end, time: {...form.end.time, minutes: value}},
        });
    };
    const onEndAPChange = (value) => {
        setForm({
            ...form,
            end: {...form.end, time: {...form.end.time, ap: value}},
        });
    };

    return (
        <>
            <TimeSection>
                <Label className="TimeLabel">Time</Label>{" "}
                <div className="AllDaySection">
                    <input
                        type="checkbox"
                        className="checkBoxBox"
                        onChange={(ev) => allDaySelect(ev.target.checked)}
                    />
                    <label>All-day</label>
                </div>
            </TimeSection>
            <TimeRange>
                <Select onChange={(ev) => onStartHourChange(ev.target.value)}>
                    <option key='start-Hour-hidden' hidden></option>
                    {HOURS.map((hour, index) => (
                        <option key={'startHour-' + index}>{hour}</option>
                    ))}
                </Select>
                :
                <Select onChange={(ev) => onStartMinChange(ev.target.value)}>
                    <option key='start-Min-hidden' hidden></option>
                    {MINUTES.map((min, index) => (
                        <option key={'startMin-' + index}>{min}</option>
                    ))}
                </Select>
                <Select onChange={(ev) => onStartAPChange(ev.target.value)}>
                    <option key='start-AP-hidden' hidden></option>
                    <option key='startAM'>AM</option>
                    <option key='startPM'>PM</option>
                </Select>
                <Arrow>
                    <BsArrowRight/>
                </Arrow>
                <Select onChange={(ev) => onEndHourChange(ev.target.value)}>
                    <option key='end-Hour-hidden' hidden></option>
                    {HOURS.map((hour, index) => (
                        <option key={'end-' + index}>{hour}</option>
                    ))}
                </Select>
                :
                <Select onChange={(ev) => onEndMinChange(ev.target.value)}>
                    <option key='end-Min-hidden' hidden></option>
                    {MINUTES.map((min, index) => (
                        <option key={'end-' + index}>{min}</option>
                    ))}
                </Select>
                <Select onChange={(ev) => onEndAPChange(ev.target.value)}>
                    <option key='end-AP-hidden' hidden></option>
                    <option key='end-AM'>AM</option>
                    <option key='end-PM'>PM</option>
                </Select>
            </TimeRange>
        </>
    );
};
const Label = styled.label`
  padding-bottom: 10px;
  display: block;
  font-size: 1.2rem;
`;
const TimeSection = styled.div`
  display: flex;
  justify-content: space-between;
  .TimeLabel {
    display: inline-block;
  }
  .AllDaySection {
    font-size: 1.2rem;
  }
  .checkBoxBox {
    margin: 0 5px;
  }
`;
const TimeRange = styled.div`
  display: flex;
  align-items: center;
`;
const Arrow = styled.div`
  padding: 0 10px;
`;

const Select = styled.select`
  appearance: none;
  padding: 1px 6px;
  margin: 0 2px;
  font-size: 1.1rem;
  border: none;
  background-color: #f2f2f2;
`;
export default NewEventTime;
