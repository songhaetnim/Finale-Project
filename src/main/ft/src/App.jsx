import React from "react";
import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import RecentItems from "./components/Item/RecentItems";
import Karlo from "./components/AI/Karlo";
import BackgroundRemoval from "./components/AI/BackgroundRemoval";
import ImageDownload from "./components/AI/ImageDownload";

import Calendar from "./components/Calender/Calendar";
import CalendarButton from "./components/Calender/CalendarButton";


export default function App() {
  return (
    <AuthContextProvider>
        <NavigationBar/>
        <Calendar/>
        <CalendarButton/>
        <RecentItems/>
        <ImageDownload/>
        <Karlo/>
        <BackgroundRemoval/>
        <Outlet />
        <Footer />
    </AuthContextProvider>
  );
}