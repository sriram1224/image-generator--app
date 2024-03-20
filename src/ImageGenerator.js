import { useEffect, useState } from 'react'
import './img.css';
import axios from 'axios';
export default function ImageGenerator() {
   const [inputText, setInputText] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [error, setError] = useState('');
  const API_TOKEN = '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'; // Replace with your actual API token

  const generateImage = () => {
    if (inputText) {
      axios
        .post(
          'https://api-inference.huggingface.co/models/prompthero/openjourney-v4',
          {
            inputs: inputText,
          },
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
            responseType: 'blob', // Set responseType to 'blob' to get binary data
          }
        )
        .then((response) => {
          const imageUrl = URL.createObjectURL(response.data);
          setImageURL(imageUrl);
          setError('');
        })
        .catch((error) => {
          setError('Error generating image. Please try again.');
          console.error('Error generating image:', error);
          setImageURL('');
        });
    } else {
      setError('Please enter text before generating the image.');
    }
  };

  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Image Generation App</h1>
        <form onSubmit={(e) => {e.preventDefault(); generateImage();}}>
          <input
            type="text"
            placeholder="Enter text..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="input"
          />
          <button type="submit" className="button">Generate Image</button>
        </form>
        
        {error && <p className="error">{error}</p>}
        
        {imageURL && (
          <div className="image-container">
            <img src={imageURL} alt="Generated" className="image" />
          </div>
        )}
      </div>
    </div>
  );
}
