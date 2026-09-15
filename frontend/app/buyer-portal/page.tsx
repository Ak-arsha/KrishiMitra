"use client";

import React, { useState } from "react";
import {
  ShoppingBag,
  Filter,
  Search,
  MapPin,
  ShieldCheck,
  Truck,
  ArrowRight,
  PlusCircle,
  TrendingUp,
  Building2,
  CheckCircle2,
  Clock,
  PhoneCall,
  Sparkles,
} from "lucide-react";

export default function BuyerPortalPage() {
  const [selectedCrop, setSelectedCrop] = useState("All");
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [rfqSubmitted, setRfqSubmitted] = useState(false);
  const [rfqForm, setRfqForm] = useState({
    crop: "Wheat",
    quantityTons: 50,
    maxPricePerQtl: 2500,
    deliveryLocation: "Jaipur Mandi Hub",
  });

  const FARMER_INVENTORY = [
    {
      id: "INV-101",
      farmerName: "Rajeshwar Singh",
      location: "Bharatpur, Rajasthan",
      distanceKm: 42,
      crop: "Wheat",
      variety: "Sharbati Premium",
      grade: "Grade A+",
      quantityQuintals: 240,
      askingPrice: 2480,
      harvestDate: "Sep 2026",
      moistureContent: "11.5%",
      certifiedOrganic: true,
      phone: "+91 98290 12345",
    },
    {
      id: "INV-102",
      farmerName: "Vikram Patel",
      location: "Kota, Rajasthan",
      distanceKm: 110,
      crop: "Soybean",
      variety: "JS 335",
      grade: "Standard",
      quantityQuintals: 450,
      askingPrice: 4650,
      harvestDate: "Aug 2026",
      moistureContent: "10.2%",
      certifiedOrganic: false,
      phone: "+91 94140 67890",
    },
    {
      id: "INV-103",
      farmerName: "Gurpreet Dhillon",
      location: "Hanumangarh, Rajasthan",
      distanceKm: 185,
      crop: "Mustard",
      variety: "Pusa Bold",
      grade: "Grade A+",
      quantityQuintals: 320,
      askingPrice: 5720,
      harvestDate: "Sep 2026",
      moistureContent: "8.0%",
      certifiedOrganic: true,
      phone: "+91 98765 43210",
    },
    {
      id: "INV-104",
      farmerName: "Sunil Sharma",
      location: "Alwar, Rajasthan",
      distanceKm: 65,
      crop: "Paddy",
      variety: "Basmati 1121",
      grade: "Export Quality",
      quantityQuintals: 600,
      askingPrice: 2183,
      harvestDate: "Sep 2026",
      moistureContent: "12.0%",
      certifiedOrganic: false,
      phone: "+91 91160 54321",
    },
    {
      id: "INV-105",
      farmerName: "Ramesh Choudhary",
      location: "Amritsar, Punjab",
      distanceKm: 240,
      crop: "Rice",
      variety: "Super Basmati",
      grade: "Grade A+",
      quantityQuintals: 500,
      askingPrice: 4500,
      harvestDate: "Aug 2026",
      moistureContent: "11.0%",
      certifiedOrganic: true,
      phone: "+91 98150 98765",
    },
    {
      id: "INV-106",
      farmerName: "Balwant Rao",
      location: "Nashik, Maharashtra",
      distanceKm: 310,
      crop: "Tomato",
      variety: "Hybrid Red",
      grade: "Grade A",
      quantityQuintals: 180,
      askingPrice: 3400,
      harvestDate: "Sep 2026",
      moistureContent: "88.0%",
      certifiedOrganic: false,
      phone: "+91 98220 44332",
    },
    {
      id: "INV-107",
      farmerName: "Sanjay Deshmukh",
      location: "Nashik, Maharashtra",
      distanceKm: 290,
      crop: "Onion",
      variety: "Lasalgaon Pink",
      grade: "Grade A+",
      quantityQuintals: 750,
      askingPrice: 1850,
      harvestDate: "Sep 2026",
      moistureContent: "14.0%",
      certifiedOrganic: true,
      phone: "+91 97630 11223",
    },
  ];

  const filteredInventory = FARMER_INVENTORY.filter((item) => {
    const matchCrop = selectedCrop === "All" || item.crop === selectedCrop;
    const matchGrade = selectedGrade === "All" || item.grade.includes(selectedGrade);
    return matchCrop && matchGrade;
  });

  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRfqSubmitted(true);
    setTimeout(() => setRfqSubmitted(false), 4000);
  };

  return (
    <div className="space-y-10 py-4 font-sans">
      {/* Background Hero Banner */}
      <section className="relative rounded-3xl bg-slate-900 text-white p-8 sm:p-12 overflow-hidden border border-slate-800 shadow-2xl">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-emerald-950/80 z-0 pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/20 rounded-full text-emerald-300 text-xs font-extrabold uppercase tracking-wider mb-4 border border-emerald-400/30">
            <ShoppingBag className="w-4 h-4" /> Bulk Procurement & Buyer Portal
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Direct Procurement & <span className="text-emerald-400">Bulk Grain Sourcing</span>
          </h1>

          <p className="mt-3 text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
            Source verified quality crops directly from regional farmers, post bulk RFQs, track moisture grades, and compute logistics freight rates.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-xs font-bold text-slate-300">
            <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Verified Quality Grades
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
              <Truck className="w-4 h-4 text-teal-400" /> Automated Freight Estimation
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
              <Building2 className="w-4 h-4 text-amber-400" /> Direct Mandi Trade Escrow
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Inventory & RFQ Tool */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Farmers Harvest Inventory List (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-xl font-black text-gray-900">Verified Farmer Harvest Inventory</h2>
                <p className="text-xs text-gray-500 font-medium">Browse available stock from local growers with certified specs</p>
              </div>

              {/* Crop Filter */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {["All", "Wheat", "Mustard", "Soybean", "Paddy", "Rice", "Tomato", "Onion"].map((crop) => (
                  <button
                    key={crop}
                    onClick={() => setSelectedCrop(crop)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                      selectedCrop === crop
                        ? "bg-slate-900 text-white shadow"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {crop}
                  </button>
                ))}
              </div>
            </div>

            {/* Inventory Cards */}
            <div className="space-y-4">
              {filteredInventory.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50/80 rounded-2xl p-5 border border-gray-200 hover:border-emerald-400 hover:bg-white transition-all shadow-sm flex flex-col sm:flex-row justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-md">
                        {item.crop} — {item.variety}
                      </span>
                      <span className="text-xs font-bold bg-gray-200 text-gray-800 px-2.5 py-0.5 rounded-md">
                        {item.grade}
                      </span>
                      {item.certifiedOrganic && (
                        <span className="text-[10px] font-extrabold bg-green-600 text-white px-2 py-0.5 rounded-md">
                          Organic
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-gray-900">{item.farmerName}</h3>
                    <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      {item.location} ({item.distanceKm} km away)
                    </p>

                    <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-600 pt-1">
                      <span>Available: <strong className="text-gray-900">{item.quantityQuintals} qtl</strong></span>
                      <span>Moisture: <strong className="text-gray-900">{item.moistureContent}</strong></span>
                      <span>Harvest: <strong className="text-gray-900">{item.harvestDate}</strong></span>
                    </div>
                  </div>

                  <div className="sm:text-right flex sm:flex-col justify-between items-end gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-200">
                    <div>
                      <span className="text-xs text-gray-500 block font-semibold">Asking Price</span>
                      <span className="text-xl font-black text-emerald-700">₹{item.askingPrice} <span className="text-xs font-normal text-gray-500">/ qtl</span></span>
                    </div>

                    <a
                      href={`tel:${item.phone}`}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Contact Farmer ({item.phone})</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Post Bulk RFQ Form (1 Col) */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <PlusCircle className="w-4 h-4" /> Instant RFQ Generator
            </div>
            <h2 className="text-xl font-black">Post Bulk Procurement Order</h2>
            <p className="text-xs text-slate-400 font-medium">Broadcast your buying requirements directly to local farming co-ops.</p>

            {rfqSubmitted && (
              <div className="bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs p-3.5 rounded-2xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>RFQ broadcasted to 140+ registered farmers in Jaipur region!</span>
              </div>
            )}

            <form onSubmit={handleRfqSubmit} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-300 mb-1">Target Crop</label>
                <select
                  value={rfqForm.crop}
                  onChange={(e) => setRfqForm({ ...rfqForm, crop: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="Wheat">Wheat (Grain)</option>
                  <option value="Mustard">Mustard (Black/Yellow)</option>
                  <option value="Soybean">Soybean</option>
                  <option value="Paddy">Paddy / Rice</option>
                  <option value="Tomato">Tomato</option>
                  <option value="Onion">Onion</option>
                  <option value="Chana">Chana / Gram</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Required Quantity (Metric Tons)</label>
                <input
                  type="number"
                  value={rfqForm.quantityTons}
                  onChange={(e) => setRfqForm({ ...rfqForm, quantityTons: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Max Buying Price (₹ / Quintal)</label>
                <input
                  type="number"
                  value={rfqForm.maxPricePerQtl}
                  onChange={(e) => setRfqForm({ ...rfqForm, maxPricePerQtl: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Delivery Depot Location</label>
                <input
                  type="text"
                  value={rfqForm.deliveryLocation}
                  onChange={(e) => setRfqForm({ ...rfqForm, deliveryLocation: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-slate-950 font-black py-3 rounded-xl transition shadow-lg shadow-emerald-500/20 active:scale-95 text-xs"
              >
                Broadcast Procurement Order
              </button>
            </form>
          </div>

          {/* Logistics Freight Estimator Widget */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase">
              <Truck className="w-4 h-4 text-emerald-600" /> Freight Logistics Estimator
            </div>
            <h3 className="text-sm font-bold text-gray-900">Estimated Transport Cost</h3>
            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 text-xs space-y-1 text-gray-700 font-medium">
              <div className="flex justify-between">
                <span>Distance (Avg):</span>
                <span className="font-bold text-gray-900">75 km</span>
              </div>
              <div className="flex justify-between">
                <span>Freight Rate (10 Ton Truck):</span>
                <span className="font-bold text-emerald-700">₹85 / Quintal</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-1">
                <span>Est. Delivery Window:</span>
                <span className="font-bold text-gray-900">24 - 36 Hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
