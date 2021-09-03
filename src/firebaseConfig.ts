import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import { dataList } from "./pages/list/booksList";

  const firebaseConfig = {
    apiKey: "AIzaSyCABMmAHCJRpio2DDqNHb5y5XrAclm02iQ",
    authDomain: "ionic-fede.firebaseapp.com",
    projectId: "ionic-fede",
    storageBucket: "ionic-fede.appspot.com",
    messagingSenderId: "586646171651",
    appId: "1:586646171651:web:a49f0b1cf5db8cec205e36"
  };
  // Initialize Firebase
  
  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
  export async function login(email: string, password: string){
    return new Promise((result, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user?.uid;
          result(user)
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.error(errorMessage)
          reject({
            errorCode,
            errorMessage
          })
        });
    })
  }

  export async function register(email: string, password: string){
    return new Promise((result, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          result(user)
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          reject({
            errorCode,
            errorMessage
          })
        });
    })
  }

  export function logOut() {
    firebase.auth().signOut()
    alert("deslogueaste")    
  }

  export async function getBooks(){
    return new Promise <Array<dataList>>((result,reject) => {
      firebase.firestore().collection("books").get()
      .then((querySnapshot)=> {
        let bookList: dataList[] = []
        querySnapshot.forEach(documentSnapshot => {
          bookList.push({
            name:documentSnapshot.data().bookName,
            editor:documentSnapshot.data().bookEditor,
            image:documentSnapshot.data().bookImage
          })
        })
        result(bookList)
      })
      .catch((queryError)=>{
        reject(queryError.code)
      })
    })
  }

  export async function setBooks(book:dataList) {
    return new Promise <Boolean>((result,reject) => {
      firebase.firestore().collection("books").doc(book.name).set({
        bookEditor: book.editor,
        bookImage: book.image,
        bookName: book.name
      })
      .then(() => {
          result(true)
      })
      .catch(() => {
        reject(false)
      })
    })
  }

  export async function deleteBooks(id:string) {
    return new Promise <Boolean>((result,reject) => {
      firebase.firestore().collection("books").doc(id).delete()
      .then(() => {
        result(true)
      })
      .catch(() => {
        reject(false)
      })
    })
  }