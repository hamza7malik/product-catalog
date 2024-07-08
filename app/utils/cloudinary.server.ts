import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadImage = async (imageFile: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append('upload_preset', 'product-catalog'); // Use your created upload preset name here

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dcjxxw51h/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response from Cloudinary:', errorText);
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
};
