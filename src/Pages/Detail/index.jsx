import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getVideo } from '../../Services/youtube';
import Video from '../../Components/Video';
import Top from '../../Components/Top';
import Alert from '../../Components/Alert';

const Detail = () => {
    const [videoObj, setVideoObj] = useState({});
    const [error, setError] = useState("");
    const { id } = useParams();

    const didInit = () => {
        loadVideo(id)
    }

    const loadVideo = (id) => {
        getVideo(id)
            .then(response => {
                setVideoObj(response.items[0]);
            }).catch(err => {
                setError(err.message);
            })
    }

    const handleCloseAlert = () => {
        setError("")
    }


    useEffect(() => {
        didInit();
    }, []);

    return (
        <div className="container">
            <Alert open={error !== ""} error={error} onClose={() => handleCloseAlert()}></Alert>
            <Top />
            {videoObj.id ? <Video id={videoObj.id} snippet={videoObj.snippet} statistics={videoObj.statistics} /> : null}
        </div>
    )
}

export default Detail;