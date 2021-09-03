import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonAvatar, IonItemDivider, IonInput, IonButton, useIonViewWillEnter, IonIcon } from "@ionic/react";
import { error } from "console";
import { logOutOutline } from "ionicons/icons";
import { useState } from "react";
import { deleteBooks, getBooks, logOut, setBooks } from "../../firebaseConfig";

/* const dataInit = [
    {
        name: 'Juan',
        age: '23',
        image: 'https://media.istockphoto.com/photos/happy-laughing-man-picture-id544358212?k=6&m=544358212&s=612x612&w=0&h=odURMNz2hty8LIfpVahaaUKpGU4vd-UlZx4jy-OAnJA='
    },
    {
        name: 'Antonio',
        age: '45',
        image: "https://media.istockphoto.com/photos/happy-senior-man-sitting-at-home-picture-id912073272?k=6&m=912073272&s=612x612&w=0&h=Kyx9cdOEScPfH_vARGcvwSvfZTKzZ8ZaZIdmtDNNxlE="
    }
] */

export interface dataList {name: string, editor: string, image: string}

const BooksList: React.FC = () => {

    const [data, setData] = useState<dataList[]>([])
    const [name, setName] = useState<string>("")
    const [age, setAge] = useState<string>("")
    const [image, setImage] = useState<string>("")

    const fetchBooks = () => {
        getBooks()
        .then((dataBooks)=>{
            setData(dataBooks)
        })
        .catch((dataError)=>{
            console.log(dataError)
        })

    }

    useIonViewWillEnter(()=>{
        fetchBooks()
    })

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>BooksList</IonTitle>
                    <IonButton slot="end" fill="clear"
                    onClick={
                        logOut
                    }>
                        <IonIcon icon={logOutOutline}/>
                    </IonButton>
                </IonToolbar>
            </IonHeader>

            <IonContent>

                <IonItem>
                    <IonLabel position="floating">Name</IonLabel>
                    <IonInput
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onIonChange={e => setName(e.detail.value!)}>
                    </IonInput>
                </IonItem>

                <IonItem>
                    <IonLabel position="floating">Editor</IonLabel>
                    <IonInput
                        type="text"
                        placeholder="Enter your age"
                        value={age}
                        onIonChange={e => setAge(e.detail.value!)}>
                    </IonInput>
                </IonItem>

                <IonItem>
                    <IonLabel position="floating">Image</IonLabel>
                    <IonInput
                        type="text"
                        placeholder="Enter your name"
                        value={image}
                        onIonChange={e => setImage(e.detail.value!)}>
                    </IonInput>
                </IonItem>

                <IonButton
                onClick={()=>{
                    setBooks({
                        name: name,
                        editor: age,
                        image: image
                    })
                    .then(() => {
                        fetchBooks()
                    })
                    .catch(() => {
                        console.log("error")
                    })
                }}>
                    Add Data
                </IonButton>
                

                <IonList>
                    {data.map((element) => {
                        return (
                            <IonItem>
                                <IonAvatar slot="start"><img src={element.image} alt="Image" /></IonAvatar>
                                <IonLabel>{`${element.name}  ${element.editor}`}</IonLabel>
                                <IonButton
                                onClick={()=>{
                                    deleteBooks(element.name)
                                    .then(() => {
                                        fetchBooks()
                                    })              
                                }}>ola</IonButton>
                            </IonItem>
                        )
                    })}
                </IonList>




            </IonContent>
        </IonPage>
    )
}


export default BooksList;