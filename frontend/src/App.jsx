import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Cell, ScatterChart, Scatter, ZAxis, LineChart, Line, Legend
} from 'recharts';

const API_BASE = 'http://localhost:8000/api';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [globalStats, setGlobalStats] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE}/analytics/stats/summary`).then(r => setGlobalStats(r.data));
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderAnalytics = () => {
    switch (activeTab) {
      case 'overview': return <OverviewView />;
      case 'executive_summary': return <ExecutiveSummaryView />;
      case 'regional_map': return <RegionalHeatmapView />;
      case 'location_breakdown': return <LocationBreakdownView />;
      case 'cost_predictor': return <PredictorView />;
      case 'anomalies': return <AnomaliesView />;
      case 'top_products': return <TopProductsView />;
      case 'data_injection': return <DataInjectionView />;
      default: return <OverviewView />;
    }
  };

  return (
    <div className="min-h-screen text-white bg-black font-data">
      
      {/* SIDEBAR */}
      <aside 
        className={`fixed top-0 left-0 h-full w-72 bg-[#050505] border-r-4 turq-border p-8 shadow-[10px_0_30px_rgba(0,0,0,0.8)] sidebar-transition font-cyber ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex justify-between items-center mb-16 text-[10px]">
          <span className="turq-text uppercase underline tracking-widest">ADVANCED</span>
          <button onClick={toggleSidebar} className="text-white text-2xl hover:text-[#36C1B6]">×</button>
        </div>
        <nav className="space-y-12 text-[10px]">
          <button onClick={() => { setActiveTab('executive_summary'); toggleSidebar(); }} className="block w-full text-left hover:text-[#36C1B6] transition uppercase tracking-tighter">&gt; EXECUTIVE SUMMARY</button>
          <button onClick={() => { setActiveTab('location_breakdown'); toggleSidebar(); }} className="block w-full text-left hover:text-[#36C1B6] transition uppercase tracking-tighter">&gt; RURAL / URBAN</button>
          <button onClick={() => { setActiveTab('cost_predictor'); toggleSidebar(); }} className="block w-full text-left hover:text-[#36C1B6] transition uppercase tracking-tighter">&gt; PREDICTOR</button>
          <button onClick={() => { setActiveTab('anomalies'); toggleSidebar(); }} className="block w-full text-left hover:text-[#36C1B6] transition uppercase tracking-tighter">&gt; ANOMALIES</button>
          <button onClick={() => { setActiveTab('top_products'); toggleSidebar(); }} className="block w-full text-left hover:text-[#36C1B6] transition uppercase tracking-tighter">&gt; TOP PRODUCTS</button>
          <button onClick={() => { setActiveTab('data_injection'); toggleSidebar(); }} className="block w-full text-left hover:text-[#36C1B6] transition uppercase tracking-tighter text-[#36C1B6] font-bold">&gt; DATA INJECTION</button>
        </nav>
      </aside>

      {/* HEADER */}
      <header className="fixed top-0 w-full z-40 bg-black/80 border-b-4 border-[#36C1B6]/20 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center">
          
          <button onClick={toggleSidebar} className="flex flex-col gap-1.5 group">
            <div className="w-8 h-1 turq-bg neon-shadow"></div>
            <div className="w-6 h-1 turq-bg neon-shadow"></div>
            <div className="w-8 h-1 turq-bg neon-shadow"></div>
          </button>

          <nav className="hidden md:flex gap-8 text-[12px] font-cyber tracking-widest">
            <button 
              onClick={() => setActiveTab('overview')} 
              className={`flex items-center gap-3 px-4 py-2 border-2 transition-all ${activeTab === 'overview' ? 'turq-border turq-text' : 'border-transparent text-white hover:turq-text hover:turq-border'}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M0 0h11v11H0zM13 0h11v11H13zM0 13h11v11H0zM13 13h11v11H13z"/></svg>
              <span>OVERVIEW</span>
            </button>
            <button 
              onClick={() => setActiveTab('regional_map')} 
              className={`flex items-center gap-3 px-4 py-2 border-2 transition-all ${activeTab === 'regional_map' ? 'turq-border turq-text' : 'border-transparent text-white hover:turq-text hover:turq-border'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A2 2 0 013 15.488V5.512a2 2 0 011.553-1.948L9 2l6 3 5.447-2.724A2 2 0 0121 4.224v9.976a2 2 0 01-1.553 1.948L15 19l-6-3z"/></svg>
              <span>REGIONAL MAP</span>
            </button>
          </nav>

          <div className="flex items-center gap-3">
             <span className="text-xl font-black tracking-tighter turq-text hidden sm:block font-cyber">ANAPIE</span>
             <img src="https://i.ibb.co.com/0pvRnPWN/removebg-preview.png" alt="Anapie Logo" className="h-14 w-auto neon-shadow" />
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="hero-bg min-h-screen flex items-center pt-24 px-6 relative border-b-4 turq-border">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-10">
            <p className="turq-text text-[9px] font-cyber animate-pulse">_ANAPIE_TERMINAL_READY</p>
            <h2 className="text-xl md:text-2xl leading-[1.8] font-cyber tracking-tighter">
              DEEP ANALYTICS FOR HOUSEHOLD CONSUMPTION. TRACK YOUR SPENDING WITH AI PRECISION.
            </h2>
            <div className="w-32 h-2 turq-bg neon-shadow"></div>
          </div>
          <div className="text-right space-y-8">
            <h1 className="text-4xl md:text-7xl font-cyber font-black leading-tight tracking-tighter italic">
              DATA <br/> <span className="turq-text neon-shadow">DRIVEN</span> <br/> ANALYTICS
            </h1>
            <div className="mt-8 font-data grid grid-cols-3 gap-4 text-center">
               <div className="p-4 border border-[#36C1B6]/30 bg-black/50 backdrop-blur">
                  <div className="text-[10px] turq-text mb-1 font-cyber">RECORDS</div>
                  <div className="text-2xl font-bold">{globalStats?.total_records?.toLocaleString() || '...'}</div>
               </div>
               <div className="p-4 border border-[#36C1B6]/30 bg-black/50 backdrop-blur">
                  <div className="text-[10px] turq-text mb-1 font-cyber">COST</div>
                  <div className="text-2xl font-bold">${(globalStats?.total_cost / 1000000).toFixed(1)}M</div>
               </div>
               <div className="p-4 border border-[#36C1B6]/30 bg-black/50 backdrop-blur">
                  <div className="text-[10px] turq-text mb-1 font-cyber">VOLUME</div>
                  <div className="text-2xl font-bold">{globalStats?.total_volume?.toLocaleString() || '...'}</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANALYTICS BLOCK */}
      <section id="analytics" className="py-20 px-6 bg-[#000]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6 mb-16">
            <div className="h-[2px] flex-grow bg-white/10"></div>
            <h2 className="text-xl md:text-2xl turq-text font-cyber italic uppercase font-bold">{activeTab.replace('_', ' ')} MODULE</h2>
            <div className="h-[2px] flex-grow bg-white/10"></div>
          </div>
          
          <div className="bg-[#050505] border-2 turq-border p-6 md:p-10 neon-shadow relative">
            <div className="absolute top-0 right-0 p-2 text-[#36C1B6]/30 text-[8px] font-cyber">SYS_OP: NORMAL</div>
            {renderAnalytics()}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 flex flex-col items-center border-t-4 border-[#36C1B6]/20 bg-[#050505] text-center space-y-10">
        <div className="flex justify-center items-center gap-6">
             <img src="https://i.ibb.co.com/0pvRnPWN/removebg-preview.png" alt="Logo" className="h-14 opacity-80" />
             <span className="text-3xl font-cyber turq-text font-black tracking-tighter">ANAPIE</span>
        </div>
        <div className="space-y-4 tracking-[3px] text-[12px] font-cyber">
            <p className="text-white">E-MAIL: <a href="mailto:timurklysbekov@gmail.com" className="turq-text hover:underline">TIMURKLYSBEKOV@GMAIL.COM</a></p>
            <p className="text-white">TELEGRAM: <a href="https://t.me/timurka182" className="turq-text hover:underline">@TIMURKA182</a></p>
        </div>
        <p className="text-gray-700 text-[10px] font-cyber tracking-[10px] pt-10">2026</p>
      </footer>
    </div>
  );
};

// --- SUBVIEWS ---

const OverviewView = () => {
   const [seasonality, setSeasonality] = useState([]);
   const [insights, setInsights] = useState([]);
   const [yearlyTrends, setYearlyTrends] = useState([]);

   useEffect(() => {
      axios.get(`${API_BASE}/analytics/seasonality`).then(r => setSeasonality(r.data));
      axios.get(`${API_BASE}/analytics/insights`).then(r => setInsights(r.data.insights));
      axios.get(`${API_BASE}/analytics/trends/yearly`).then(r => setYearlyTrends(r.data));
   }, []);

   const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

   return (
      <div className="space-y-10">
         {insights.length > 0 && (
            <div className="border border-[#36C1B6] bg-[#36C1B6]/10 p-6">
               <h3 className="font-cyber text-[14px] turq-text mb-4">_AI_INSIGHT_TERMINAL</h3>
               <ul className="space-y-2 list-disc pl-5">
                  {insights.map((ins, i) => <li key={i}>{ins}</li>)}
               </ul>
            </div>
         )}

         <div className="grid md:grid-cols-2 gap-10">
            <div>
               <h3 className="font-cyber text-[16px] mb-6">SEASONALITY ANALYSIS</h3>
               <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={seasonality.map(d => ({ ...d, monthName: monthNames[d.month-1] }))}>
                        <defs>
                           <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#36C1B6" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#36C1B6" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                        <XAxis dataKey="monthName" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#36C1B6', color: '#fff' }} />
                        <Area type="monotone" dataKey="cost" stroke="#36C1B6" fill="url(#colorCost)" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </div>
            <div>
               <h3 className="font-cyber text-[16px] mb-6">YEARLY TRENDS</h3>
               <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                     <LineChart data={yearlyTrends}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                        <XAxis dataKey="year" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#36C1B6', color: '#fff' }} />
                        <Line type="monotone" dataKey="cost" stroke="#36C1B6" strokeWidth={3} dot={{ r: 5, fill: '#36C1B6' }} activeDot={{ r: 8 }} />
                     </LineChart>
                  </ResponsiveContainer>
               </div>
            </div>
         </div>
      </div>
   );
};

const RegionalHeatmapView = () => {
   const [data, setData] = useState([]);
   const [topRegions, setTopRegions] = useState([]);

   useEffect(() => {
      axios.get(`${API_BASE}/analytics/regional-breakdown`).then(r => setData(r.data));
      axios.get(`${API_BASE}/analytics/stats/regions`).then(r => setTopRegions(r.data));
   }, []);

   return (
      <div className="space-y-16">
         <div>
            <h3 className="font-cyber text-[16px] mb-6">TOP 10 REGIONS BY COST</h3>
            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topRegions.slice(0, 10)}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                     <XAxis dataKey="region_code" stroke="#666" />
                     <YAxis stroke="#666" />
                     <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#36C1B6', color: '#fff' }} cursor={{fill: '#36C1B6', opacity: 0.1}} />
                     <Bar dataKey="cost" fill="#36C1B6" radius={[4, 4, 0, 0]} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div>
            <h3 className="font-cyber text-[16px] mb-6">REGIONAL DATA MATRIX</h3>
            <p className="mb-6 opacity-70">Grid intensifies based on total consumption cost.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
               {data.slice(0, 48).map((r, i) => {
                  const intensity = Math.min(1, r.cost / 20000000); 
                  return (
                     <div key={i} 
                        className="p-4 border border-[#36C1B6]/20 flex flex-col items-center justify-center transition-all hover:scale-105 cursor-crosshair"
                        style={{ backgroundColor: `rgba(54, 193, 182, ${intensity * 0.8})` }}
                        title={`Cost: $${r.cost.toLocaleString()}`}
                     >
                        <span className="font-cyber text-[14px] neon-shadow z-10">{r.region_code}</span>
                        <span className="text-[10px] opacity-80 z-10">{r.year}</span>
                     </div>
                  )
               })}
            </div>
         </div>
      </div>
   );
};

const LocationBreakdownView = () => {
   const [locationData, setLocationData] = useState([]);
   
   useEffect(() => {
      axios.get(`${API_BASE}/analytics/stats/location`).then(r => setLocationData(r.data));
   }, []);

   return (
      <div className="space-y-12">
         <h3 className="font-cyber text-[16px] mb-6">RURAL / URBAN DEMOGRAPHICS</h3>
         <div className="grid md:grid-cols-2 gap-10">
            <div>
               <h4 className="font-cyber text-[12px] mb-4 opacity-70 turq-text">TOTAL COST BY SECTOR</h4>
               <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={locationData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#222" horizontal={false} />
                        <XAxis type="number" stroke="#666" />
                        <YAxis dataKey="location_name" type="category" stroke="#666" width={80} />
                        <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#36C1B6', color: '#fff' }} cursor={{fill: '#36C1B6', opacity: 0.1}} />
                        <Bar dataKey="cost" fill="#36C1B6" barSize={40} radius={[0, 4, 4, 0]} />
                     </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>
            <div>
               <h4 className="font-cyber text-[12px] mb-4 opacity-70 turq-text">AVG PRICE PER UNIT</h4>
               <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={locationData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                        <XAxis dataKey="location_name" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#36C1B6', color: '#fff' }} cursor={{fill: '#36C1B6', opacity: 0.1}} />
                        <Bar dataKey="price_per_unit" fill="#FFC107" barSize={60} radius={[4, 4, 0, 0]} />
                     </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>
         </div>
      </div>
   );
};

const ExecutiveSummaryView = () => {
   const [summary, setSummary] = useState(null);
   useEffect(() => {
      axios.get(`${API_BASE}/analytics/business-summary`).then(r => setSummary(r.data));
   }, []);

   if (!summary) return <div className="font-cyber animate-pulse turq-text">CALCULATING CORRELATION MATRICES...</div>;

   return (
      <div className="space-y-12">
         <h3 className="font-cyber text-[16px] mb-6 turq-text">EXECUTIVE SUMMARY</h3>
         
         <div className="grid md:grid-cols-2 gap-10">
            <div>
               <h4 className="font-cyber text-[12px] mb-4">SCATTER ANALYSIS: VOLUME VS COST</h4>
               <p className="text-[10px] opacity-70 mb-4 font-cyber leading-relaxed">
                  // Pearson Corr: {summary.correlation}<br/>
                  // Interpreting density and volume elasticity.
               </p>
               <div className="h-[350px] border border-[#36C1B6]/20 bg-[#050505] p-4 neon-shadow">
                  <ResponsiveContainer width="100%" height="100%">
                     <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                        <XAxis type="number" dataKey="volume" name="Volume" stroke="#666" />
                        <YAxis type="number" dataKey="cost" name="Cost" stroke="#666" />
                        <Tooltip cursor={{strokeDasharray: '3 3'}} contentStyle={{ backgroundColor: '#000', borderColor: '#36C1B6', color: '#fff' }} />
                        <Scatter name="Transactions" data={summary.scatter} fill="#36C1B6" fillOpacity={0.5} />
                     </ScatterChart>
                  </ResponsiveContainer>
               </div>
            </div>

            <div className="space-y-6">
               <h4 className="font-cyber text-[12px] mb-4">HYPOTHESES & BUSINESS ACTIONS</h4>
               {summary.hypotheses.map((hyp, i) => (
                  <div key={i} className={`p-4 border-l-4 bg-[#0A0A0A] ${hyp.confirmed ? 'border-green-500' : 'border-red-500'}`}>
                     <div className={`font-cyber text-[10px] mb-2 ${hyp.confirmed ? 'text-green-500' : 'text-red-500'}`}>
                        {hyp.confirmed ? '[CONFIRMED]' : '[REJECTED]'} {hyp.title}
                     </div>
                     <div className="text-[12px] opacity-80 mb-3">{hyp.desc}</div>
                     <div className="text-[10px] turq-text font-bold font-cyber mt-2 p-2 bg-[#36C1B6]/10">{hyp.action}</div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

const TopProductsView = () => {
   const [products, setProducts] = useState([]);
   useEffect(() => {
      axios.get(`${API_BASE}/analytics/top-products`).then(r => setProducts(r.data));
   }, []);

   return (
      <div>
         <h3 className="font-cyber text-[16px] mb-6">TOP CONSUMPTION DRIVERS</h3>
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="border-b-2 turq-border font-cyber text-[10px]">
                  <th className="p-4">PRODUCT_CODE</th>
                  <th className="p-4">TRANSACTIONS</th>
                  <th className="p-4 text-right">TOTAL_COST</th>
               </tr>
            </thead>
            <tbody>
               {products.map((p, i) => (
                  <tr key={i} className="border-b border-[#222] hover:bg-[#36C1B6]/10 transition">
                     <td className="p-4 font-bold">{p.product_code}</td>
                     <td className="p-4 opacity-70">{p.count?.toLocaleString()} instances</td>
                     <td className="p-4 text-right turq-text font-bold">${p.cost?.toLocaleString()}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

const AnomaliesView = () => {
   const [anomalies, setAnomalies] = useState([]);
   useEffect(() => {
      axios.get(`${API_BASE}/analytics/anomalies`).then(r => setAnomalies(r.data));
   }, []);

   return (
      <div>
         <h3 className="font-cyber text-[16px] mb-6 text-red-500">SEVERE ANOMALIES DETECTED</h3>
         <div className="space-y-4">
            {anomalies.map((a, i) => (
               <div key={i} className="p-4 border border-red-500/50 bg-red-900/10 flex justify-between items-center group hover:border-red-500">
                  <div>
                     <div className="font-cyber text-[10px] text-red-400 mb-1">ID: {a.id}</div>
                     <div className="opacity-70 text-[12px]">Product: {a.product_code} | Region: {a.region_code} | Date: {a.date_z}</div>
                  </div>
                  <div className="text-right">
                     <div className="text-red-500 font-bold text-xl">${a.cost_amount.toLocaleString()}</div>
                     <div className="text-[10px] uppercase tracking-widest opacity-50">EXTREME VALUE</div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

const PredictorView = () => {
   const [params, setParams] = useState({ region: 39, month: 10, year: 2024 });
   const [result, setResult] = useState(null);
   const [metrics, setMetrics] = useState(null);

   useEffect(() => {
      axios.get(`${API_BASE}/forecast/metrics`).then(r => setMetrics(r.data));
   }, []);

   const getPrediction = async () => {
      const res = await axios.get(`${API_BASE}/forecast/predict`, { params: { region_code: params.region, month: params.month, year: params.year }});
      setResult(res.data);
   };

   return (
      <div className="grid md:grid-cols-2 gap-10">
         <div>
            <h3 className="font-cyber text-[16px] mb-6">PREDICTION ENGINE</h3>
            <div className="space-y-6">
               <div>
                  <label className="font-cyber text-[10px] turq-text block mb-2">REGION_CODE</label>
                  <input type="number" value={params.region} onChange={e => setParams({...params, region: e.target.value})} className="w-full bg-black border turq-border p-3 text-white focus:outline-none focus:ring-1 focus:ring-[#36C1B6] font-cyber text-[12px]" />
               </div>
               <div>
                  <label className="font-cyber text-[10px] turq-text block mb-2">YEAR</label>
                  <input type="number" value={params.year} onChange={e => setParams({...params, year: e.target.value})} className="w-full bg-black border turq-border p-3 text-white focus:outline-none focus:ring-1 focus:ring-[#36C1B6] font-cyber text-[12px]" />
               </div>
               <div>
                  <label className="font-cyber text-[10px] turq-text block mb-2">MONTH (1-12)</label>
                  <input type="number" value={params.month} onChange={e => setParams({...params, month: e.target.value})} className="w-full bg-black border turq-border p-3 text-white focus:outline-none focus:ring-1 focus:ring-[#36C1B6] font-cyber text-[12px]" />
               </div>
               <button onClick={getPrediction} className="w-full turq-bg text-black font-cyber p-4 hover:bg-white transition-colors duration-300">
                  EXECUTE PREDICTION
               </button>
            </div>
            
            {result && (
               <div className="mt-8 p-6 border-2 turq-border bg-[#36C1B6]/10 animate-pulse">
                  <div className="font-cyber text-[14px] mb-2">ESTIMATED_COST:</div>
                  <div className="text-4xl font-bold turq-text">${result.predicted_cost.toLocaleString()}</div>
               </div>
            )}
         </div>

         <div className="border border-[#222] p-6 bg-black">
            <h3 className="font-cyber text-[14px] mb-4 text-[#999]">MODEL DIAGNOSTICS</h3>
            {metrics ? (
               <div className="space-y-4">
                  <div className="flex justify-between border-b border-[#222] pb-2">
                     <span className="opacity-70">Alg:</span> <span>Random Forest</span>
                  </div>
                  <div className="flex justify-between border-b border-[#222] pb-2">
                     <span className="opacity-70">Train Base:</span> <span>{metrics.train_rows.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#222] pb-2 text-red-400">
                     <span className="opacity-70">RMSE Error:</span> <span>± {metrics.rmse}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#222] pb-2 text-yellow-400">
                     <span className="opacity-70">MAE Error:</span> <span>± {metrics.mae}</span>
                  </div>
                  
                  {metrics.feature_importance && (
                     <div className="pt-6">
                        <div className="font-cyber text-[10px] turq-text mb-4">FEATURE_IMPORTANCE</div>
                        {Object.entries(metrics.feature_importance)
                           .sort((a,b) => b[1] - a[1])
                           .map(([feat, imp]) => (
                           <div key={feat} className="mb-3">
                              <div className="flex justify-between text-[10px] mb-1">
                                 <span>{feat.toUpperCase()}</span>
                                 <span>{(imp * 100).toFixed(1)}%</span>
                              </div>
                              <div className="w-full bg-[#222] h-2">
                                 <div className="turq-bg h-2" style={{ width: `${imp * 100}%` }}></div>
                              </div>
                           </div>
                        ))}
                     </div>
                  )}
               </div>
            ) : <p>Loading diagnostics...</p>}
         </div>
      </div>
   );
};

const DataInjectionView = () => {
   const [rows, setRows] = useState([
      { date_z: new Date().toISOString().split('T')[0], region_code: '', location_type: '', product_code: '', consumption_volume: '', cost_amount: '', unit_measure: '', year: new Date().getFullYear() }
   ]);
   const [status, setStatus] = useState(null);

   const addRow = () => {
      setRows([...rows, { date_z: new Date().toISOString().split('T')[0], region_code: '', location_type: '', product_code: '', consumption_volume: '', cost_amount: '', unit_measure: '', year: new Date().getFullYear() }]);
   };

   const updateRow = (index, field, value) => {
      const newRows = [...rows];
      newRows[index][field] = value;
      setRows(newRows);
   };

   const removeRow = (index) => {
      const newRows = rows.filter((_, i) => i !== index);
      setRows(newRows);
   };

   const submitData = async () => {
      // Validate
      for (const row of rows) {
         if (!row.region_code || !row.location_type || !row.product_code || !row.consumption_volume || !row.cost_amount || !row.unit_measure) {
            setStatus({ type: 'error', text: 'ERR: PLEASE FILL ALL COLUMNS BEFORE INJECTION' });
            return;
         }
      }

      const payload = rows.map(r => ({
         date_z: r.date_z,
         region_code: parseInt(r.region_code),
         location_type: parseInt(r.location_type),
         product_code: parseFloat(r.product_code),
         consumption_volume: parseFloat(r.consumption_volume),
         cost_amount: parseFloat(r.cost_amount),
         unit_measure: parseFloat(r.unit_measure),
         year: parseInt(r.year)
      }));

      try {
         setStatus({ type: 'loading', text: 'INJECTING DATA TO MAINFRAME...' });
         const res = await axios.post(`${API_BASE}/data/upload`, payload);
         setStatus({ type: 'success', text: res.data.message });
         // Reset
         setRows([{ date_z: new Date().toISOString().split('T')[0], region_code: '', location_type: '', product_code: '', consumption_volume: '', cost_amount: '', unit_measure: '', year: new Date().getFullYear() }]);
      } catch (err) {
         setStatus({ type: 'error', text: `ERR: ${err.message}` });
      }
   };

   return (
      <div className="space-y-6">
         <div className="flex justify-between items-center mb-6">
            <h3 className="font-cyber text-[16px] text-[#36C1B6]">DATA INJECTION TERMINAL</h3>
            <button onClick={addRow} className="border border-[#36C1B6] text-[#36C1B6] px-4 py-2 text-[10px] uppercase font-cyber hover:bg-[#36C1B6]/20 transition">
               + ADD ROW
            </button>
         </div>
         
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
               <thead>
                  <tr className="border-b-2 turq-border font-cyber text-[10px] text-[#36C1B6]">
                     <th className="p-2">DATE</th>
                     <th className="p-2">REGION_CODE</th>
                     <th className="p-2">LOCATION (1=City, 2=Rural)</th>
                     <th className="p-2">PRODUCT_CODE</th>
                     <th className="p-2">VOLUME</th>
                     <th className="p-2">COST_AMOUNT</th>
                     <th className="p-2">UNIT_MEASURE</th>
                     <th className="p-2">YEAR</th>
                     <th className="p-2 text-center">ACTION</th>
                  </tr>
               </thead>
               <tbody className="text-[12px] font-data">
                  {rows.map((row, i) => (
                     <tr key={i} className="border-b border-[#222]">
                        <td className="p-2"><input type="date" value={row.date_z} onChange={(e) => updateRow(i, 'date_z', e.target.value)} className="w-full bg-black border border-[#222] p-1 text-white focus:border-[#36C1B6] outline-none" /></td>
                        <td className="p-2"><input type="number" placeholder="e.g. 39" value={row.region_code} onChange={(e) => updateRow(i, 'region_code', e.target.value)} className="w-full bg-black border border-[#222] p-1 text-white focus:border-[#36C1B6] outline-none" /></td>
                        <td className="p-2"><input type="number" placeholder="1 or 2" value={row.location_type} onChange={(e) => updateRow(i, 'location_type', e.target.value)} className="w-full bg-black border border-[#222] p-1 text-white focus:border-[#36C1B6] outline-none" /></td>
                        <td className="p-2"><input type="number" placeholder="Code" value={row.product_code} onChange={(e) => updateRow(i, 'product_code', e.target.value)} className="w-full bg-black border border-[#222] p-1 text-white focus:border-[#36C1B6] outline-none" /></td>
                        <td className="p-2"><input type="number" placeholder="Volume" value={row.consumption_volume} onChange={(e) => updateRow(i, 'consumption_volume', e.target.value)} className="w-full bg-black border border-[#222] p-1 text-white focus:border-[#36C1B6] outline-none" /></td>
                        <td className="p-2"><input type="number" placeholder="Cost" value={row.cost_amount} onChange={(e) => updateRow(i, 'cost_amount', e.target.value)} className="w-full bg-black border border-[#222] p-1 text-white focus:border-[#36C1B6] outline-none" /></td>
                        <td className="p-2"><input type="number" placeholder="Unit" value={row.unit_measure} onChange={(e) => updateRow(i, 'unit_measure', e.target.value)} className="w-full bg-black border border-[#222] p-1 text-white focus:border-[#36C1B6] outline-none" /></td>
                        <td className="p-2"><input type="number" placeholder="Year" value={row.year} onChange={(e) => updateRow(i, 'year', e.target.value)} className="w-full bg-black border border-[#222] p-1 text-white focus:border-[#36C1B6] outline-none" /></td>
                        <td className="p-2 text-center">
                           <button onClick={() => removeRow(i)} className="text-red-500 hover:text-red-400 font-cyber font-bold text-xl leading-none">&times;</button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {status && (
            <div className={`p-4 font-cyber text-[12px] border ${status.type === 'error' ? 'border-red-500 bg-red-500/10 text-red-500' : 'border-[#36C1B6] bg-[#36C1B6]/10 text-[#36C1B6]'}`}>
               {status.text}
            </div>
         )}

         <button onClick={submitData} className="w-full turq-bg text-black font-cyber p-4 hover:bg-white transition-colors duration-300 mt-6 font-bold tracking-widest">
            EXECUTE DATA INJECTION
         </button>
      </div>
   );
};

export default App;
