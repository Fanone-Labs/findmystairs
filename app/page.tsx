"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft, ArrowUpRight, Building2, Check, ChevronRight, CircleHelp,
  Clock3, DoorOpen, Eye, Home as HomeIcon, Hotel, KeyRound, ListTree,
  MapPin, Menu, Search, ShieldCheck, Sparkles, Users, X,
} from "lucide-react";

type BuildingType = "hotel" | "office" | "condo";
type Status = "confirmed" | "limited" | "required" | "unknown";
type Place = {
  id:number; type:BuildingType; name:string; city:string; address:string;
  status:Status; reports:number; updated:string; floors:string; note:string;
  score:number; glassElevator:"yes"|"no"|"unknown";
};

const places:Place[] = [
  {id:1,type:"hotel",name:"Hotel Artemide",city:"Rome, Italy",address:"Via Nazionale 22",status:"confirmed",reports:12,updated:"18 Aug 2026",floors:"Lobby → all guest floors",note:"Main staircase beside the lifts. No key or staff assistance needed.",score:92,glassElevator:"no"},
  {id:2,type:"hotel",name:"Palazzo Navona",city:"Rome, Italy",address:"Largo della Sapienza 8",status:"limited",reports:7,updated:"02 Jul 2026",floors:"Lobby → floors 1–3",note:"Guests can walk down freely; a room key is needed to re-enter upper floors.",score:68,glassElevator:"yes"},
  {id:3,type:"hotel",name:"Casa Monti",city:"Rome, Italy",address:"Via Panisperna 210",status:"unknown",reports:0,updated:"Not yet reported",floors:"Unknown",note:"Be the first traveller to confirm the stair access.",score:0,glassElevator:"unknown"},
  {id:4,type:"office",name:"King Street Centre",city:"Toronto, Canada",address:"180 King Street West",status:"confirmed",reports:8,updated:"08 Sep 2026",floors:"Lobby → floors 2–12",note:"Employees can use the main stairs with a building access card.",score:86,glassElevator:"yes"},
  {id:5,type:"office",name:"University Avenue Offices",city:"Toronto, Canada",address:"250 University Avenue",status:"limited",reports:5,updated:"24 Aug 2026",floors:"Downward access only for visitors",note:"Upward stair access requires an employee card. Visitor access is restricted.",score:71,glassElevator:"no"},
  {id:6,type:"office",name:"Adelaide Exchange",city:"Toronto, Canada",address:"88 Adelaide Street East",status:"unknown",reports:0,updated:"Not yet reported",floors:"Unknown",note:"No one has reported stair or elevator details yet.",score:0,glassElevator:"unknown"},
  {id:7,type:"condo",name:"Lakeshore Residences",city:"Toronto, Canada",address:"15 Lakeshore Boulevard",status:"confirmed",reports:11,updated:"12 Sep 2026",floors:"Lobby → all residential floors",note:"Residents can use the stairs in both directions with a fob.",score:90,glassElevator:"yes"},
  {id:8,type:"condo",name:"The Junction House",city:"Toronto, Canada",address:"2200 Dundas Street West",status:"limited",reports:6,updated:"29 Aug 2026",floors:"Floors 2–6; lobby re-entry restricted",note:"Stairs work between residential floors, but lobby access requires a fob.",score:74,glassElevator:"no"},
  {id:9,type:"condo",name:"Parkview Condominiums",city:"Toronto, Canada",address:"40 Parkview Avenue",status:"required",reports:4,updated:"03 Aug 2026",floors:"Emergency stairs only",note:"Residents report that everyday stair access is not available.",score:64,glassElevator:"yes"},
];

const typeMeta = {
  hotel:{label:"Hotels",singular:"hotel",Icon:Hotel,city:"Rome, Italy",placeholder:"Search a hotel or city",audience:"guests"},
  office:{label:"Offices",singular:"office building",Icon:Building2,city:"Toronto, Canada",placeholder:"Search an office building or address",audience:"employees and visitors"},
  condo:{label:"Condos",singular:"condo building",Icon:HomeIcon,city:"Toronto, Canada",placeholder:"Search a condo or address",audience:"residents and guests"},
};
const statusMeta = {
  confirmed:{label:"Stairs confirmed",tone:"confirmed",dot:"bg-emerald-500"},
  limited:{label:"Limited stair access",tone:"limited",dot:"bg-amber-500"},
  required:{label:"Elevator likely required",tone:"required",dot:"bg-rose-500"},
  unknown:{label:"Not yet confirmed",tone:"unknown",dot:"bg-slate-400"},
};

function Logo(){return <button className="logo" onClick={()=>location.reload()} aria-label="Find My Stairs home"><span className="logo-mark"><ListTree size={19}/></span><span>Find My<br/><b>Stairs</b></span></button>}
function StatusPill({status}:{status:Status}){const m=statusMeta[status];return <span className={`status-pill ${m.tone}`}><i className={m.dot}/>{m.label}</span>}

export default function Home(){
  const [view,setView]=useState<"home"|"results"|"detail">("home");
  const [buildingType,setBuildingType]=useState<BuildingType>("hotel");
  const [query,setQuery]=useState("");
  const [selected,setSelected]=useState<Place>(places[0]);
  const [confirmedOnly,setConfirmedOnly]=useState(false);
  const [reportOpen,setReportOpen]=useState(false);
  const [submitted,setSubmitted]=useState(false);
  const meta=typeMeta[buildingType];
  const filtered=useMemo(()=>places.filter(p=>p.type===buildingType&&(!confirmedOnly||p.status==="confirmed")),[buildingType,confirmedOnly]);

  const selectType=(type:BuildingType)=>{setBuildingType(type);setQuery("");setConfirmedOnly(false)};
  const search=()=>setView("results");
  const openPlace=(place:Place)=>{setSelected(place);setBuildingType(place.type);setView("detail");window.scrollTo(0,0)};
  const startReport=()=>{setSelected(places.find(p=>p.type===buildingType)??places[0]);setReportOpen(true)};
  const accessFacts = [
    ["Lobby to upper floors",selected.status==="required"?"No":"Yes",DoorOpen],
    ["Walk upstairs",selected.status==="confirmed"?"Yes":selected.status==="limited"?"Limited":"Unknown",ListTree],
    ["Walk downstairs",selected.status==="required"?"Emergency only":"Yes",ListTree],
    ["All occupied floors",selected.status==="confirmed"?"Yes":"Not confirmed",Check],
    ["Glass elevator",selected.glassElevator==="yes"?"Yes":selected.glassElevator==="no"?"No":"Unknown",Eye],
    [selected.type==="hotel"?"Room key required":selected.type==="office"?"Access card required":"Resident fob required",selected.type==="hotel"?"No":"Yes",KeyRound],
    [selected.type==="office"?"Visitor access":"Staff or security permission",selected.type==="office"?"Limited":"No",Users],
    ["Doors may lock behind you",selected.status==="limited"?"Possible":"No",DoorOpen],
  ];

  return <main>
    <header><Logo/><nav><button onClick={startReport}>Add building info</button><button className="about">How it works</button><button className="avatar">DS</button><button className="mobile-menu"><Menu/></button></nav></header>

    {view==="home"&&<>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={15}/> Building access, reported by real people</div>
          <h1>Find the stairs<br/>before you <em>arrive.</em></h1>
          <p>Check whether you can use the stairs—or a glass elevator—at hotels, offices and condo buildings.</p>
          <div className="type-switch" aria-label="Choose a building type">
            {(Object.keys(typeMeta) as BuildingType[]).map(type=>{const {Icon,label}=typeMeta[type];return <button key={type} className={buildingType===type?"active":""} onClick={()=>selectType(type)}><Icon/>{label}</button>})}
          </div>
          <div className="searchbox"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&search()} placeholder={meta.placeholder} aria-label={meta.placeholder}/><button onClick={search}>Search</button></div>
          <div className="popular"><span>Try</span>{(buildingType==="hotel"?["Rome","Toronto","New York"]:buildingType==="office"?["King Street","University Avenue","Toronto"]:["Lakeshore","The Junction","Toronto"]).map(x=><button key={x} onClick={()=>{setQuery(x);search()}}>{x}<ArrowUpRight size={13}/></button>)}</div>
        </div>
        <div className="hero-visual"><img src="/hotel-staircase.png" alt="An open staircase inside a modern building"/><div className="float-card"><div className="float-top"><StatusPill status="confirmed"/><span>{meta.city}</span></div><b>{buildingType==="hotel"?"Hotel Artemide":buildingType==="office"?"King Street Centre":"Lakeshore Residences"}</b><p><Check size={15}/> Stairs reported for everyday use</p><div className="verified"><Users size={15}/> Recently confirmed by the community</div></div></div>
      </section>
      <section className="trust-strip"><div><strong>3</strong><span>building categories</span></div><div><strong>1</strong><span>clear access report</span></div><div><strong>30 sec</strong><span>to contribute</span></div><p><ShieldCheck/> Every report is dated so people can judge how current it is.</p></section>
      <section className="how"><div><span>CHOOSE YOUR BUILDING</span><h2>Hotels, offices<br/>and condos.</h2></div><div className="steps">{(Object.keys(typeMeta) as BuildingType[]).map((type,i)=>{const {Icon,label,audience}=typeMeta[type];return <article key={type}><b>0{i+1}</b><Icon/><h3>{label}</h3><p>Access details written for {audience}.</p></article>})}</div></section>
    </>}

    {view==="results"&&<section className="results-page">
      <button className="back" onClick={()=>setView("home")}><ArrowLeft/> Back</button>
      <div className="category-tabs">{(Object.keys(typeMeta) as BuildingType[]).map(type=>{const {Icon,label}=typeMeta[type];return <button key={type} className={buildingType===type?"active":""} onClick={()=>selectType(type)}><Icon/>{label}</button>})}</div>
      <div className="results-search"><Search/><input value={query||meta.city.split(",")[0]} onChange={e=>setQuery(e.target.value)} aria-label={meta.placeholder}/><button>Search</button></div>
      <div className="results-head"><div><span>{meta.city.toUpperCase()}</span><h1>{meta.label} with stair-access reports</h1><p>Sample prototype information · Community reporting will replace this data</p></div><div className="legend"><span><i className="bg-emerald-500"/>Full</span><span><i className="bg-amber-500"/>Limited</span><span><i className="bg-rose-500"/>Required</span></div></div>
      <div className="results-layout"><aside><b>Filter results</b><label><input type="checkbox" checked={confirmedOnly} onChange={e=>setConfirmedOnly(e.target.checked)}/><span>Show confirmed only</span></label><hr/><small>STAIR ACCESS</small>{["Full stair access","Limited access","Elevator required","Unknown"].map((x,i)=><label key={x}><input type="checkbox" defaultChecked={i<2}/><span>{x}</span></label>)}<hr/><small>FEATURES</small>{["Glass elevator available",buildingType==="office"?"Visitor stair access":buildingType==="condo"?"Guest stair access":"No room key needed","All occupied floors","Recently confirmed"].map(x=><label key={x}><input type="checkbox"/><span>{x}</span></label>)}</aside>
        <div className="hotel-list">{filtered.map((place,i)=><article className="hotel-card" key={place.id} onClick={()=>openPlace(place)}><div className="hotel-index">{String(i+1).padStart(2,"0")}</div><div className="hotel-body"><div className="hotel-title"><div><span className="place-type">{typeMeta[place.type].label.slice(0,-1)}</span><h2>{place.name}</h2><p><MapPin/> {place.address}</p></div><StatusPill status={place.status}/></div><div className="access-line"><ListTree/><div><b>{place.floors}</b><span>{place.note}</span>{place.glassElevator==="yes"&&<span className="glass-tag"><Eye/> Glass elevator reported</span>}</div></div><div className="hotel-foot"><span><Users/> {place.reports?place.reports+" reports":"No reports yet"}</span><span><Clock3/> {place.updated}</span><button>View details <ChevronRight/></button></div></div></article>)}</div>
      </div>
    </section>}

    {view==="detail"&&<section className="detail-page">
      <button className="back" onClick={()=>setView("results")}><ArrowLeft/> {typeMeta[selected.type].label}</button>
      <div className="detail-head"><div><span>{typeMeta[selected.type].label.toUpperCase()} · {selected.city.toUpperCase()}</span><h1>{selected.name}</h1><p><MapPin/> {selected.address}, {selected.city}</p></div><button className="report-cta" onClick={()=>setReportOpen(true)}>Add or update access info</button></div>
      <div className="detail-grid"><div className="main-panel"><div className="verdict"><div className="score-ring"><strong>{selected.score||"?"}</strong><span>confidence</span></div><div><StatusPill status={selected.status}/><h2>{selected.status==="confirmed"?"You can use the stairs":selected.status==="limited"?"Stairs are usable with limits":selected.status==="required"?"Plan to use the elevator":"Stair access is unknown"}</h2><p>{selected.note}</p></div></div>
        <div className="facts"><h3>What people confirmed</h3>{accessFacts.map(([q,a,Icon]:any)=><div key={q}><Icon/><span>{q}</span><b>{a}</b></div>)}</div>
        <div className="reports"><div><h3>Recent access reports</h3><span>{selected.reports} total</span></div><article><span>DS</span><div><b>Visited recently · Toronto</b><p>{selected.note}</p><small>Prototype report · Details are for demonstration</small></div></article></div></div>
        <aside className="side-panel"><img src="/hotel-staircase.png" alt="Building staircase"/><div><small>BUILDING TYPE</small><b>{typeMeta[selected.type].singular}</b></div><div><small>GLASS ELEVATOR</small><b>{selected.glassElevator==="yes"?"Available":selected.glassElevator==="no"?"Not reported":"Unknown"}</b></div><div><small>LAST CONFIRMED</small><b>{selected.updated}</b></div><button onClick={()=>setReportOpen(true)}>I know this building</button><p><CircleHelp/> Access systems change. Add a fresh report if you visit.</p></aside>
      </div>
    </section>}

    {reportOpen&&<div className="modal-backdrop" onClick={()=>setReportOpen(false)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setReportOpen(false)}><X/></button>{submitted?<div className="success"><span><Check/></span><h2>Thanks for helping.</h2><p>Your report makes the next person’s visit easier to plan.</p><button onClick={()=>{setSubmitted(false);setReportOpen(false)}}>Done</button></div>:<><div className="modal-head"><span>30-SECOND REPORT</span><h2>Tell us about the building</h2><p>{typeMeta[selected.type].label} · {selected.name}</p></div><form onSubmit={e=>{e.preventDefault();setSubmitted(true)}}>
      <fieldset><legend>What type of building is it?</legend><div>{(["hotel","office","condo"] as BuildingType[]).map(type=><label key={type}><input required name="building-type" type="radio" defaultChecked={selected.type===type}/><span>{typeMeta[type].label}</span></label>)}</div></fieldset>
      <fieldset><legend>Could you access stairs from the lobby?</legend><div>{["Yes","Partially","No","Not sure"].map(x=><label key={x}><input required name="lobby" type="radio"/><span>{x}</span></label>)}</div></fieldset>
      <fieldset><legend>Which direction worked?</legend><div>{["Up & down","Down only","Up only","Neither"].map(x=><label key={x}><input required name="direction" type="radio"/><span>{x}</span></label>)}</div></fieldset>
      <fieldset><legend>Was there a glass elevator?</legend><div>{["Yes","No","Not sure"].map(x=><label key={x}><input required name="glass-elevator" type="radio"/><span>{x}</span></label>)}</div></fieldset>
      {selected.type==="office"&&<fieldset><legend>Could visitors use the stairs?</legend><div>{["Yes","With staff","No","Not sure"].map(x=><label key={x}><input required name="visitor" type="radio"/><span>{x}</span></label>)}</div></fieldset>}
      {selected.type==="condo"&&<fieldset><legend>Was a resident fob required?</legend><div>{["Yes","No","Not sure"].map(x=><label key={x}><input required name="fob" type="radio"/><span>{x}</span></label>)}</div></fieldset>}
      {selected.type==="hotel"&&<fieldset><legend>Was a room key required?</legend><div>{["Yes","No","Not sure"].map(x=><label key={x}><input required name="key" type="radio"/><span>{x}</span></label>)}</div></fieldset>}
      <label className="notes">Anything else people should know?<textarea placeholder="Floor limits, locked doors, security rules, elevator visibility…"/></label><button className="submit">Submit access report <ArrowUpRight/></button>
    </form></>}</div></div>}
    <footer><Logo/><p>Know your way up before you arrive.</p><span>Community-reported information · Always confirm critical access directly with the building.</span></footer>
  </main>
}
