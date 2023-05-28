// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";



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
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Storage
const storage = getStorage(app);

export async function getTasks() {

    const allTasks = []

    const querySnapshot = await getDocs(collection(db, "tasks"));
    querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);
        allTasks.push({ ...doc.data(), id: doc.id })
    });

    return allTasks
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

export async function addUserToDb(userInfo, id) {

    try {
        await setDoc(doc(db, "users", id), userInfo);
        console.log("user written with ID: ", id);
    } catch (e) {
        console.error("Error adding user: ", e);
    }
}

export async function editDocument(title, id) {

    // Add a new document in collection "cities"
    await setDoc(doc(db, "tasks", id), {
        title: title,
        completed: true,
    });
}


export async function createUser(userInfo) {

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.pass)
        // Signed in 
        const user = userCredential.user;
        console.log(user)

        // Subir Imagen
        const url = await uploadFile(user.uid+userInfo.picture.name, userInfo.picture, 'profilePictures')

        // Crear usuario en DB

        const dbInfo = {
            url,
            email: userInfo.email,
            birthday: userInfo.birthday,
            username: userInfo.username
        }

        addUserToDb(dbInfo, user.uid)
        
    }
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error.message)
    }

}

export async function uploadFile(name, file, folder) {
    
    try {
        const taskImgRef = ref(storage, `${folder}/${name}`);
        await uploadBytes(taskImgRef, file);
        const url = await getDownloadURL(taskImgRef);
        return url;
    } catch (error) {
        console.log("error creando imagen ->", error);
    }
}

export async function signInUser(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    }
}
