// import React, { useState, useRef, useEffect } from 'react';

// const App = () => {
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [prediction, setPrediction] = useState(null);
//   const [activeTab, setActiveTab] = useState('upload');
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const fileInputRef = useRef(null);


//   const diseases = [
//     { id: 1, name: 'Bacterial Spot', severity: 94, confidence: 96, treatment: 'Use copper-based bactericides', color: '#FF6B35' },
//     { id: 2, name: 'Early Blight', severity: 90, confidence: 90, treatment: 'Apply fungicides regularly', color: '#D62828' },
//     { id: 3, name: 'Late Blight', severity: 92, confidence: 93, treatment: 'Remove infected plants immediately', color: '#6A040F' },
//     { id: 4, name: 'Leaf Mold', severity: 87, confidence: 88, treatment: 'Increase ventilation in greenhouse', color: '#F77F00' },
//     { id: 5, name: 'Septoria Leaf Spot', severity: 97, confidence: 87, treatment: 'Improve air circulation and remove infected leaves', color: '#FAA307' },
//     { id: 6, name: 'Spider Mites', severity: 85, confidence: 90, treatment: 'Use miticides or neem oil', color: '#E85D04' },
//     { id: 7, name: 'Target Spot', severity: 87, confidence: 88, treatment: 'Use appropriate fungicides', color: '#9A031E' },
//     { id: 8, name: 'Yellow Leaf Curl Virus', severity: 93, confidence: 96, treatment: 'Control whiteflies and use resistant varieties', color: '#FFB703' },
//     { id: 9, name: 'Mosaic Virus', severity: 100, confidence: 96, treatment: 'Use virus-free seeds and sanitize tools', color: '#FB8500' },
//     { id: 10, name: 'Healthy', severity: 0, confidence: 98, treatment: 'No treatment needed', color: '#2EC4B6' }
//   ];
  

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setUploadedImage(URL.createObjectURL(file)); // for immediate preview
//       setIsProcessing(true);
  
//       // Create form data
//       const formData = new FormData();
//       formData.append("file", file);
  
//       try {
//         const response = await fetch("http://127.0.0.1:8000/predict/", {
//           method: "POST",
//           body: formData,
//         });
  
//         if (!response.ok) {
//           throw new Error("Failed to get prediction from backend");
//         }
  
//         const result = await response.json();
//         setPrediction(result);
//         setActiveTab("results");
//       } catch (error) {
//         console.error("Error:", error);
//         alert("There was an error processing the image.");
//       } finally {
//         setIsProcessing(false);
//       }
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };
  
//   const handleDrop = async (e) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files[0];
//     if (file && file.type.startsWith("image/")) {
//       setUploadedImage(URL.createObjectURL(file));
//       setIsProcessing(true);
  
//       const formData = new FormData();
//       formData.append("file", file);
  
//       try {
//         const response = await fetch("http://127.0.0.1:8000/predict/", {
//           method: "POST",
//           body: formData,
//         });
  
//         if (!response.ok) {
//           throw new Error("Failed to get prediction from backend");
//         }
  
//         const result = await response.json();
//         setPrediction(result);
//         setActiveTab("results");
//       } catch (error) {
//         console.error("Error:", error);
//         alert("There was an error processing the image.");
//       } finally {
//         setIsProcessing(false);
//       }
//     }
//   };
  

//   const features = [
//     { title: "AI-Powered Detection", desc: "Deep learning models trained on 50,000+ leaf samples", icon: "🧠" },
//     { title: "Real-time Analysis", desc: "Get results in under 10 seconds", icon: "⚡" },
//     { title: "Treatment Guidance", desc: "Personalized recommendations for each disease", icon: "💊" },
//     { title: "Historical Tracking", desc: "Monitor plant health over time", icon: "📊" }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0A0E0F] via-[#1C2A1F] to-[#1B4332] text-[#FEFEFE] overflow-x-hidden">
//       {/* Animated Background Elements */}
//       <div className="fixed inset-0 pointer-events-none">
//         {/* Floating Leaf Particles */}
//         <div className="absolute top-20 left-10 w-4 h-4 bg-[#9BF6FF] rounded-full opacity-20 animate-pulse" style={{ animationDelay: '0s' }}></div>
//         <div className="absolute top-40 right-20 w-3 h-3 bg-[#FF6B35] rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
//         <div className="absolute bottom-32 left-1/4 w-5 h-5 bg-[#2EC4B6] rounded-full opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>
//         <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-[#9BF6FF] rounded-full opacity-40 animate-pulse" style={{ animationDelay: '3s' }}></div>
        
//         {/* Subtle Grid Pattern */}
//         <div className="absolute inset-0 opacity-5" style={{
//           backgroundImage: `radial-gradient(circle, #9BF6FF 1px, transparent 1px)`,
//           backgroundSize: '40px 40px'
//         }}></div>
//       </div>

//       {/* Header */}
//       <header className="relative z-10 px-6 py-4 border-b border-[#1B4332]/30 backdrop-blur-sm">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-[#FF6B35] to-[#D62828] rounded-xl flex items-center justify-center shadow-lg">
//               <span className="text-xl font-bold text-white">T</span>
//             </div>
//             <h1 className="text-2xl font-bold bg-gradient-to-r from-[#9BF6FF] to-[#2EC4B6] bg-clip-text text-transparent">
//               AgriScan AI
//             </h1>
//           </div>
          
//           <nav className="hidden md:flex space-x-8">
//             {['Home', 'Features', 'How It Works', 'About'].map((item) => (
//               <a key={item} href="#" className="text-[#B8BCC1] hover:text-[#9BF6FF] transition-all duration-300 hover:scale-105 font-medium">
//                 {item}
//               </a>
//             ))}
//           </nav>

//           <button className="bg-gradient-to-r from-[#FF6B35] to-[#D62828] hover:from-[#FF6B35]/90 hover:to-[#D62828]/90 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#FF6B35]/25 transform hover:-translate-y-0.5">
//             Get Started
//           </button>
//         </div>
//       </header>

//       <main className="relative z-10">
//         {/* Hero Section */}
//         <section className="py-20 px-6">
//           <div className="max-w-7xl mx-auto text-center">
//             <div className="mb-8">
//               <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
//                 <span className="bg-gradient-to-r from-[#9BF6FF] via-[#2EC4B6] to-[#1B4332] bg-clip-text text-transparent">
//                   AI-Powered
//                 </span>
//                 <br />
//                 <span className="text-white">Plant Health</span>
//                 <span className="text-[#FF6B35]"> Detection</span>
//               </h2>
//               <p className="text-xl text-[#B8BCC1] max-w-3xl mx-auto leading-relaxed">
//                 Advanced deep learning models analyze tomato leaves with 95%+ accuracy, 
//                 providing instant disease detection and treatment recommendations.
//               </p>
//             </div>

//             {/* 3D File Upload Zone */}
//             <div 
//               className="relative max-w-2xl mx-auto mt-12"
//               onDragOver={handleDragOver}
//               onDrop={handleDrop}
//             >
//               <div className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-500 ${
//                 uploadedImage 
//                   ? 'border-[#2EC4B6]/50 bg-[#1B4332]/30' 
//                   : 'border-[#9BF6FF]/30 hover:border-[#9BF6FF]/60 hover:bg-[#1B4332]/20'
//               }`}>
//                 {!uploadedImage ? (
//                   <div className="space-y-6">
//                     <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#FF6B35] to-[#D62828] rounded-full flex items-center justify-center text-3xl animate-pulse">
//                       🍅
//                     </div>
//                     <div>
//                       <p className="text-2xl font-semibold mb-2">Upload Leaf Image</p>
//                       <p className="text-[#B8BCC1] mb-6">Drag & drop your tomato leaf photo or click to browse</p>
//                       <button 
//                         onClick={() => fileInputRef.current?.click()}
//                         className="bg-gradient-to-r from-[#FF6B35] to-[#D62828] hover:from-[#FF6B35]/90 hover:to-[#D62828]/90 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#FF6B35]/25 transform hover:-translate-y-0.5"
//                       >
//                         Choose File
//                       </button>
//                       <input 
//                         ref={fileInputRef}
//                         type="file" 
//                         accept="image/*" 
//                         onChange={handleFileUpload}
//                         className="hidden"
//                       />
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="space-y-6">
//                     <div className="relative">
//                       <img 
//                         src={uploadedImage} 
//                         alt="Uploaded leaf" 
//                         className="mx-auto max-h-64 rounded-xl shadow-2xl border border-[#1B4332]/30"
//                       />
//                       <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
//                     </div>
//                     <div className="space-y-4">
//                       <p className="text-lg font-medium">Image uploaded successfully</p>
//                       <div className="flex justify-center space-x-4">
//                         <button 
//                           onClick={() => fileInputRef.current?.click()}
//                           className="text-[#B8BCC1] hover:text-[#9BF6FF] transition-colors"
//                         >
//                           Change Image
//                         </button>
//                         <button 
//                           onClick={() => {
//                             setIsProcessing(true);
//                             setTimeout(() => {
//                               setPrediction(diseases[Math.floor(Math.random() * 4)]);
//                               setIsProcessing(false);
//                               setActiveTab('results');
//                             }, 3000);
//                           }}
//                           disabled={isProcessing}
//                           className="bg-gradient-to-r from-[#2EC4B6] to-[#1B4332] hover:from-[#2EC4B6]/90 hover:to-[#1B4332]/90 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 disabled:opacity-50"
//                         >
//                           {isProcessing ? 'Analyzing...' : 'Analyze Now'}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Processing Animation */}
//               {isProcessing && (
//                 <div className="mt-8 space-y-4">
//                   <div className="flex justify-center space-x-2">
//                     <div className="w-3 h-3 bg-[#9BF6FF] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
//                     <div className="w-3 h-3 bg-[#9BF6FF] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                     <div className="w-3 h-3 bg-[#9BF6FF] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
//                   </div>
//                   <p className="text-[#B8BCC1]">AI is analyzing your leaf sample...</p>
                  
//                   {/* Neural Network Visualization */}
//                   <div className="flex justify-center mt-6">
//                     <div className="grid grid-cols-5 gap-2">
//                       {[...Array(25)].map((_, i) => (
//                         <div 
//                           key={i}
//                           className="w-2 h-2 bg-[#9BF6FF]/40 rounded-full animate-pulse"
//                           style={{ animationDelay: `${i * 0.1}s` }}
//                         ></div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Features Section */}
//         <section className="py-20 px-6">
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center mb-16">
//               <h3 className="text-4xl font-bold mb-6">Advanced Features</h3>
//               <p className="text-xl text-[#B8BCC1] max-w-3xl mx-auto">
//                 Cutting-edge technology for precision agriculture and disease prevention
//               </p>
//             </div>

//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//               {features.map((feature, index) => (
//                 <div 
//                   key={index}
//                   className="group relative bg-[#1B4332]/20 backdrop-blur-sm rounded-2xl p-8 border border-[#1B4332]/30 hover:border-[#9BF6FF]/50 transition-all duration-500 hover:transform hover:-translate-y-2"
//                   onMouseEnter={() => setHoveredCard(index)}
//                   onMouseLeave={() => setHoveredCard(null)}
//                 >
//                   <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
//                     {feature.icon}
//                   </div>
//                   <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
//                   <p className="text-[#B8BCC1] leading-relaxed">{feature.desc}</p>
                  
//                   {/* Hover Glow Effect */}
//                   {hoveredCard === index && (
//                     <div className="absolute inset-0 rounded-2xl bg-[#9BF6FF]/10 blur-xl -z-10"></div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Results Section */}
//         {prediction && activeTab === 'results' && (
//           <section className="py-20 px-6">
//             <div className="max-w-6xl mx-auto">
//               <div className="text-center mb-12">
//                 <h3 className="text-4xl font-bold mb-6">Analysis Results</h3>
//                 <p className="text-xl text-[#B8BCC1]">Comprehensive disease detection and treatment plan</p>
//               </div>

//               <div className="grid lg:grid-cols-3 gap-8">
//                 {/* Disease Classification */}
//                 <div className="lg:col-span-2 space-y-6">
//                   <div className="bg-[#1B4332]/20 backdrop-blur-sm rounded-2xl p-8 border border-[#1B4332]/30">
//                     <h4 className="text-2xl font-bold mb-6 flex items-center">
//                       <span className="w-3 h-3 rounded-full bg-[#FF6B35] mr-3"></span>
//                       Disease Detected
//                     </h4>
                    
//                     <div className="flex items-center space-x-6 mb-6">
//                       <div className="text-6xl">{prediction.name === 'Healthy' ? '✅' : '⚠️'}</div>
//                       <div>
//                         <h5 className="text-3xl font-bold" style={{ color: prediction.color }}>
//                           {prediction.name}
//                         </h5>
//                         <p className="text-[#B8BCC1]">Tomato Leaf Disease</p>
//                       </div>
//                     </div>

//                     {/* Confidence Meter */}
//                     <div className="space-y-3">
//                       <div className="flex justify-between text-sm">
//                         <span>AI Confidence</span>
//                         <span>{prediction.confidence}%</span>
//                       </div>
//                       <div className="w-full bg-[#1B4332]/50 rounded-full h-3">
//                         <div 
//                           className="bg-gradient-to-r from-[#2EC4B6] to-[#9BF6FF] h-3 rounded-full transition-all duration-1000"
//                           style={{ width: `${prediction.confidence}%` }}
//                         ></div>
//                       </div>
//                     </div>

//                     {/* Severity Indicator */}
//                     <div className="mt-6 space-y-3">
//                       <div className="flex justify-between text-sm">
//                         <span>Disease Severity</span>
//                         <span>{prediction.severity}%</span>
//                       </div>
//                       <div className="w-full bg-[#1B4332]/50 rounded-full h-3">
//                         <div 
//                           className="bg-gradient-to-r from-[#2EC4B6] to-[#FF6B35] h-3 rounded-full transition-all duration-1000"
//                           style={{ width: `${prediction.severity}%` }}
//                         ></div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Treatment Recommendations */}
//                   <div className="bg-[#1B4332]/20 backdrop-blur-sm rounded-2xl p-8 border border-[#1B4332]/30">
//                     <h4 className="text-2xl font-bold mb-6 flex items-center">
//                       <span className="w-3 h-3 rounded-full bg-[#2EC4B6] mr-3"></span>
//                       Treatment Recommendations
//                     </h4>
//                     <div className="space-y-4">
//                       <div className="flex items-start space-x-3 p-4 bg-[#1B4332]/30 rounded-xl">
//                         <div className="w-8 h-8 bg-[#2EC4B6]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
//                           <span className="text-[#2EC4B6] font-bold">1</span>
//                         </div>
//                         <div>
//                           <p className="font-medium">Immediate Action</p>
//                           <p className="text-[#B8BCC1] text-sm">{prediction.treatment}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-start space-x-3 p-4 bg-[#1B4332]/30 rounded-xl">
//                         <div className="w-8 h-8 bg-[#9BF6FF]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
//                           <span className="text-[#9BF6FF] font-bold">2</span>
//                         </div>
//                         <div>
//                           <p className="font-medium">Prevention</p>
//                           <p className="text-[#B8BCC1] text-sm">Improve air circulation and avoid overhead watering</p>
//                         </div>
//                       </div>
//                       <div className="flex items-start space-x-3 p-4 bg-[#1B4332]/30 rounded-xl">
//                         <div className="w-8 h-8 bg-[#FF6B35]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
//                           <span className="text-[#FF6B35] font-bold">3</span>
//                         </div>
//                         <div>
//                           <p className="font-medium">Monitoring</p>
//                           <p className="text-[#B8BCC1] text-sm">Check surrounding plants for early symptoms</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* 3D Result Card */}
//                 <div className="space-y-6">
//                   <div className="bg-gradient-to-br from-[#1B4332] to-[#0A0E0F] rounded-2xl p-8 border border-[#1B4332]/50 shadow-2xl">
//                     <h4 className="text-2xl font-bold mb-6 text-center">AI Analysis</h4>
                    
//                     {/* 3D Classification Wheel */}
//                     <div className="relative w-48 h-48 mx-auto mb-6">
//                       <div className="absolute inset-0 rounded-full border-4 border-[#9BF6FF]/30"></div>
//                       <div className="absolute inset-2 rounded-full border-2 border-[#2EC4B6]/30"></div>
//                       <div className="absolute inset-4 rounded-full border border-[#FF6B35]/30"></div>
                      
//                       {/* Center Indicator */}
//                       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#9BF6FF] rounded-full shadow-lg animate-pulse"></div>
//                     </div>

//                     <div className="text-center">
//                       <p className="text-sm text-[#B8BCC1] mb-2">Model Version</p>
//                       <p className="font-mono text-[#9BF6FF]">v2.3.1-AI</p>
                      
//                       <div className="mt-6 pt-6 border-t border-[#1B4332]/50">
//                         <button className="w-full bg-gradient-to-r from-[#FF6B35] to-[#D62828] hover:from-[#FF6B35]/90 hover:to-[#D62828]/90 text-white py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#FF6B35]/25">
//                           Export Report
//                         </button>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Historical Data */}
//                   <div className="bg-[#1B4332]/20 backdrop-blur-sm rounded-2xl p-6 border border-[#1B4332]/30">
//                     <h5 className="font-semibold mb-4">Recent Analysis</h5>
//                     <div className="space-y-3">
//                       <div className="flex justify-between text-sm">
//                         <span>Previous Scan</span>
//                         <span className="text-[#2EC4B6]">Healthy</span>
//                       </div>
//                       <div className="flex justify-between text-sm">
//                         <span>Scans This Month</span>
//                         <span>12</span>
//                       </div>
//                       <div className="flex justify-between text-sm">
//                         <span>Accuracy Rate</span>
//                         <span className="text-[#9BF6FF]">94.7%</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         )}

//         {/* How It Works */}
//         <section className="py-20 px-6">
//           <div className="max-w-6xl mx-auto">
//             <div className="text-center mb-16">
//               <h3 className="text-4xl font-bold mb-6">How It Works</h3>
//               <p className="text-xl text-[#B8BCC1] max-w-3xl mx-auto">
//                 Simple three-step process for accurate disease detection
//               </p>
//             </div>

//             <div className="grid md:grid-cols-3 gap-8">
//               {[
//                 { step: 1, title: "Upload Image", desc: "Take or upload a clear photo of your tomato leaf", icon: "📸" },
//                 { step: 2, title: "AI Analysis", desc: "Our deep learning model analyzes the leaf for disease patterns", icon: "🧠" },
//                 { step: 3, title: "Get Results", desc: "Receive detailed diagnosis and treatment recommendations", icon: "📋" }
//               ].map((item, index) => (
//                 <div key={index} className="text-center relative">
//                   <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B35] to-[#D62828] rounded-full flex items-center justify-center text-2xl mx-auto mb-6 shadow-lg">
//                     {item.icon}
//                   </div>
//                   <h4 className="text-2xl font-bold mb-3">Step {item.step}</h4>
//                   <h5 className="text-xl font-semibold mb-3">{item.title}</h5>
//                   <p className="text-[#B8BCC1] leading-relaxed">{item.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="py-12 px-6 border-t border-[#1B4332]/30">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="flex items-center space-x-3 mb-6 md:mb-0">
//               <div className="w-8 h-8 bg-gradient-to-br from-[#FF6B35] to-[#D62828] rounded-lg flex items-center justify-center">
//                 <span className="text-sm font-bold text-white">T</span>
//               </div>
//               <span className="text-xl font-bold">AgriScan AI</span>
//             </div>
            
//             <div className="flex space-x-6">
//               {['Privacy', 'Terms', 'Contact', 'Support'].map((item) => (
//                 <a key={item} href="#" className="text-[#B8BCC1] hover:text-[#9BF6FF] transition-colors">
//                   {item}
//                 </a>
//               ))}
//             </div>
//           </div>
          
//           <div className="mt-8 pt-8 border-t border-[#1B4332]/30 text-center text-[#B8BCC1]">
//             <p>&copy; 2024 AgriScan AI. Revolutionizing agriculture with artificial intelligence.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default App;









import React, { useState, useRef } from 'react';

const App = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [activeTab, setActiveTab] = useState('upload');
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      setUploadedImage(URL.createObjectURL(file));
      setImageFile(file);
      setPrediction(null);
      setActiveTab('upload');
    }
  };

  const handleFileUpload = (event) => {
    handleFileSelect(event.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files[0]);
  };

  const handleAnalyze = async () => {
    if (!imageFile) {
      alert("Please upload an image first.");
      return;
    }

    setIsProcessing(true);
    setPrediction(null);

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: "Failed to get prediction from backend." }));
        throw new Error(errorData.detail || "Network response was not ok");
      }

      const result = await response.json();
      const formattedName = result.prediction.replace("Tomato___", "").replace(/_/g, " ");
      
      setPrediction({ name: formattedName });
      setActiveTab("results");

    } catch (error) {
      console.error("Error:", error);
      alert(`There was an error processing the image: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E0F] via-[#1C2A1F] to-[#1B4332] text-[#FEFEFE] overflow-x-hidden">
      {/* Header and other static JSX remains the same */}
      <header className="relative z-10 px-6 py-4 border-b border-[#1B4332]/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF6B35] to-[#D62828] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold text-white">T</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#9BF6FF] to-[#2EC4B6] bg-clip-text text-transparent">
              AgriScan AI
            </h1>
          </div>
         
          <button className="bg-gradient-to-r from-[#FF6B35] to-[#D62828] hover:from-[#FF6B35]/90 hover:to-[#D62828]/90 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#FF6B35]/25 transform hover:-translate-y-0.5">
            Get Started
          </button>
        </div>
      </header>
      
      <main className="relative z-10">
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#9BF6FF] via-[#2EC4B6] to-[#1B4332] bg-clip-text text-transparent">AI-Powered</span>
                <br />
                <span className="text-white">Plant Health</span>
                <span className="text-[#FF6B35]"> Detection</span>
              </h2>
              <p className="text-xl text-[#B8BCC1] max-w-3xl mx-auto leading-relaxed">
                Advanced deep learning models analyze tomato leaves, providing instant disease detection.
              </p>
            </div>
            {/* File Upload Zone */}
            <div 
              className="relative max-w-2xl mx-auto mt-12"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-500 ${ uploadedImage ? 'border-[#2EC4B6]/50 bg-[#1B4332]/30' : 'border-[#9BF6FF]/30 hover:border-[#9BF6FF]/60 hover:bg-[#1B4332]/20'}`}>
                {!uploadedImage ? (
                  <div className="space-y-6">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#FF6B35] to-[#D62828] rounded-full flex items-center justify-center text-3xl animate-pulse">
                      🍅
                    </div>
                    <div>
                      <p className="text-2xl font-semibold mb-2">Upload Leaf Image</p>
                      <p className="text-[#B8BCC1] mb-6">Drag & drop your tomato leaf photo or click to browse</p>
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-gradient-to-r from-[#FF6B35] to-[#D62828] hover:from-[#FF6B35]/90 hover:to-[#D62828]/90 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#FF6B35]/25 transform hover:-translate-y-0.5"
                      >
                        Choose File
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="relative">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded leaf" 
                        className="mx-auto max-h-64 rounded-xl shadow-2xl border border-[#1B4332]/30"
                      />
                    </div>
                    <div className="space-y-4">
                      <p className="text-lg font-medium">Image ready for analysis.</p>
                      <div className="flex justify-center space-x-4">
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="text-[#B8BCC1] hover:text-[#9BF6FF] transition-colors"
                        >
                          Change Image
                        </button>
                        <button 
                          onClick={handleAnalyze}
                          disabled={isProcessing}
                          className="bg-gradient-to-r from-[#2EC4B6] to-[#1B4332] hover:from-[#2EC4B6]/90 hover:to-[#1B4332]/90 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 disabled:opacity-50"
                        >
                          {isProcessing ? 'Analyzing...' : 'Analyze Now'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                onChange={handleFileUpload}
                className="hidden"
              />

              {/* Processing Animation */}
              {isProcessing && (
                <div className="mt-8 space-y-4">
                  <div className="flex justify-center space-x-2">
                    <div className="w-3 h-3 bg-[#9BF6FF] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-3 h-3 bg-[#9BF6FF] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-3 h-3 bg-[#9BF6FF] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <p className="text-[#B8BCC1]">AI is analyzing your leaf sample...</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* RESULTS SECTION */}
        {prediction && activeTab === 'results' && (
          <section className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h3 className="text-4xl font-bold mb-6">Analysis Results</h3>
              </div>
              <div className="bg-[#1B4332]/20 backdrop-blur-sm rounded-2xl p-8 border border-[#1B4332]/30">
                <h4 className="text-2xl font-bold mb-6">
                  Disease Detected
                </h4>
                
                <div className="flex items-center justify-center space-x-6 mb-6 text-center">
                  {/* Improvement: Make check case-insensitive for robustness */}
                  <div className="text-6xl">{prediction.name.toLowerCase() === 'healthy' ? '✅' : '⚠️'}</div>
                  <div>
                    <h5 className="text-4xl font-bold text-white">
                      {prediction.name}
                    </h5>
                    <p className="text-[#B8BCC1]">Tomato Leaf Status</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

       {/* Footer */}
       <footer className="py-12 px-6 border-t border-[#1B4332]/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FF6B35] to-[#D62828] rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-white">T</span>
              </div>
              <span className="text-xl font-bold">AgriScan AI</span>
            </div>
            <div className="flex space-x-6">
              {['Privacy', 'Terms', 'Contact', 'Support'].map((item) => (
                <a key={item} href="#" className="text-[#B8BCC1] hover:text-[#9BF6FF] transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#1B4332]/30 text-center text-[#B8BCC1]">
            <p>© 2024 AgriScan AI. Revolutionizing agriculture with artificial intelligence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;