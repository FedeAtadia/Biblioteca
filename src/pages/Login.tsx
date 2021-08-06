import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonRow, IonCol, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { useState } from 'react';
import { eye, eyeOff, eyeOffOutline, eyeOutline, personCircle } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [isVisible, setVisibility] = useState<Boolean>(false)

    const canLogin = ()=>{
        return password != "" && email != ""
    }

    const viewPassword = () => {
        return isVisible ? 'text' : 'password'
    }

    const viewPasswordBtn = ()=>{
        return isVisible ? eyeOutline : eyeOffOutline
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding ion-text-center">
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
                    placeholder="Enter your email"
                    onIonChange={e => setEmail(e.detail.value!)} />

                <IonInput
                    type={viewPassword()}
                    value={password}
                    placeholder="Enter your password"
                    onIonChange={e => setPassword(e.detail.value!)}>
                    <IonIcon
                        style={{ fontSize: "30px", color: "#0040ff" }}
                        onClick={()=>setVisibility(!isVisible)}
                        icon={viewPasswordBtn()} />
                </IonInput>

                <IonButton 
                    onClick={()=>{alert('user' + ' ' + email)}}
                    disabled = {!canLogin()}
                >
                    Show password
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Login;
