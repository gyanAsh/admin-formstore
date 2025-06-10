import { useState, type JSX } from "react";

const ImageContainer = () => {
  const [brightness, setBrightness] = useState(1); // Default brightness is 100%

  const handleBrightnessChange = (newBrightness: number) => {
    // Basic validation to prevent extreme values
    if (newBrightness >= 0 && newBrightness <= 2) {
      setBrightness(newBrightness);
    }
  };

  return (
    <div className="p-4 space-y-4 scale-75">
      <div
        className="transition-all duration-200 "
        style={{ filter: `brightness(${brightness})` }}
      >
        {/* This is the component whose brightness you want to control */}
        <img
          src="/homepage/desert.jpg"
          alt="Adjustable Brightness"
          className="rounded-lg shadow-lg"
        />
      </div>

      <BrightnessEditor
        brightness={brightness}
        onBrightnessChange={handleBrightnessChange}
      />
    </div>
  );
};

export default ImageContainer;

const BrightnessEditor = ({
  brightness,
  onBrightnessChange,
}: {
  brightness: number;
  onBrightnessChange: (e: number) => void;
}) => {
  const handleChange = (event: any) => {
    const newBrightness = parseFloat(event.target.value);
    onBrightnessChange(newBrightness);
  };

  return (
    <div className="flex items-center space-x-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
      <label
        htmlFor="brightness"
        className="text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Brightness
      </label>
      <input
        id="brightness"
        type="range"
        min="0"
        max="2"
        step="0.05"
        value={brightness}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {Math.round(brightness * 100)}%
      </span>
    </div>
  );
};
