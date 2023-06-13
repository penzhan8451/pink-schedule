import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {format} from "date-fns";
import {dayColors} from "../Constants";
import rapidKey from "../key";

const NewsFeed = ({today}) => {
    const [articles, setArticles] = useState([]);

    const getPreday = () => {
        let preDay = new Date(today);
        preDay.setDate(today.getDate() - 30 * 6); // 6 months ago
        return preDay;
    }

    const fetchNews_googlenews = () => {
        fetch(
            // "https://google-news.p.rapidapi.com/v1/geo_headlines?lang=en&country=CA&geo=Montreal",
            "https://google-news-api1.p.rapidapi.com/search?language=en",
            {
                method: "GET",
                headers: {
                    "x-rapidapi-key": rapidKey,
                    "x-rapidapi-host": "google-news-api1.p.rapidapi.com"
                }
            }
        )
            .then(res => res.json())
            .then(response => {
                console.log(response);
                const articles = response.news.news?.slice(0, 15);
                setArticles(articles);
                if (response.news.news) {
                    localStorage.setItem("date", format(today, "yyyy-MM-dd"));
                    localStorage.setItem("articles", JSON.stringify(articles));
                }
            })
            .catch(err => {
                console.error(err);
            });
    };
    const fetchNews_games = (startday, endday) => {
        // GET https://api.rawg.io/api/platforms?key=cc7003501bcf462294ca803d3a869017
        // GET https://api.rawg.io/api/games?key=cc7003501bcf462294ca803d3a869017&dates=2019-09-01,2019-09-30&platforms=18,1,7

        const url = `https://api.rawg.io/api/games?key=cc7003501bcf462294ca803d3a869017&dates=${endday},${startday}&platforms=18,1,7`;
        console.log('url:\t' + url);
        fetch(url).
            // fetch(`https://api.rawg.io/api/games?key=cc7003501bcf462294ca803d3a869017&dates=2022-09-01,2023-05-30&platforms=18,1,7`).
            then(res => res.json())
            .then(response => {
                console.log(response);
                const games = response.results.slice(0, 15);
                setArticles(games);
                if (response.results?.length > 0) {
                    localStorage.setItem("date", format(today, "yyyy-MM-dd"));
                    localStorage.setItem("articles", JSON.stringify(games));
                }
            })
            .catch(err => {
                console.error(err);
            });
    };
    const fetchNews_Shazam = (today) => {
        const url = `https://shazam.p.rapidapi.com/shazam-events/list?artistId=73406786&l=en-US&from=${today}&limit=50&offset=0`;
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "f5d68fb533msh0d9375110c6709dp16f5cfjsna0cb3407c4dc",
                "X-RapidAPI-Host": "shazam.p.rapidapi.com"
            }
        };

        fetch(url, options).then(res => res.json()).then(result => {
            console.log(result);
            const articles = result.data;
            setArticles(articles);
        }).catch(err => {
            console.error(err);
        })
    }

    useEffect(() => {
        // localStorage.removeItem("date");
        // localStorage.removeItem("articles");
        if (localStorage.getItem("date") === format(today, "yyyy-MM-dd")) {
            console.log("Local storage is fine");
            var arts = localStorage.getItem("articles");
            console.log(arts);
            if (arts && arts !== "undefined") setArticles(JSON.parse(arts));
        } else {
            console.log("LOCAL STORAGE: needs to be updated");
            // fetchNews_Shazam(format(getPreday(), "y-MM-dd"));

            fetchNews_games(format(today, "y-MM-dd"), format(getPreday(), "y-MM-dd"));
        }
    }, [today]);

    let colorIndex = 0;

    if (articles) {
        return (
            <Wrapper>
                {articles.map(article => {
                    return (
                        <AnchorBox target="_blank"
                                   href={article.short_screenshots?.length > 0 ? article.short_screenshots[0].image : ""}
                                   key={article.id}>
                            <ArticleBox
                                style={{
                                    // backgroundColor: `${dayColors[colorIndex++]}`,
                                    backgroundImage: `url(${article.background_image})`
                                }}
                            >
                                <Title>
                                    {article.name}
                                </Title>
                                <Source>{article.released}</Source>
                                <DateDiv>
                                    {article.updated}
                                </DateDiv>
                            </ArticleBox>
                        </AnchorBox>
                    );
                })}
            </Wrapper>
        );
    } else {
        return <></>;
    }
};

const Wrapper = styled.div`
  margin: 10px;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  justify-content: space-around;
  width: 95%;
`;
const ArticleBox = styled.div`
  min-width: 32%;
  max-width: 120px;
  width: 32%;
  min-height: 120px;
  margin-right: 20px;
  border-radius: 10px;
  padding: 100px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const AnchorBox = styled.a`
  text-decoration: none;
  padding: 10px;
  //min-width: 31%;
  max-width: 31%;
  width: 32%;
`;
const Title = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  font-family: "Varela Round", sans-serif;
  overflow: hidden;
  color: white;
  overflow-wrap: break-word;
`;
const Source = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  padding-bottom: 18px;
  padding-top: 5px;
  color: white;
`;
const DateDiv = styled.div`
  font-size: 0.9rem;
  color: white;
  position: absolute;
  bottom: 10px;
  width: 90%;
  //text-align: right;
`;
export default NewsFeed;
