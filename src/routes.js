import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import DogsList from "./components/dogsList";

const Routings = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<DogsList />} />
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Routings;