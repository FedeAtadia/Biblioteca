import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonRow, IonCol, IonIcon, IonLabel, IonButton, IonLoading, IonAlert } from '@ionic/react';
import { useState } from 'react';
import { eye, eyeOff, eyeOffOutline, eyeOutline, logOutOutline, personCircle } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { login, logOut } from '../firebaseConfig';
import { useHistory } from 'react-router';


const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isVisible, setVisibility] = useState<boolean>(false)
    const [isLoading,setLoad] = useState<boolean>(false)
    const [message, setMessage] = useState<string>()
    const history = useHistory()

    const canLog = ()=>{
        return password != "" && email != ""
    }

    const viewPassword = () => {
        return isVisible ? 'text' : 'password'
    }

    const viewPasswordBtn = ()=>{
        return isVisible ? eyeOutline : eyeOffOutline
    }

    const loginView = ()=>{
        setLoad(true)
        login(email,password)
        .then((userCredential) => {
            // Signed in
            console.log(userCredential)
            setLoad(false)
            history.replace("/list")
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error(errorMessage)
            setLoad(false)
            setMessage(errorMessage)
          });
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                    
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding ion-text-left">
                <IonLoading isOpen={isLoading}></IonLoading>
                <IonAlert
                    isOpen={!!message}
                    header={'Alert'}
                    subHeader={'Subtitle'}
                    message={message}
                    onDidDismiss={() => setMessage("")}
                    />
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Login</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonIcon
                    style={{ fontSize: "70px", color: "#0040ff" }}
                    icon={personCircle} />

                <IonInput
                    type='email'
                    value={email}
                    placeholder="Ingrese su email:"
                    onIonChange={e => setEmail(e.detail.value!)} />

                <IonInput
                    type={viewPassword()}
                    value={password}
                    placeholder="Ingrese su contraseña"
                    onIonChange={e => setPassword(e.detail.value!)}>
                    <IonIcon
                        style={{ fontSize: "30px", color: "#0040ff" }}
                        onClick={()=>setVisibility(!isVisible)}
                        icon={viewPasswordBtn()} />
                </IonInput>

                <IonButton 
                    onClick={()=>{loginView()}}
                    disabled = {!canLog()}
                >
                    Iniciar sesión
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Login;
