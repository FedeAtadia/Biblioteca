import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonRow, IonCol, IonIcon, IonLabel, IonButton, IonLoading, IonAlert} from '@ionic/react';
import { useState } from 'react';
import { eyeOffOutline, eyeOutline, personCircle } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { register } from '../firebaseConfig';

const Create: React.FC = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [isVisible, setVisibility] = useState<Boolean>(false)
  const [isConfirmVisible, setConfirmVisibility] = useState<Boolean>(false)
  const [isLoading,setLoad] = useState<boolean>(false)
  const [message, setMessage] = useState<string>()

  const emptyFields = () => {
    return password != "" && email != "" && password == confirmPassword
  }

  const viewPassword = () => {
    return isVisible ? 'text' : 'password'
  }

  const viewPasswordBtn = () => {
    return isVisible ? eyeOutline : eyeOffOutline
  }

  const viewConfirmPassword = () => {
    return isConfirmVisible ? 'text' : 'password'
  }

  const viewConfirmPasswordBtn = () => {
    return isConfirmVisible ? eyeOutline : eyeOffOutline
  }

  const registerView = ()=>{
    setLoad(true)
    register(email,password)
    .then((userCredential) => {
        // Signed in
        console.log(userCredential)
        setLoad(false)
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
          <IonTitle>Register</IonTitle>
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
            <IonTitle size="large">Register</IonTitle>
          </IonToolbar>
        </IonHeader>
            <IonIcon
              style={{ fontSize: "70px", color: "#0040ff" }}
              icon={personCircle} />
            <IonInput
              type='email'
              value={email}
              placeholder="Ingrese su email"
              onIonChange={e => setEmail(e.detail.value!)} />

            <IonInput
              type={viewPassword()}
              value={password}
              placeholder="Ingrese su contraseña"
              onIonChange={e => setPassword(e.detail.value!)}>
              <IonIcon
                style={{ fontSize: "30px", color: "#0040ff" }}
                onClick={() => setVisibility(!isVisible)}
                icon={viewPasswordBtn()} />
            </IonInput>

            <IonInput
              type={viewConfirmPassword()}
              value={confirmPassword}
              placeholder="Confirme su contraseña"
              onIonChange={e => setConfirmPassword(e.detail.value!)}>
              <IonIcon
                style={{ fontSize: "30px", color: "#0040ff" }}
                onClick={() => setConfirmVisibility(!isConfirmVisible)}
                icon={viewConfirmPasswordBtn()} />
            </IonInput>

            <IonButton
              disabled={!emptyFields()}
              onClick={() => registerView()}
            >
              Crear usuario
            </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Create;
