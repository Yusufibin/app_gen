const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Configuration de multer pour gérer les fichiers téléchargés
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.use(express.static('public'));

app.post('/upload', upload.single('fileInput'), (req, res) => {
  const uploadedFile = req.file;
  if (uploadedFile) {
    res.json({ success: true, filename: uploadedFile.filename });
  } else {
    res.json({ success: false, message: 'File upload failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
