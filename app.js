import { upload } from "./upload.js";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA-AQxSXkRE9zO9FwN-PGO8vDI8-CwrHiw",
  authDomain: "fe-upload-45f8b.firebaseapp.com",
  projectId: "fe-upload-45f8b",
  storageBucket: "fe-upload-45f8b.appspot.com",
  messagingSenderId: "189143690627",
  appId: "1:189143690627:web:cab5aac2d62967ef271ab6",
};

const app = initializeApp(firebaseConfig);

import { getStorage, ref } from "firebase/storage";
const storage = getStorage();
upload("#file", {
  multi: true,
  accept: [".png", ".jpg", ".jpeg", ".gif"],
  onUpload(files, blocks) {
    files.forEach((file, index) => {
      const ref = storage.ref(`images/${file.name}`);
      const task = ref.put(file);
      task.on(
        "state_changed",
        (snapshot) => {
          const percentage =
            ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(
              0
            ) + "%";
          const block = blocks[index].querySelector(".preview-info-progress");
          block.textContent = percentage;
          block.style.width = percentage;
        },
        (error) => {},
        () => {
          task.snapshot.ref.getDownloadURL().then((url) => {
            console.log("Download URL", url);
          });
        }
      );
    });
  },
});
