import { BrowserRouter, Routes, Route } from "react-router-dom"

import ScanProduct from "./pages/consumer/ScanProduct"
import VerifyProduct from "./pages/consumer/VerifyProduct"

import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"

import Dashboard from "./pages/dashboard/Dashboard"
import Templates from "./pages/dashboard/Templates"
import Products from "./pages/dashboard/Products"
import ProductStages from "./pages/dashboard/ProductStages"

import DashboardLayout from "./layouts/DashboardLayout"
import Landing from "./pages/Landing"

function App() {

return (

<BrowserRouter>

<Routes>
    {/* Landing Page */}

<Route path="/" element={<Landing />} />

{/* Consumer Routes */}

<Route path="/scan" element={<ScanProduct />} />

<Route path="/verify/:id" element={<VerifyProduct />} />


{/* Auth Routes */}

<Route path="/login" element={<Login />} />

<Route path="/register" element={<Register />} />


{/* Dashboard Routes */}

<Route
path="/dashboard"
element={
<DashboardLayout>
<Dashboard />
</DashboardLayout>
}
/>

<Route
path="/templates"
element={
<DashboardLayout>
<Templates />
</DashboardLayout>
}
/>

<Route
path="/products"
element={
<DashboardLayout>
<Products />
</DashboardLayout>
}
/>

<Route
path="/product-stages"
element={
<DashboardLayout>
<ProductStages />
</DashboardLayout>
}
/>

</Routes>

</BrowserRouter>

)

}

export default App