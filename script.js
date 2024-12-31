//your JS code here. If required.
const btn = document.getElementById("download-images-button");

const imageUrls = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

document.getElementById("download-images-button").addEventListener("click", () => {
            const outputDiv = document.getElementById("output");
            outputDiv.innerHTML = ""; // Clear previous images

            // Function to download an image
            const downloadImage = (image) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = image.url;

                    img.onload = () => resolve(img);
                    img.onerror = () => reject(new Error(`Failed to load image's URL: ${image.url}`));
                });
            };

            // Use Promise.all to download all images in parallel
            Promise.all(imageUrls.map(downloadImage))
                .then(images => {
                    images.forEach(img => outputDiv.appendChild(img)); // Display each image
                })
                .catch(error => {
                    console.error(error.message); // Log the error
                    const errorDiv = document.createElement("div");
                    errorDiv.textContent = error.message;
                    errorDiv.style.color = "red";
                    outputDiv.appendChild(errorDiv); // Show the error message
                });
        });