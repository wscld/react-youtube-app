import React from 'react';
import './styles.scss';
import { validateQuery } from '../../utils';
import { findVideos, getVideo } from '../../Services/youtube'
import { useState } from 'react';
import { Button } from '@material-ui/core';
import Search from '../../Components/Search';
import Item from '../../Components/Item';
import ReactLoading from 'react-loading';
import Video from '../../Components/Video';
import Alert from '../../Components/Alert';


const Home = () => {
    const [videos, setVideos] = useState([]);
    const [query, setQuery] = useState("");
    const [pageTokens, setPageTokens] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [animSearch, setAnimSearch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [videoObj, setVideoObj] = useState({});
    const [error, setError] = useState("");

    const handleBack = () => {
        setVideoObj({});
        window.history.replaceState("", "", "/");
    }

    const handleCloseAlert = () => {
        setError("");
    }

    const handleSubmit = (query, action) => {
        window.history.replaceState("", "", "/");
        let validation = validateQuery(query);
        if (validation) {
            setError(validation);
            return;
        }

        setAnimSearch(true);
        setLoading(true);
        setVideos([]);
        setQuery(query);
        handleBack();


        var index = 0;
        if (action === "next") {
            index = pageIndex + 1;
            setPageIndex(pageIndex + 1);
        } else if (action === "prev") {
            index = pageIndex - 1;
            setPageIndex(pageIndex - 1);
        } else {
            setPageTokens([]);
            setPageIndex(0);
        }

        findVideos(query, pageTokens.length >= 0? pageTokens[index-1]:"")
            .then(response => {
                setLoading(false);
                setVideos(response.items);
                if (action !== "prev") {
                    setPageTokens([...pageTokens, response.nextPageToken])
                }
            }).catch(err => {
                setError(err.message);
                setLoading(false);
            })
    }

    const loadVideo = (id) => {
        getVideo(id)
            .then(response => {
                if (response.items.length > 0) {
                    setVideoObj(response.items[0]);
                    window.history.replaceState("", "", "/detail/" + response.items[0].id);
                }
            }).catch(err => {
                setError(err.message)
                setLoading(false);
            })
    }

    const list = videos.map((val, index) => {
        return <Item onClickItem={loadVideo} key={index} snippet={val.snippet} id={val.id}></Item>
    });

    return (
        <div className="container">
            <Alert open={error !== ""} error={error} onClose={() => handleCloseAlert()}></Alert>
            <Search showBack={videoObj.id ? true : false} onBack={() => handleBack()} animTop={animSearch} onSearch={handleSubmit}></Search>
            {loading ? <ReactLoading className="loading" type="cylon" color="black" height={100} width={100} /> : null}
            {videoObj.id ? <Video id={videoObj.id} snippet={videoObj.snippet} statistics={videoObj.statistics} /> : null}
            {list.length > 0 && !videoObj.id ?
                <>
                    {list}
                    <div className="pagination">
                        {pageIndex > 0 ? <Button className="pagination-button" onClick={() => handleSubmit(query, "prev")}>Voltar</Button> : null}
                        <Button className="pagination-button" onClick={() => handleSubmit(query, "next")}>Próximo</Button>
                    </div>
                </>
                : null}
        </div >
    )
}

export default Home;