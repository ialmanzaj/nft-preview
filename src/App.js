import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const location = useLocation();
  const [code, setCode] = useState(null);

  const [codeJson, setCodeJson] = useState(null);
  const [codeImage, setCodeImage] = useState(null);

  useEffect(() => {
    const currCode = new URLSearchParams(location.search).get("code");
    setCode(currCode);
  }, [location]);

  useEffect(() => {
    try {
      if (!code) {
        throw new Error("code is not available");
      }

      const [, jsonContentEncoded] = code.split("base64,");
      if (!jsonContentEncoded) {
        throw new Error("json content is not valid");
      }
      const { image, ...jsonContent } = JSON.parse(atob(jsonContentEncoded));
      setCodeJson(jsonContent);
      setCodeImage(image);
    } catch (error) {
      console.error(error);
      setCodeJson(null);
      setCodeImage(null);
    }
  }, [code]);

  return (
    <div className="bg-blue-100 text-gray-700 w-screen h-screen grid items-center">
      <div>
        <div className="bg-white rounded-md mx-auto p-4 max-w-2xl w-full">
          <h3 className="text-2xl font-bold mb-2">Get NFT preview</h3>
          <p className="mb-6 text-gray-600">
            Paste your encoded tokenURI below or add it as a query parameter
            "code"{" "}
          
          </p>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              TokenURI code
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <textarea
                rows={3}
                className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md p-2"
                value={code || ""}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
          </div>
          {codeJson && (
            <div className="grid grid-cols-3 gap-4 my-8">
              {Object.keys(codeJson).map((key) => (
                <>
                  <div key={key} className="col-start-1 col-end-2 font-bold">
                    {key}
                  </div>
                  <div key={`${key}-value`} className="col-start-2 col-end-4">
                    {codeJson[key]}
                  </div>
                </>
              ))}
            </div>
          )}

          {codeImage && (
            <img
              className="max-w-full max-h-full w-auto"
              src={codeImage}
              alt="NFT preview"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
