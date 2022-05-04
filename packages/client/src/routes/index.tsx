import React, { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from '../layouts/Home'
import Err404 from '../layouts/Err404'
import { Signup, Login } from '../layouts/Auth'

const AppRouter: FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route element={<Err404 />} />
  </Routes>
)

export default AppRouter
