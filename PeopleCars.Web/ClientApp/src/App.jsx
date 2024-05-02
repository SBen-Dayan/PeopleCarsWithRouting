import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import AddPerson from "./AddPerson";
import DeleteCars from "./DeleteCars";
import AddCar from "./AddCar";

export default function App() {
    return (
    <Layout>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/addperson" element={<AddPerson/>}/>
            <Route path="/addcar/:personid" element={<AddCar/>}/>
            <Route path="/deletecars/:personid" element={<DeleteCars/>}/>
        </Routes>
    </Layout>
    )
} 