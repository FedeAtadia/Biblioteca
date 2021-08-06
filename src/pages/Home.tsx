import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonRow, IonCol, IonIcon, IonLabel } from '@ionic/react';
import { useState } from 'react';
import { personCircle } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
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
        <IonRow>
          <IonCol>
            <IonIcon
              style={{ fontSize: "70px", color: "#0040ff" }}
              icon={personCircle} />
            <IonInput
              type='email'
              value={email}
              placeholder="Enter your email"
              onIonChange={e => setEmail(e.detail.value!)} />

            <IonInput
              type='password'
              value={password}
              placeholder="Enter your password"
              onIonChange={e => setPassword(e.detail.value!)} />

          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Home;
