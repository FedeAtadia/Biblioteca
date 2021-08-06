import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonAvatar, IonItemDivider, IonInput, IonButton, useIonViewWillEnter } from "@ionic/react";
import { useState } from "react";

const dataInit = [
    {
        name: 'agus',
        age: 18,
        image: 'data:image/png;base64,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'
    },
    {
        name: 'Fede',
        age: 18,
        image: "data:image/jpeg;base64,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"
    }
]

interface dataList {name: string, age: number, image: string}

const BooksList: React.FC = () => {

    const [data, setData] = useState<dataList[]>([])
    const [name, setName] = useState<string>()
    const [age, setAge] = useState<string>()
    const [image, setImage] = useState<string>()

    useIonViewWillEnter(()=>{
        setData([...dataInit])
    })

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>BooksList</IonTitle>
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
                    <IonLabel position="floating">Age</IonLabel>
                    <IonInput
                        type="number"
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
                onClick={()=>
                    setData([...data!,  {
                        name: name!,
                        age: parseInt(age!),
                        image: image!
                    }])
                }>
                    Add Data
                </IonButton>

                <IonList>
                    {data.map((element, index) => {
                        return (
                            <IonItem>
                                <IonAvatar slot="start"><img src={element.image} alt="Image" /></IonAvatar>
                                <IonLabel>{`${element.name}  ${element.age}`}</IonLabel>

                            </IonItem>
                        )
                    })}
                </IonList>




            </IonContent>
        </IonPage>
    )
}


export default BooksList;