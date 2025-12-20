// "use client";

// import { useState } from "react";
// import { ScatterChart } from "@mui/x-charts";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// import { FiUpload } from "react-icons/fi";

// import Nav from "../components/ui/Nav";

// export default function MlModelPage() {
//   const [loading, setLoading] = useState(false);
//   const [summary, setSummary] = useState(null);
//   const [error, setError] = useState("");

//   const handleUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setLoading(true);
//     setError("");
//     setSummary(null);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await fetch("http://127.0.0.1:8000/predict", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Server error");

//       const data = await res.json();
//       setSummary(data.summary);
//     } catch (err) {
//       setError("Something went wrong. Check if backend is running.");
//     }

//     setLoading(false);
//   };

//   const colors = ["#2563eb", "#16a34a", "#f97316", "#dc2626", "#7c3aed"];

//   const seriesData =
//     summary &&
//     Object.entries(summary).map(([label, count], i) => ({
//       id: label,
//       label,
//       color: colors[i],
//       data: [{ x: i + 1, y: count }],
//       markerSize: Math.max(12, Math.sqrt(count) / 30),
//     }));

//   const attackNames = summary ? Object.keys(summary) : [];

//   const xTicks = attackNames.map((_, i) => i + 1);

//   return (
//     <main>
//       <Nav />
//       <div className="p-10 mt-30 max-w-4xl mx-auto bg-white">
//         <div className="text-center">
//           <h1 className="text-4xl font-bold">ML Model Prediction</h1>
//         </div>

//         <div className="mt-6 flex flex-col items-center">
//           <label
//             htmlFor="csv-upload"
//             className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
//           >
//             <FiUpload className="h-5 w-5" />
//             Upload CSV
//           </label>
//           <input
//             id="csv-upload"
//             type="file"
//             accept=".csv"
//             onChange={handleUpload}
//             className="hidden"
//           />
//           <p className="text-gray-500 mt-2 text-sm">
//             Only CSV files are allowed
//           </p>
//         </div>

//         <div className="text-center mt-6">
//           {loading && (
//             <div className="flex justify-center">
//               <DotLottieReact
//                 src="https://lottie.host/d2641063-2139-47ea-a90b-c62cc1fce508/0Mk3maWsSA.lottie"
//                 loop
//                 autoplay
//                 className="w-32 h-32"
//               />
//             </div>
//           )}
//           {error && <p className="mt-2 text-red-600 font-medium">{error}</p>}
//         </div>

//         {summary && (
//           <div className="mt-10">
//             <h2 className="text-2xl font-semibold">Prediction Summary</h2>

//             <pre className="bg-gray-100 p-4 mt-3 rounded text-sm whitespace-pre-wrap">
//               {Object.entries(summary)
//                 .map(([label, count]) => `${label}: ${count}`)
//                 .join("\n")}
//             </pre>
//           </div>
//         )}

//         {summary && (
//           <div className="mt-12">
//             <h2 className="text-2xl font-semibold mb-4">Prediction Chart</h2>

//             <ScatterChart
//               width={800}
//               height={450}
//               series={seriesData}
//               xAxis={[
//                 {
//                   label: "Attack Types",
//                   data: xTicks,
//                   valueFormatter: (x) => attackNames[x - 1],
//                   min: 0.5,
//                   max: xTicks.length + 0.5,
//                 },
//               ]}
//               yAxis={[
//                 {
//                   label: "Count",
//                   valueFormatter: (v) => v.toLocaleString(),
//                 },
//               ]}
//               grid={{ vertical: true, horizontal: true }}
//               tooltip={{
//                 trigger: "item",
//                 formatter: (params) => {
//                   return `${params.seriesId}: ${params.data.y}`;
//                 },
//               }}
//             />
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }

import { Error404 } from "../components/pagenotfound/Error404";

export default function Page() {
  return (
    <>
      <Error404
        postcardImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/statue-of-liberty-oil-pastel-MndxxUm4uk78xLAAKqtCFXH2HmNn0h.jpg"
        postcardAlt="New York City Postcard with Statue of Liberty"
        curvedTextTop="Feature"
        curvedTextBottom="In Progress In Progress Check"
        heading="(404) We’re currently working on this feature."
        subtext="This section is under active development. Please check back soon — we’re building something meaningful here."
        backButtonLabel="Back to Home"
        backButtonHref="/"
      />
    </>
  );
}
