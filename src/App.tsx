import React, { useRef, useState } from 'react';
import {
  IonApp,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput
} from '@ionic/react';
import BmiControls from './components/BmiControls';
import BmiResult from './components/BmiResult';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
  const [calculatedBmi, setCalculatedBmi] = useState<number>(); // telling TS this state will eventually be number

  // setting up ref hook to capture input values
  const weightInput = useRef<HTMLIonInputElement>(null);   // <HTMLIonInputElement> and (null) is TS spec. it will hold core type element
  const heightInput = useRef<HTMLIonInputElement>(null);

  const calculateBmi = () => {
    const enteredWeight = weightInput.current?.value; // ? is TS feature added and checking for null values
    const enteredHeight = heightInput.current!.value; // ! telling TS that this value will ALWAYS be set. it might be '' but not null

    if (!enteredHeight || !enteredWeight || +enteredWeight <= 0 || +enteredHeight <=0 ) {
      return;
    }
    const bmi = +enteredWeight / (+enteredHeight * +enteredHeight);

    setCalculatedBmi(bmi);
  };

  const resetInputs = () => {
    weightInput.current!.value = '';
    heightInput.current!.value = '';
    setCalculatedBmi(NaN);
  };

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>BMI Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Your Height</IonLabel>
                <IonInput type="number" ref={heightInput}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Your Weight</IonLabel>
                <IonInput type="number" ref={weightInput}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <BmiControls onCalculate={calculateBmi} onReset={resetInputs} />
          {calculatedBmi && (
            <BmiResult onResult={calculatedBmi} />
          )}
        </IonGrid>
      </IonContent>

    </IonApp>
  );
};

export default App;
