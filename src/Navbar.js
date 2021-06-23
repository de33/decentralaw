import React from 'react';
import './App.css';

function Navbar() {
    return (
    <nav>
    <a href="/"><b>HOME</b></a>
    <a href="/about"><b>ABOUT</b></a>
    <a href="/roadmap"><b>ROADMAP</b></a>
    <a href="/quickstart"><b>QUICKSTART</b></a>
    <a href="/explorer"><b>CONTRACT EXPLORER</b></a>
    <a href="/app"><b>USE APP</b></a>
    </nav>
    )
}

export default Navbar;