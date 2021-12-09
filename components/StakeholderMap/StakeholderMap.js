import React, { useState, useEffect } from 'react';
import generate from './d3file';
import * as d3 from 'd3';

// import styled, { injectGlobal } from 'styled-components'; // eslint-disable-line no-unused-vars

const data = [{"name":"Toni Laine","team":"Supervisor","sub_team":null,"title":"supervisor","responsibility":null,"parent":"Elisa","organization":"Supervisor"},{"name":"Mikko Häkkinen","team":"Design System","sub_team":null,"title":"Head of Design Language","responsibility":null,"parent":"Supervisor","organization":"SoSe"},{"name":"Pekka Ruuska","team":"Design System","sub_team":null,"title":"developer","responsibility":null,"parent":"Supervisor","organization":"SoSe"},{"name":"Varya Stepanova","team":"Design System","sub_team":null,"title":"developer","responsibility":null,"parent":"Supervisor","organization":"SoSe"},{"name":"Miko Hiltunen","team":"Design System","sub_team":null,"title":"designer","responsibility":null,"parent":"Supervisor","organization":"SoSe"},{"name":"Tuuli Leppäaho","team":"Viihde","sub_team":"Team 1","title":"product owner","responsibility":null,"parent":"Design System","organization":"HY"},{"name":"Joris-Jan van den Boom","team":"Viihde","sub_team":"Team 1","title":"designer","responsibility":"apps","parent":"Design System","organization":"HY"},{"name":"Ari Salokannel","team":"Viihde","sub_team":"Team 2","title":"designer","responsibility":"apps","parent":"Design System","organization":"HY"},{"name":"Miika Ruissalo","team":"Viihde","sub_team":"Team 2","title":"designer","responsibility":"web","parent":"Design System","organization":"HY"},{"name":"VietBa Hirvonen","team":"Viihde","sub_team":"Team 2","title":"junior service designer","responsibility":null,"parent":"Design System","organization":"HY"},{"name":"Petri Lamberg","team":"Kirja","sub_team":null,"title":"scrum master","responsibility":null,"parent":"Design System","organization":"HY"},{"name":"Sami Keinänen","team":"Kirja","sub_team":null,"title":"designer","responsibility":null,"parent":"Design System","organization":"HY"},{"name":"Jaakko Kuokkanen","team":"OmaElisa","sub_team":null,"title":"product owner","responsibility":null,"parent":"Design System","organization":"HY"},{"name":"Jaana Keinänen","team":"OmaElisa","sub_team":null,"title":"technical product owner","responsibility":null,"parent":"Design System","organization":"HY"},{"name":"Tuire Peurala","team":"OmaElisa","sub_team":null,"title":"designer","responsibility":null,"parent":"Design System","organization":"HY"},{"name":"Jyri Nikkanen","team":"OmaElisa","sub_team":null,"title":"designer","responsibility":null,"parent":"Design System","organization":"HY"},{"name":"Tapio Teräs","team":"OmaElisa","sub_team":null,"title":"developer","responsibility":"DS contact","parent":"Design System","organization":"HY"},{"name":"Mikko Vestola","team":"OmaElisa","sub_team":null,"title":"lead developer","responsibility":null,"parent":"Design System","organization":"HY"},{"name":"Antti Metso","team":"Sales","sub_team":null,"title":"product owner","responsibility":null,"parent":"Design System","organization":"HY"},{"name":"Sanna Valkeasuo","team":"Sales","sub_team":null,"title":"technical product owner","responsibility":null,"parent":"Design System","organization":"HY"},{"name":"Melina Kukkasela","team":"Sales","sub_team":null,"title":"designer","responsibility":null,"parent":"Design System","organization":"HY"},{"name":"Yaroslav Tsaruk","team":"Sales","sub_team":null,"title":"architect","responsibility":null,"parent":"Design System","organization":"HY"},{"name":"Edvard Fonsell","team":"Sales","sub_team":null,"title":"developer","responsibility":null,"parent":"Design System","organization":"HY"},{"name":"Esko Kokkonen","team":"Sales","sub_team":null,"title":"developer","responsibility":null,"parent":"Design System","organization":"HY"},{"name":"Jonas Berlin","team":"Sales","sub_team":null,"title":"developer","responsibility":null,"parent":"Design System","organization":"HY"},{"name":"Juha Pääjärvi","team":"Sales","sub_team":null,"title":"developer","responsibility":null,"parent":"Design System","organization":"HY"},{"name":"Teemu Peltonen","team":"Sales","sub_team":null,"title":"developer","responsibility":null,"parent":"Design System","organization":"HY"},{"name":"Joni Kautto","team":"Sales","sub_team":null,"title":"SEO consultant","responsibility":null,"parent":"Design System","organization":"HY"},{"name":"Antero Hytönen","team":"Sales","sub_team":null,"title":"tester","responsibility":null,"parent":"Design System","organization":"HY"},{"name":"Petri Grönlund","team":"Sites","sub_team":null,"title":"product owner","responsibility":null,"parent":"Design System","organization":"HY"},{"name":"Pyry Ahlfors","team":"Sites","sub_team":null,"title":"designer","responsibility":null,"parent":"Design System","organization":"HY"},{"name":"Jouni Hopia","team":"Ring","sub_team":null,"title":"team lead","responsibility":null,"parent":"Design System","organization":"YA"},{"name":"Antti Lavio","team":"Ring","sub_team":null,"title":"designer","responsibility":null,"parent":"Design System","organization":"YA"},{"name":"Joosep Laht","team":"Ring","sub_team":null,"title":"designer","responsibility":"mobile UI kit","parent":"Design System","organization":"YA"},{"name":"Jani Rantanen","team":"Online First","sub_team":null,"title":"product owner","responsibility":null,"parent":"Design System","organization":"YA"},{"name":"Miko Hiltunen","team":"Online First","sub_team":null,"title":"designer","responsibility":null,"parent":"Design System","organization":"YA"},{"name":"Tapio Kukkonen","team":"Online First","sub_team":null,"title":"developer","responsibility":null,"parent":"Design System","organization":"YA"},{"name":"Jesse Enqvist","team":"PHS","sub_team":null,"title":"designer","responsibility":null,"parent":"Design System","organization":"HY"},{"name":"Jaakko Raami","team":"ElisaID","sub_team":null,"title":"designer","responsibility":null,"parent":"Design System","organization":"HY"},{"name":"Johanna Koho","team":"Aisti","sub_team":null,"title":"designer","responsibility":null,"parent":"Design System","organization":"YA"},{"name":"Veli-Matti Pokela","team":"Aisti","sub_team":null,"title":"designer","responsibility":null,"parent":"Design System","organization":"YA"},{"name":"Antti Hämäläinen","team":"Aisti","sub_team":null,"title":"service architect","responsibility":null,"parent":"Design System","organization":"YA"},{"name":"Raquel Nieto","team":"Automate","sub_team":null,"title":"designer","responsibility":null,"parent":"Design System","organization":"YA"},{"name":"Santeri Toikka","team":"Automate","sub_team":null,"title":"lead developer","responsibility":null,"parent":"Design System","organization":"YA"},{"name":"Toivo Vaje","team":"Automate","sub_team":null,"title":"???","responsibility":null,"parent":"Design System","organization":"YA"},{"name":"Hervé Denis","team":"Automate","sub_team":null,"title":"senior test automation engineer","responsibility":"Virtual NOC","parent":"Design System","organization":"YA"},{"name":"Jonna Rantanen","team":"OmniChannel","sub_team":null,"title":"team lead","responsibility":null,"parent":"Design System","organization":"YA"},{"name":"Jouni Petrow","team":"Corporate CX","sub_team":null,"title":"team lead","responsibility":null,"parent":"Design System","organization":"YA"},{"name":"Annika Berg","team":"User Insights","sub_team":null,"title":"team lead","responsibility":null,"parent":"Design System","organization":"YA"},{"name":"Hien Nguyen","team":"SmartFactory","sub_team":null,"title":"software developer","responsibility":"tehtaiden mallinnus ja huolto 3D:nä","parent":"Design System","organization":"YA"},{"name":"Vu Dung","team":"SmartFactory","sub_team":null,"title":"software developer","responsibility":"tehtaiden mallinnus ja huolto 3D:nä","parent":"Design System","organization":"YA"},{"name":"??? ???","team":"Growth Hack","sub_team":null,"title":null,"responsibility":null,"parent":"Design System","organization":"HY"},{"name":"Pasi Seppänen","team":"ITBU","sub_team":null,"title":"designer","responsibility":null,"parent":"Design System","organization":"YA"},{"name":"Anders Borgström","team":"ITBU","sub_team":null,"title":"developer","responsibility":null,"parent":"Design System","organization":"YA"},{"name":"Teppo Huttunen","team":"ITBU","sub_team":null,"title":null,"responsibility":null,"parent":"Design System","organization":"YA"}];

// const StakeholderMapStyled = injectGlobal`
//   #chart {
//     position: relative;
//     background-color: #fff;
//     width: 700px;
//     height: 700px;
//     margin: 0 auto;
//   }

//   #card_container {
//     position: absolute;
//     width: 450px;
//     height: 450px;
//     background-color: #fff;
//     border: 1px solid orange;
//     border-radius: 50%;
//     display: none;
//     font-family: sans-serif;
//     font-size: 20px;
//     pointer-events: none;
//   }

//   #card {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     height: 100%;
//   }

//   #card h2,
//   #card p {
//     margin: 0;
//   }

//   #name {
//     font-family: Verlag;
//     font-weight: bold;
//     padding-bottom: 1rem;
//   }

//   #team {
//     font-size: 16px;
//   }

//   #sub_team,
//   #responsibility {
//     font-size: 14px;
//     font-style: italic;
//   }

//   .arc:hover {
//     fill: #0019AF;
//   }

//   .circle-person:hover {
//     fill: orange;
//   }

//   text {
//     font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
//     font-size: 12px;
//     fill: #fff;
//   }
// `
// ;

class StakeholderMap2 extends React.Component {

  constructor(props) {
    super(props);
    var nestedData = d3.nest()
      .key(function(d) { return d.team; })
      .entries(data);

    console.log(1111, nestedData)

    setTimeout(() => {
      generate(nestedData);
    }, 100);
  }

  componentDidMount() {

    var nestedData = d3.nest()
      .key(function(d) { return d.team; })
      .entries(data);

    console.log(1111, nestedData)

    setTimeout(() => {
      generate(nestedData);
    }, 100);

  }

  render() {
    var nestedData = d3.nest()
    .key(function(d) { return d.team; })
    .entries(data);

  console.log(1111, nestedData)

  setTimeout(() => {
    generate(nestedData);
  }, 100);
    return (
      <div className="stakeholder-map">
        <div id="chart">
          <div id="card_container">
            <div id="card">
              <div id="profile_picture"></div>
              <h2 id="name"></h2>
              <p id="title"></p>
              <p id="team"></p>
              <p id="sub_team"></p>
              <p id="responsibility"></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export async function getStaticProps() {
}

const StakeholderMap = (props) => {
  React.useEffect(() => {
    // window is accessible here.
    console.log("window.innerHeight", window.innerHeight);
  }, []);

  function loadData() {
    console.log('test')
  }
  
  return (
    <div className="stakeholder-map" onClick={alert(111)}>111
      <div id="chart">
        <div id="card_container">
          <div id="card">
            <div id="profile_picture"></div>
            <h2 id="name"></h2>
            <p id="title"></p>
            <p id="team"></p>
            <p id="sub_team"></p>
            <p id="responsibility"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakeholderMap;
