import React from 'react';
import './styles.scss';
import { PlayCircleFilled } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const Top = () => {

    return (
        <div className="top">
            <Link to="/"><PlayCircleFilled />React<span>Youtube</span></Link>
        </div>
    )
}
export default Top;