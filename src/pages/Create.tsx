import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonRow, IonCol, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { useState } from 'react';
import { eyeOffOutline, eyeOutline, personCircle } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Create: React.FC = () => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [confirmPassword, setConfirmPassword] = useState<string>()
  const [isVisible, setVisibility] = useState<Boolean>(false)
  const [isConfirmVisible, setConfirmVisibility] = useState<Boolean>(false)

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
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding ion-text-center">
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
              placeholder="Enter your email"
              onIonChange={e => setEmail(e.detail.value!)} />

            <IonInput
              type={viewPassword()}
              value={password}
              placeholder="Enter your password"
              onIonChange={e => setPassword(e.detail.value!)}>
              <IonIcon
                style={{ fontSize: "30px", color: "#0040ff" }}
                onClick={() => setVisibility(!isVisible)}
                icon={viewPasswordBtn()} />
            </IonInput>

            <IonInput
              type={viewConfirmPassword()}
              value={confirmPassword}
              placeholder="Enter your password"
              onIonChange={e => setConfirmPassword(e.detail.value!)}>
              <IonIcon
                style={{ fontSize: "30px", color: "#0040ff" }}
                onClick={() => setConfirmVisibility(!isConfirmVisible)}
                icon={viewConfirmPasswordBtn()} />
            </IonInput>

            <IonButton
              disabled={!emptyFields()}
              onClick={() => alert('user ' + email)}
            >

              Create User
            </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Create;
