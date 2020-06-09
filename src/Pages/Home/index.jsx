import React from 'react';
import './styles.scss';
import Search from '../../Components/Search';
import Item from '../../Components/Item';
import ReactLoading from 'react-loading';
import { useEffect } from 'react';
import { findVideos } from '../../Services/youtube'
import { useState } from 'react';
import { Button } from '@material-ui/core';

const Home = () => {
    const [videos, setVideos] = useState([]);
    const [query, setQuery] = useState("");
    const [pageTokens, setPageTokens] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [animSearch, setAnimSearch] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSearch = (query) => {
        setAnimSearch(true);
        setLoading(true);
        setVideos([]);
        setQuery(query);

        findVideos(query, "")
            .then(response => {
                setPageTokens([]);
                setPageIndex(0);
                setVideos(response.items);
                setPageTokens([...pageTokens, response.nextPageToken]);
                setLoading(false);
            }).catch(err => {
                console.log(err);
            })
    }

    const nextPage = () => {
        setLoading(true);
        setVideos([]);
        findVideos(query, pageTokens[pageIndex])
            .then(response => {
                setLoading(false);
                setPageIndex(pageIndex + 1);
                setVideos(response.items);
                setPageTokens([...pageTokens, response.nextPageToken])
            }).catch(err => {
                console.log(err);
            })
    }

    const prevPage = () => {
        setLoading(true);
        setVideos([]);
        findVideos(query, pageTokens[pageIndex])
            .then(response => {
                setLoading(false);
                setPageIndex(pageIndex - 1);
                setVideos(response.items);
            }).catch(err => {
                console.log(err);
            })
    }



    const list = videos.map((val, index) => {
        return <Item key={index} snippet={val.snippet} id={val.id}></Item>
    });

    return (
        <div className="container">
            <Search animTop={animSearch} onSearch={onSearch}></Search>
            {loading ? <ReactLoading className="loading" type="cylon" color="black" height={150} width={150} /> : null}
            {list.length > 0 ?
                <>
                    {list}
                    <div className="pagination">
                        {pageIndex > 0 ? <Button className="pagination-button" onClick={() => prevPage()}>Voltar</Button> : null}
                        <Button className="pagination-button" onClick={() => nextPage()}>Próximo</Button>
                    </div>
                </>
                : null}
        </div >
    )
}

export default Home;