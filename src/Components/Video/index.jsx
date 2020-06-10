import React from 'react';
import Youtube from 'react-youtube';
import { ThumbDown, ThumbUp, Visibility } from '@material-ui/icons';
import { numberFormat } from '../../utils';
import './styles.scss';
import { Card } from '@material-ui/core';

const Video = (props) => {

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <Card className="video-container">
            <Youtube opts={opts} videoId={props.id}></Youtube>
            <div className="counter">
                <div className="likedislike">
                    <div className="like"><ThumbUp /><span>{props.statistics ? numberFormat(props.statistics.likeCount) : 0}</span></div>
                    <div className="dislike"><ThumbDown /><span>{props.statistics ? numberFormat(props.statistics.dislikeCount) : 0}</span></div>
                </div>
                <div className="view"><Visibility /><span>{props.statistics ? numberFormat(props.statistics.viewCount) : 0}</span></div>
            </div>
            <div className="title">{props.snippet ? props.snippet.title : ""}</div>
            <div className="subtitle">{props.snippet ? props.snippet.description : ""}</div>
        </Card>
    )
}
export default Video;