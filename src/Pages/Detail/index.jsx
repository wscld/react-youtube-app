import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getVideo } from '../../Services/youtube';
import Video from '../../Components/Video';

const Detail = () => {
    const [videoObj, setVideoObj] = useState({});
    const {id} = useParams();

    useEffect(() => {
       loadVideo(id) 
    },[])

    const loadVideo = (id) => {
        getVideo(id)
            .then(response => {
                setVideoObj(response.items[0]);
            }).catch(err => {
                console.log(err);
            })
    }


    return (
        <div className="container">
            {videoObj.id ? <Video id={videoObj.id} snippet={videoObj.snippet} statistics={videoObj.statistics} /> : null}
        </div>
    )
}

export default Detail;