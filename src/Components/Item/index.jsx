import React from 'react';
import './styles.scss';
import { Image } from "@zzwing/react-image";
import TextTruncate from 'react-text-truncate';
import { Card } from '@material-ui/core';

const Item = (props) => {
    return (
        <div className="item-container" onClick={() => props.onClickItem(props.id.videoId)}>
            <Card className="card">
                <Image objectFit="cover" width="150" height="150" src={props.snippet.thumbnails.medium.url}  />
                <div className="content">
                    <TextTruncate line={1} className="title" text={props.snippet.title} truncateText="..." />
                    <TextTruncate line={3} className="subtitle" text={props.snippet.description} truncateText="..." />
                </div>
            </Card>
        </div>
    )
}
export default Item;