// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    addDoc,
    getDocs,
    deleteDoc,
    onSnapshot,
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
      
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDY6MV9azyyBdtdSG2SYtLcnOAC1UKF6IU",
    authDomain: "fir-javascript-crud-d1561.firebaseapp.com",
    projectId: "fir-javascript-crud-d1561",
    storageBucket: "fir-javascript-crud-d1561.appspot.com",
    messagingSenderId: "579865010991",
    appId: "1:579865010991:web:919a22084902fe09b9f7da"
};
      
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const saveTask = (title, description) => {
    addDoc(collection(db, "tasks"), {title: title, description: description});
}

export const getTasks = () => getDocs(collection(db, "tasks"));

export const onGetTasks = callback => 
    onSnapshot(collection(db, "tasks"), callback);

export const deleteTask = id => deleteDoc(doc(db, "tasks", id));

export const getTask = id => getDoc(doc(db, "tasks", id));

export const updateTask = (id, newFields) => 
    updateDoc(doc(db, "tasks", id), newFields);
