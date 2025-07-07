import React, { useState } from 'react'

const Test = () => {
  const [formData, setFormData] = useState({
    name: "",
    images: [],
  });
  const [previews, setPreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images") {
      const fileArray = Array.from(files);
      setFormData((prev) => ({ ...prev, images: fileArray }));

      const imagePreviews = fileArray.map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews(imagePreviews);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    formData.images.forEach((img) => data.append("images", img));

    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Enter name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="file"
        name="images"
        multiple
        accept="image/*"
        onChange={handleChange}
      />

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        {previews.map((src, i) => (
          <img key={i} src={src} alt={`preview-${i}`} width="100" />
        ))}
      </div>

      <button type="submit" style={{ marginTop: "10px" }}>
        Upload
      </button>
    </form>
  );
};


export default Test
