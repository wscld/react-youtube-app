import React from 'react';
import './styles.scss';
import { Input,Paper,Button } from '@material-ui/core';
import { useState } from 'react';

const Search = (props) => {
    const [value, setValue] = useState("");

    return (
        <div className={props.animTop ? "search-anim-top search-container" : "search-container"}>
            <Paper elevation={3} className="search-card">
                <Input fullWidth={true} className="search-bar" onChange={e=>setValue(e.target.value)} placeholder="Pesquisar vídeo..."></Input>
                <Button className="search-button" onClick={()=>{props.onSearch(value)}}>Procurar</Button>
            </Paper>
        </div>
    )
}
export default Search;