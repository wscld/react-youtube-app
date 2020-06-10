import React from 'react';
import './styles.scss';
import Search from '../../Components/Search';
import Item from '../../Components/Item';
import ReactLoading from 'react-loading';
import { findVideos, getVideo } from '../../Services/youtube'
import { useState } from 'react';
import { Button } from '@material-ui/core';
import Video from '../../Components/Video';

const Home = () => {
    const [videos, setVideos] = useState([]);
    const [query, setQuery] = useState("");
    const [pageTokens, setPageTokens] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [animSearch, setAnimSearch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [videoObj, setVideoObj] = useState({});

    const onSubmit = (query, action) => {
        setAnimSearch(true);
        setLoading(true);
        setVideos([]);
        setQuery(query);
        removeVideo();

        findVideos(query, pageTokens > 0 ? pageTokens[pageIndex] : "")
            .then(response => {
                setLoading(false);
                setVideos(response.items);
                switch (action) {
                    case "next":
                        setPageIndex(pageIndex + 1);
                        setPageTokens([...pageTokens, response.nextPageToken])
                        return;
                    case "prev":
                        setPageIndex(pageIndex - 1);
                        return;
                    default:
                        setPageTokens([]);
                        setPageIndex(0);
                        setPageTokens([...pageTokens, response.nextPageToken]);
                        return;
                }
            }).catch(err => {
                console.log(err);
            })
    }

    const loadVideo = (id) => {
        getVideo(id)
            .then(response => {
                setVideoObj(response.items[0]);
            }).catch(err => {
                console.log(err);
            })
    }

    const removeVideo = () => {
        setVideoObj({});
    }

    const list = videos.map((val, index) => {
        return <Item onClickItem={loadVideo} key={index} snippet={val.snippet} id={val.id}></Item>
    });

    return (
        <div className="container">
            <Search showBack={videoObj.id ? true : false} onBack={()=>removeVideo()} animTop={animSearch} onSearch={onSubmit}></Search>
            {loading ? <ReactLoading className="loading" type="cylon" color="black" height={150} width={150} /> : null}
            {videoObj.id ? <Video id={videoObj.id} snippet={videoObj.snippet} statistics={videoObj.statistics} /> : null}
            {list.length > 0 && !videoObj.id ?
                <>
                    {list}
                    <div className="pagination">
                        {pageIndex > 0 ? <Button className="pagination-button" onClick={() => onSubmit(query, "prev")}>Voltar</Button> : null}
                        <Button className="pagination-button" onClick={() => onSubmit(query, "next")}>Próximo</Button>
                    </div>
                </>
                : null}
        </div >
    )
}

export default Home;