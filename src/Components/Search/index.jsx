import React from 'react';
import './styles.scss';
import Top from '../Top';
import { Input, Paper, Button } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { useState } from 'react';

const Search = (props) => {
    const [value, setValue] = useState("");

    const handleEnter = (e) => {
        if (e.keyCode === 13) {
            e.target.blur();
            props.onSearch(value);
        }
    }

    return (
        <div className={props.animTop ? "search-anim-top search-container" : "search-container"}>
            <Top></Top>
            <Paper elevation={3} className="card">
                {props.showBack ? <Button onClick={props.onBack} className={props.showBack ? "back" : null}><ArrowBack /></Button> : null}
                <Input disableUnderline={true} fullWidth={true} onKeyUp={(e) => handleEnter(e)} className="bar" onChange={e => setValue(e.target.value)} placeholder="Pesquisar vídeo..."></Input>
                <Button className="button" onClick={() => { props.onSearch(value) }}>Procurar</Button>
            </Paper>
        </div>
    )
}
export default Search;