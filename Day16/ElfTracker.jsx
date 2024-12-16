import React, { useState } from 'react';
import { workshopData } from '/data.js';

const ElfTracker = () => {
  const [analyzedData, setAnalyzedData] = useState(null);
  
  // Function to find naughty elves and calculate shipped totals
  const analyzeElves = () => {
    const results = workshopData.map(elf => {
      const totalShipped = {};
      
      function sumToys(shipmentData) {
        for (const region in shipmentData) {
          const subRegion = shipmentData[region];
          if (Array.isArray(subRegion)) {
            subRegion.forEach(({ toy, count }) => {
              totalShipped[toy] = (totalShipped[toy] || 0) + count;
            });
          } else {
            sumToys(subRegion);
          }
        }
      }
      
      sumToys(elf.toysShipped);
      
      // Check if elf is naughty
      const isNaughty = Object.keys(elf.toysMade).some(
        toy => elf.toysMade[toy] > (totalShipped[toy] || 0)
      );
      
      return {
        ...elf,
        totalShipped,
        isNaughty
      };
    });
    
    setAnalyzedData(results);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Santa's Workshop Toy Tracker</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {workshopData.map((elf, index) => (
          <div 
            key={elf.name}
            className={`p-4 rounded-lg shadow-lg ${
              analyzedData?.find(e => e.name === elf.name)?.isNaughty 
                ? 'border-4 border-red-500' 
                : ''
            }`}
          >
            <img 
              src={`/images/image${index + 1}.jpg`} 
              alt={elf.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold mb-3">{elf.name}</h2>
            
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Toys Made:</h3>
              {Object.entries(elf.toysMade).map(([toy, count]) => (
                <div key={toy} className="flex justify-between items-center mb-1">
                  <span>{toy}:</span>
                  <span className="font-mono">{count}</span>
                </div>
              ))}
            </div>
            
            {analyzedData && (
              <div className="mt-4 pt-4 border-t">
                <h3 className="font-semibold mb-2">Toys Shipped:</h3>
                {Object.entries(analyzedData.find(e => e.name === elf.name).totalShipped)
                  .map(([toy, count]) => (
                    <div key={toy} className="flex justify-between items-center mb-1">
                      <span>{toy}:</span>
                      <span className="font-mono">{count}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <button
          onClick={analyzeElves}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition hover:scale-105"
        >
          Check for Naughty Elves
        </button>
      </div>
    </div>
  );
};

export default ElfTracker;