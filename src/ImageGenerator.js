import { useEffect, useState } from 'react'
import './img.css';
import axios from 'axios';
export default function ImageGenerator() {
   
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const API_TOKEN = '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';
const [input, setInput] = useState('');
  const generateImage = () => {
    if (input) {
      axios
        .post(
          'https://api-inference.huggingface.co/models/prompthero/openjourney-v4',
          {
            inputs: input,
          },
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
            responseType: 'blob',
          }
        )
        .then((response) => {
          const image = URL.createObjectURL(response.data);
          setImage(image);
          setError('');
        })
        .catch((error) => {
          setError('Error generating image. Please try again.');
          console.error('Error generating image:', error);
          setImage('');
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
            placeholder="Enter the text here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input"
          />
          <button type="submit" className="button">Generate Image</button>
        </form>
        
        {error && <p className="error">{error}</p>}
        
        {image && (
          <div className="image-container">
            <img src={image} alt="GenerateImage" className="image" />
          </div>
        )}
      </div>
    </div>
  );
}
