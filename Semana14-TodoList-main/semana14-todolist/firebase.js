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
    apiKey: "AIzaSyD_dEZ4MWGg-ojnHWd9ZQqAXlegEHdzz3M",
    authDomain: "s14-to-do-list.firebaseapp.com",
    projectId: "s14-to-do-list",
    storageBucket: "s14-to-do-list.appspot.com",
    messagingSenderId: "351730414013",
    appId: "1:351730414013:web:9f49ce1d9620f10032e2d4"
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