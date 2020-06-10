import React from 'react';
import './styles.scss';
import { Input, Paper, Button } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { useState } from 'react';
import Top from '../Top';

const Search = (props) => {
    const [value, setValue] = useState("");

    return (
        <div className={props.animTop ? "search-anim-top search-container" : "search-container"}>
            <Top></Top>
            <Paper elevation={3} className="card">
                {props.showBack ? <Button onClick={props.onBack} className={props.showBack ? "back" : null}><ArrowBack /></Button> : null}
                <Input disableUnderline={true} fullWidth={true} className="bar" onChange={e => setValue(e.target.value)} placeholder="Pesquisar vídeo..."></Input>
                <Button className="button" onClick={() => { props.onSearch(value) }}>Procurar</Button>
            </Paper>
        </div>
    )
}
export default Search;