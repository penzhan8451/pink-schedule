import React, {useEffect, useState} from "react";
import styled from "styled-components";
import rapidKey from "../key";

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [location, setLocation] = useState(null);
    const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=40.2%2C116.2';
    const timezoneapi = async () => {
        const timzoneurl = 'https://weatherapi-com.p.rapidapi.com/timezone.json?q=%3CREQUIRED%3E';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'f5d68fb533msh0d9375110c6709dp16f5cfjsna0cb3407c4dc',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(timzoneurl, options);
            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        // timezoneapi();
        fetch(
            // "https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=-73.5673&lat=45.5017",
            url,
            {
                method: "GET",
                headers: {
                    "x-rapidapi-key": rapidKey,
                    // "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
                    "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
                },
            }
        )
            .then((res) => res.json())
            .then((response) => {
                if (response.current) {
                    console.log(response.current);
                    console.log(response.location);
                    setLocation(response.location);
                    setWeather(response.current);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);
    if (weather) {
        return (
            <Content>
                <TempBox>
                    <CurrentTemp>
                        <TempNum>{parseInt(weather.temp_c)}</TempNum>
                        <Exponent>°c</Exponent>
                    </CurrentTemp>
                    <FeelsLike>FEELS LIKE:</FeelsLike>
                    <AppTemp>{parseInt(weather.feelslike_c)}°c</AppTemp>
                </TempBox>
                {weather ? (
                    <img
                        src={`https://www.weatherbit.io/static/img/icons/${weather.condition.icon}`}
                        alt="weather icon"
                    />
                ) : null}

                <InfoBox>
                    <Description>{(location.name + ", " + location.country)}</Description>
                    <Info>
                        <div>Humidity: {weather.humidity}%</div>
                        <div>Precipitation: {weather.precip_mm} mm/h</div>
                        <div>Wind Speed: {weather.wind_kph} mm/h</div>
                    </Info>
                </InfoBox>
            </Content>
        );
    } else {
        return <div>Loading weather.</div>;
    }
};
const Content = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: 10px;
  margin: 10px;
  align-items: center;
  justify-content: center;
`;

const TempBox = styled.div`
  text-align: center;
`;
const CurrentTemp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const TempNum = styled.div`
  font-size: 3.4rem;
  font-weight: 300;
  line-height: 2.7rem;
  padding-top: 5px;
`;
const Exponent = styled.div`
  font-size: 1.5rem;
`;
const FeelsLike = styled.div`
  font-size: 0.7rem;
  padding-top: 10px;
`;
const AppTemp = styled.div`
  font-size: 1rem;
`;
const InfoBox = styled.div`
  padding-left: 8px;
`;
const Description = styled.div`
  font-weight: 300;
  font-size: 1.2rem;
`;
const Info = styled.div`
  padding-top: 0.5rem;
  font-size: 0.8rem;
`;
export default Weather;
