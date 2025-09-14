# Image Processing API

## Base URL
Check if the server is running successfully:  
`http://localhost:3000`

## Endpoints

### 1. Process & Resize Image

`GET /api/process-image?filename=<name>&width=<width>&height=<height>`

**Method:** GET  
**Path:** `/api/process-image`  
**Query Parameters:**  
- `filename` — Name Of The Image File (Without Extension)  
- `width` — Image Width
- `height` — Image Height

**Example Request:**
`http://localhost:3000/api/process-image?filename=santamonica&width=150&height=150`
