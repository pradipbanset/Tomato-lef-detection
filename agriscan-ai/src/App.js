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
    formData.append("image", imageFile);


    try {
      const response = await fetch(
        "https://tomato-lef-detection.onrender.com/predict",
        {
          method: "POST",
          body: formData,
        }
      );
      

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