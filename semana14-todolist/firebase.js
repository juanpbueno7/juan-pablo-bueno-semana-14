// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "firebase/app";
import {
    collection,
    getDocs,
    addDoc,
    setDoc,
    doc
} from "firebase/firestore";
import {
    getFirestore
} from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCSm88nQdtx9BP3KmAXHE1_4UilEuBB0HA",
    authDomain: "to-do-list-2628a.firebaseapp.com",
    projectId: "to-do-list-2628a",
    storageBucket: "to-do-list-2628a.appspot.com",
    messagingSenderId: "641701647152",
    appId: "1:641701647152:web:3d8050fce71e81ad2baef5"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export async function getTasks() {

    const myTasks = [];
    const querySnapshot = await getDocs(collection(db, "tasks"));
    querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);
        myTasks.push({
            ...doc.data(),
            id: doc.id
        })
    });
    return myTasks;
}


export async function addTask(taskTitle) {
    try {
        const docRef = await addDoc(collection(db, "tasks"), {
            title: taskTitle,
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}


export async function editDocument(title, id) {
    await setDoc(doc(db, "tasks", id), {
        title: title,
        completed: true,
    });
}