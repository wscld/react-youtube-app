import React from 'react';
import './styles.scss';
import FittedImage from 'react-fitted-image';
import TextTruncate from 'react-text-truncate';
import { Card } from '@material-ui/core';

const Item = (props) => {
    return (
        <div className="item-container">
            <Card className="item-card">
                <FittedImage fit="cover" src={props.snippet.thumbnails.medium.url} className="item-thumbnail"></FittedImage>
                <div className="item-content">
                    <TextTruncate line={1} className="item-title" text={props.snippet.title} truncateText="..."/>
                    <TextTruncate line={3} className="item-subtitle" text={props.snippet.description} truncateText="..."/>
                </div>
            </Card>
        </div>
    )
}
export default Item;