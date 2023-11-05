const http = require('http'); 
const fs = require('fs'); 
const path = require('path'); 
 
const server = http.createServer((req, res) => { 
 
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`); 
 
  const publicPath = path.join(__dirname, 'public'); 
  const filePath = path.join(publicPath, req.url === '/' ? 'index.html' : req.url.slice(1)); 
 
  fs.readFile(filePath, (err, data) => { 
    if (err) { 
      res.writeHead(404, {'Content-Type': 'text/plain'}); 
      res.end('404 Not Found'); 
    } else { 
      const ext = path.extname(filePath).toLowerCase(); 
      const contentType = { 
        '.html': 'text/html', 
        '.css': 'text/css', 
        '.js': 'text/javascript', 
        '.jpg': 'image/jpeg', 
        '.png': 'image/png', 
        '.gif': 'image/gif', 
      }[ext] || 'application/octet-stream'; 
 
      res.writeHead(200, {'Content-Type': contentType}); 
 
      res.end(data); 
    } 
}); 
}); 
 
const port = process.env.PORT || 3000; 
 
server.listen(port, () => { 
  console.log(`Server running at http://localhost:${port}/`); 
}); 
 
 
 
